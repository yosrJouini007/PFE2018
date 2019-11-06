import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { AddGlucoseRoutingModule } from "./add-glucose-routing.module";
import { AddGlucoseComponent } from "./add-glucose.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { ValidateService } from './validate.service';
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddGlucoseRoutingModule,
        SharedModule,
        NativeScriptUIChartModule,
        NativeScriptFormsModule,
    ],
   
    declarations: [
        AddGlucoseComponent,
    ],
    providers:[ValidateService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddGlucoseModule { }
