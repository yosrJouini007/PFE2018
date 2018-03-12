import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';

//Components
import { ProfileComponent  } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

//Modules
import { NSModuleFactoryLoader } from 'nativescript-angular/router';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import * as listViewModule from "tns-core-modules/ui/list-view";
import { SharedModule } from "../shared/shared.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { HomeRoutingModule } from "./auth-routing.module";

//Services & Helpers
import { ValidateService } from './shared/validate.service';
import { AuthService } from './shared/auth.service';

@NgModule({
    imports: [
        NativeScriptModule,
        HomeRoutingModule,
        SharedModule,
        NativeScriptFormsModule,
        NativeScriptModule,
        NativeScriptHttpModule,

    ],
    entryComponents: [
       
    ],
    declarations: [
        ProfileComponent,
        LoginComponent,
        RegisterComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        AuthService, 
        ValidateService,
        

        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }

    ]
})
export class AuthModule { }
