import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule, Store } from "@ngrx/store";
import { reducers } from "./shared/reducers";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./shared/effects/app.effect";
import { Actions } from "@ngrx/effects";
import { SDKNativeModule } from "./shared/sdk/index";
import {NativeScriptHttpModule} from 'nativescript-angular/http';
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        SDKNativeModule.forRoot(),
        StoreModule.forRoot(reducers),
       EffectsModule.forRoot([AppEffects]),
       NativeScriptHttpModule,
       NativeScriptUIChartModule
    ],
    declarations: [
        AppComponent
    ],
  
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader}
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
