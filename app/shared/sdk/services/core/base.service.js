"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var search_params_1 = require("./search.params");
var error_service_1 = require("./error.service");
var auth_service_1 = require("./auth.service");
var lb_config_1 = require("../../lb.config");
var SDKModels_1 = require("../custom/SDKModels");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var socket_connections_1 = require("../../sockets/socket.connections");
/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
var BaseLoopBackApi = (function () {
    function BaseLoopBackApi(http, connection, models, auth, searchParams, errorHandler) {
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    BaseLoopBackApi.prototype.request = function (method, url, routeParams, urlParams, postBody, pubsub, customHeaders) {
        var _this = this;
        if (routeParams === void 0) { routeParams = {}; }
        if (urlParams === void 0) { urlParams = {}; }
        if (postBody === void 0) { postBody = {}; }
        if (pubsub === void 0) { pubsub = false; }
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach(function (key) {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            if (url.match(/fk/)) {
                var arr = url.split('/');
                arr.pop();
                url = arr.join('/');
            }
            var event_1 = ("[" + method + "]" + url).replace(/\?/, '');
            var subject_1 = new Subject_1.Subject();
            this.connection.on(event_1, function (res) { return subject_1.next(res); });
            return subject_1.asObservable();
        }
        else {
            // Headers to be sent
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            // Authenticate request
            this.authenticate(url, headers);
            // Body fix for built in remote methods using "data", "options" or "credentials
            // that are the actual body, Custom remote method properties are different and need
            // to be wrapped into a body object
            var body = void 0;
            var postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            var filter = '';
            // Separate filter object from url params and add to search query
            if (urlParams.filter) {
                if (lb_config_1.LoopBackConfig.isHeadersFilteringSet()) {
                    headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    filter = "?filter=" + encodeURIComponent(JSON.stringify(urlParams.filter));
                }
                delete urlParams.filter;
            }
            // Separate where object from url params and add to search query
            /**
            CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
            - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
            - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328
            if (urlParams.where) {
              headers.append('where', JSON.stringify(urlParams.where));
              delete urlParams.where;
            }
            **/
            if (typeof customHeaders === 'function') {
                headers = customHeaders(headers);
            }
            this.searchParams.setJSON(urlParams);
            var request = new http_1.Request(new http_1.RequestOptions({
                headers: headers,
                method: method,
                url: "" + url + filter,
                search: Object.keys(urlParams).length > 0 ? this.searchParams.getURLSearchParams() : null,
                body: body ? JSON.stringify(body) : undefined,
                withCredentials: lb_config_1.LoopBackConfig.getRequestOptionsCredentials()
            }));
            return this.http.request(request)
                .map(function (res) { return (res.text() != "" ? res.json() : {}); })
                .catch(function (e) { return _this.errorHandler.handleError(e); });
        }
    };
    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    BaseLoopBackApi.prototype.authenticate = function (url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers.append('Authorization', lb_config_1.LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
    };
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    BaseLoopBackApi.prototype.create = function (data, customHeaders) {
        var _this = this;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub oncreate many method
     */
    BaseLoopBackApi.prototype.onCreate = function (data) {
        var _this = this;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, true)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    BaseLoopBackApi.prototype.createMany = function (data, customHeaders) {
        var _this = this;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method onCreateMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    BaseLoopBackApi.prototype.onCreateMany = function (data) {
        var _this = this;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, true)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    BaseLoopBackApi.prototype.findById = function (id, filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        var _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, _urlParams, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    BaseLoopBackApi.prototype.find = function (filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter: filter }, undefined, null, customHeaders)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    BaseLoopBackApi.prototype.exists = function (id, customHeaders) {
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id: id }, undefined, undefined, null, customHeaders);
    };
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    BaseLoopBackApi.prototype.findOne = function (filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter: filter }, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    BaseLoopBackApi.prototype.updateAll = function (where, data, customHeaders) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data: data }, null, customHeaders);
    };
    /**
     * @method onUpdateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub onUpdateAll method
     */
    BaseLoopBackApi.prototype.onUpdateAll = function (where, data) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data: data }, true);
    };
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    BaseLoopBackApi.prototype.deleteById = function (id, customHeaders) {
        var _this = this;
        return this.request('DELETE', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onDeleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onDeleteById method
     */
    BaseLoopBackApi.prototype.onDeleteById = function (id) {
        var _this = this;
        return this.request('DELETE', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, undefined, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    BaseLoopBackApi.prototype.count = function (where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    };
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    BaseLoopBackApi.prototype.updateAttributes = function (id, data, customHeaders) {
        var _this = this;
        return this.request('PUT', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onUpdateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onUpdateAttributes method
     */
    BaseLoopBackApi.prototype.onUpdateAttributes = function (id, data) {
        var _this = this;
        return this.request('PUT', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    BaseLoopBackApi.prototype.upsert = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onUpsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsert method
     */
    BaseLoopBackApi.prototype.onUpsert = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    BaseLoopBackApi.prototype.upsertPatch = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onUpsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertPatch method using patch http method
     */
    BaseLoopBackApi.prototype.onUpsertPatch = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    BaseLoopBackApi.prototype.upsertWithWhere = function (where, data, customHeaders) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onUpsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertWithWhere method
     */
    BaseLoopBackApi.prototype.onUpsertWithWhere = function (where, data) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    BaseLoopBackApi.prototype.replaceOrCreate = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onReplaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceOrCreate method
     */
    BaseLoopBackApi.prototype.onReplaceOrCreate = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    BaseLoopBackApi.prototype.replaceById = function (id, data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onReplaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceById method
     */
    BaseLoopBackApi.prototype.onReplaceById = function (id, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    BaseLoopBackApi.prototype.createChangeStream = function () {
        var subject = new Subject_1.Subject();
        if (typeof EventSource !== 'undefined') {
            var emit = function (msg) { return subject.next(JSON.parse(msg.data)); };
            var source = new EventSource([
                lb_config_1.LoopBackConfig.getPath(),
                lb_config_1.LoopBackConfig.getApiVersion(),
                this.model.getModelDefinition().path,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    };
    BaseLoopBackApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Inject(socket_connections_1.SocketConnection)),
        __param(2, core_1.Inject(SDKModels_1.SDKModels)),
        __param(3, core_1.Inject(auth_service_1.LoopBackAuth)),
        __param(4, core_1.Inject(search_params_1.JSONSearchParams)),
        __param(5, core_1.Optional()), __param(5, core_1.Inject(error_service_1.ErrorHandler)),
        __metadata("design:paramtypes", [http_1.Http,
            socket_connections_1.SocketConnection,
            SDKModels_1.SDKModels,
            auth_service_1.LoopBackAuth,
            search_params_1.JSONSearchParams,
            error_service_1.ErrorHandler])
    ], BaseLoopBackApi);
    return BaseLoopBackApi;
}());
exports.BaseLoopBackApi = BaseLoopBackApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCLHNDQUE2RDtBQUM3RCxzQ0FBdUU7QUFFdkUsaURBQW1EO0FBQ25ELGlEQUErQztBQUMvQywrQ0FBOEM7QUFDOUMsNkNBQWlEO0FBRWpELGlEQUFnRDtBQUVoRCx3Q0FBdUM7QUFFdkMsbUNBQWlDO0FBQ2pDLGlDQUErQjtBQUMvQix1RUFBb0U7QUFHcEU7Ozs7Ozs7Ozs7R0FVRztBQUVIO0lBS0UseUJBQzBCLElBQVUsRUFDRSxVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ2QsWUFBOEIsRUFDdEIsWUFBMEI7UUFMOUMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNFLGVBQVUsR0FBVixVQUFVLENBQWtCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2QsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRXRFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNEOzs7Ozs7Ozs7OztRQVdJO0lBQ0csaUNBQU8sR0FBZCxVQUNFLE1BQXVCLEVBQ3ZCLEdBQXVCLEVBQ3ZCLFdBQXlCLEVBQ3pCLFNBQXlCLEVBQ3pCLFFBQXlCLEVBQ3pCLE1BQWdDLEVBQ2hDLGFBQXlCO1FBUDNCLGlCQTRFQztRQXpFQyw0QkFBQSxFQUFBLGdCQUF5QjtRQUN6QiwwQkFBQSxFQUFBLGNBQXlCO1FBQ3pCLHlCQUFBLEVBQUEsYUFBeUI7UUFDekIsdUJBQUEsRUFBQSxjQUFnQztRQUdoQyx5REFBeUQ7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFP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WUFDQSxnQ0FBZ0I7WUFDUiw0QkFBWTtPQVhwRCxlQUFlLENBaWtCcEM7SUFBRCxzQkFBQztDQUFBLEFBamtCRCxJQWlrQkM7QUFqa0JxQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVxdWVzdCwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSlNPTlNlYXJjaFBhcmFtcyB9IGZyb20gJy4vc2VhcmNoLnBhcmFtcyc7XHJcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xyXG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgQWNjZXNzVG9rZW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XHJcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4uL2N1c3RvbS9TREtNb2RlbHMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IEVycm9yT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9FcnJvck9ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xyXG4vLyBNYWtpbmcgU3VyZSBFdmVudFNvdXJjZSBUeXBlIGlzIGF2YWlsYWJsZSB0byBhdm9pZCBjb21waWxhdGlvbiBpc3N1ZXMuXHJcbmRlY2xhcmUgdmFyIEV2ZW50U291cmNlOiBhbnk7XHJcbi8qKlxyXG4qIEBtb2R1bGUgQmFzZUxvb3BCYWNrQXBpXHJcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1Yjpqb25hdGhhbi1jYXNhcnJ1Ymlhcz5cclxuKiBAYXV0aG9yIE5pa29sYXkgTWF0aXVzaGVua292IDxodHRwczovL2dpdGh1Yi5jb20vbW52eD5cclxuKiBAbGljZW5zZSBNSVRcclxuKiBAZGVzY3JpcHRpb25cclxuKiBBYnN0cmFjdCBjbGFzcyB0aGF0IHdpbGwgYmUgaW1wbGVtZW50ZWQgaW4gZXZlcnkgY3VzdG9tIHNlcnZpY2UgYXV0b21hdGljYWxseSBidWlsdFxyXG4qIGJ5IHRoZSBzZGsgYnVpbGRlci5cclxuKiBJdCBwcm92aWRlcyB0aGUgY29yZSBmdW5jdGlvbmFsbGl0eSBmb3IgZXZlcnkgQVBJIGNhbGwsIGVpdGhlciBieSBIVFRQIENhbGxzIG9yIGJ5XHJcbiogV2ViU29ja2V0cy5cclxuKiovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VMb29wQmFja0FwaSB7XHJcblxyXG4gIHByb3RlY3RlZCBwYXRoOiBzdHJpbmc7XHJcbiAgcHJvdGVjdGVkIG1vZGVsOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChIdHRwKSBwcm90ZWN0ZWQgaHR0cDogSHR0cCxcclxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXHJcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxyXG4gICAgQEluamVjdChMb29wQmFja0F1dGgpIHByb3RlY3RlZCBhdXRoOiBMb29wQmFja0F1dGgsXHJcbiAgICBASW5qZWN0KEpTT05TZWFyY2hQYXJhbXMpIHByb3RlY3RlZCBzZWFyY2hQYXJhbXM6IEpTT05TZWFyY2hQYXJhbXMsXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbHMuZ2V0KHRoaXMuZ2V0TW9kZWxOYW1lKCkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHJlcXVlc3RcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gIG1ldGhvZCAgICAgIFJlcXVlc3QgbWV0aG9kIChHRVQsIFBPU1QsIFBVVClcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gIHVybCAgICAgICAgIFJlcXVlc3QgdXJsIChteS1ob3N0L215LXVybC86aWQpXHJcbiAgICogQHBhcmFtIHthbnl9ICAgICByb3V0ZVBhcmFtcyBWYWx1ZXMgb2YgdXJsIHBhcmFtZXRlcnNcclxuICAgKiBAcGFyYW0ge2FueX0gICAgIHVybFBhcmFtcyAgIFBhcmFtZXRlcnMgZm9yIGJ1aWxkaW5nIHVybCAoZmlsdGVyIGFuZCBvdGhlcilcclxuICAgKiBAcGFyYW0ge2FueX0gICAgIHBvc3RCb2R5ICAgIFJlcXVlc3QgcG9zdEJvZHlcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhpcyBpcyBhIGNvcmUgbWV0aG9kLCBldmVyeSBIVFRQIENhbGwgd2lsbCBiZSBkb25lIGZyb20gaGVyZSwgZXZlcnkgQVBJIFNlcnZpY2Ugd2lsbFxyXG4gICAqIGV4dGVuZCB0aGlzIGNsYXNzIGFuZCB1c2UgdGhpcyBtZXRob2QgdG8gZ2V0IFJFU1RmdWwgY29tbXVuaWNhdGlvbi5cclxuICAgKiovXHJcbiAgcHVibGljIHJlcXVlc3QoXHJcbiAgICBtZXRob2QgICAgICAgICA6IHN0cmluZyxcclxuICAgIHVybCAgICAgICAgICAgIDogc3RyaW5nLFxyXG4gICAgcm91dGVQYXJhbXMgICAgOiBhbnkgPSB7fSxcclxuICAgIHVybFBhcmFtcyAgICAgIDogYW55ID0ge30sXHJcbiAgICBwb3N0Qm9keSAgICAgICA6IGFueSA9IHt9LFxyXG4gICAgcHVic3ViICAgICAgICAgOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBjdXN0b21IZWFkZXJzPyA6IEZ1bmN0aW9uXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIC8vIFRyYW5zcGlsZSByb3V0ZSB2YXJpYWJsZXMgdG8gdGhlIGFjdHVhbCByZXF1ZXN0IFZhbHVlc1xyXG4gICAgT2JqZWN0LmtleXMocm91dGVQYXJhbXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoXCI6XCIgKyBrZXkgKyBcIihcXC98JClcIiwgXCJnXCIpLCByb3V0ZVBhcmFtc1trZXldICsgXCIkMVwiKVxyXG4gICAgfSk7XHJcbiAgICBpZiAocHVic3ViKSB7XHJcbiAgICAgIGlmICh1cmwubWF0Y2goL2ZrLykpIHtcclxuICAgICAgICBsZXQgYXJyID0gdXJsLnNwbGl0KCcvJyk7IGFyci5wb3AoKTtcclxuICAgICAgICB1cmwgPSBhcnIuam9pbignLycpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBldmVudDogc3RyaW5nID0gKGBbJHttZXRob2R9XSR7dXJsfWApLnJlcGxhY2UoL1xcPy8sICcnKTtcclxuICAgICAgbGV0IHN1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgICAgdGhpcy5jb25uZWN0aW9uLm9uKGV2ZW50LCAocmVzOiBhbnkpID0+IHN1YmplY3QubmV4dChyZXMpKTtcclxuICAgICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBIZWFkZXJzIHRvIGJlIHNlbnRcclxuICAgICAgbGV0IGhlYWRlcnM6IEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgLy8gQXV0aGVudGljYXRlIHJlcXVlc3RcclxuICAgICAgdGhpcy5hdXRoZW50aWNhdGUodXJsLCBoZWFkZXJzKTtcclxuICAgICAgLy8gQm9keSBmaXggZm9yIGJ1aWx0IGluIHJlbW90ZSBtZXRob2RzIHVzaW5nIFwiZGF0YVwiLCBcIm9wdGlvbnNcIiBvciBcImNyZWRlbnRpYWxzXHJcbiAgICAgIC8vIHRoYXQgYXJlIHRoZSBhY3R1YWwgYm9keSwgQ3VzdG9tIHJlbW90ZSBtZXRob2QgcHJvcGVydGllcyBhcmUgZGlmZmVyZW50IGFuZCBuZWVkXHJcbiAgICAgIC8vIHRvIGJlIHdyYXBwZWQgaW50byBhIGJvZHkgb2JqZWN0XHJcbiAgICAgIGxldCBib2R5OiBhbnk7XHJcbiAgICAgIGxldCBwb3N0Qm9keUtleXMgPSB0eXBlb2YgcG9zdEJvZHkgPT09ICdvYmplY3QnID8gT2JqZWN0LmtleXMocG9zdEJvZHkpIDogW11cclxuICAgICAgaWYgKHBvc3RCb2R5S2V5cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBib2R5ID0gcG9zdEJvZHlbcG9zdEJvZHlLZXlzLnNoaWZ0KCldO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJvZHkgPSBwb3N0Qm9keTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgZmlsdGVyOiBzdHJpbmcgPSAnJztcclxuICAgICAgLy8gU2VwYXJhdGUgZmlsdGVyIG9iamVjdCBmcm9tIHVybCBwYXJhbXMgYW5kIGFkZCB0byBzZWFyY2ggcXVlcnlcclxuICAgICAgaWYgKHVybFBhcmFtcy5maWx0ZXIpIHtcclxuICAgICAgICBpZiAoTG9vcEJhY2tDb25maWcuaXNIZWFkZXJzRmlsdGVyaW5nU2V0KCkpIHtcclxuICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKCdmaWx0ZXInLCBKU09OLnN0cmluZ2lmeSh1cmxQYXJhbXMuZmlsdGVyKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZpbHRlciA9IGA/ZmlsdGVyPSR7IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh1cmxQYXJhbXMuZmlsdGVyKSl9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIHVybFBhcmFtcy5maWx0ZXI7XHJcbiAgICAgIH1cclxuICAgICAgLy8gU2VwYXJhdGUgd2hlcmUgb2JqZWN0IGZyb20gdXJsIHBhcmFtcyBhbmQgYWRkIHRvIHNlYXJjaCBxdWVyeVxyXG4gICAgICAvKipcclxuICAgICAgQ09ERSBCRUxPVyBXSUxMIEdFTkVSQVRFIFRIRSBGT0xMT1dJTkcgSVNTVUVTOlxyXG4gICAgICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9tZWFuLWV4cGVydC1vZmZpY2lhbC9sb29wYmFjay1zZGstYnVpbGRlci9pc3N1ZXMvMzU2XHJcbiAgICAgIC0gaHR0cHM6Ly9naXRodWIuY29tL21lYW4tZXhwZXJ0LW9mZmljaWFsL2xvb3BiYWNrLXNkay1idWlsZGVyL2lzc3Vlcy8zMjggXHJcbiAgICAgIGlmICh1cmxQYXJhbXMud2hlcmUpIHtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnd2hlcmUnLCBKU09OLnN0cmluZ2lmeSh1cmxQYXJhbXMud2hlcmUpKTtcclxuICAgICAgICBkZWxldGUgdXJsUGFyYW1zLndoZXJlO1xyXG4gICAgICB9XHJcbiAgICAgICoqL1xyXG4gICAgICBpZiAodHlwZW9mIGN1c3RvbUhlYWRlcnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBoZWFkZXJzID0gY3VzdG9tSGVhZGVycyhoZWFkZXJzKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlYXJjaFBhcmFtcy5zZXRKU09OKHVybFBhcmFtcyk7XHJcbiAgICAgIGxldCByZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QoXHJcbiAgICAgICAgbmV3IFJlcXVlc3RPcHRpb25zKHtcclxuICAgICAgICAgIGhlYWRlcnMgICAgICAgIDogaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZCAgICAgICAgIDogbWV0aG9kLFxyXG4gICAgICAgICAgdXJsICAgICAgICAgICAgOiBgJHt1cmx9JHtmaWx0ZXJ9YCxcclxuICAgICAgICAgIHNlYXJjaCAgICAgICAgIDogT2JqZWN0LmtleXModXJsUGFyYW1zKS5sZW5ndGggPiAwID8gdGhpcy5zZWFyY2hQYXJhbXMuZ2V0VVJMU2VhcmNoUGFyYW1zKCkgOiBudWxsLFxyXG4gICAgICAgICAgYm9keSAgICAgICAgICAgOiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IExvb3BCYWNrQ29uZmlnLmdldFJlcXVlc3RPcHRpb25zQ3JlZGVudGlhbHMoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChyZXF1ZXN0KVxyXG4gICAgICAgIC5tYXAoKHJlczogYW55KSA9PiAocmVzLnRleHQoKSAhPSBcIlwiID8gcmVzLmpzb24oKSA6IHt9KSlcclxuICAgICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGUpKTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBhdXRoZW50aWNhdGVcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFNlcnZlciBVUkxcclxuICAgKiBAcGFyYW0ge0hlYWRlcnN9IGhlYWRlcnMgSFRUUCBIZWFkZXJzXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHRyeSB0byBhdXRoZW50aWNhdGUgdXNpbmcgZWl0aGVyIGFuIGFjY2Vzc190b2tlbiBvciBiYXNpYyBodHRwIGF1dGhcclxuICAgKi9cclxuICBwdWJsaWMgYXV0aGVudGljYXRlPFQ+KHVybDogc3RyaW5nLCBoZWFkZXJzOiBIZWFkZXJzKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuSWQoKSkge1xyXG4gICAgICBoZWFkZXJzLmFwcGVuZChcclxuICAgICAgICAnQXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXV0aFByZWZpeCgpICsgdGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuSWQoKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGNyZWF0ZVxyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEBwYXJhbSB7VH0gZGF0YSBHZW5lcmljIGRhdGEgdHlwZVxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogR2VuZXJpYyBjcmVhdGUgbWV0aG9kXHJcbiAgICovXHJcbiAgcHVibGljIGNyZWF0ZTxUPihkYXRhOiBULCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxyXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGhcclxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBvbkNyZWF0ZVxyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEBwYXJhbSB7VFtdfSBkYXRhIEdlbmVyaWMgZGF0YSB0eXBlIGFycmF5XHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEdlbmVyaWMgcHVic3ViIG9uY3JlYXRlIG1hbnkgbWV0aG9kXHJcbiAgICovXHJcbiAgcHVibGljIG9uQ3JlYXRlPFQ+KGRhdGE6IFRbXSk6IE9ic2VydmFibGU8VFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoXHJcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKVxyXG4gICAgLm1hcCgoZGF0dW06IFRbXSkgPT4gZGF0dW0ubWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBjcmVhdGVNYW55XHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHBhcmFtIHtUW119IGRhdGEgR2VuZXJpYyBkYXRhIHR5cGUgYXJyYXlcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogR2VuZXJpYyBjcmVhdGUgbWFueSBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlTWFueTxUPihkYXRhOiBUW10sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoXHJcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxyXG4gICAgLm1hcCgoZGF0dW06IFRbXSkgPT4gZGF0dW0ubWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBvbkNyZWF0ZU1hbnlcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcGFyYW0ge1RbXX0gZGF0YSBHZW5lcmljIGRhdGEgdHlwZSBhcnJheVxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIGNyZWF0ZSBtYW55IG1ldGhvZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbkNyZWF0ZU1hbnk8VD4oZGF0YTogVFtdKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxyXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGhcclxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIHRydWUpXHJcbiAgICAubWFwKChkYXR1bTogVFtdKSA9PiBkYXR1bS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGZpbmRCeUlkXHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHBhcmFtIHthbnl9IGRhdGEgR2VuZXJpYyBkYXRhIHR5cGVcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEdlbmVyaWMgZmluZEJ5SWQgbWV0aG9kXHJcbiAgICovXHJcbiAgcHVibGljIGZpbmRCeUlkPFQ+KGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBpZiAoZmlsdGVyKSBfdXJsUGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgICAgJzppZCdcclxuICAgIF0uam9pbignLycpLCB7IGlkIH0sIF91cmxQYXJhbXMsIHVuZGVmaW5lZCwgbnVsbCwgY3VzdG9tSGVhZGVycylcclxuICAgIC5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZmluZFxyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFsrPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIGZpbmQgbWV0aG9kXHJcbiAgICovXHJcbiAgcHVibGljIGZpbmQ8VD4oZmlsdGVyOiBMb29wQmFja0ZpbHRlciA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoXHJcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB7IGZpbHRlciB9LCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpXHJcbiAgICAubWFwKChkYXR1bTogVFtdKSA9PiBkYXR1bS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGV4aXN0c1xyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIGV4aXN0cyBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgZXhpc3RzPFQ+KGlkOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxyXG4gICAgICAnOmlkL2V4aXN0cydcclxuICAgIF0uam9pbignLycpLCB7IGlkIH0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBmaW5kT25lXHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIGZpbmRPbmUgbWV0aG9kXHJcbiAgICovXHJcbiAgcHVibGljIGZpbmRPbmU8VD4oZmlsdGVyOiBMb29wQmFja0ZpbHRlciA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgICAgJ2ZpbmRPbmUnXHJcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB7IGZpbHRlciB9LCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpXHJcbiAgICAubWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHVwZGF0ZUFsbFxyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIHVwZGF0ZUFsbCBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgdXBkYXRlQWxsPFQ+KHdoZXJlOiBhbnkgPSB7fSwgZGF0YTogVCwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTx7IGNvdW50OiAnbnVtYmVyJyB9PiB7XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBpZiAod2hlcmUpIF91cmxQYXJhbXMud2hlcmUgPSB3aGVyZTtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxyXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXHJcbiAgICAgICd1cGRhdGUnXHJcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCBfdXJsUGFyYW1zLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgb25VcGRhdGVBbGxcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogR2VuZXJpYyBwdWJzdWIgb25VcGRhdGVBbGwgbWV0aG9kXHJcbiAgICovXHJcbiAgcHVibGljIG9uVXBkYXRlQWxsPFQ+KHdoZXJlOiBhbnkgPSB7fSwgZGF0YTogVCk6IE9ic2VydmFibGU8eyBjb3VudDogJ251bWJlcicgfT4ge1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgaWYgKHdoZXJlKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxyXG4gICAgICAndXBkYXRlJ1xyXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgeyBkYXRhIH0sIHRydWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGRlbGV0ZUJ5SWRcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEdlbmVyaWMgZGVsZXRlQnlJZCBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgZGVsZXRlQnlJZDxUPihpZDogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0RFTEVURScsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgICAgJzppZCdcclxuICAgIF0uam9pbignLycpLCB7IGlkIH0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBudWxsLCBjdXN0b21IZWFkZXJzKVxyXG4gICAgLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBvbkRlbGV0ZUJ5SWRcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEdlbmVyaWMgcHVic3ViIG9uRGVsZXRlQnlJZCBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgb25EZWxldGVCeUlkPFQ+KGlkOiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0RFTEVURScsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgICAgJzppZCdcclxuICAgIF0uam9pbignLycpLCB7IGlkIH0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgY291bnRcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPHsgY291bnQ6IG51bWJlciB9Pn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIGNvdW50IG1ldGhvZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb3VudCh3aGVyZTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8eyBjb3VudDogbnVtYmVyIH0+IHtcclxuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGlmICh3aGVyZSkgX3VybFBhcmFtcy53aGVyZSA9IHdoZXJlO1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxyXG4gICAgICAnY291bnQnXHJcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCBfdXJsUGFyYW1zLCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHVwZGF0ZUF0dHJpYnV0ZXNcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEdlbmVyaWMgdXBkYXRlQXR0cmlidXRlcyBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgdXBkYXRlQXR0cmlidXRlczxUPihpZDogYW55LCBkYXRhOiBULCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgICAgJzppZCdcclxuICAgIF0uam9pbignLycpLCB7IGlkIH0sIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXHJcbiAgICAubWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIG9uVXBkYXRlQXR0cmlidXRlc1xyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogR2VuZXJpYyBvblVwZGF0ZUF0dHJpYnV0ZXMgbWV0aG9kXHJcbiAgICovXHJcbiAgcHVibGljIG9uVXBkYXRlQXR0cmlidXRlczxUPihpZDogYW55LCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQVVQnLCBbXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxyXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXHJcbiAgICAgICc6aWQnXHJcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgdXBzZXJ0XHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIHVwc2VydCBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgdXBzZXJ0PFQ+KGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXHJcbiAgICAubWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIG9uVXBzZXJ0XHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIHB1YnN1YiBvblVwc2VydCBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgb25VcHNlcnQ8VD4oZGF0YTogYW55ID0ge30pOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIHRydWUpLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCB1cHNlcnRQYXRjaFxyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogR2VuZXJpYyB1cHNlcnQgbWV0aG9kIHVzaW5nIHBhdGNoIGh0dHAgbWV0aG9kXHJcbiAgICovXHJcbiAgcHVibGljIHVwc2VydFBhdGNoPFQ+KGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BBVENIJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxyXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycylcclxuICAgIC5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgb25VcHNlcnRQYXRjaFxyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogR2VuZXJpYyBwdWJzdWIgb25VcHNlcnRQYXRjaCBtZXRob2QgdXNpbmcgcGF0Y2ggaHR0cCBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgb25VcHNlcnRQYXRjaDxUPihkYXRhOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUEFUQ0gnLCBbXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxyXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXHJcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgdXBzZXJ0V2l0aFdoZXJlXHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIHVwc2VydFdpdGhXaGVyZSBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgdXBzZXJ0V2l0aFdoZXJlPFQ+KHdoZXJlOiBhbnkgPSB7fSwgZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgaWYgKHdoZXJlKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxyXG4gICAgICAndXBzZXJ0V2l0aFdoZXJlJ1xyXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXHJcbiAgICAubWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIG9uVXBzZXJ0V2l0aFdoZXJlXHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIHB1YnN1YiBvblVwc2VydFdpdGhXaGVyZSBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgb25VcHNlcnRXaXRoV2hlcmU8VD4od2hlcmU6IGFueSA9IHt9LCBkYXRhOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgaWYgKHdoZXJlKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxyXG4gICAgICAndXBzZXJ0V2l0aFdoZXJlJ1xyXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgeyBkYXRhIH0sIHRydWUpLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCByZXBsYWNlT3JDcmVhdGVcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEdlbmVyaWMgcmVwbGFjZU9yQ3JlYXRlIG1ldGhvZFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXBsYWNlT3JDcmVhdGU8VD4oZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgICAgJ3JlcGxhY2VPckNyZWF0ZSdcclxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXHJcbiAgICAubWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIG9uUmVwbGFjZU9yQ3JlYXRlXHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBHZW5lcmljIG9uUmVwbGFjZU9yQ3JlYXRlIG1ldGhvZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvblJlcGxhY2VPckNyZWF0ZTxUPihkYXRhOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgICAgJ3JlcGxhY2VPckNyZWF0ZSdcclxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIHRydWUpLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCByZXBsYWNlQnlJZFxyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogR2VuZXJpYyByZXBsYWNlQnlJZCBtZXRob2RcclxuICAgKi9cclxuICBwdWJsaWMgcmVwbGFjZUJ5SWQ8VD4oaWQ6IGFueSwgZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcclxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcclxuICAgICAgJzppZCcsICdyZXBsYWNlJ1xyXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycylcclxuICAgIC5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgb25SZXBsYWNlQnlJZFxyXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4gICAqIEBsaWNlbnNlIE1JVFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogR2VuZXJpYyBvblJlcGxhY2VCeUlkIG1ldGhvZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvblJlcGxhY2VCeUlkPFQ+KGlkOiBhbnksIGRhdGE6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xyXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXHJcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcclxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxyXG4gICAgICAnOmlkJywgJ3JlcGxhY2UnXHJcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgY3JlYXRlQ2hhbmdlU3RyZWFtXHJcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAgICogQGxpY2Vuc2UgTUlUXHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEdlbmVyaWMgY3JlYXRlQ2hhbmdlU3RyZWFtIG1ldGhvZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBjcmVhdGVDaGFuZ2VTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcclxuICAgIGlmICh0eXBlb2YgRXZlbnRTb3VyY2UgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGxldCBlbWl0ICAgPSAobXNnOiBhbnkpID0+IHN1YmplY3QubmV4dChKU09OLnBhcnNlKG1zZy5kYXRhKSk7XHJcbiAgICAgIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoW1xyXG4gICAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcclxuICAgICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXHJcbiAgICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxyXG4gICAgICAgICdjaGFuZ2Utc3RyZWFtJ1xyXG4gICAgICBdLmpvaW4oJy8nKSk7XHJcbiAgICAgIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdkYXRhJywgZW1pdCk7XHJcbiAgICAgIHNvdXJjZS5vbmVycm9yID0gZW1pdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignU0RLIEJ1aWxkZXI6IEV2ZW50U291cmNlIGlzIG5vdCBzdXBwb3J0ZWQnKTsgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBnZXRNb2RlbE5hbWVcclxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICAgKiBAbGljZW5zZSBNSVRcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogQWJzdHJhY3QgZ2V0TW9kZWxOYW1lIG1ldGhvZFxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldE1vZGVsTmFtZSgpOiBzdHJpbmc7XHJcbn1cclxuIl19