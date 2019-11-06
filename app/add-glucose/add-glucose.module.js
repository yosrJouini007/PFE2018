"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../shared/shared.module");
var add_glucose_routing_module_1 = require("./add-glucose-routing.module");
var add_glucose_component_1 = require("./add-glucose.component");
var angular_1 = require("nativescript-ui-chart/angular");
var validate_service_1 = require("./validate.service");
var forms_1 = require("nativescript-angular/forms");
var AddGlucoseModule = (function () {
    function AddGlucoseModule() {
    }
    AddGlucoseModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                add_glucose_routing_module_1.AddGlucoseRoutingModule,
                shared_module_1.SharedModule,
                angular_1.NativeScriptUIChartModule,
                forms_1.NativeScriptFormsModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUV2RSx5REFBdUQ7QUFDdkQsMkVBQXVFO0FBQ3ZFLGlFQUE4RDtBQUM5RCx5REFBMEU7QUFDMUUsdURBQXFEO0FBQ3JELG9EQUFxRTtBQW1CckU7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQWpCNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsb0RBQXVCO2dCQUN2Qiw0QkFBWTtnQkFDWixtQ0FBeUI7Z0JBQ3pCLCtCQUF1QjthQUMxQjtZQUVELFlBQVksRUFBRTtnQkFDViwyQ0FBbUI7YUFDdEI7WUFDRCxTQUFTLEVBQUMsQ0FBQyxrQ0FBZSxDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XG5pbXBvcnQgeyBBZGRHbHVjb3NlUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FkZC1nbHVjb3NlLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBBZGRHbHVjb3NlQ29tcG9uZW50IH0gZnJvbSBcIi4vYWRkLWdsdWNvc2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUNoYXJ0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1jaGFydC9hbmd1bGFyXCI7XG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tICcuL3ZhbGlkYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICAgICAgQWRkR2x1Y29zZVJvdXRpbmdNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlDaGFydE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgXSxcbiAgIFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBZGRHbHVjb3NlQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltWYWxpZGF0ZVNlcnZpY2VdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQWRkR2x1Y29zZU1vZHVsZSB7IH1cbiJdfQ==