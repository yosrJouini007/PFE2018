"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../shared/shared.module");
var charts_pie_routing_module_1 = require("./charts-pie-routing.module");
var charts_pie_component_1 = require("./charts-pie.component");
var angular_1 = require("nativescript-ui-chart/angular");
var ChartsPieModule = (function () {
    function ChartsPieModule() {
    }
    ChartsPieModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                charts_pie_routing_module_1.ChartsPieRoutingModule,
                shared_module_1.SharedModule,
                angular_1.NativeScriptUIChartModule,
            ],
            declarations: [
                charts_pie_component_1.ChartsPieComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], ChartsPieModule);
    return ChartsPieModule;
}());
exports.ChartsPieModule = ChartsPieModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRzLXBpZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGFydHMtcGllLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFFdkUseURBQXVEO0FBQ3ZELHlFQUFxRTtBQUNyRSwrREFBMkQ7QUFDM0QseURBQTBFO0FBa0IxRTtJQUFBO0lBQStCLENBQUM7SUFBbkIsZUFBZTtRQWhCM0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsa0RBQXNCO2dCQUN0Qiw0QkFBWTtnQkFDWixtQ0FBeUI7YUFHNUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YseUNBQWtCO2FBQ3JCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxlQUFlLENBQUk7SUFBRCxzQkFBQztDQUFBLEFBQWhDLElBQWdDO0FBQW5CLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcbmltcG9ydCB7IENoYXJ0c1BpZVJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9jaGFydHMtcGllLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBDaGFydHNQaWVDb21wb25lbnR9IGZyb20gXCIuL2NoYXJ0cy1waWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUNoYXJ0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1jaGFydC9hbmd1bGFyXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIENoYXJ0c1BpZVJvdXRpbmdNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlDaGFydE1vZHVsZSxcblxuICAgICAgICBcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDaGFydHNQaWVDb21wb25lbnRcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2hhcnRzUGllTW9kdWxlIHsgfVxuIl19