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
var Container_1 = require("./services/custom/Container");
var Guests_1 = require("./services/custom/Guests");
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
                Container_1.ContainerApi,
                Guests_1.GuestsApi,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9CQUFvQjtBQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILCtEQUFpRTtBQUNqRSwrREFBNkQ7QUFDN0QsNkRBQTREO0FBQzVELG1FQUFpRTtBQUNqRSx5REFBd0Q7QUFDeEQseURBQXNFO0FBQ3RFLHNDQUEyQztBQUMzQywwQ0FBK0M7QUFDL0Msc0NBQThEO0FBQzlELDJEQUF5RDtBQUN6RCx5REFBdUQ7QUFDdkQseURBQXVEO0FBQ3ZELG1FQUFnRTtBQUNoRSx1REFBcUQ7QUFDckQsK0NBQWlEO0FBQ2pELHlEQUEyRDtBQUMzRCxtREFBcUQ7QUFFckQ7Ozs7R0FJRztBQVVIO0lBQUE7SUFtQkEsQ0FBQzt3QkFuQlksZUFBZTtJQUNuQix1QkFBTyxHQUFkO1FBQ0UsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFJLGlCQUFlO1lBQzNCLFNBQVMsRUFBRztnQkFDViwyQkFBWTtnQkFDWiw4QkFBYTtnQkFDYixnQ0FBZ0I7Z0JBQ2hCLHFCQUFTO2dCQUNULG9CQUFRO2dCQUNSLGNBQU87Z0JBQ1Asd0JBQVk7Z0JBQ1osa0JBQVM7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsK0JBQWUsRUFBRSxRQUFRLEVBQUUsOEJBQWEsRUFBRTtnQkFDckQsRUFBRSxPQUFPLEVBQUUsMEJBQVUsRUFBRSxRQUFRLEVBQUUsOEJBQWEsRUFBRTtnQkFDaEQsRUFBRSxPQUFPLEVBQUUsNEJBQVksRUFBRSxRQUFRLEVBQUUsNEJBQVksRUFBRTthQUNsRDtTQUNGLENBQUM7SUFDSixDQUFDO0lBbEJVLGVBQWU7UUFUM0IsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFPLENBQUUscUJBQVksRUFBRSxpQkFBVSxDQUFFO1lBQzFDLFlBQVksRUFBRSxFQUFHO1lBQ2pCLE9BQU8sRUFBTyxFQUFHO1lBQ2pCLFNBQVMsRUFBSztnQkFDWiw0QkFBWTtnQkFDWixxQ0FBZ0I7YUFDakI7U0FDRixDQUFDO09BQ1csZUFBZSxDQW1CM0I7SUFBRCxzQkFBQzs7Q0FBQSxBQW5CRCxJQW1CQztBQW5CWSwwQ0FBZTtBQW9CNUI7OztHQUdHO0FBQ0gsb0NBQStCO0FBQy9CLHNDQUFpQztBQUNqQyxpQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4vKipcclxuKiBAbW9kdWxlIFNES01vZHVsZVxyXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdoOmpvbmF0aGFuLWNhc2FycnViaWFzPlxyXG4qIEBsaWNlbnNlIE1JVCAyMDE2IEpvbmF0aGFuIENhc2FycnViaWFzXHJcbiogQHZlcnNpb24gMi4xLjBcclxuKiBAZGVzY3JpcHRpb25cclxuKiBUaGUgU0RLTW9kdWxlIGlzIGEgZ2VuZXJhdGVkIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdCBhdXRvbWF0aWNhbGx5IGJ1aWx0IGJ5XHJcbiogdGhlIExvb3BCYWNrIFNESyBCdWlsZGVyIG9wZW4gc291cmNlIG1vZHVsZS5cclxuKlxyXG4qIFRoZSBTREtNb2R1bGUgcHJvdmlkZXMgQW5ndWxhciAyID49IFJDLjUgc3VwcG9ydCwgd2hpY2ggbWVhbnMgdGhhdCBOZ01vZHVsZXNcclxuKiBjYW4gaW1wb3J0IHRoaXMgU29mdHdhcmUgRGV2ZWxvcG1lbnQgS2l0IGFzIGZvbGxvd3M6XHJcbipcclxuKlxyXG4qIEFQUCBSb3V0ZSBNb2R1bGUgQ29udGV4dFxyXG4qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuKiBpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4qIGltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSAgZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbiogLy8gQXBwIFJvb3QgXHJcbiogaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gICBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xyXG4qIC8vIEZlYXR1cmUgTW9kdWxlc1xyXG4qIGltcG9ydCB7IFNES1tCcm93c2VyfE5vZGV8TmF0aXZlXU1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3Nkay9zZGsubW9kdWxlJztcclxuKiAvLyBJbXBvcnQgUm91dGluZ1xyXG4qIGltcG9ydCB7IHJvdXRpbmcgfSAgICAgICAgZnJvbSAnLi9hcHAucm91dGluZyc7XHJcbiogQE5nTW9kdWxlKHtcclxuKiAgaW1wb3J0czogW1xyXG4qICAgIEJyb3dzZXJNb2R1bGUsXHJcbiogICAgcm91dGluZyxcclxuKiAgICBTREtbQnJvd3NlcnxOb2RlfE5hdGl2ZV1Nb2R1bGUuZm9yUm9vdCgpXHJcbiogIF0sXHJcbiogIGRlY2xhcmF0aW9uczogWyBBcHBDb21wb25lbnQgXSxcclxuKiAgYm9vdHN0cmFwOiAgICBbIEFwcENvbXBvbmVudCBdXHJcbiogfSlcclxuKiBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4qXHJcbioqL1xyXG5pbXBvcnQgeyBKU09OU2VhcmNoUGFyYW1zIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL3NlYXJjaC5wYXJhbXMnO1xyXG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4vc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TREtNb2RlbHMnO1xyXG5pbXBvcnQgeyBJbnRlcm5hbFN0b3JhZ2UsIFNES1N0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5zd2Fwcyc7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RvcmFnZU5hdGl2ZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLm5hdGl2ZSc7XHJcbmltcG9ydCB7IFNvY2tldE5hdGl2ZSB9IGZyb20gJy4vc29ja2V0cy9zb2NrZXQubmF0aXZlJztcclxuaW1wb3J0IHsgU29ja2V0RHJpdmVyIH0gZnJvbSAnLi9zb2NrZXRzL3NvY2tldC5kcml2ZXInO1xyXG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XHJcbmltcG9ydCB7IFJlYWxUaW1lIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL3JlYWwudGltZSc7XHJcbmltcG9ydCB7IFVzZXJBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Vc2VyJztcclxuaW1wb3J0IHsgQ29udGFpbmVyQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vQ29udGFpbmVyJztcclxuaW1wb3J0IHsgR3Vlc3RzQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vR3Vlc3RzJztcclxuXHJcbi8qKlxyXG4qIEBtb2R1bGUgU0RLTmF0aXZlTW9kdWxlXHJcbiogQGRlc2NyaXB0aW9uXHJcbiogVGhpcyBtb2R1bGUgc2hvdWxkIGJlIGltcG9ydGVkIHdoZW4gYnVpbGRpbmcgYSBOYXRpdmVTY3JpcHQgQXBwbGljYXRpb25zLlxyXG4qKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiAgICAgIFsgQ29tbW9uTW9kdWxlLCBIdHRwTW9kdWxlIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbIF0sXHJcbiAgZXhwb3J0czogICAgICBbIF0sXHJcbiAgcHJvdmlkZXJzOiAgICBbXHJcbiAgICBFcnJvckhhbmRsZXIsXHJcbiAgICBTb2NrZXRDb25uZWN0aW9uXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU0RLTmF0aXZlTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlICA6IFNES05hdGl2ZU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzIDogW1xyXG4gICAgICAgIExvb3BCYWNrQXV0aCxcclxuICAgICAgICBMb2dnZXJTZXJ2aWNlLFxyXG4gICAgICAgIEpTT05TZWFyY2hQYXJhbXMsXHJcbiAgICAgICAgU0RLTW9kZWxzLFxyXG4gICAgICAgIFJlYWxUaW1lLFxyXG4gICAgICAgIFVzZXJBcGksXHJcbiAgICAgICAgQ29udGFpbmVyQXBpLFxyXG4gICAgICAgIEd1ZXN0c0FwaSxcclxuICAgICAgICB7IHByb3ZpZGU6IEludGVybmFsU3RvcmFnZSwgdXNlQ2xhc3M6IFN0b3JhZ2VOYXRpdmUgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IFNES1N0b3JhZ2UsIHVzZUNsYXNzOiBTdG9yYWdlTmF0aXZlIH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBTb2NrZXREcml2ZXIsIHVzZUNsYXNzOiBTb2NrZXROYXRpdmUgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4vKipcclxuKiBIYXZlIEZ1biEhIVxyXG4qIC0gSm9uXHJcbioqL1xyXG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9pbmRleCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xiLmNvbmZpZyc7XHJcblxyXG4iXX0=