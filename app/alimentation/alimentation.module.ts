import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { SharedModule } from "../shared/shared.module";
import { AlimentationRoutingModule } from "./alimentation-routing.module";
import { AlimentationComponent } from "./alimentation.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { ValidateService } from './validate.service';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AlimentationRoutingModule,
        SharedModule,
        NativeScriptHttpModule,
        NativeScriptUIChartModule,
        NativeScriptFormsModule,
        NativeScriptUIAutoCompleteTextViewModule
    ],
   
    declarations: [
        AlimentationComponent,
    ],
    providers:[ValidateService,
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AlimentationModule { }
