import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeConnectedComponent } from "./home-connected.component";

const routes: Routes = [
    { path: "", component: HomeConnectedComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeConnectedRoutingModule { }
