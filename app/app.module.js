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
var elementRegistryModule = require("nativescript-angular/element-registry");
elementRegistryModule.registerElement("CardView", function () { return require("nativescript-cardview").CardView; });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBQzlFLHNEQUFvRTtBQUVwRSwyREFBd0Q7QUFDeEQsaURBQStDO0FBQy9DLHFDQUFpRDtBQUNqRCw4Q0FBNkM7QUFDN0MseUNBQThDO0FBQzlDLDBEQUF5RDtBQUV6RCw0Q0FBcUQ7QUFDckQsa0RBQWlFO0FBQ2pFLHlEQUEwRTtBQUMxRSw2RUFBK0U7QUFDL0UscUJBQXFCLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUEwQm5HO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUF4QnJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIscUNBQWdCO2dCQUNoQix1QkFBZSxDQUFDLE9BQU8sRUFBRTtnQkFDekIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsbUJBQVEsQ0FBQztnQkFDOUIsdUJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyx1QkFBVSxDQUFDLENBQUM7Z0JBQ25DLDZCQUFzQjtnQkFDdEIsbUNBQXlCO2FBQzNCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2FBQ2Y7WUFFRCxTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxPQUFPLEVBQUUsNEJBQXFCLEVBQUUsUUFBUSxFQUFFLDhCQUFxQixFQUFDO2FBQ3JFO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOU01vZHVsZUZhY3RvcnlMb2FkZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFN0b3JlTW9kdWxlLCBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xuaW1wb3J0IHsgcmVkdWNlcnMgfSBmcm9tIFwiLi9zaGFyZWQvcmVkdWNlcnNcIjtcbmltcG9ydCB7IEVmZmVjdHNNb2R1bGUgfSBmcm9tIFwiQG5ncngvZWZmZWN0c1wiO1xuaW1wb3J0IHsgQXBwRWZmZWN0cyB9IGZyb20gXCIuL3NoYXJlZC9lZmZlY3RzL2FwcC5lZmZlY3RcIjtcbmltcG9ydCB7IEFjdGlvbnMgfSBmcm9tIFwiQG5ncngvZWZmZWN0c1wiO1xuaW1wb3J0IHsgU0RLTmF0aXZlTW9kdWxlIH0gZnJvbSBcIi4vc2hhcmVkL3Nkay9pbmRleFwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRIdHRwTW9kdWxlfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQ2hhcnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWNoYXJ0L2FuZ3VsYXJcIjtcbmltcG9ydCAqIGFzIGVsZW1lbnRSZWdpc3RyeU1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcbmVsZW1lbnRSZWdpc3RyeU1vZHVsZS5yZWdpc3RlckVsZW1lbnQoXCJDYXJkVmlld1wiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWNhcmR2aWV3XCIpLkNhcmRWaWV3KTtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgU0RLTmF0aXZlTW9kdWxlLmZvclJvb3QoKSxcbiAgICAgICAgU3RvcmVNb2R1bGUuZm9yUm9vdChyZWR1Y2VycyksXG4gICAgICAgRWZmZWN0c01vZHVsZS5mb3JSb290KFtBcHBFZmZlY3RzXSksXG4gICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICAgICBOYXRpdmVTY3JpcHRVSUNoYXJ0TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCB1c2VDbGFzczogTlNNb2R1bGVGYWN0b3J5TG9hZGVyfVxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=