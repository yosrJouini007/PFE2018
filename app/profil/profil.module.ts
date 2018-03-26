import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { ProfilRoutingModule } from "./profil-routing.module";
import { ProfilComponent } from "./profil.component";
import { SlidesModule } from "nativescript-ngx-slides";
import {registerElement} from "nativescript-angular/element-registry";
 
registerElement("Ripple", () => require("nativescript-ripple").Ripple);
@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProfilRoutingModule,
        SharedModule,
        SlidesModule
    ],
    declarations: [
        ProfilComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProfilModule { }
