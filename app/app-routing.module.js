"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var sdk_1 = require("./shared/sdk");
var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "alimentation", loadChildren: "./alimentation/alimentation.module#AlimentationModule" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF5RjtBQUN6RixvQ0FBNEM7QUFFNUMsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsdURBQXVELEVBQUU7SUFDL0Ysa0ZBQWtGO0lBQ2xGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUscUNBQXFDLEVBQUU7SUFDdkUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxnREFBZ0QsRUFBRTtJQUN0RixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLG1EQUFtRCxFQUFFO0lBQzFGLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSw0REFBNEQsRUFBRTtJQUN0RyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0NBRWxFLENBQUM7QUFNRjtJQUNJLDBCQUNVLE1BQXdCLEVBQ3hCLFlBQTBCO1FBRDFCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQ2pDLENBQUM7SUFKSyxnQkFBZ0I7UUFKNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7eUNBR29CLHlCQUFnQjtZQUNWLGtCQUFZO09BSDNCLGdCQUFnQixDQUlwQjtJQUFELHVCQUFDO0NBQUEsQUFKVCxJQUlTO0FBSkksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSBcIi4vc2hhcmVkL3Nka1wiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2hvbWVcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxuICAgIHsgcGF0aDogXCJob21lXCIsIGxvYWRDaGlsZHJlbjogXCIuL2hvbWUvaG9tZS5tb2R1bGUjSG9tZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImFsaW1lbnRhdGlvblwiLCBsb2FkQ2hpbGRyZW46IFwiLi9hbGltZW50YXRpb24vYWxpbWVudGF0aW9uLm1vZHVsZSNBbGltZW50YXRpb25Nb2R1bGVcIiB9LFxuICAgIC8veyBwYXRoOiBcImV4ZXJjaWNlXCIsIGxvYWRDaGlsZHJlbjogXCIuL2V4ZXJjaWNlL2V4ZXJjaWNlLm1vZHVsZSNFeGVyY2ljZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImNoYXJ0c1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9jaGFydHMvY2hhcnRzLm1vZHVsZSNDaGFydHNNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJjaGFydHMtcGllXCIsIGxvYWRDaGlsZHJlbjogXCIuL2NoYXJ0cy1waWUvY2hhcnRzLXBpZS5tb2R1bGUjQ2hhcnRzUGllTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYWRkLWdsdWNvc2VcIiwgbG9hZENoaWxkcmVuOiBcIi4vYWRkLWdsdWNvc2UvYWRkLWdsdWNvc2UubW9kdWxlI0FkZEdsdWNvc2VNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJob21lLWNvbm5lY3RlZFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9ob21lLWNvbm5lY3RlZC9ob21lLWNvbm5lY3RlZC5tb2R1bGUjSG9tZUNvbm5lY3RlZE1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImF1dGhcIiwgbG9hZENoaWxkcmVuOiBcIi4vYXV0aC9hdXRoLm1vZHVsZSNBdXRoTW9kdWxlXCIgfSxcbiAgIFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7ICBwcml2YXRlIGlzRmlyc3RUaW1lO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICBwcml2YXRlIGxvb3BCYWNrQXV0aDogTG9vcEJhY2tBdXRoXG4gICAgKSB7fX1cbiJdfQ==