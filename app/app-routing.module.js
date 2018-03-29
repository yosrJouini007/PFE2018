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
    { path: "calories", loadChildren: "./calories/calories.module#CaloriesModule" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF5RjtBQUN6RixvQ0FBNEM7QUFFNUMsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0NBQWtDLEVBQUU7SUFDbkUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxxQ0FBcUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLHVEQUF1RCxFQUFFO0lBQy9GLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0NBQWtDLEVBQUU7SUFDbkUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSwyQ0FBMkMsRUFBRTtJQUMvRSxrRkFBa0Y7SUFDbEYsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxxQ0FBcUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGdEQUFnRCxFQUFFO0lBQ3RGLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsbURBQW1ELEVBQUU7SUFDMUYsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLDREQUE0RCxFQUFFO0lBQ3RHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsK0JBQStCLEVBQUU7Q0FFbEUsQ0FBQztBQU1GO0lBQ0ksMEJBQ1UsTUFBd0IsRUFDeEIsWUFBMEI7UUFEMUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDakMsQ0FBQztJQUpLLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQzt5Q0FHb0IseUJBQWdCO1lBQ1Ysa0JBQVk7T0FIM0IsZ0JBQWdCLENBSXBCO0lBQUQsdUJBQUM7Q0FBQSxBQUpULElBSVM7QUFKSSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsIFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tIFwiLi9zaGFyZWQvc2RrXCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvaG9tZVwiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXG4gICAgeyBwYXRoOiBcImhvbWVcIiwgbG9hZENoaWxkcmVuOiBcIi4vaG9tZS9ob21lLm1vZHVsZSNIb21lTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiaW50cm9cIiwgbG9hZENoaWxkcmVuOiBcIi4vaW50cm8vaW50cm8ubW9kdWxlI0ludHJvTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwicHJvZmlsXCIsIGxvYWRDaGlsZHJlbjogXCIuL3Byb2ZpbC9wcm9maWwubW9kdWxlI1Byb2ZpbE1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImFsaW1lbnRhdGlvblwiLCBsb2FkQ2hpbGRyZW46IFwiLi9hbGltZW50YXRpb24vYWxpbWVudGF0aW9uLm1vZHVsZSNBbGltZW50YXRpb25Nb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJzdGVwc1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9zdGVwcy9zdGVwcy5tb2R1bGUjU3RlcHNNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJjYWxvcmllc1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9jYWxvcmllcy9jYWxvcmllcy5tb2R1bGUjQ2Fsb3JpZXNNb2R1bGVcIiB9LFxuICAgIC8veyBwYXRoOiBcImV4ZXJjaWNlXCIsIGxvYWRDaGlsZHJlbjogXCIuL2V4ZXJjaWNlL2V4ZXJjaWNlLm1vZHVsZSNFeGVyY2ljZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImNoYXJ0c1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9jaGFydHMvY2hhcnRzLm1vZHVsZSNDaGFydHNNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJjaGFydHMtcGllXCIsIGxvYWRDaGlsZHJlbjogXCIuL2NoYXJ0cy1waWUvY2hhcnRzLXBpZS5tb2R1bGUjQ2hhcnRzUGllTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYWRkLWdsdWNvc2VcIiwgbG9hZENoaWxkcmVuOiBcIi4vYWRkLWdsdWNvc2UvYWRkLWdsdWNvc2UubW9kdWxlI0FkZEdsdWNvc2VNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJob21lLWNvbm5lY3RlZFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9ob21lLWNvbm5lY3RlZC9ob21lLWNvbm5lY3RlZC5tb2R1bGUjSG9tZUNvbm5lY3RlZE1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImF1dGhcIiwgbG9hZENoaWxkcmVuOiBcIi4vYXV0aC9hdXRoLm1vZHVsZSNBdXRoTW9kdWxlXCIgfSxcbiAgIFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7ICBwcml2YXRlIGlzRmlyc3RUaW1lO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICBwcml2YXRlIGxvb3BCYWNrQXV0aDogTG9vcEJhY2tBdXRoXG4gICAgKSB7fX1cbiJdfQ==