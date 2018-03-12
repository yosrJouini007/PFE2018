import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ChartsPieComponent} from "./charts-pie.component";

const routes: Routes = [
    { path: "", component: ChartsPieComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChartsPieRoutingModule { }
