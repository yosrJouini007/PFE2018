"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../shared/shared.module");
var charts_bubble_routing_module_1 = require("./charts-bubble-routing.module");
var charts_bubble_component_1 = require("./charts-bubble.component");
var angular_1 = require("nativescript-ui-chart/angular");
var ChartsBubbleModule = (function () {
    function ChartsBubbleModule() {
    }
    ChartsBubbleModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                charts_bubble_routing_module_1.ChartsBubbleRoutingModule,
                shared_module_1.SharedModule,
                angular_1.NativeScriptUIChartModule,
            ],
            declarations: [
                charts_bubble_component_1.ChartsBubbleComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], ChartsBubbleModule);
    return ChartsBubbleModule;
}());
exports.ChartsBubbleModule = ChartsBubbleModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRzLWJ1YmJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGFydHMtYnViYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFFdkUseURBQXVEO0FBQ3ZELCtFQUEyRTtBQUMzRSxxRUFBaUU7QUFDakUseURBQTBFO0FBa0IxRTtJQUFBO0lBQWtDLENBQUM7SUFBdEIsa0JBQWtCO1FBaEI5QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix3REFBeUI7Z0JBQ3pCLDRCQUFZO2dCQUNaLG1DQUF5QjthQUc1QjtZQUNELFlBQVksRUFBRTtnQkFDViwrQ0FBcUI7YUFDeEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGtCQUFrQixDQUFJO0lBQUQseUJBQUM7Q0FBQSxBQUFuQyxJQUFtQztBQUF0QixnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ2hhcnRzQnViYmxlUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2NoYXJ0cy1idWJibGUtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IENoYXJ0c0J1YmJsZUNvbXBvbmVudH0gZnJvbSBcIi4vY2hhcnRzLWJ1YmJsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQ2hhcnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWNoYXJ0L2FuZ3VsYXJcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ2hhcnRzQnViYmxlUm91dGluZ01vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSUNoYXJ0TW9kdWxlLFxuXG4gICAgICAgIFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENoYXJ0c0J1YmJsZUNvbXBvbmVudFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGFydHNCdWJibGVNb2R1bGUgeyB9XG4iXX0=