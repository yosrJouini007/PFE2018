"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../shared/shared.module");
var add_glucose_routing_module_1 = require("./add-glucose-routing.module");
var add_glucose_component_1 = require("./add-glucose.component");
var angular_1 = require("nativescript-ui-chart/angular");
var validate_service_1 = require("./validate.service");
var AddGlucoseModule = (function () {
    function AddGlucoseModule() {
    }
    AddGlucoseModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                add_glucose_routing_module_1.AddGlucoseRoutingModule,
                shared_module_1.SharedModule,
                angular_1.NativeScriptUIChartModule
            ],
            declarations: [
                add_glucose_component_1.AddGlucoseComponent,
            ],
            providers: [validate_service_1.ValidateService],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AddGlucoseModule);
    return AddGlucoseModule;
}());
exports.AddGlucoseModule = AddGlucoseModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUV2RSx5REFBdUQ7QUFDdkQsMkVBQXVFO0FBQ3ZFLGlFQUE4RDtBQUM5RCx5REFBMEU7QUFDMUUsdURBQXFEO0FBa0JyRDtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBaEI1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4QixvREFBdUI7Z0JBQ3ZCLDRCQUFZO2dCQUNaLG1DQUF5QjthQUM1QjtZQUVELFlBQVksRUFBRTtnQkFDViwyQ0FBbUI7YUFDdEI7WUFDRCxTQUFTLEVBQUMsQ0FBQyxrQ0FBZSxDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XG5pbXBvcnQgeyBBZGRHbHVjb3NlUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FkZC1nbHVjb3NlLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBBZGRHbHVjb3NlQ29tcG9uZW50IH0gZnJvbSBcIi4vYWRkLWdsdWNvc2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUNoYXJ0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1jaGFydC9hbmd1bGFyXCI7XG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tICcuL3ZhbGlkYXRlLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBBZGRHbHVjb3NlUm91dGluZ01vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSUNoYXJ0TW9kdWxlXG4gICAgXSxcbiAgIFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBZGRHbHVjb3NlQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltWYWxpZGF0ZVNlcnZpY2VdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQWRkR2x1Y29zZU1vZHVsZSB7IH1cbiJdfQ==