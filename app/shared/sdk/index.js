"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
var search_params_1 = require("./services/core/search.params");
var error_service_1 = require("./services/core/error.service");
var auth_service_1 = require("./services/core/auth.service");
var logger_service_1 = require("./services/custom/logger.service");
var SDKModels_1 = require("./services/custom/SDKModels");
var storage_swaps_1 = require("./storage/storage.swaps");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var storage_native_1 = require("./storage/storage.native");
var socket_native_1 = require("./sockets/socket.native");
var socket_driver_1 = require("./sockets/socket.driver");
var socket_connections_1 = require("./sockets/socket.connections");
var real_time_1 = require("./services/core/real.time");
var User_1 = require("./services/custom/User");
var Gyms_1 = require("./services/custom/Gyms");
var Container_1 = require("./services/custom/Container");
var PhoneVerification_1 = require("./services/custom/PhoneVerification");
var Guests_1 = require("./services/custom/Guests");
var Sessions_1 = require("./services/custom/Sessions");
var Tmp_1 = require("./services/custom/Tmp");
var Card_1 = require("./services/custom/Card");
/**
* @module SDKNativeModule
* @description
* This module should be imported when building a NativeScript Applications.
**/
var SDKNativeModule = (function () {
    function SDKNativeModule() {
    }
    SDKNativeModule_1 = SDKNativeModule;
    SDKNativeModule.forRoot = function () {
        return {
            ngModule: SDKNativeModule_1,
            providers: [
                auth_service_1.LoopBackAuth,
                logger_service_1.LoggerService,
                search_params_1.JSONSearchParams,
                SDKModels_1.SDKModels,
                real_time_1.RealTime,
                User_1.UserApi,
                Gyms_1.GymsApi,
                Container_1.ContainerApi,
                PhoneVerification_1.PhoneVerificationApi,
                Guests_1.GuestsApi,
                Sessions_1.SessionsApi,
                Tmp_1.TmpApi,
                Card_1.CardApi,
                { provide: storage_swaps_1.InternalStorage, useClass: storage_native_1.StorageNative },
                { provide: storage_swaps_1.SDKStorage, useClass: storage_native_1.StorageNative },
                { provide: socket_driver_1.SocketDriver, useClass: socket_native_1.SocketNative }
            ]
        };
    };
    SDKNativeModule = SDKNativeModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule],
            declarations: [],
            exports: [],
            providers: [
                error_service_1.ErrorHandler,
                socket_connections_1.SocketConnection
            ]
        })
    ], SDKNativeModule);
    return SDKNativeModule;
    var SDKNativeModule_1;
}());
exports.SDKNativeModule = SDKNativeModule;
/**
* Have Fun!!!
* - Jon
**/
__export(require("./models/index"));
__export(require("./services/index"));
__export(require("./lb.config"));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9CQUFvQjtBQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILCtEQUFpRTtBQUNqRSwrREFBNkQ7QUFDN0QsNkRBQTREO0FBQzVELG1FQUFpRTtBQUNqRSx5REFBd0Q7QUFDeEQseURBQXNFO0FBQ3RFLHNDQUEyQztBQUMzQywwQ0FBK0M7QUFDL0Msc0NBQThEO0FBQzlELDJEQUF5RDtBQUN6RCx5REFBdUQ7QUFDdkQseURBQXVEO0FBQ3ZELG1FQUFnRTtBQUNoRSx1REFBcUQ7QUFDckQsK0NBQWlEO0FBQ2pELCtDQUFpRDtBQUNqRCx5REFBMkQ7QUFDM0QseUVBQTJFO0FBQzNFLG1EQUFxRDtBQUNyRCx1REFBeUQ7QUFDekQsNkNBQStDO0FBQy9DLCtDQUFpRDtBQUNqRDs7OztHQUlHO0FBVUg7SUFBQTtJQXdCQSxDQUFDO3dCQXhCWSxlQUFlO0lBQ25CLHVCQUFPLEdBQWQ7UUFDRSxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUksaUJBQWU7WUFDM0IsU0FBUyxFQUFHO2dCQUNWLDJCQUFZO2dCQUNaLDhCQUFhO2dCQUNiLGdDQUFnQjtnQkFDaEIscUJBQVM7Z0JBQ1Qsb0JBQVE7Z0JBQ1IsY0FBTztnQkFDUCxjQUFPO2dCQUNQLHdCQUFZO2dCQUNaLHdDQUFvQjtnQkFDcEIsa0JBQVM7Z0JBQ1Qsc0JBQVc7Z0JBQ1gsWUFBTTtnQkFDTixjQUFPO2dCQUNQLEVBQUUsT0FBTyxFQUFFLCtCQUFlLEVBQUUsUUFBUSxFQUFFLDhCQUFhLEVBQUU7Z0JBQ3JELEVBQUUsT0FBTyxFQUFFLDBCQUFVLEVBQUUsUUFBUSxFQUFFLDhCQUFhLEVBQUU7Z0JBQ2hELEVBQUUsT0FBTyxFQUFFLDRCQUFZLEVBQUUsUUFBUSxFQUFFLDRCQUFZLEVBQUU7YUFDbEQ7U0FDRixDQUFDO0lBQ0osQ0FBQztJQXZCVSxlQUFlO1FBVDNCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBTyxDQUFFLHFCQUFZLEVBQUUsaUJBQVUsQ0FBRTtZQUMxQyxZQUFZLEVBQUUsRUFBRztZQUNqQixPQUFPLEVBQU8sRUFBRztZQUNqQixTQUFTLEVBQUs7Z0JBQ1osNEJBQVk7Z0JBQ1oscUNBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztPQUNXLGVBQWUsQ0F3QjNCO0lBQUQsc0JBQUM7O0NBQUEsQUF4QkQsSUF3QkM7QUF4QlksMENBQWU7QUF5QjVCOzs7R0FHRztBQUNILG9DQUErQjtBQUMvQixzQ0FBaUM7QUFDakMsaUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuLyoqXHJcbiogQG1vZHVsZSBTREtNb2R1bGVcclxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OkBqb2huY2FzYXJydWJpYXM+IDxnaDpqb25hdGhhbi1jYXNhcnJ1Ymlhcz5cclxuKiBAbGljZW5zZSBNSVQgMjAxNiBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xyXG4qIEB2ZXJzaW9uIDIuMS4wXHJcbiogQGRlc2NyaXB0aW9uXHJcbiogVGhlIFNES01vZHVsZSBpcyBhIGdlbmVyYXRlZCBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXQgYXV0b21hdGljYWxseSBidWlsdCBieVxyXG4qIHRoZSBMb29wQmFjayBTREsgQnVpbGRlciBvcGVuIHNvdXJjZSBtb2R1bGUuXHJcbipcclxuKiBUaGUgU0RLTW9kdWxlIHByb3ZpZGVzIEFuZ3VsYXIgMiA+PSBSQy41IHN1cHBvcnQsIHdoaWNoIG1lYW5zIHRoYXQgTmdNb2R1bGVzXHJcbiogY2FuIGltcG9ydCB0aGlzIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdCBhcyBmb2xsb3dzOlxyXG4qXHJcbipcclxuKiBBUFAgUm91dGUgTW9kdWxlIENvbnRleHRcclxuKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiogaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuKiBpbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gIGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG4qIC8vIEFwcCBSb290IFxyXG4qIGltcG9ydCB7IEFwcENvbXBvbmVudCB9ICAgZnJvbSAnLi9hcHAuY29tcG9uZW50JztcclxuKiAvLyBGZWF0dXJlIE1vZHVsZXNcclxuKiBpbXBvcnQgeyBTREtbQnJvd3NlcnxOb2RlfE5hdGl2ZV1Nb2R1bGUgfSBmcm9tICcuL3NoYXJlZC9zZGsvc2RrLm1vZHVsZSc7XHJcbiogLy8gSW1wb3J0IFJvdXRpbmdcclxuKiBpbXBvcnQgeyByb3V0aW5nIH0gICAgICAgIGZyb20gJy4vYXBwLnJvdXRpbmcnO1xyXG4qIEBOZ01vZHVsZSh7XHJcbiogIGltcG9ydHM6IFtcclxuKiAgICBCcm93c2VyTW9kdWxlLFxyXG4qICAgIHJvdXRpbmcsXHJcbiogICAgU0RLW0Jyb3dzZXJ8Tm9kZXxOYXRpdmVdTW9kdWxlLmZvclJvb3QoKVxyXG4qICBdLFxyXG4qICBkZWNsYXJhdGlvbnM6IFsgQXBwQ29tcG9uZW50IF0sXHJcbiogIGJvb3RzdHJhcDogICAgWyBBcHBDb21wb25lbnQgXVxyXG4qIH0pXHJcbiogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuKlxyXG4qKi9cclxuaW1wb3J0IHsgSlNPTlNlYXJjaFBhcmFtcyB9IGZyb20gJy4vc2VydmljZXMvY29yZS9zZWFyY2gucGFyYW1zJztcclxuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2Vycm9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL2xvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU0RLTW9kZWxzJztcclxuaW1wb3J0IHsgSW50ZXJuYWxTdG9yYWdlLCBTREtTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2Uuc3dhcHMnO1xyXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VOYXRpdmUgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5uYXRpdmUnO1xyXG5pbXBvcnQgeyBTb2NrZXROYXRpdmUgfSBmcm9tICcuL3NvY2tldHMvc29ja2V0Lm5hdGl2ZSc7XHJcbmltcG9ydCB7IFNvY2tldERyaXZlciB9IGZyb20gJy4vc29ja2V0cy9zb2NrZXQuZHJpdmVyJztcclxuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xyXG5pbXBvcnQgeyBSZWFsVGltZSB9IGZyb20gJy4vc2VydmljZXMvY29yZS9yZWFsLnRpbWUnO1xyXG5pbXBvcnQgeyBVc2VyQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vVXNlcic7XHJcbmltcG9ydCB7IEd5bXNBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9HeW1zJztcclxuaW1wb3J0IHsgQ29udGFpbmVyQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vQ29udGFpbmVyJztcclxuaW1wb3J0IHsgUGhvbmVWZXJpZmljYXRpb25BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9QaG9uZVZlcmlmaWNhdGlvbic7XHJcbmltcG9ydCB7IEd1ZXN0c0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0d1ZXN0cyc7XHJcbmltcG9ydCB7IFNlc3Npb25zQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU2Vzc2lvbnMnO1xyXG5pbXBvcnQgeyBUbXBBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9UbXAnO1xyXG5pbXBvcnQgeyBDYXJkQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vQ2FyZCc7XHJcbi8qKlxyXG4qIEBtb2R1bGUgU0RLTmF0aXZlTW9kdWxlXHJcbiogQGRlc2NyaXB0aW9uXHJcbiogVGhpcyBtb2R1bGUgc2hvdWxkIGJlIGltcG9ydGVkIHdoZW4gYnVpbGRpbmcgYSBOYXRpdmVTY3JpcHQgQXBwbGljYXRpb25zLlxyXG4qKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiAgICAgIFsgQ29tbW9uTW9kdWxlLCBIdHRwTW9kdWxlIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbIF0sXHJcbiAgZXhwb3J0czogICAgICBbIF0sXHJcbiAgcHJvdmlkZXJzOiAgICBbXHJcbiAgICBFcnJvckhhbmRsZXIsXHJcbiAgICBTb2NrZXRDb25uZWN0aW9uXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU0RLTmF0aXZlTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlICA6IFNES05hdGl2ZU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzIDogW1xyXG4gICAgICAgIExvb3BCYWNrQXV0aCxcclxuICAgICAgICBMb2dnZXJTZXJ2aWNlLFxyXG4gICAgICAgIEpTT05TZWFyY2hQYXJhbXMsXHJcbiAgICAgICAgU0RLTW9kZWxzLFxyXG4gICAgICAgIFJlYWxUaW1lLFxyXG4gICAgICAgIFVzZXJBcGksXHJcbiAgICAgICAgR3ltc0FwaSxcclxuICAgICAgICBDb250YWluZXJBcGksXHJcbiAgICAgICAgUGhvbmVWZXJpZmljYXRpb25BcGksXHJcbiAgICAgICAgR3Vlc3RzQXBpLFxyXG4gICAgICAgIFNlc3Npb25zQXBpLFxyXG4gICAgICAgIFRtcEFwaSxcclxuICAgICAgICBDYXJkQXBpLFxyXG4gICAgICAgIHsgcHJvdmlkZTogSW50ZXJuYWxTdG9yYWdlLCB1c2VDbGFzczogU3RvcmFnZU5hdGl2ZSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogU0RLU3RvcmFnZSwgdXNlQ2xhc3M6IFN0b3JhZ2VOYXRpdmUgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IFNvY2tldERyaXZlciwgdXNlQ2xhc3M6IFNvY2tldE5hdGl2ZSB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4qIEhhdmUgRnVuISEhXHJcbiogLSBKb25cclxuKiovXHJcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL2luZGV4JztcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGIuY29uZmlnJztcclxuXHJcbiJdfQ==