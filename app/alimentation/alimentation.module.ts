import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { AlimentationRoutingModule } from "./alimentation-routing.module";
import { AlimentationComponent } from "./alimentation.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { ValidateService } from './validate.service';
import { FormsModule } from "@angular/forms";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AlimentationRoutingModule,
        SharedModule,
        NativeScriptUIChartModule,
        FormsModule,
        NativeScriptUIAutoCompleteTextViewModule
    ],
   
    declarations: [
        AlimentationComponent,
    ],
    providers:[ValidateService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AlimentationModule { }
