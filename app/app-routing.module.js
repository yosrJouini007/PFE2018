"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var sdk_1 = require("./shared/sdk");
var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "intro", loadChildren: "./intro/intro.module#IntroModule" },
    { path: "profil", loadChildren: "./profil/profil.module#ProfilModule" },
    { path: "alimentation", loadChildren: "./alimentation/alimentation.module#AlimentationModule" },
    { path: "steps", loadChildren: "./steps/steps.module#StepsModule" },
    //{ path: "exercice", loadChildren: "./exercice/exercice.module#ExerciceModule" },
    { path: "charts", loadChildren: "./charts/charts.module#ChartsModule" },
    { path: "charts-pie", loadChildren: "./charts-pie/charts-pie.module#ChartsPieModule" },
    { path: "add-glucose", loadChildren: "./add-glucose/add-glucose.module#AddGlucoseModule" },
    { path: "home-connected", loadChildren: "./home-connected/home-connected.module#HomeConnectedModule" },
    { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
];
var AppRoutingModule = (function () {
    function AppRoutingModule(router, loopBackAuth) {
        this.router = router;
        this.loopBackAuth = loopBackAuth;
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            sdk_1.LoopBackAuth])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF5RjtBQUN6RixvQ0FBNEM7QUFFNUMsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0NBQWtDLEVBQUU7SUFDbkUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxxQ0FBcUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLHVEQUF1RCxFQUFFO0lBQy9GLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0NBQWtDLEVBQUU7SUFDbkUsa0ZBQWtGO0lBQ2xGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUscUNBQXFDLEVBQUU7SUFDdkUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxnREFBZ0QsRUFBRTtJQUN0RixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLG1EQUFtRCxFQUFFO0lBQzFGLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSw0REFBNEQsRUFBRTtJQUN0RyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0NBRWxFLENBQUM7QUFNRjtJQUNJLDBCQUNVLE1BQXdCLEVBQ3hCLFlBQTBCO1FBRDFCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQ2pDLENBQUM7SUFKSyxnQkFBZ0I7UUFKNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7eUNBR29CLHlCQUFnQjtZQUNWLGtCQUFZO09BSDNCLGdCQUFnQixDQUlwQjtJQUFELHVCQUFDO0NBQUEsQUFKVCxJQUlTO0FBSkksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSBcIi4vc2hhcmVkL3Nka1wiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2hvbWVcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxuICAgIHsgcGF0aDogXCJob21lXCIsIGxvYWRDaGlsZHJlbjogXCIuL2hvbWUvaG9tZS5tb2R1bGUjSG9tZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImludHJvXCIsIGxvYWRDaGlsZHJlbjogXCIuL2ludHJvL2ludHJvLm1vZHVsZSNJbnRyb01vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcInByb2ZpbFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9wcm9maWwvcHJvZmlsLm1vZHVsZSNQcm9maWxNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJhbGltZW50YXRpb25cIiwgbG9hZENoaWxkcmVuOiBcIi4vYWxpbWVudGF0aW9uL2FsaW1lbnRhdGlvbi5tb2R1bGUjQWxpbWVudGF0aW9uTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwic3RlcHNcIiwgbG9hZENoaWxkcmVuOiBcIi4vc3RlcHMvc3RlcHMubW9kdWxlI1N0ZXBzTW9kdWxlXCIgfSxcbiAgICAvL3sgcGF0aDogXCJleGVyY2ljZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi9leGVyY2ljZS9leGVyY2ljZS5tb2R1bGUjRXhlcmNpY2VNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJjaGFydHNcIiwgbG9hZENoaWxkcmVuOiBcIi4vY2hhcnRzL2NoYXJ0cy5tb2R1bGUjQ2hhcnRzTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiY2hhcnRzLXBpZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi9jaGFydHMtcGllL2NoYXJ0cy1waWUubW9kdWxlI0NoYXJ0c1BpZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImFkZC1nbHVjb3NlXCIsIGxvYWRDaGlsZHJlbjogXCIuL2FkZC1nbHVjb3NlL2FkZC1nbHVjb3NlLm1vZHVsZSNBZGRHbHVjb3NlTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiaG9tZS1jb25uZWN0ZWRcIiwgbG9hZENoaWxkcmVuOiBcIi4vaG9tZS1jb25uZWN0ZWQvaG9tZS1jb25uZWN0ZWQubW9kdWxlI0hvbWVDb25uZWN0ZWRNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJhdXRoXCIsIGxvYWRDaGlsZHJlbjogXCIuL2F1dGgvYXV0aC5tb2R1bGUjQXV0aE1vZHVsZVwiIH0sXG4gICBcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUgeyAgcHJpdmF0ZSBpc0ZpcnN0VGltZTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgcHJpdmF0ZSBsb29wQmFja0F1dGg6IExvb3BCYWNrQXV0aFxuICAgICkge319XG4iXX0=