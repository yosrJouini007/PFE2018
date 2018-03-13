"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var sdk_1 = require("./shared/sdk");
var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "alimentation", loadChildren: "./alimentation/alimentation.module#AlimentationModule" },
    { path: "charts", loadChildren: "./charts/charts.module#ChartsModule" },
    { path: "charts-pie", loadChildren: "./charts-pie/charts-pie.module#ChartsPieModule" },
    { path: "charts-bubble", loadChildren: "./charts-bubble/charts-bubble.module#ChartsBubbleModule" },
    { path: "list", loadChildren: "./list/list.module#ListModule" },
    { path: "add-glucose", loadChildren: "./add-glucose/add-glucose.module#AddGlucoseModule" },
    { path: "home-connected", loadChildren: "./home-connected/home-connected.module#HomeConnectedModule" },
    { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
    { path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" },
    { path: "featured", loadChildren: "./featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF5RjtBQUN6RixvQ0FBNEM7QUFFNUMsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsdURBQXVELEVBQUU7SUFDL0YsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxxQ0FBcUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGdEQUFnRCxFQUFFO0lBQ3RGLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUseURBQXlELEVBQUU7SUFDbEcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSwrQkFBK0IsRUFBRTtJQUMvRCxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLG1EQUFtRCxFQUFFO0lBQzFGLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSw0REFBNEQsRUFBRTtJQUN0RyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUscUNBQXFDLEVBQUU7SUFDdkUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxxQ0FBcUMsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLDJDQUEyQyxFQUFFO0lBQy9FLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsMkNBQTJDLEVBQUU7Q0FDbEYsQ0FBQztBQU1GO0lBQ0ksMEJBQ1UsTUFBd0IsRUFDeEIsWUFBMEI7UUFEMUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDakMsQ0FBQztJQUpLLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQzt5Q0FHb0IseUJBQWdCO1lBQ1Ysa0JBQVk7T0FIM0IsZ0JBQWdCLENBSXBCO0lBQUQsdUJBQUM7Q0FBQSxBQUpULElBSVM7QUFKSSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsIFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tIFwiLi9zaGFyZWQvc2RrXCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvaG9tZVwiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXG4gICAgeyBwYXRoOiBcImhvbWVcIiwgbG9hZENoaWxkcmVuOiBcIi4vaG9tZS9ob21lLm1vZHVsZSNIb21lTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYWxpbWVudGF0aW9uXCIsIGxvYWRDaGlsZHJlbjogXCIuL2FsaW1lbnRhdGlvbi9hbGltZW50YXRpb24ubW9kdWxlI0FsaW1lbnRhdGlvbk1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImNoYXJ0c1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9jaGFydHMvY2hhcnRzLm1vZHVsZSNDaGFydHNNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJjaGFydHMtcGllXCIsIGxvYWRDaGlsZHJlbjogXCIuL2NoYXJ0cy1waWUvY2hhcnRzLXBpZS5tb2R1bGUjQ2hhcnRzUGllTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiY2hhcnRzLWJ1YmJsZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi9jaGFydHMtYnViYmxlL2NoYXJ0cy1idWJibGUubW9kdWxlI0NoYXJ0c0J1YmJsZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImxpc3RcIiwgbG9hZENoaWxkcmVuOiBcIi4vbGlzdC9saXN0Lm1vZHVsZSNMaXN0TW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYWRkLWdsdWNvc2VcIiwgbG9hZENoaWxkcmVuOiBcIi4vYWRkLWdsdWNvc2UvYWRkLWdsdWNvc2UubW9kdWxlI0FkZEdsdWNvc2VNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJob21lLWNvbm5lY3RlZFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9ob21lLWNvbm5lY3RlZC9ob21lLWNvbm5lY3RlZC5tb2R1bGUjSG9tZUNvbm5lY3RlZE1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcImF1dGhcIiwgbG9hZENoaWxkcmVuOiBcIi4vYXV0aC9hdXRoLm1vZHVsZSNBdXRoTW9kdWxlXCIgfSxcbiAgICB7IHBhdGg6IFwiYnJvd3NlXCIsIGxvYWRDaGlsZHJlbjogXCIuL2Jyb3dzZS9icm93c2UubW9kdWxlI0Jyb3dzZU1vZHVsZVwiIH0sXG4gICAgeyBwYXRoOiBcInNlYXJjaFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9zZWFyY2gvc2VhcmNoLm1vZHVsZSNTZWFyY2hNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJmZWF0dXJlZFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9mZWF0dXJlZC9mZWF0dXJlZC5tb2R1bGUjRmVhdHVyZWRNb2R1bGVcIiB9LFxuICAgIHsgcGF0aDogXCJzZXR0aW5nc1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9zZXR0aW5ncy9zZXR0aW5ncy5tb2R1bGUjU2V0dGluZ3NNb2R1bGVcIiB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgIHByaXZhdGUgaXNGaXJzdFRpbWU7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgIHByaXZhdGUgbG9vcEJhY2tBdXRoOiBMb29wQmFja0F1dGhcbiAgICApIHt9fVxuIl19