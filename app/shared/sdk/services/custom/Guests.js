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
 * Api services for the `Guests` model.
 */
var GuestsApi = (function (_super) {
    __extends(GuestsApi, _super);
    function GuestsApi(http, connection, models, auth, searchParams, errorHandler) {
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
     * This usually means the response is a `Guests` object.)
     * </em>
     */
    GuestsApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Guests";
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
     * @param {any} id Guests id
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
     * This usually means the response is a `Guests` object.)
     * </em>
     */
    GuestsApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Guests/:id";
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
    GuestsApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Guests/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for Guests registers.
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
     * This usually means the response is a `Guests` object.)
     * </em>
     */
    GuestsApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Guests/stats";
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
     * i.e. `Guests`.
     */
    GuestsApi.prototype.getModelName = function () {
        return "Guests";
    };
    GuestsApi = __decorate([
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
    ], GuestsApi);
    return GuestsApi;
}(base_service_1.BaseLoopBackApi));
exports.GuestsApi = GuestsApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3Vlc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR3Vlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCLHNDQUE2RDtBQUM3RCxzQ0FBK0M7QUFDL0MseUNBQXdDO0FBQ3hDLHFEQUF1RDtBQUN2RCw2Q0FBaUQ7QUFDakQscURBQW9EO0FBRXBELHVEQUF5RDtBQUN6RCx1REFBcUQ7QUFJckQsdUVBQW9FO0FBR3BFOztHQUVHO0FBRUg7SUFBK0IsNkJBQWU7SUFFNUMsbUJBQzBCLElBQVUsRUFDRSxVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ2QsWUFBOEIsRUFDdEIsWUFBMEI7UUFOeEUsWUFRRSxrQkFBTSxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxTQUNwRTtRQVJ5QixVQUFJLEdBQUosSUFBSSxDQUFNO1FBQ0UsZ0JBQVUsR0FBVixVQUFVLENBQWtCO1FBQ25DLFlBQU0sR0FBTixNQUFNLENBQVc7UUFDZCxVQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2Qsa0JBQVksR0FBWixZQUFZLENBQWtCO1FBQ3RCLGtCQUFZLEdBQVosWUFBWSxDQUFjOztJQUd4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0ksaUNBQWEsR0FBcEIsVUFBcUIsSUFBYyxFQUFFLGFBQXdCO1FBQXhDLHFCQUFBLEVBQUEsU0FBYztRQUNqQyxJQUFJLE9BQU8sR0FBVyxPQUFPLENBQUM7UUFDOUIsSUFBSSxJQUFJLEdBQVcsMEJBQWMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsMEJBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDbEYsU0FBUyxDQUFDO1FBQ1YsSUFBSSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksU0FBUyxHQUFRO1lBQ25CLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUNGLElBQUksVUFBVSxHQUFRLEVBQUUs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QUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUM7WUFBQyxVQUFVLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNyRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25HLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdDQUFZLEdBQW5CO1FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBNUlVLFNBQVM7UUFEckIsaUJBQVUsRUFBRTtRQUlSLFdBQUEsYUFBTSxDQUFDLFdBQUksQ0FBQyxDQUFBO1FBQ1osV0FBQSxhQUFNLENBQUMscUNBQWdCLENBQUMsQ0FBQTtRQUN4QixXQUFBLGFBQU0sQ0FBQyxxQkFBUyxDQUFDLENBQUE7UUFDakIsV0FBQSxhQUFNLENBQUMsMkJBQVksQ0FBQyxDQUFBO1FBQ3BCLFdBQUEsYUFBTSxDQUFDLGdDQUFnQixDQUFDLENBQUE7UUFDeEIsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDRCQUFZLENBQUMsQ0FBQTt5Q0FMSCxXQUFJO1lBQ2MscUNBQWdCO1lBQzNCLHFCQUFTO1lBQ1IsMkJBQVk7WUFDQSxnQ0FBZ0I7WUFDUiw0QkFBWTtPQVI3RCxTQUFTLENBNklyQjtJQUFELGdCQUFDO0NBQUEsQUE3SUQsQ0FBK0IsOEJBQWUsR0E2STdDO0FBN0lZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XHJcbmltcG9ydCB7IEJhc2VMb29wQmFja0FwaSB9IGZyb20gJy4uL2NvcmUvYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xyXG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IExvb3BCYWNrRmlsdGVyLCAgfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XHJcbmltcG9ydCB7IEpTT05TZWFyY2hQYXJhbXMgfSBmcm9tICcuLi9jb3JlL3NlYXJjaC5wYXJhbXMnO1xyXG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9jb3JlL2Vycm9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IEd1ZXN0cyB9IGZyb20gJy4uLy4uL21vZGVscy9HdWVzdHMnO1xyXG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBcGkgc2VydmljZXMgZm9yIHRoZSBgR3Vlc3RzYCBtb2RlbC5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEd1ZXN0c0FwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChIdHRwKSBwcm90ZWN0ZWQgaHR0cDogSHR0cCxcclxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXHJcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxyXG4gICAgQEluamVjdChMb29wQmFja0F1dGgpIHByb3RlY3RlZCBhdXRoOiBMb29wQmFja0F1dGgsXHJcbiAgICBASW5qZWN0KEpTT05TZWFyY2hQYXJhbXMpIHByb3RlY3RlZCBzZWFyY2hQYXJhbXM6IEpTT05TZWFyY2hQYXJhbXMsXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcihodHRwLCAgY29ubmVjdGlvbiwgIG1vZGVscywgYXV0aCwgc2VhcmNoUGFyYW1zLCBlcnJvckhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF0Y2ggYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cclxuICAgKlxyXG4gICAqICAtIGBkYXRhYCDigJMgYHtvYmplY3R9YCAtIE1vZGVsIGluc3RhbmNlIGRhdGFcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgR3Vlc3RzYCBvYmplY3QuKVxyXG4gICAqIDwvZW0+XHJcbiAgICovXHJcbiAgcHVibGljIHBhdGNoT3JDcmVhdGUoZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQQVRDSFwiO1xyXG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcclxuICAgIFwiL0d1ZXN0c1wiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IGRhdGFcclxuICAgIH07XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXRjaCBhdHRyaWJ1dGVzIGZvciBhIG1vZGVsIGluc3RhbmNlIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHthbnl9IGlkIEd1ZXN0cyBpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxyXG4gICAqXHJcbiAgICogIC0gYGRhdGFgIOKAkyBge29iamVjdH1gIC0gQW4gb2JqZWN0IG9mIG1vZGVsIHByb3BlcnR5IG5hbWUvdmFsdWUgcGFpcnNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgR3Vlc3RzYCBvYmplY3QuKVxyXG4gICAqIDwvZW0+XHJcbiAgICovXHJcbiAgcHVibGljIHBhdGNoQXR0cmlidXRlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBBVENIXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvR3Vlc3RzLzppZFwiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xyXG4gICAgICBpZDogaWRcclxuICAgIH07XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IGRhdGFcclxuICAgIH07XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiA8ZW0+XHJcbiAgICAgICAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uKVxyXG4gICAgICAgICAqIDwvZW0+XHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXHJcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcclxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIERhdGEgcHJvcGVydGllczpcclxuICAgKlxyXG4gICAqICAtIGByZXN1bHRgIOKAkyBge2FueX1gIC0gXHJcbiAgICovXHJcbiAgcHVibGljIG15UmVtb3RlKGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcclxuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXHJcbiAgICBcIi9HdWVzdHMvbXktcmVtb3RlXCI7XHJcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcclxuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhdGlzdGljYWwgaW5mb3JtYXRpb24gZm9yIEd1ZXN0cyByZWdpc3RlcnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2UgaG91cmx5LCBkYWlseSwgd2Vla2x5LCBtb250aGx5LCB5ZWFybHksIGN1c3RvbVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGN1c3RvbSB7XCJzdGFydFwiOiBkYXRlLCBcImVuZFwiOiBkYXRlIH1cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB3aGVyZSB3aGVyZSBmaWx0ZXIgXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBCeSBncm91cCBieSBmaWx0ZXIgXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgR3Vlc3RzYCBvYmplY3QuKVxyXG4gICAqIDwvZW0+XHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRzKHJhbmdlOiBhbnksIGN1c3RvbTogYW55ID0ge30sIHdoZXJlOiBhbnkgPSB7fSwgZ3JvdXBCeTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcclxuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXHJcbiAgICBcIi9HdWVzdHMvc3RhdHNcIjtcclxuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBpZiAodHlwZW9mIHJhbmdlICE9PSAndW5kZWZpbmVkJyAmJiByYW5nZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5yYW5nZSA9IHJhbmdlO1xyXG4gICAgaWYgKHR5cGVvZiBjdXN0b20gIT09ICd1bmRlZmluZWQnICYmIGN1c3RvbSAhPT0gbnVsbCkgX3VybFBhcmFtcy5jdXN0b20gPSBjdXN0b207XHJcbiAgICBpZiAodHlwZW9mIHdoZXJlICE9PSAndW5kZWZpbmVkJyAmJiB3aGVyZSAhPT0gbnVsbCkgX3VybFBhcmFtcy53aGVyZSA9IHdoZXJlO1xyXG4gICAgaWYgKHR5cGVvZiBncm91cEJ5ICE9PSAndW5kZWZpbmVkJyAmJiBncm91cEJ5ICE9PSBudWxsKSBfdXJsUGFyYW1zLmdyb3VwQnkgPSBncm91cEJ5O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxyXG4gICAqIGkuZS4gYEd1ZXN0c2AuXHJcbiAgICovXHJcbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcclxuICAgIHJldHVybiBcIkd1ZXN0c1wiO1xyXG4gIH1cclxufVxyXG4iXX0=