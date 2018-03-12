import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { ChartsRoutingModule } from "./charts-routing.module";
import { ChartsComponent } from "./charts.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ChartsRoutingModule,
        SharedModule,
        NativeScriptUIChartModule,

        
    ],
    declarations: [
        ChartsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChartsModule { }
