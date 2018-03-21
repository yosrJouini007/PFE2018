import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SlidesModule } from "nativescript-ngx-slides";
import { SharedModule } from "../shared/shared.module";
import { IntroRoutingModule } from "./intro-routing.module";
import { IntroComponent } from "./intro.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        IntroRoutingModule ,
        SharedModule,
        SlidesModule
    ],
    declarations: [
        IntroComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class IntroModule { }
