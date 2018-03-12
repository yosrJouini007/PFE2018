import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { HomeConnectedRoutingModule } from "./home-connected-routing.module";
import { HomeConnectedComponent } from "./home-connected.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeConnectedRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeConnectedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeConnectedModule { }
