import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ChartsBubbleComponent} from "./charts-bubble.component";

const routes: Routes = [
    { path: "", component: ChartsBubbleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChartsBubbleRoutingModule { }
