import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, RouterExtensions } from "nativescript-angular/router";
import { LoopBackAuth } from "./shared/sdk";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "intro", loadChildren: "./intro/intro.module#IntroModule" },
    { path: "profil", loadChildren: "./profil/profil.module#ProfilModule" },
    { path: "alimentation", loadChildren: "./alimentation/alimentation.module#AlimentationModule" },
    { path: "steps", loadChildren: "./steps/steps.module#StepsModule" },
    { path: "calories", loadChildren: "./calories/calories.module#CaloriesModule" },
    //{ path: "exercice", loadChildren: "./exercice/exercice.module#ExerciceModule" },
    { path: "charts", loadChildren: "./charts/charts.module#ChartsModule" },
    { path: "charts-pie", loadChildren: "./charts-pie/charts-pie.module#ChartsPieModule" },
    { path: "add-glucose", loadChildren: "./add-glucose/add-glucose.module#AddGlucoseModule" },
    { path: "home-connected", loadChildren: "./home-connected/home-connected.module#HomeConnectedModule" },
    { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
   
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {  private isFirstTime;
    constructor(
      private router: RouterExtensions,
      private loopBackAuth: LoopBackAuth
    ) {}}
