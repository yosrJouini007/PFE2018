"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
//Ui
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var page_1 = require("ui/page");
//Services 
var auth_service_1 = require("../../auth/shared/auth.service");
var application_settings_1 = require("application-settings");
//Redux & RxJS
var store_1 = require("@ngrx/store");
var fromRoot = require("./../reducers");
var MyDrawerComponent = (function () {
    function MyDrawerComponent(routerExtensions, authService, store, eleRef, page) {
        this.routerExtensions = routerExtensions;
        this.authService = authService;
        this.store = store;
        this.eleRef = eleRef;
        this.page = page;
        this.userlogged = false;
    }
    MyDrawerComponent.prototype.ngOnDestroy = function () {
        this.user$.unsubscribe();
    };
    MyDrawerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.on(page_1.Page.unloadedEvent, function (event) {
            _this.ngOnDestroy();
        });
        this.user$ = this.store.select(fromRoot.getUser).subscribe(function (user) {
            if (user) {
                _this.user = user;
            }
            else {
                _this.user = {};
            }
        });
        if (application_settings_1.getBoolean("authenticated", true)) {
            this.userlogged = true;
        }
        else {
            this.userlogged = false;
        }
    };
    MyDrawerComponent.prototype.ngAfterViewInit = function () {
    };
    MyDrawerComponent.prototype.logOut = function () {
        // setBoolean("authenticated", false);
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
        application_settings_1.remove("authenticated");
    };
    /* logOut() {
       this.store.dispatch(new appAction.FireAction("logout"));
        ApplicationSettings.remove("authenticated");
       setTimeout(() => {
         this.store.dispatch(new appAction.RestUserAction());
       }, 200);
     }*/
    MyDrawerComponent.prototype.isPageSelected = function (pageTitle) {
        return pageTitle === this.selectedPage;
    };
    MyDrawerComponent.prototype.gotToEditAccount = function () {
        this.routerExtensions.navigate(["/auth/profil"], {
            queryParams: {
                mode: "edit"
            }
        });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], MyDrawerComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MyDrawerComponent.prototype, "selectedPage", void 0);
    MyDrawerComponent = __decorate([
        core_1.Component({
            selector: "MyDrawer",
            moduleId: module.id,
            templateUrl: "./my-drawer.component.html",
            styleUrls: ["./my-drawer.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            auth_service_1.AuthService,
            store_1.Store,
            core_1.ElementRef,
            page_1.Page])
    ], MyDrawerComponent);
    return MyDrawerComponent;
}());
exports.MyDrawerComponent = MyDrawerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LWRyYXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FPdUI7QUFDdkIsc0RBQStEO0FBRS9ELElBQUk7QUFDSiw4REFBNEU7QUFDNUUsZ0NBQStCO0FBRS9CLFdBQVc7QUFDWCwrREFBNkQ7QUFDN0QsNkRBTzhCO0FBQzlCLGNBQWM7QUFDZCxxQ0FBb0M7QUFDcEMsd0NBQTBDO0FBVTFDO0lBSUUsMkJBQ1UsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLEtBQTRCLEVBQzVCLE1BQWtCLEVBQ2xCLElBQVU7UUFKVixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQU5wQixlQUFVLEdBQVUsS0FBSyxDQUFDO0lBT3RCLENBQUM7SUFNTCx1Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0Qsb0NBQVEsR0FBUjtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxhQUFhLEVBQUUsVUFBQSxLQUFLO1lBQ3BDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsaUNBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQUEsQ0FBQztRQUN4QixJQUFJLENBQ0osQ0FBQztZQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsS0FBSyxDQUFDO1FBQUEsQ0FBQztJQUU3QixDQUFDO0lBRUQsMkNBQWUsR0FBZjtJQUNBLENBQUM7SUFDRCxrQ0FBTSxHQUFOO1FBQ0Msc0NBQXNDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLDZCQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7UUFNSTtJQUVKLDBDQUFjLEdBQWQsVUFBZSxTQUFpQjtRQUM5QixNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDekMsQ0FBQztJQUNELDRDQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMvQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFqRG9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7OERBQUM7SUFFcEQ7UUFBUixZQUFLLEVBQUU7OzJEQUFzQjtJQWZuQixpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3pDLENBQUM7eUNBTTRCLHlCQUFnQjtZQUNyQiwwQkFBVztZQUNqQixhQUFLO1lBQ0osaUJBQVU7WUFDWixXQUFJO09BVFQsaUJBQWlCLENBZ0U3QjtJQUFELHdCQUFDO0NBQUEsQUFoRUQsSUFnRUM7QUFoRVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbi8vVWlcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbi8vU2VydmljZXMgXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9hdXRoL3NoYXJlZC9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7XG4gIGdldEJvb2xlYW4sXG4gIHNldEJvb2xlYW4sXG4gIGdldFN0cmluZyxcbiAgc2V0U3RyaW5nLFxuICByZW1vdmUsXG4gIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuLy9SZWR1eCAmIFJ4SlNcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XG5pbXBvcnQgKiBhcyBmcm9tUm9vdCBmcm9tIFwiLi8uLi9yZWR1Y2Vyc1wiO1xuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJNeURyYXdlclwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL215LWRyYXdlci5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbXktZHJhd2VyLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTXlEcmF3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICB1c2VyO1xuICB1c2VyJDtcbiAgdXNlcmxvZ2dlZDogYm9vbGVhbj1mYWxzZTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPixcbiAgICBwcml2YXRlIGVsZVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2VcbiAgKSB7IH1cblxuXG4gIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIHNlbGVjdGVkUGFnZTogc3RyaW5nO1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVzZXIkLnVuc3Vic2NyaWJlKCk7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlLm9uKFBhZ2UudW5sb2FkZWRFdmVudCwgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgIH0pO1xuICAgIHRoaXMudXNlciQgPSB0aGlzLnN0b3JlLnNlbGVjdChmcm9tUm9vdC5nZXRVc2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51c2VyID0ge307XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpKSB7XG4gICAgICB0aGlzLnVzZXJsb2dnZWQgPSB0cnVlO31cbiAgICAgIGVsc2VcbiAgICAgIHsgdGhpcy51c2VybG9nZ2VkPWZhbHNlO31cbiAgICBcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgfVxuICBsb2dPdXQoKSB7XG4gICAvLyBzZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICByZW1vdmUoXCJhdXRoZW50aWNhdGVkXCIpO1xuICB9XG5cbiAgLyogbG9nT3V0KCkge1xuICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uRmlyZUFjdGlvbihcImxvZ291dFwiKSk7XG4gICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnJlbW92ZShcImF1dGhlbnRpY2F0ZWRcIik7XG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5SZXN0VXNlckFjdGlvbigpKTtcbiAgICAgfSwgMjAwKTtcbiAgIH0qL1xuXG4gIGlzUGFnZVNlbGVjdGVkKHBhZ2VUaXRsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHBhZ2VUaXRsZSA9PT0gdGhpcy5zZWxlY3RlZFBhZ2U7XG4gIH1cbiAgZ290VG9FZGl0QWNjb3VudCgpIHtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2F1dGgvcHJvZmlsXCJdLCB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBtb2RlOiBcImVkaXRcIlxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==