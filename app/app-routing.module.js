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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF5RjtBQUN6RixvQ0FBNEM7QUFFNUMsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0NBQWtDLEVBQUU7SUFDbkUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxxQ0FBcUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLHVEQUF1RCxFQUFFO0lBQy9GLGtGQUFrRjtJQUNsRixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLHFDQUFxQyxFQUFFO0lBQ3ZFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0RBQWdELEVBQUU7SUFDdEYsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxtREFBbUQsRUFBRTtJQUMxRixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsNERBQTRELEVBQUU7SUFDdEcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSwrQkFBK0IsRUFBRTtDQUVsRSxDQUFDO0FBTUY7SUFDSSwwQkFDVSxNQUF3QixFQUN4QixZQUEwQjtRQUQxQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNqQyxDQUFDO0lBSkssZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO3lDQUdvQix5QkFBZ0I7WUFDVixrQkFBWTtPQUgzQixnQkFBZ0IsQ0FJcEI7SUFBRCx1QkFBQztDQUFBLEFBSlQsSUFJUztBQUpJLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSwgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gXCIuL3NoYXJlZC9zZGtcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAgeyBwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIi9ob21lXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcbiAgICB7IHBhdGg6IFwiaG9tZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi9ob21lL2hvbWUubW9kdWxlI0hvbWVNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJpbnRyb1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9pbnRyby9pbnRyby5tb2R1bGUjSW50cm9Nb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJwcm9maWxcIiwgbG9hZENoaWxkcmVuOiBcIi4vcHJvZmlsL3Byb2ZpbC5tb2R1bGUjUHJvZmlsTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYWxpbWVudGF0aW9uXCIsIGxvYWRDaGlsZHJlbjogXCIuL2FsaW1lbnRhdGlvbi9hbGltZW50YXRpb24ubW9kdWxlI0FsaW1lbnRhdGlvbk1vZHVsZVwiIH0sXG4gICAgLy97IHBhdGg6IFwiZXhlcmNpY2VcIiwgbG9hZENoaWxkcmVuOiBcIi4vZXhlcmNpY2UvZXhlcmNpY2UubW9kdWxlI0V4ZXJjaWNlTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiY2hhcnRzXCIsIGxvYWRDaGlsZHJlbjogXCIuL2NoYXJ0cy9jaGFydHMubW9kdWxlI0NoYXJ0c01vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImNoYXJ0cy1waWVcIiwgbG9hZENoaWxkcmVuOiBcIi4vY2hhcnRzLXBpZS9jaGFydHMtcGllLm1vZHVsZSNDaGFydHNQaWVNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJhZGQtZ2x1Y29zZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi9hZGQtZ2x1Y29zZS9hZGQtZ2x1Y29zZS5tb2R1bGUjQWRkR2x1Y29zZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImhvbWUtY29ubmVjdGVkXCIsIGxvYWRDaGlsZHJlbjogXCIuL2hvbWUtY29ubmVjdGVkL2hvbWUtY29ubmVjdGVkLm1vZHVsZSNIb21lQ29ubmVjdGVkTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYXV0aFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9hdXRoL2F1dGgubW9kdWxlI0F1dGhNb2R1bGVcIiB9LFxuICAgXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgIHByaXZhdGUgaXNGaXJzdFRpbWU7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgIHByaXZhdGUgbG9vcEJhY2tBdXRoOiBMb29wQmFja0F1dGhcbiAgICApIHt9fVxuIl19