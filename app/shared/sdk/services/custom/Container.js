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
 * Api services for the `Container` model.
 */
var ContainerApi = (function (_super) {
    __extends(ContainerApi, _super);
    function ContainerApi(http, connection, models, auth, searchParams, errorHandler) {
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
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Container` object.)
     * </em>
     */
    ContainerApi.prototype.getContainers = function (customHeaders) {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers";
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
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Container` object.)
     * </em>
     */
    ContainerApi.prototype.createContainer = function (options, customHeaders) {
        if (options === void 0) { options = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers";
        var _routeParams = {};
        var _postBody = {
            options: options
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
     * @param {string} container
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `` – `{}` -
     */
    ContainerApi.prototype.destroyContainer = function (container, customHeaders) {
        var _method = "DELETE";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/:container";
        var _routeParams = {
            container: container
        };
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
     * @param {string} container
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Container` object.)
     * </em>
     */
    ContainerApi.prototype.getContainer = function (container, customHeaders) {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/:container";
        var _routeParams = {
            container: container
        };
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
     * @param {string} container
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Container` object.)
     * </em>
     */
    ContainerApi.prototype.getFiles = function (container, customHeaders) {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/:container/files";
        var _routeParams = {
            container: container
        };
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
     * @param {string} container
     *
     * @param {string} file
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Container` object.)
     * </em>
     */
    ContainerApi.prototype.getFile = function (container, file, customHeaders) {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/:container/files/:file";
        var _routeParams = {
            container: container,
            file: file
        };
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
     * @param {string} container
     *
     * @param {string} file
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `` – `{}` -
     */
    ContainerApi.prototype.removeFile = function (container, file, customHeaders) {
        var _method = "DELETE";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/:container/files/:file";
        var _routeParams = {
            container: container,
            file: file
        };
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
     * @param {string} container
     *
     * @param {object} data Request data.
     *
     *  - `req` – `{object}` -
     *
     *  - `res` – `{object}` -
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{object}` -
     */
    ContainerApi.prototype.upload = function (container, req, res, customHeaders) {
        if (req === void 0) { req = {}; }
        if (res === void 0) { res = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/:container/upload";
        var _routeParams = {
            container: container
        };
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
     * @param {string} container
     *
     * @param {string} file
     *
     * @param {object} req
     *
     * @param {object} res
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    ContainerApi.prototype.download = function (container, file, req, res, customHeaders) {
        if (req === void 0) { req = {}; }
        if (res === void 0) { res = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/:container/download/:file";
        var _routeParams = {
            container: container,
            file: file
        };
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
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    ContainerApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for Container registers.
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
     * This usually means the response is a `Container` object.)
     * </em>
     */
    ContainerApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Containers/stats";
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
     * i.e. `Container`.
     */
    ContainerApi.prototype.getModelName = function () {
        return "Container";
    };
    ContainerApi = __decorate([
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
    ], ContainerApi);
    return ContainerApi;
}(base_service_1.BaseLoopBackApi));
exports.ContainerApi = ContainerApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCLHNDQUE2RDtBQUM3RCxzQ0FBK0M7QUFDL0MseUNBQXdDO0FBQ3hDLHFEQUF1RDtBQUN2RCw2Q0FBaUQ7QUFDakQscURBQW9EO0FBRXBELHVEQUF5RDtBQUN6RCx1REFBcUQ7QUFJckQsdUVBQW9FO0FBR3BFOztHQUVHO0FBRUg7SUFBa0MsZ0NBQWU7SUFFL0Msc0JBQzBCLElBQVUsRUFDRSxVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ2QsWUFBOEIsRUFDdEIsWUFBMEI7UUFOeEUsWUFRRSxrQkFBTSxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxTQUNwRTtRQVJ5QixVQUFJLEdBQUosSUFBSSxDQUFNO1FBQ0UsZ0JBQVUsR0FBVixVQUFVLENBQWtCO1FBQ25DLFlBQU0sR0FBTixNQUFNLENBQVc7UUFDZCxVQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2Qsa0JBQVksR0FBWixZQUFZLENBQWtCO1FBQ3RCLGtCQUFZLEdBQVosWUFBWSxDQUFjOztJQUd4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNJLG9DQUFhLEdBQXBCLFVBQXFCLGFBQXdCO1FBQzNDLElBQUksT0FBTyxHQUFXLEtBQUssQ0FBQztRQUM1QixJQUFJLElBQUksR0FBVywwQkFBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRywwQkFBYyxDQUFDLGFBQWEsRUFBRTtZQUNsRixhQUFhLENBQUM7UUFDZCxJQUFJLFlBQVksR0FBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9B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LEdBQW5CO1FBQ0UsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBOVZVLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTtRQUlSLFdBQUEsYUFBTSxDQUFDLFdBQUksQ0FBQyxDQUFBO1FBQ1osV0FBQSxhQUFNLENBQUMscUNBQWdCLENBQUMsQ0FBQTtRQUN4QixXQUFBLGFBQU0sQ0FBQyxxQkFBUyxDQUFDLENBQUE7UUFDakIsV0FBQSxhQUFNLENBQUMsMkJBQVksQ0FBQyxDQUFBO1FBQ3BCLFdBQUEsYUFBTSxDQUFDLGdDQUFnQixDQUFDLENBQUE7UUFDeEIsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDRCQUFZLENBQUMsQ0FBQTt5Q0FMSCxXQUFJO1lBQ2MscUNBQWdCO1lBQzNCLHFCQUFTO1lBQ1IsMkJBQVk7WUFDQSxnQ0FBZ0I7WUFDUiw0QkFBWTtPQVI3RCxZQUFZLENBK1Z4QjtJQUFELG1CQUFDO0NBQUEsQUEvVkQsQ0FBa0MsOEJBQWUsR0ErVmhEO0FBL1ZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XHJcbmltcG9ydCB7IEJhc2VMb29wQmFja0FwaSB9IGZyb20gJy4uL2NvcmUvYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xyXG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IExvb3BCYWNrRmlsdGVyLCAgfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XHJcbmltcG9ydCB7IEpTT05TZWFyY2hQYXJhbXMgfSBmcm9tICcuLi9jb3JlL3NlYXJjaC5wYXJhbXMnO1xyXG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9jb3JlL2Vycm9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvUngnO1xyXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvQ29udGFpbmVyJztcclxuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcclxuXHJcblxyXG4vKipcclxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYENvbnRhaW5lcmAgbW9kZWwuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb250YWluZXJBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoSHR0cCkgcHJvdGVjdGVkIGh0dHA6IEh0dHAsXHJcbiAgICBASW5qZWN0KFNvY2tldENvbm5lY3Rpb24pIHByb3RlY3RlZCBjb25uZWN0aW9uOiBTb2NrZXRDb25uZWN0aW9uLFxyXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcclxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxyXG4gICAgQEluamVjdChKU09OU2VhcmNoUGFyYW1zKSBwcm90ZWN0ZWQgc2VhcmNoUGFyYW1zOiBKU09OU2VhcmNoUGFyYW1zLFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIHByb3RlY3RlZCBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxyXG4gICkge1xyXG4gICAgc3VwZXIoaHR0cCwgIGNvbm5lY3Rpb24sICBtb2RlbHMsIGF1dGgsIHNlYXJjaFBhcmFtcywgZXJyb3JIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIDxlbT5cclxuICAgICAgICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi4pXHJcbiAgICAgICAgICogPC9lbT5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiA8ZW0+XHJcbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXHJcbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDb250YWluZXJgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29udGFpbmVycyhjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvQ29udGFpbmVyc1wiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcclxuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIDxlbT5cclxuICAgICAgICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi4pXHJcbiAgICAgICAgICogPC9lbT5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cclxuICAgKlxyXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXHJcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcclxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIDxlbT5cclxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cclxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENvbnRhaW5lcmAgb2JqZWN0LilcclxuICAgKiA8L2VtPlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjcmVhdGVDb250YWluZXIob3B0aW9uczogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvQ29udGFpbmVyc1wiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XHJcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcclxuICAgIH07XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiA8ZW0+XHJcbiAgICAgICAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uKVxyXG4gICAgICAgICAqIDwvZW0+XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVyIFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiBEYXRhIHByb3BlcnRpZXM6XHJcbiAgICpcclxuICAgKiAgLSBgYCDigJMgYHt9YCAtIFxyXG4gICAqL1xyXG4gIHB1YmxpYyBkZXN0cm95Q29udGFpbmVyKGNvbnRhaW5lcjogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvQ29udGFpbmVycy86Y29udGFpbmVyXCI7XHJcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyXHJcbiAgICB9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiA8ZW0+XHJcbiAgICAgICAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uKVxyXG4gICAgICAgICAqIDwvZW0+XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVyIFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiA8ZW0+XHJcbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXHJcbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDb250YWluZXJgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29udGFpbmVyKGNvbnRhaW5lcjogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvQ29udGFpbmVycy86Y29udGFpbmVyXCI7XHJcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyXHJcbiAgICB9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiA8ZW0+XHJcbiAgICAgICAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uKVxyXG4gICAgICAgICAqIDwvZW0+XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVyIFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXHJcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcclxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIDxlbT5cclxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cclxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENvbnRhaW5lcmAgb2JqZWN0LilcclxuICAgKiA8L2VtPlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRGaWxlcyhjb250YWluZXI6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xyXG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcclxuICAgIFwiL0NvbnRhaW5lcnMvOmNvbnRhaW5lci9maWxlc1wiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xyXG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lclxyXG4gICAgfTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogPGVtPlxyXG4gICAgICAgICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLilcclxuICAgICAgICAgKiA8L2VtPlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRhaW5lciBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlIFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiA8ZW0+XHJcbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXHJcbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDb250YWluZXJgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RmlsZShjb250YWluZXI6IGFueSwgZmlsZTogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvQ29udGFpbmVycy86Y29udGFpbmVyL2ZpbGVzLzpmaWxlXCI7XHJcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxyXG4gICAgICBmaWxlOiBmaWxlXHJcbiAgICB9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiA8ZW0+XHJcbiAgICAgICAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uKVxyXG4gICAgICAgICAqIDwvZW0+XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVyIFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGUgXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXHJcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcclxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIERhdGEgcHJvcGVydGllczpcclxuICAgKlxyXG4gICAqICAtIGBgIOKAkyBge31gIC0gXHJcbiAgICovXHJcbiAgcHVibGljIHJlbW92ZUZpbGUoY29udGFpbmVyOiBhbnksIGZpbGU6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkRFTEVURVwiO1xyXG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcclxuICAgIFwiL0NvbnRhaW5lcnMvOmNvbnRhaW5lci9maWxlcy86ZmlsZVwiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xyXG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcclxuICAgICAgZmlsZTogZmlsZVxyXG4gICAgfTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogPGVtPlxyXG4gICAgICAgICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLilcclxuICAgICAgICAgKiA8L2VtPlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRhaW5lciBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cclxuICAgKlxyXG4gICAqICAtIGByZXFgIOKAkyBge29iamVjdH1gIC0gXHJcbiAgICpcclxuICAgKiAgLSBgcmVzYCDigJMgYHtvYmplY3R9YCAtIFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiBEYXRhIHByb3BlcnRpZXM6XHJcbiAgICpcclxuICAgKiAgLSBgcmVzdWx0YCDigJMgYHtvYmplY3R9YCAtIFxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cGxvYWQoY29udGFpbmVyOiBhbnksIHJlcTogYW55ID0ge30sIHJlczogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvQ29udGFpbmVycy86Y29udGFpbmVyL3VwbG9hZFwiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xyXG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lclxyXG4gICAgfTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogPGVtPlxyXG4gICAgICAgICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLilcclxuICAgICAgICAgKiA8L2VtPlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRhaW5lciBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlIFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcSBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXMgXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXHJcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcclxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cclxuICAgKi9cclxuICBwdWJsaWMgZG93bmxvYWQoY29udGFpbmVyOiBhbnksIGZpbGU6IGFueSwgcmVxOiBhbnkgPSB7fSwgcmVzOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xyXG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcclxuICAgIFwiL0NvbnRhaW5lcnMvOmNvbnRhaW5lci9kb3dubG9hZC86ZmlsZVwiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xyXG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcclxuICAgICAgZmlsZTogZmlsZVxyXG4gICAgfTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogPGVtPlxyXG4gICAgICAgICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLilcclxuICAgICAgICAgKiA8L2VtPlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiBEYXRhIHByb3BlcnRpZXM6XHJcbiAgICpcclxuICAgKiAgLSBgcmVzdWx0YCDigJMgYHthbnl9YCAtIFxyXG4gICAqL1xyXG4gIHB1YmxpYyBteVJlbW90ZShjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvQ29udGFpbmVycy9teS1yZW1vdGVcIjtcclxuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGF0aXN0aWNhbCBpbmZvcm1hdGlvbiBmb3IgQ29udGFpbmVyIHJlZ2lzdGVycy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZSBob3VybHksIGRhaWx5LCB3ZWVrbHksIG1vbnRobHksIHllYXJseSwgY3VzdG9tXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gY3VzdG9tIHtcInN0YXJ0XCI6IGRhdGUsIFwiZW5kXCI6IGRhdGUgfVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHdoZXJlIHdoZXJlIGZpbHRlciBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cEJ5IGdyb3VwIGJ5IGZpbHRlciBcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiA8ZW0+XHJcbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXHJcbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDb250YWluZXJgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdHMocmFuZ2U6IGFueSwgY3VzdG9tOiBhbnkgPSB7fSwgd2hlcmU6IGFueSA9IHt9LCBncm91cEJ5OiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xyXG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcclxuICAgIFwiL0NvbnRhaW5lcnMvc3RhdHNcIjtcclxuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBpZiAodHlwZW9mIHJhbmdlICE9PSAndW5kZWZpbmVkJyAmJiByYW5nZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5yYW5nZSA9IHJhbmdlO1xyXG4gICAgaWYgKHR5cGVvZiBjdXN0b20gIT09ICd1bmRlZmluZWQnICYmIGN1c3RvbSAhPT0gbnVsbCkgX3VybFBhcmFtcy5jdXN0b20gPSBjdXN0b207XHJcbiAgICBpZiAodHlwZW9mIHdoZXJlICE9PSAndW5kZWZpbmVkJyAmJiB3aGVyZSAhPT0gbnVsbCkgX3VybFBhcmFtcy53aGVyZSA9IHdoZXJlO1xyXG4gICAgaWYgKHR5cGVvZiBncm91cEJ5ICE9PSAndW5kZWZpbmVkJyAmJiBncm91cEJ5ICE9PSBudWxsKSBfdXJsUGFyYW1zLmdyb3VwQnkgPSBncm91cEJ5O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxyXG4gICAqIGkuZS4gYENvbnRhaW5lcmAuXHJcbiAgICovXHJcbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcclxuICAgIHJldHVybiBcIkNvbnRhaW5lclwiO1xyXG4gIH1cclxufVxyXG4iXX0=