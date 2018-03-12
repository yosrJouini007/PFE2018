"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var SDKModels_1 = require("./SDKModels");
var base_service_1 = require("../core/base.service");
var lb_config_1 = require("../../lb.config");
var auth_service_1 = require("../core/auth.service");
var search_params_1 = require("../core/search.params");
var error_service_1 = require("../core/error.service");
var socket_connections_1 = require("../../sockets/socket.connections");
/**
 * Api services for the `Sessions` model.
 */
var SessionsApi = (function (_super) {
    __extends(SessionsApi, _super);
    function SessionsApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Fetches belongsTo relation gym.
     *
     * @param {any} id sessions id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Sessions` object.)
     * </em>
     */
    SessionsApi.prototype.getGym = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/sessions/:id/gym";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Fetches belongsTo relation guest.
     *
     * @param {any} id sessions id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Sessions` object.)
     * </em>
     */
    SessionsApi.prototype.getGuest = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/sessions/:id/guest";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Sessions` object.)
     * </em>
     */
    SessionsApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/sessions";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id sessions id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Sessions` object.)
     * </em>
     */
    SessionsApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/sessions/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    SessionsApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/sessions/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` -
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Sessions` object.)
     * </em>
     */
    SessionsApi.prototype.stopSession = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/sessions/stopSession";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof data !== 'undefined' && data !== null)
            _urlParams.data = data;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for sessions registers.
     *
     * @param {string} range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param {object} custom {"start": date, "end": date }
     *
     * @param {object} where where filter
     *
     * @param {string} groupBy group by filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Sessions` object.)
     * </em>
     */
    SessionsApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/sessions/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof range !== 'undefined' && range !== null)
            _urlParams.range = range;
        if (typeof custom !== 'undefined' && custom !== null)
            _urlParams.custom = custom;
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        if (typeof groupBy !== 'undefined' && groupBy !== null)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `Sessions`.
     */
    SessionsApi.prototype.getModelName = function () {
        return "Sessions";
    };
    SessionsApi = __decorate([
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
    ], SessionsApi);
    return SessionsApi;
}(base_service_1.BaseLoopBackApi));
exports.SessionsApi = SessionsApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFvQjtBQUNwQixzQ0FBNkQ7QUFDN0Qsc0NBQStDO0FBQy9DLHlDQUF3QztBQUN4QyxxREFBdUQ7QUFDdkQsNkNBQWlEO0FBQ2pELHFEQUFvRDtBQUVwRCx1REFBeUQ7QUFDekQsdURBQXFEO0FBSXJELHVFQUFvRTtBQUtwRTs7R0FFRztBQUVIO0lBQWlDLCtCQUFlO0lBRTlDLHFCQUMwQixJQUFVLEVBQ0UsVUFBNEIsRUFDbkMsTUFBaUIsRUFDZCxJQUFrQixFQUNkLFlBQThCLEVBQ3RCLFlBQTBCO1FBTnhFLFlBUUUsa0JBQU0sSUFBSSxFQUFHLFVBQVUsRUFBRyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsU0FDcEU7UUFSeUIsVUFBSSxHQUFKLElBQUksQ0FBTTtRQUNFLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUNuQyxZQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsVUFBSSxHQUFKLElBQUksQ0FBYztRQUNkLGtCQUFZLEdBQVosWUFBWSxDQUFrQjtRQUN0QixrQkFBWSxHQUFaLFlBQVksQ0FBYzs7SUFHeEUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNJLDRCQUFNLEdBQWIsVUFBYyxFQUFPLEVBQUUsT0FBaUIsRUFBRSxhQUF3QjtRQUEzQyx3QkFBQSxFQUFBLFlBQWlCO1FBQ3RDLElBQUksT0FBTyxHQUFXLEtBQUssQ0FBQztRQUM1QixJQUFJLElBQUksR0FBVywwQkFBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRywwQkFBYyxDQUFDLGFBQWEsRUFBRTtZQUNsRixtQkFBbUIsQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBUTtZQUN0QixFQUFFLEVBQUUsRUFBRTtTQUNQLENBQUM7UUFDRixJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUM7UUFDeEIsSUFB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QyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3JGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0NBQVksR0FBbkI7UUFDRSxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUF0T1UsV0FBVztRQUR2QixpQkFBVSxFQUFFO1FBSVIsV0FBQSxhQUFNLENBQUMsV0FBSSxDQUFDLENBQUE7UUFDWixXQUFBLGFBQU0sQ0FBQyxxQ0FBZ0IsQ0FBQyxDQUFBO1FBQ3hCLFdBQUEsYUFBTSxDQUFDLHFCQUFTLENBQUMsQ0FBQTtRQUNqQixXQUFBLGFBQU0sQ0FBQywyQkFBWSxDQUFDLENBQUE7UUFDcEIsV0FBQSxhQUFNLENBQUMsZ0NBQWdCLENBQUMsQ0FBQTtRQUN4QixXQUFBLGVBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxhQUFNLENBQUMsNEJBQVksQ0FBQyxDQUFBO3lDQUxILFdBQUk7WUFDYyxxQ0FBZ0I7WUFDM0IscUJBQVM7WUFDUiwyQkFBWTtZQUNBLGdDQUFnQjtZQUNSLDRCQUFZO09BUjdELFdBQVcsQ0F1T3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQXZPRCxDQUFpQyw4QkFBZSxHQXVPL0M7QUF2T1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4vU0RLTW9kZWxzJztcclxuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XHJcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4uL2NvcmUvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcclxuaW1wb3J0IHsgSlNPTlNlYXJjaFBhcmFtcyB9IGZyb20gJy4uL2NvcmUvc2VhcmNoLnBhcmFtcyc7XHJcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgU2Vzc2lvbnMgfSBmcm9tICcuLi8uLi9tb2RlbHMvU2Vzc2lvbnMnO1xyXG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xyXG5pbXBvcnQgeyBHeW1zIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0d5bXMnO1xyXG5pbXBvcnQgeyBHdWVzdHMgfSBmcm9tICcuLi8uLi9tb2RlbHMvR3Vlc3RzJztcclxuXHJcblxyXG4vKipcclxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYFNlc3Npb25zYCBtb2RlbC5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlc3Npb25zQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KEh0dHApIHByb3RlY3RlZCBodHRwOiBIdHRwLFxyXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcclxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXHJcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcclxuICAgIEBJbmplY3QoSlNPTlNlYXJjaFBhcmFtcykgcHJvdGVjdGVkIHNlYXJjaFBhcmFtczogSlNPTlNlYXJjaFBhcmFtcyxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcclxuICApIHtcclxuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBzZWFyY2hQYXJhbXMsIGVycm9ySGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaGVzIGJlbG9uZ3NUbyByZWxhdGlvbiBneW0uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2FueX0gaWQgc2Vzc2lvbnMgaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVmcmVzaCBcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgU2Vzc2lvbnNgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0R3ltKGlkOiBhbnksIHJlZnJlc2g6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvc2Vzc2lvbnMvOmlkL2d5bVwiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xyXG4gICAgICBpZDogaWRcclxuICAgIH07XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcclxuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGlmICh0eXBlb2YgcmVmcmVzaCAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVmcmVzaCAhPT0gbnVsbCkgX3VybFBhcmFtcy5yZWZyZXNoID0gcmVmcmVzaDtcclxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoZXMgYmVsb25nc1RvIHJlbGF0aW9uIGd1ZXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHthbnl9IGlkIHNlc3Npb25zIGlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlZnJlc2ggXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXHJcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcclxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIDxlbT5cclxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cclxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFNlc3Npb25zYCBvYmplY3QuKVxyXG4gICAqIDwvZW0+XHJcbiAgICovXHJcbiAgcHVibGljIGdldEd1ZXN0KGlkOiBhbnksIHJlZnJlc2g6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvc2Vzc2lvbnMvOmlkL2d1ZXN0XCI7XHJcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgIGlkOiBpZFxyXG4gICAgfTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgaWYgKHR5cGVvZiByZWZyZXNoICE9PSAndW5kZWZpbmVkJyAmJiByZWZyZXNoICE9PSBudWxsKSBfdXJsUGFyYW1zLnJlZnJlc2ggPSByZWZyZXNoO1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF0Y2ggYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cclxuICAgKlxyXG4gICAqICAtIGBkYXRhYCDigJMgYHtvYmplY3R9YCAtIE1vZGVsIGluc3RhbmNlIGRhdGFcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgU2Vzc2lvbnNgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgcGF0Y2hPckNyZWF0ZShkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBBVENIXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvc2Vzc2lvbnNcIjtcclxuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xyXG4gICAgICBkYXRhOiBkYXRhXHJcbiAgICB9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF0Y2ggYXR0cmlidXRlcyBmb3IgYSBtb2RlbCBpbnN0YW5jZSBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7YW55fSBpZCBzZXNzaW9ucyBpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxyXG4gICAqXHJcbiAgICogIC0gYGRhdGFgIOKAkyBge29iamVjdH1gIC0gQW4gb2JqZWN0IG9mIG1vZGVsIHByb3BlcnR5IG5hbWUvdmFsdWUgcGFpcnNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgU2Vzc2lvbnNgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgcGF0Y2hBdHRyaWJ1dGVzKGlkOiBhbnksIGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUEFUQ0hcIjtcclxuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXHJcbiAgICBcIi9zZXNzaW9ucy86aWRcIjtcclxuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcclxuICAgICAgaWQ6IGlkXHJcbiAgICB9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xyXG4gICAgICBkYXRhOiBkYXRhXHJcbiAgICB9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogPGVtPlxyXG4gICAgICAgICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLilcclxuICAgICAgICAgKiA8L2VtPlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiBEYXRhIHByb3BlcnRpZXM6XHJcbiAgICpcclxuICAgKiAgLSBgcmVzdWx0YCDigJMgYHthbnl9YCAtIFxyXG4gICAqL1xyXG4gIHB1YmxpYyBteVJlbW90ZShjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvc2Vzc2lvbnMvbXktcmVtb3RlXCI7XHJcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogPGVtPlxyXG4gICAgICAgICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLilcclxuICAgICAgICAgKiA8L2VtPlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxyXG4gICAqXHJcbiAgICogIC0gYGRhdGFgIOKAkyBge29iamVjdH1gIC0gXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgU2Vzc2lvbnNgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgc3RvcFNlc3Npb24oZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvc2Vzc2lvbnMvc3RvcFNlc3Npb25cIjtcclxuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBpZiAodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnICYmIGRhdGEgIT09IG51bGwpIF91cmxQYXJhbXMuZGF0YSA9IGRhdGE7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGF0aXN0aWNhbCBpbmZvcm1hdGlvbiBmb3Igc2Vzc2lvbnMgcmVnaXN0ZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlIGhvdXJseSwgZGFpbHksIHdlZWtseSwgbW9udGhseSwgeWVhcmx5LCBjdXN0b21cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjdXN0b20ge1wic3RhcnRcIjogZGF0ZSwgXCJlbmRcIjogZGF0ZSB9XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gd2hlcmUgd2hlcmUgZmlsdGVyIFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwQnkgZ3JvdXAgYnkgZmlsdGVyIFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXHJcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcclxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIDxlbT5cclxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cclxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFNlc3Npb25zYCBvYmplY3QuKVxyXG4gICAqIDwvZW0+XHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRzKHJhbmdlOiBhbnksIGN1c3RvbTogYW55ID0ge30sIHdoZXJlOiBhbnkgPSB7fSwgZ3JvdXBCeTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcclxuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXHJcbiAgICBcIi9zZXNzaW9ucy9zdGF0c1wiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcclxuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGlmICh0eXBlb2YgcmFuZ2UgIT09ICd1bmRlZmluZWQnICYmIHJhbmdlICE9PSBudWxsKSBfdXJsUGFyYW1zLnJhbmdlID0gcmFuZ2U7XHJcbiAgICBpZiAodHlwZW9mIGN1c3RvbSAhPT0gJ3VuZGVmaW5lZCcgJiYgY3VzdG9tICE9PSBudWxsKSBfdXJsUGFyYW1zLmN1c3RvbSA9IGN1c3RvbTtcclxuICAgIGlmICh0eXBlb2Ygd2hlcmUgIT09ICd1bmRlZmluZWQnICYmIHdoZXJlICE9PSBudWxsKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XHJcbiAgICBpZiAodHlwZW9mIGdyb3VwQnkgIT09ICd1bmRlZmluZWQnICYmIGdyb3VwQnkgIT09IG51bGwpIF91cmxQYXJhbXMuZ3JvdXBCeSA9IGdyb3VwQnk7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXHJcbiAgICogaS5lLiBgU2Vzc2lvbnNgLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XHJcbiAgICByZXR1cm4gXCJTZXNzaW9uc1wiO1xyXG4gIH1cclxufVxyXG4iXX0=