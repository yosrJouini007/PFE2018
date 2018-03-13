"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../shared/shared.module");
var add_glucose_routing_module_1 = require("./add-glucose-routing.module");
var add_glucose_component_1 = require("./add-glucose.component");
var angular_1 = require("nativescript-ui-chart/angular");
var validate_service_1 = require("./validate.service");
var forms_1 = require("@angular/forms");
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
                forms_1.FormsModule
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUV2RSx5REFBdUQ7QUFDdkQsMkVBQXVFO0FBQ3ZFLGlFQUE4RDtBQUM5RCx5REFBMEU7QUFDMUUsdURBQXFEO0FBQ3JELHdDQUE2QztBQW1CN0M7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQWpCNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsb0RBQXVCO2dCQUN2Qiw0QkFBWTtnQkFDWixtQ0FBeUI7Z0JBQ3pCLG1CQUFXO2FBQ2Q7WUFFRCxZQUFZLEVBQUU7Z0JBQ1YsMkNBQW1CO2FBQ3RCO1lBQ0QsU0FBUyxFQUFDLENBQUMsa0NBQWUsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuaW1wb3J0IHsgQWRkR2x1Y29zZVJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hZGQtZ2x1Y29zZS1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQWRkR2x1Y29zZUNvbXBvbmVudCB9IGZyb20gXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlDaGFydE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktY2hhcnQvYW5ndWxhclwiO1xuaW1wb3J0IHsgVmFsaWRhdGVTZXJ2aWNlIH0gZnJvbSAnLi92YWxpZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIEFkZEdsdWNvc2VSb3V0aW5nTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJQ2hhcnRNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgIFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBZGRHbHVjb3NlQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltWYWxpZGF0ZVNlcnZpY2VdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQWRkR2x1Y29zZU1vZHVsZSB7IH1cbiJdfQ==