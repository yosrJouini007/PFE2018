import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { ChartsPieRoutingModule } from "./charts-pie-routing.module";
import { ChartsPieComponent} from "./charts-pie.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ChartsPieRoutingModule,
        SharedModule,
        NativeScriptUIChartModule,

        
    ],
    declarations: [
        ChartsPieComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChartsPieModule { }
