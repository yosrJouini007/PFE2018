"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
/**
* @module LoopBackConfig
* @description
*
* The LoopBackConfig module help developers to externally
* configure the base url and api version for loopback.io
*
* Example
*
* import { LoopBackConfig } from './sdk';
*
* @Component() // No metadata needed for this module
*
* export class MyApp {
*   constructor() {
*     LoopBackConfig.setBaseURL('http://localhost:3000');
*     LoopBackConfig.setApiVersion('api');
*   }
* }
**/
var LoopBackConfig = (function () {
    function LoopBackConfig() {
    }
    LoopBackConfig.setApiVersion = function (version) {
        if (version === void 0) { version = 'api'; }
        LoopBackConfig.version = version;
    };
    LoopBackConfig.getApiVersion = function () {
        return LoopBackConfig.version;
    };
    LoopBackConfig.setBaseURL = function (url) {
        if (url === void 0) { url = '/'; }
        LoopBackConfig.path = url;
    };
    LoopBackConfig.getPath = function () {
        return LoopBackConfig.path;
    };
    LoopBackConfig.setAuthPrefix = function (authPrefix) {
        if (authPrefix === void 0) { authPrefix = ''; }
        LoopBackConfig.authPrefix = authPrefix;
    };
    LoopBackConfig.getAuthPrefix = function () {
        return LoopBackConfig.authPrefix;
    };
    LoopBackConfig.setDebugMode = function (isEnabled) {
        LoopBackConfig.debug = isEnabled;
    };
    LoopBackConfig.debuggable = function () {
        return LoopBackConfig.debug;
    };
    LoopBackConfig.filterOnUrl = function () {
        LoopBackConfig.filterOn = 'url';
    };
    LoopBackConfig.filterOnHeaders = function () {
        LoopBackConfig.filterOn = 'headers';
    };
    LoopBackConfig.isHeadersFilteringSet = function () {
        return (LoopBackConfig.filterOn === 'headers');
    };
    LoopBackConfig.setSecureWebSockets = function () {
        LoopBackConfig.secure = true;
    };
    LoopBackConfig.unsetSecureWebSockets = function () {
        LoopBackConfig.secure = false;
    };
    LoopBackConfig.isSecureWebSocketsSet = function () {
        return LoopBackConfig.secure;
    };
    LoopBackConfig.setRequestOptionsCredentials = function (withCredentials) {
        if (withCredentials === void 0) { withCredentials = false; }
        LoopBackConfig.withCredentials = withCredentials;
    };
    LoopBackConfig.getRequestOptionsCredentials = function () {
        return LoopBackConfig.withCredentials;
    };
    LoopBackConfig.path = '//0.0.0.0:6100';
    LoopBackConfig.version = 'api';
    LoopBackConfig.authPrefix = '';
    LoopBackConfig.debug = true;
    LoopBackConfig.filterOn = 'headers';
    LoopBackConfig.secure = false;
    LoopBackConfig.withCredentials = false;
    return LoopBackConfig;
}());
exports.LoopBackConfig = LoopBackConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0g7SUFBQTtJQXdFQSxDQUFDO0lBL0RlLDRCQUFhLEdBQTNCLFVBQTRCLE9BQXVCO1FBQXZCLHdCQUFBLEVBQUEsZUFBdUI7UUFDakQsY0FBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQUVhLDRCQUFhLEdBQTNCO1FBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQztJQUVhLHlCQUFVLEdBQXhCLFVBQXlCLEdBQWlCO1FBQWpCLG9CQUFBLEVBQUEsU0FBaUI7UUFDeEMsY0FBYyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVhLHNCQUFPLEdBQXJCO1FBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVhLDRCQUFhLEdBQTNCLFVBQTRCLFVBQXVCO1FBQXZCLDJCQUFBLEVBQUEsZUFBdUI7UUFDakQsY0FBYyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDekMsQ0FBQztJQUVhLDRCQUFhLEdBQTNCO1FBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7SUFDbkMsQ0FBQztJQUVhLDJCQUFZLEdBQTFCLFVBQTJCLFNBQWtCO1FBQzNDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ25DLENBQUM7SUFFYSx5QkFBVSxHQUF4QjtRQUNFLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFYSwwQkFBVyxHQUF6QjtRQUNFLGNBQWMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFYSw4QkFBZSxHQUE3QjtRQUNFLGNBQWMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUFFYSxvQ0FBcUIsR0FBbkM7UUFDRSxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFYSxrQ0FBbUIsR0FBakM7UUFDRSxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRWEsb0NBQXFCLEdBQW5DO1FBQ0UsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVhLG9DQUFxQixHQUFuQztRQUNFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUM7SUFFYSwyQ0FBNEIsR0FBMUMsVUFBMkMsZUFBZ0M7UUFBaEMsZ0NBQUEsRUFBQSx1QkFBZ0M7UUFDekUsY0FBYyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDbkQsQ0FBQztJQUVhLDJDQUE0QixHQUExQztRQUNFLE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO0lBQ3hDLENBQUM7SUF0RWMsbUJBQUksR0FBVyxnQkFBZ0IsQ0FBQztJQUNoQyxzQkFBTyxHQUFvQixLQUFLLENBQUM7SUFDakMseUJBQVUsR0FBVyxFQUFFLENBQUM7SUFDeEIsb0JBQUssR0FBWSxJQUFJLENBQUM7SUFDdEIsdUJBQVEsR0FBVyxTQUFTLENBQUM7SUFDN0IscUJBQU0sR0FBWSxLQUFLLENBQUM7SUFDeEIsOEJBQWUsR0FBWSxLQUFLLENBQUM7SUFpRWxELHFCQUFDO0NBQUEsQUF4RUQsSUF3RUM7QUF4RVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4vKipcclxuKiBAbW9kdWxlIExvb3BCYWNrQ29uZmlnXHJcbiogQGRlc2NyaXB0aW9uXHJcbipcclxuKiBUaGUgTG9vcEJhY2tDb25maWcgbW9kdWxlIGhlbHAgZGV2ZWxvcGVycyB0byBleHRlcm5hbGx5IFxyXG4qIGNvbmZpZ3VyZSB0aGUgYmFzZSB1cmwgYW5kIGFwaSB2ZXJzaW9uIGZvciBsb29wYmFjay5pb1xyXG4qXHJcbiogRXhhbXBsZVxyXG4qXHJcbiogaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuL3Nkayc7XHJcbiogXHJcbiogQENvbXBvbmVudCgpIC8vIE5vIG1ldGFkYXRhIG5lZWRlZCBmb3IgdGhpcyBtb2R1bGVcclxuKlxyXG4qIGV4cG9ydCBjbGFzcyBNeUFwcCB7XHJcbiogICBjb25zdHJ1Y3RvcigpIHtcclxuKiAgICAgTG9vcEJhY2tDb25maWcuc2V0QmFzZVVSTCgnaHR0cDovL2xvY2FsaG9zdDozMDAwJyk7XHJcbiogICAgIExvb3BCYWNrQ29uZmlnLnNldEFwaVZlcnNpb24oJ2FwaScpO1xyXG4qICAgfVxyXG4qIH1cclxuKiovXHJcbmV4cG9ydCBjbGFzcyBMb29wQmFja0NvbmZpZyB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcGF0aDogc3RyaW5nID0gJy8vMC4wLjAuMDo2MTAwJztcclxuICBwcml2YXRlIHN0YXRpYyB2ZXJzaW9uOiBzdHJpbmcgfMKgbnVtYmVyID0gJ2FwaSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgYXV0aFByZWZpeDogc3RyaW5nID0gJyc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgZGVidWc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHByaXZhdGUgc3RhdGljIGZpbHRlck9uOiBzdHJpbmcgPSAnaGVhZGVycyc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgc2VjdXJlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc2V0QXBpVmVyc2lvbih2ZXJzaW9uOiBzdHJpbmcgPSAnYXBpJyk6IHZvaWQge1xyXG4gICAgTG9vcEJhY2tDb25maWcudmVyc2lvbiA9IHZlcnNpb247XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0QXBpVmVyc2lvbigpOiBzdHJpbmcgfCBudW1iZXIge1xyXG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLnZlcnNpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHNldEJhc2VVUkwodXJsOiBzdHJpbmcgPSAnLycpOiB2b2lkIHtcclxuICAgIExvb3BCYWNrQ29uZmlnLnBhdGggPSB1cmw7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UGF0aCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLnBhdGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHNldEF1dGhQcmVmaXgoYXV0aFByZWZpeDogc3RyaW5nID0gJycpOiB2b2lkIHtcclxuICAgIExvb3BCYWNrQ29uZmlnLmF1dGhQcmVmaXggPSBhdXRoUHJlZml4O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRBdXRoUHJlZml4KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gTG9vcEJhY2tDb25maWcuYXV0aFByZWZpeDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc2V0RGVidWdNb2RlKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgTG9vcEJhY2tDb25maWcuZGVidWcgPSBpc0VuYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGRlYnVnZ2FibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gTG9vcEJhY2tDb25maWcuZGVidWc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGZpbHRlck9uVXJsKCk6IHZvaWQge1xyXG4gICAgTG9vcEJhY2tDb25maWcuZmlsdGVyT24gPSAndXJsJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZmlsdGVyT25IZWFkZXJzKCk6IHZvaWQge1xyXG4gICAgTG9vcEJhY2tDb25maWcuZmlsdGVyT24gPSAnaGVhZGVycyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGlzSGVhZGVyc0ZpbHRlcmluZ1NldCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAoTG9vcEJhY2tDb25maWcuZmlsdGVyT24gPT09ICdoZWFkZXJzJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHNldFNlY3VyZVdlYlNvY2tldHMoKTogdm9pZCB7XHJcbiAgICBMb29wQmFja0NvbmZpZy5zZWN1cmUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyB1bnNldFNlY3VyZVdlYlNvY2tldHMoKTogdm9pZCB7XHJcbiAgICBMb29wQmFja0NvbmZpZy5zZWN1cmUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaXNTZWN1cmVXZWJTb2NrZXRzU2V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLnNlY3VyZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc2V0UmVxdWVzdE9wdGlvbnNDcmVkZW50aWFscyh3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgTG9vcEJhY2tDb25maWcud2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRSZXF1ZXN0T3B0aW9uc0NyZWRlbnRpYWxzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLndpdGhDcmVkZW50aWFscztcclxuICB9XHJcbn1cclxuIl19