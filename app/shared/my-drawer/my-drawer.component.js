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
        application_settings_1.remove("authenticated");
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LWRyYXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FPdUI7QUFDdkIsc0RBQStEO0FBRS9ELElBQUk7QUFDSiw4REFBNEU7QUFDNUUsZ0NBQStCO0FBRS9CLFdBQVc7QUFDWCwrREFBNkQ7QUFDN0QsNkRBTzhCO0FBQzlCLGNBQWM7QUFDZCxxQ0FBb0M7QUFDcEMsd0NBQTBDO0FBVTFDO0lBSUUsMkJBQ1UsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLEtBQTRCLEVBQzVCLE1BQWtCLEVBQ2xCLElBQVU7UUFKVixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUNoQixDQUFDO0lBTUwsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELG9DQUFRLEdBQVI7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsYUFBYSxFQUFFLFVBQUEsS0FBSztZQUNwQyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQzdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLGlDQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUFBLENBQUM7UUFDeEIsSUFBSSxDQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsVUFBVSxHQUFDLEtBQUssQ0FBQztRQUFBLENBQUM7SUFFN0IsQ0FBQztJQUVELDJDQUFlLEdBQWY7SUFDQSxDQUFDO0lBQ0Qsa0NBQU0sR0FBTjtRQUNFLDZCQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7UUFNSTtJQUVKLDBDQUFjLEdBQWQsVUFBZSxTQUFpQjtRQUM5QixNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDekMsQ0FBQztJQUNELDRDQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMvQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFoRG9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7OERBQUM7SUFFcEQ7UUFBUixZQUFLLEVBQUU7OzJEQUFzQjtJQWZuQixpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3pDLENBQUM7eUNBTTRCLHlCQUFnQjtZQUNyQiwwQkFBVztZQUNqQixhQUFLO1lBQ0osaUJBQVU7WUFDWixXQUFJO09BVFQsaUJBQWlCLENBK0Q3QjtJQUFELHdCQUFDO0NBQUEsQUEvREQsSUErREM7QUEvRFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbi8vVWlcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbi8vU2VydmljZXMgXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9hdXRoL3NoYXJlZC9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7XG4gIGdldEJvb2xlYW4sXG4gIHNldEJvb2xlYW4sXG4gIGdldFN0cmluZyxcbiAgc2V0U3RyaW5nLFxuICByZW1vdmUsXG4gIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuLy9SZWR1eCAmIFJ4SlNcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XG5pbXBvcnQgKiBhcyBmcm9tUm9vdCBmcm9tIFwiLi8uLi9yZWR1Y2Vyc1wiO1xuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJNeURyYXdlclwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL215LWRyYXdlci5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbXktZHJhd2VyLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTXlEcmF3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICB1c2VyO1xuICB1c2VyJDtcbiAgdXNlcmxvZ2dlZDogYm9vbGVhblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8ZnJvbVJvb3QuU3RhdGU+LFxuICAgIHByaXZhdGUgZWxlUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZVxuICApIHsgfVxuXG5cbiAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG5cbiAgQElucHV0KCkgc2VsZWN0ZWRQYWdlOiBzdHJpbmc7XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudXNlciQudW5zdWJzY3JpYmUoKTtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2Uub24oUGFnZS51bmxvYWRlZEV2ZW50LCBldmVudCA9PiB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgfSk7XG4gICAgdGhpcy51c2VyJCA9IHRoaXMuc3RvcmUuc2VsZWN0KGZyb21Sb290LmdldFVzZXIpLnN1YnNjcmliZSh1c2VyID0+IHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVzZXIgPSB7fTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZ2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSkpIHtcbiAgICAgIHRoaXMudXNlcmxvZ2dlZCA9IHRydWU7fVxuICAgICAgZWxzZVxuICAgICAgeyB0aGlzLnVzZXJsb2dnZWQ9ZmFsc2U7fVxuICAgIFxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG4gIGxvZ091dCgpIHtcbiAgICByZW1vdmUoXCJhdXRoZW50aWNhdGVkXCIpO1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gIH1cblxuICAvKiBsb2dPdXQoKSB7XG4gICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5GaXJlQWN0aW9uKFwibG9nb3V0XCIpKTtcbiAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3MucmVtb3ZlKFwiYXV0aGVudGljYXRlZFwiKTtcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlJlc3RVc2VyQWN0aW9uKCkpO1xuICAgICB9LCAyMDApO1xuICAgfSovXG5cbiAgaXNQYWdlU2VsZWN0ZWQocGFnZVRpdGxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcGFnZVRpdGxlID09PSB0aGlzLnNlbGVjdGVkUGFnZTtcbiAgfVxuICBnb3RUb0VkaXRBY2NvdW50KCkge1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvYXV0aC9wcm9maWxcIl0sIHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIG1vZGU6IFwiZWRpdFwiXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIl19