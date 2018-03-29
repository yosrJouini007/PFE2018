import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { CaloriesRoutingModule } from "./calories-routing.module";
import { CaloriesComponent } from "./calories.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CaloriesRoutingModule,
        SharedModule
    ],
    declarations: [
        CaloriesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CaloriesModule { }
