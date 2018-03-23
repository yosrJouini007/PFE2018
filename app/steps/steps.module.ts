import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { StepsRoutingModule } from "./steps-routing.module";
import { StepsComponent } from "./steps.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        StepsRoutingModule,
        SharedModule
    ],
    declarations: [
        StepsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class StepsModule { }
