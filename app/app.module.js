"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var store_1 = require("@ngrx/store");
var reducers_1 = require("./shared/reducers");
var effects_1 = require("@ngrx/effects");
var app_effect_1 = require("./shared/effects/app.effect");
var index_1 = require("./shared/sdk/index");
var http_1 = require("nativescript-angular/http");
var angular_1 = require("nativescript-ui-chart/angular");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                index_1.SDKNativeModule.forRoot(),
                store_1.StoreModule.forRoot(reducers_1.reducers),
                effects_1.EffectsModule.forRoot([app_effect_1.AppEffects]),
                http_1.NativeScriptHttpModule,
                angular_1.NativeScriptUIChartModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [
                { provide: core_1.NgModuleFactoryLoader, useClass: router_1.NSModuleFactoryLoader }
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBQzlFLHNEQUFvRTtBQUVwRSwyREFBd0Q7QUFDeEQsaURBQStDO0FBQy9DLHFDQUFpRDtBQUNqRCw4Q0FBNkM7QUFDN0MseUNBQThDO0FBQzlDLDBEQUF5RDtBQUV6RCw0Q0FBcUQ7QUFDckQsa0RBQWlFO0FBQ2pFLHlEQUEwRTtBQTBCMUU7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXhCckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQixxQ0FBZ0I7Z0JBQ2hCLHVCQUFlLENBQUMsT0FBTyxFQUFFO2dCQUN6QixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxtQkFBUSxDQUFDO2dCQUM5Qix1QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLHVCQUFVLENBQUMsQ0FBQztnQkFDbkMsNkJBQXNCO2dCQUN0QixtQ0FBeUI7YUFDM0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7YUFDZjtZQUVELFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSw0QkFBcUIsRUFBRSxRQUFRLEVBQUUsOEJBQXFCLEVBQUM7YUFDckU7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5TTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUsIFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XG5pbXBvcnQgeyByZWR1Y2VycyB9IGZyb20gXCIuL3NoYXJlZC9yZWR1Y2Vyc1wiO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gXCJAbmdyeC9lZmZlY3RzXCI7XG5pbXBvcnQgeyBBcHBFZmZlY3RzIH0gZnJvbSBcIi4vc2hhcmVkL2VmZmVjdHMvYXBwLmVmZmVjdFwiO1xuaW1wb3J0IHsgQWN0aW9ucyB9IGZyb20gXCJAbmdyeC9lZmZlY3RzXCI7XG5pbXBvcnQgeyBTREtOYXRpdmVNb2R1bGUgfSBmcm9tIFwiLi9zaGFyZWQvc2RrL2luZGV4XCI7XG5pbXBvcnQge05hdGl2ZVNjcmlwdEh0dHBNb2R1bGV9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlDaGFydE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktY2hhcnQvYW5ndWxhclwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBTREtOYXRpdmVNb2R1bGUuZm9yUm9vdCgpLFxuICAgICAgICBTdG9yZU1vZHVsZS5mb3JSb290KHJlZHVjZXJzKSxcbiAgICAgICBFZmZlY3RzTW9kdWxlLmZvclJvb3QoW0FwcEVmZmVjdHNdKSxcbiAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgICAgIE5hdGl2ZVNjcmlwdFVJQ2hhcnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICBcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBOU01vZHVsZUZhY3RvcnlMb2FkZXJ9XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==