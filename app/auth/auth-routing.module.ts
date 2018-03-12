import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

//Modules
import { NativeScriptRouterModule } from "nativescript-angular/router";

//Components
import { ProfileComponent  } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";




const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "profil", component: ProfileComponent },
    { path: "register", component: RegisterComponent },
    



];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
