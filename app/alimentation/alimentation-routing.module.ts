import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import {AlimentationComponent } from "./alimentation.component";

const routes: Routes = [
    { path: "", component: AlimentationComponent },
 
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AlimentationRoutingModule { }
