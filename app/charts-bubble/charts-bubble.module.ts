import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { ChartsBubbleRoutingModule } from "./charts-bubble-routing.module";
import { ChartsBubbleComponent} from "./charts-bubble.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ChartsBubbleRoutingModule,
        SharedModule,
        NativeScriptUIChartModule,

        
    ],
    declarations: [
        ChartsBubbleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChartsBubbleModule { }
