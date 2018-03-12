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
 * Api services for the `Tmp` model.
 */
var TmpApi = (function (_super) {
    __extends(TmpApi, _super);
    function TmpApi(http, connection, models, auth, searchParams, errorHandler) {
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
     * This usually means the response is a `Tmp` object.)
     * </em>
     */
    TmpApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/tmps";
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
     * @param {any} id tmp id
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
     * This usually means the response is a `Tmp` object.)
     * </em>
     */
    TmpApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/tmps/:id";
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
     * The name of the model represented by this $resource,
     * i.e. `Tmp`.
     */
    TmpApi.prototype.getModelName = function () {
        return "Tmp";
    };
    TmpApi = __decorate([
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
    ], TmpApi);
    return TmpApi;
}(base_service_1.BaseLoopBackApi));
exports.TmpApi = TmpApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVG1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCLHNDQUE2RDtBQUM3RCxzQ0FBK0M7QUFDL0MseUNBQXdDO0FBQ3hDLHFEQUF1RDtBQUN2RCw2Q0FBaUQ7QUFDakQscURBQW9EO0FBRXBELHVEQUF5RDtBQUN6RCx1REFBcUQ7QUFJckQsdUVBQW9FO0FBR3BFOztHQUVHO0FBRUg7SUFBNEIsMEJBQWU7SUFFekMsZ0JBQzBCLElBQVUsRUFDRSxVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ2QsWUFBOEIsRUFDdEIsWUFBMEI7UUFOeEUsWUFRRSxrQkFBTSxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxTQUNwRTtRQVJ5QixVQUFJLEdBQUosSUFBSSxDQUFNO1FBQ0UsZ0JBQVUsR0FBVixVQUFVLENBQWtCO1FBQ25DLFlBQU0sR0FBTixNQUFNLENBQVc7UUFDZCxVQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2Qsa0JBQVksR0FBWixZQUFZLENBQWtCO1FBQ3RCLGtCQUFZLEdBQVosWUFBWSxDQUFjOztJQUd4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0ksOEJBQWEsR0FBcEIsVUFBcUIsSUFBYyxFQUFFLGFBQXdCO1FBQXhDLHFCQUFBLEVBQUEsU0FBYztRQUNqQyxJQUFJLE9BQU8sR0FBVyxPQUFPLENBQUM7UUFDOUIsSUFBSSxJQUFJLEdBQVcsMEJBQWMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsMEJBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDbEYsT0FBTyxDQUFDO1FBQ1IsSUFBSSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksU0FBUyxHQUFRO1lBQ25CLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUNGLElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25HLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNJLGdDQUFlLEdBQXRCLFVBQXVCLEVBQU8sRUFBRSxJQUFjLEVBQUUsYUFBd0I7UUFBeEMscUJBQUEsRUFBQSxTQUFjO1FBQzVDLElBQUksT0FBTyxHQUFXLE9BQU8sQ0FBQztRQUM5QixJQUFJLElBQUksR0FBVywwQkFBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRywwQkFBYyxDQUFDLGFBQWEsRUFBRTtZQUNsRixXQUFXLENBQUM7UUFDWixJQUFJLFlBQVksR0FBUTtZQUN0QixFQUFFLEVBQUUsRUFBRTtTQUNQLENBQUM7UUFDRixJQUFJLFNBQVMsR0FBUTtZQUNuQixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7UUFDRixJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNuRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSw2QkFBWSxHQUFuQjtRQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBakZVLE1BQU07UUFEbEIsaUJBQVUsRUFBRTtRQUlSLFdBQUEsYUFBTSxDQUFDLFdBQUksQ0FBQyxDQUFBO1FBQ1osV0FBQSxhQUFNLENBQUMscUNBQWdCLENBQUMsQ0FBQTtRQUN4QixXQUFBLGFBQU0sQ0FBQyxxQkFBUyxDQUFDLENBQUE7UUFDakIsV0FBQSxhQUFNLENBQUMsMkJBQVksQ0FBQyxDQUFBO1FBQ3BCLFdBQUEsYUFBTSxDQUFDLGdDQUFnQixDQUFDLENBQUE7UUFDeEIsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDRCQUFZLENBQUMsQ0FBQTt5Q0FMSCxXQUFJO1lBQ2MscUNBQWdCO1lBQzNCLHFCQUFTO1lBQ1IsMkJBQVk7WUFDQSxnQ0FBZ0I7WUFDUiw0QkFBWTtPQVI3RCxNQUFNLENBa0ZsQjtJQUFELGFBQUM7Q0FBQSxBQWxGRCxDQUE0Qiw4QkFBZSxHQWtGMUM7QUFsRlksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4vU0RLTW9kZWxzJztcclxuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XHJcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4uL2NvcmUvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcclxuaW1wb3J0IHsgSlNPTlNlYXJjaFBhcmFtcyB9IGZyb20gJy4uL2NvcmUvc2VhcmNoLnBhcmFtcyc7XHJcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgVG1wIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1RtcCc7XHJcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBUbXBgIG1vZGVsLlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVG1wQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KEh0dHApIHByb3RlY3RlZCBodHRwOiBIdHRwLFxyXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcclxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXHJcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcclxuICAgIEBJbmplY3QoSlNPTlNlYXJjaFBhcmFtcykgcHJvdGVjdGVkIHNlYXJjaFBhcmFtczogSlNPTlNlYXJjaFBhcmFtcyxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcclxuICApIHtcclxuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBzZWFyY2hQYXJhbXMsIGVycm9ySGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXRjaCBhbiBleGlzdGluZyBtb2RlbCBpbnN0YW5jZSBvciBpbnNlcnQgYSBuZXcgb25lIGludG8gdGhlIGRhdGEgc291cmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxyXG4gICAqXHJcbiAgICogIC0gYGRhdGFgIOKAkyBge29iamVjdH1gIC0gTW9kZWwgaW5zdGFuY2UgZGF0YVxyXG4gICAqXHJcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxyXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXHJcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiA8ZW0+XHJcbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXHJcbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBUbXBgIG9iamVjdC4pXHJcbiAgICogPC9lbT5cclxuICAgKi9cclxuICBwdWJsaWMgcGF0Y2hPckNyZWF0ZShkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBBVENIXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvdG1wc1wiO1xyXG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IGRhdGFcclxuICAgIH07XHJcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXRjaCBhdHRyaWJ1dGVzIGZvciBhIG1vZGVsIGluc3RhbmNlIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHthbnl9IGlkIHRtcCBpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxyXG4gICAqXHJcbiAgICogIC0gYGRhdGFgIOKAkyBge29iamVjdH1gIC0gQW4gb2JqZWN0IG9mIG1vZGVsIHByb3BlcnR5IG5hbWUvdmFsdWUgcGFpcnNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcclxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxyXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogPGVtPlxyXG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxyXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgVG1wYCBvYmplY3QuKVxyXG4gICAqIDwvZW0+XHJcbiAgICovXHJcbiAgcHVibGljIHBhdGNoQXR0cmlidXRlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBBVENIXCI7XHJcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xyXG4gICAgXCIvdG1wcy86aWRcIjtcclxuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcclxuICAgICAgaWQ6IGlkXHJcbiAgICB9O1xyXG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xyXG4gICAgICBkYXRhOiBkYXRhXHJcbiAgICB9O1xyXG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxyXG4gICAqIGkuZS4gYFRtcGAuXHJcbiAgICovXHJcbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcclxuICAgIHJldHVybiBcIlRtcFwiO1xyXG4gIH1cclxufVxyXG4iXX0=