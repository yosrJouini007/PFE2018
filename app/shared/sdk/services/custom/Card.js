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
 * Api services for the `Card` model.
 */
var CardApi = (function (_super) {
    __extends(CardApi, _super);
    function CardApi(http, connection, models, auth, searchParams, errorHandler) {
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
     * This usually means the response is a `Card` object.)
     * </em>
     */
    CardApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Cards";
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
     * @param {any} id Card id
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
     * This usually means the response is a `Card` object.)
     * </em>
     */
    CardApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Cards/:id";
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
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` -
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    CardApi.prototype.addCard = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Cards/add-card";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof data !== 'undefined' && data !== null)
            _urlParams.data = data;
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
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    CardApi.prototype.deleteCard = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Cards/delete-card";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof data !== 'undefined' && data !== null)
            _urlParams.data = data;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param {object} data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    CardApi.prototype.listCard = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Cards/list-cards";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof data !== 'undefined' && data !== null)
            _urlParams.data = data;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for Card registers.
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
     * This usually means the response is a `Card` object.)
     * </em>
     */
    CardApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Cards/stats";
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
     * i.e. `Card`.
     */
    CardApi.prototype.getModelName = function () {
        return "Card";
    };
    CardApi = __decorate([
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
    ], CardApi);
    return CardApi;
}(base_service_1.BaseLoopBackApi));
exports.CardApi = CardApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEIsc0NBQTZEO0FBQzdELHNDQUErQztBQUMvQyx5Q0FBd0M7QUFDeEMscURBQXVEO0FBQ3ZELDZDQUFpRDtBQUNqRCxxREFBb0Q7QUFFcEQsdURBQXlEO0FBQ3pELHVEQUFxRDtBQUlyRCx1RUFBb0U7QUFHcEU7O0dBRUc7QUFFSDtJQUE2QiwyQkFBZTtJQUUxQyxpQkFDMEIsSUFBVSxFQUNFLFVBQTRCLEVBQ25DLE1BQWlCLEVBQ2QsSUFBa0IsRUFDZCxZQUE4QixFQUN0QixZQUEwQjtRQU54RSxZQVFFLGtCQUFNLElBQUksRUFBRyxVQUFVLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLFNBQ3BFO1FBUnlCLFVBQUksR0FBSixJQUFJLENBQU07UUFDRSxnQkFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDbkMsWUFBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFVBQUksR0FBSixJQUFJLENBQWM7UUFDZCxrQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFDdEIsa0JBQVksR0FBWixZQUFZLENBQWM7O0lBR3hFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSSwrQkFBYSxHQUFwQixVQUFxQixJQUFjLEVBQUUsYUFBd0I7UUFBeEMscUJBQUEsRUFBQSxTQUFjO1FBQ2pDLElBQUksT0FBTyxHQUFXLE9BQU8sQ0FBQztRQUM5QixJQUFJLElBQUksR0FBVywwQkFBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRywwQkFBYyxDQUFDLGFBQWEsRUFBRTtZQUNsRixRQUFRLENBQUM7UUFDVCxJQUFJLFlBQVksR0FBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxTQUFTLEdBQVE7WUFDbkIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO1FBQ0YsSUFBSSxVQUFVLEdBQVEsRUFBRSxDQUFD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NEJBQVksQ0FBQyxDQUFBO3lDQUxILFdBQUk7WUFDYyxxQ0FBZ0I7WUFDM0IscUJBQVM7WUFDUiwyQkFBWTtZQUNBLGdDQUFnQjtZQUNSLDRCQUFZO09BUjdELE9BQU8sQ0EwTW5CO0lBQUQsY0FBQztDQUFBLEFBMU1ELENBQTZCLDhCQUFlLEdBME0zQztBQTFNWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xyXG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcclxuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xyXG5pbXBvcnQgeyBKU09OU2VhcmNoUGFyYW1zIH0gZnJvbSAnLi4vY29yZS9zZWFyY2gucGFyYW1zJztcclxuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBDYXJkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0NhcmQnO1xyXG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBcGkgc2VydmljZXMgZm9yIHRoZSBgQ2FyZGAgbW9kZWwuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYXJkQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KEh0dHApIHByb3RlY3RlZCBodHRwOiBIdHRwLFxyXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcclxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXHJcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcclxuICAgIEBJbmplY3QoSlNPTlNlYXJjaFBhcmFtcykgcHJvdGVjdGVkIHNlYXJjaFBhcmFtczogSlNPTlNlYXJjaFBhcmFtcyxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcclxuICApIHtcclxuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBzZWFyY2hQYXJhbXMsIGVycm9ySGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXRjaCBhbiBleGlzdGluZyBtb2RlbCBpbnN0YW5jZSBvciBpbnNlcnQgYSBuZXcgb25lIGludG8gdGhlIGRhdGEgc291cmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxyXG4gICAqXHJcbiAgICogIC0gYGRhdGFgIOKAkyBge29iamVjdH1gIC0gTW9kZWwgaW5zdGFuY2UgZGF0YVxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiA8ZW0+XHJcbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXHJcbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDYXJkYCBvYmplY3QuKVxyXG4gICAqIDwvZW0+XHJcbiAgICovXHJcbiAgcHVibGljIHBhdGNoT3JDcmVhdGUoZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQQVRDSFwiO1xyXG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcclxuICAgIFwiL0NhcmRzXCI7XHJcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcclxuICAgICAgZGF0YTogZGF0YVxyXG4gICAgfTtcclxuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhdGNoIGF0dHJpYnV0ZXMgZm9yIGEgbW9kZWwgaW5zdGFuY2UgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2FueX0gaWQgQ2FyZCBpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxyXG4gICAqXHJcbiAgICogIC0gYGRhdGFgIOKAkyBge29iamVjdH1gIC0gQW4gb2JqZWN0IG9mIG1vZGVsIHByb3BlcnR5IG5hbWUvdmFsdWUgcGFpcnNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ2FyZGAgb2JqZWN0LilcclxuICAgKiA8L2VtPlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwYXRjaEF0dHJpYnV0ZXMoaWQ6IGFueSwgZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQQVRDSFwiO1xyXG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcclxuICAgIFwiL0NhcmRzLzppZFwiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xyXG4gICAgICBpZDogaWRcclxuICAgIH07XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IGRhdGFcclxuICAgIH07XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiA8ZW0+XHJcbiAgICAgICAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uKVxyXG4gICAgICAgICAqIDwvZW0+XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXHJcbiAgICpcclxuICAgKiAgLSBgZGF0YWAg4oCTIGB7b2JqZWN0fWAgLSBcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxyXG4gICAqXHJcbiAgICogIC0gYHJlc3VsdGAg4oCTIGB7YW55fWAgLSBcclxuICAgKi9cclxuICBwdWJsaWMgYWRkQ2FyZChkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcclxuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXHJcbiAgICBcIi9DYXJkcy9hZGQtY2FyZFwiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcclxuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSAhPT0gbnVsbCkgX3VybFBhcmFtcy5kYXRhID0gZGF0YTtcclxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIDxlbT5cclxuICAgICAgICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi4pXHJcbiAgICAgICAgICogPC9lbT5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cclxuICAgKlxyXG4gICAqICAtIGBkYXRhYCDigJMgYHtvYmplY3R9YCAtIFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiBEYXRhIHByb3BlcnRpZXM6XHJcbiAgICpcclxuICAgKiAgLSBgcmVzdWx0YCDigJMgYHthbnl9YCAtIFxyXG4gICAqL1xyXG4gIHB1YmxpYyBkZWxldGVDYXJkKGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xyXG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcclxuICAgIFwiL0NhcmRzL2RlbGV0ZS1jYXJkXCI7XHJcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhICE9PSBudWxsKSBfdXJsUGFyYW1zLmRhdGEgPSBkYXRhO1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogPGVtPlxyXG4gICAgICAgICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLilcclxuICAgICAgICAgKiA8L2VtPlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXHJcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcclxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIERhdGEgcHJvcGVydGllczpcclxuICAgKlxyXG4gICAqICAtIGByZXN1bHRgIOKAkyBge2FueX1gIC0gXHJcbiAgICovXHJcbiAgcHVibGljIGxpc3RDYXJkKGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvQ2FyZHMvbGlzdC1jYXJkc1wiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcclxuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSAhPT0gbnVsbCkgX3VybFBhcmFtcy5kYXRhID0gZGF0YTtcclxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXRpc3RpY2FsIGluZm9ybWF0aW9uIGZvciBDYXJkIHJlZ2lzdGVycy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZSBob3VybHksIGRhaWx5LCB3ZWVrbHksIG1vbnRobHksIHllYXJseSwgY3VzdG9tXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gY3VzdG9tIHtcInN0YXJ0XCI6IGRhdGUsIFwiZW5kXCI6IGRhdGUgfVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHdoZXJlIHdoZXJlIGZpbHRlciBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cEJ5IGdyb3VwIGJ5IGZpbHRlciBcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiA8ZW0+XHJcbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXHJcbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDYXJkYCBvYmplY3QuKVxyXG4gICAqIDwvZW0+XHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRzKHJhbmdlOiBhbnksIGN1c3RvbTogYW55ID0ge30sIHdoZXJlOiBhbnkgPSB7fSwgZ3JvdXBCeTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcclxuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXHJcbiAgICBcIi9DYXJkcy9zdGF0c1wiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcclxuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGlmICh0eXBlb2YgcmFuZ2UgIT09ICd1bmRlZmluZWQnICYmIHJhbmdlICE9PSBudWxsKSBfdXJsUGFyYW1zLnJhbmdlID0gcmFuZ2U7XHJcbiAgICBpZiAodHlwZW9mIGN1c3RvbSAhPT0gJ3VuZGVmaW5lZCcgJiYgY3VzdG9tICE9PSBudWxsKSBfdXJsUGFyYW1zLmN1c3RvbSA9IGN1c3RvbTtcclxuICAgIGlmICh0eXBlb2Ygd2hlcmUgIT09ICd1bmRlZmluZWQnICYmIHdoZXJlICE9PSBudWxsKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XHJcbiAgICBpZiAodHlwZW9mIGdyb3VwQnkgIT09ICd1bmRlZmluZWQnICYmIGdyb3VwQnkgIT09IG51bGwpIF91cmxQYXJhbXMuZ3JvdXBCeSA9IGdyb3VwQnk7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXHJcbiAgICogaS5lLiBgQ2FyZGAuXHJcbiAgICovXHJcbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcclxuICAgIHJldHVybiBcIkNhcmRcIjtcclxuICB9XHJcbn1cclxuIl19