"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var sdk_1 = require("./shared/sdk");
var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "intro", loadChildren: "./intro/intro.module#IntroModule" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF5RjtBQUN6RixvQ0FBNEM7QUFFNUMsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0NBQWtDLEVBQUU7SUFDbkUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSx1REFBdUQsRUFBRTtJQUMvRixrRkFBa0Y7SUFDbEYsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxxQ0FBcUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGdEQUFnRCxFQUFFO0lBQ3RGLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsbURBQW1ELEVBQUU7SUFDMUYsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLDREQUE0RCxFQUFFO0lBQ3RHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsK0JBQStCLEVBQUU7Q0FFbEUsQ0FBQztBQU1GO0lBQ0ksMEJBQ1UsTUFBd0IsRUFDeEIsWUFBMEI7UUFEMUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDakMsQ0FBQztJQUpLLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQzt5Q0FHb0IseUJBQWdCO1lBQ1Ysa0JBQVk7T0FIM0IsZ0JBQWdCLENBSXBCO0lBQUQsdUJBQUM7Q0FBQSxBQUpULElBSVM7QUFKSSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsIFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tIFwiLi9zaGFyZWQvc2RrXCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvaG9tZVwiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXG4gICAgeyBwYXRoOiBcImhvbWVcIiwgbG9hZENoaWxkcmVuOiBcIi4vaG9tZS9ob21lLm1vZHVsZSNIb21lTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiaW50cm9cIiwgbG9hZENoaWxkcmVuOiBcIi4vaW50cm8vaW50cm8ubW9kdWxlI0ludHJvTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYWxpbWVudGF0aW9uXCIsIGxvYWRDaGlsZHJlbjogXCIuL2FsaW1lbnRhdGlvbi9hbGltZW50YXRpb24ubW9kdWxlI0FsaW1lbnRhdGlvbk1vZHVsZVwiIH0sXG4gICAgLy97IHBhdGg6IFwiZXhlcmNpY2VcIiwgbG9hZENoaWxkcmVuOiBcIi4vZXhlcmNpY2UvZXhlcmNpY2UubW9kdWxlI0V4ZXJjaWNlTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiY2hhcnRzXCIsIGxvYWRDaGlsZHJlbjogXCIuL2NoYXJ0cy9jaGFydHMubW9kdWxlI0NoYXJ0c01vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImNoYXJ0cy1waWVcIiwgbG9hZENoaWxkcmVuOiBcIi4vY2hhcnRzLXBpZS9jaGFydHMtcGllLm1vZHVsZSNDaGFydHNQaWVNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJhZGQtZ2x1Y29zZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi9hZGQtZ2x1Y29zZS9hZGQtZ2x1Y29zZS5tb2R1bGUjQWRkR2x1Y29zZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImhvbWUtY29ubmVjdGVkXCIsIGxvYWRDaGlsZHJlbjogXCIuL2hvbWUtY29ubmVjdGVkL2hvbWUtY29ubmVjdGVkLm1vZHVsZSNIb21lQ29ubmVjdGVkTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYXV0aFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9hdXRoL2F1dGgubW9kdWxlI0F1dGhNb2R1bGVcIiB9LFxuICAgXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgIHByaXZhdGUgaXNGaXJzdFRpbWU7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgIHByaXZhdGUgbG9vcEJhY2tBdXRoOiBMb29wQmFja0F1dGhcbiAgICApIHt9fVxuIl19