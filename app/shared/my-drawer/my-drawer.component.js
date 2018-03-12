"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
//Ui
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var page_1 = require("ui/page");
//Services 
var auth_service_1 = require("../../auth/shared/auth.service");
//Redux & RxJS
var store_1 = require("@ngrx/store");
var fromRoot = require("./../reducers");
var appAction = require("./../actions/app.actions");
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
    };
    MyDrawerComponent.prototype.ngAfterViewInit = function () {
    };
    MyDrawerComponent.prototype.logOut = function () {
        var _this = this;
        this.store.dispatch(new appAction.FireAction("logout"));
        setTimeout(function () {
            _this.store.dispatch(new appAction.RestUserAction());
        }, 200);
    };
    MyDrawerComponent.prototype.isPageSelected = function (pageTitle) {
        return pageTitle === this.selectedPage;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LWRyYXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FPeUI7QUFDdkIsc0RBQStEO0FBRS9ELElBQUk7QUFDSiw4REFBNEU7QUFDNUUsZ0NBQStCO0FBRS9CLFdBQVc7QUFDWCwrREFBNkQ7QUFFN0QsY0FBYztBQUNkLHFDQUFvQztBQUNwQyx3Q0FBMEM7QUFDMUMsb0RBQXNEO0FBUXREO0lBR0UsMkJBQ1UsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLEtBQTRCLEVBQzVCLE1BQWtCLEVBQ2xCLElBQVU7UUFKVixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUNoQixDQUFDO0lBTUwsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELG9DQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxhQUFhLEVBQUUsVUFBQSxLQUFLO1lBQ3BDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFlLEdBQWY7SUFDQSxDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDeEQsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLFNBQWlCO1FBQzlCLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN6QyxDQUFDO0lBL0JvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzhEQUFDO0lBRXBEO1FBQVIsWUFBSyxFQUFFOzsyREFBc0I7SUFkbkIsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN6QyxDQUFDO3lDQUs0Qix5QkFBZ0I7WUFDckIsMEJBQVc7WUFDakIsYUFBSztZQUNKLGlCQUFVO1lBQ1osV0FBSTtPQVJULGlCQUFpQixDQThDN0I7SUFBRCx3QkFBQztDQUFBLEFBOUNELElBOENDO0FBOUNZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBFbGVtZW50UmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBBZnRlclZpZXdJbml0XG4gIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbiAgaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbiAgXG4gIC8vVWlcbiAgaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG4gIGltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuICBcbiAgLy9TZXJ2aWNlcyBcbiAgaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vYXV0aC9zaGFyZWQvYXV0aC5zZXJ2aWNlXCI7XG4gIFxuICAvL1JlZHV4ICYgUnhKU1xuICBpbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xuICBpbXBvcnQgKiBhcyBmcm9tUm9vdCBmcm9tIFwiLi8uLi9yZWR1Y2Vyc1wiO1xuICBpbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vYWN0aW9ucy9hcHAuYWN0aW9uc1wiO1xuICBcbiAgQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiTXlEcmF3ZXJcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbXktZHJhd2VyLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL215LWRyYXdlci5jb21wb25lbnQuY3NzXCJdXG4gIH0pXG4gIGV4cG9ydCBjbGFzcyBNeURyYXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgdXNlcjtcbiAgICB1c2VyJDtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8ZnJvbVJvb3QuU3RhdGU+LFxuICAgICAgcHJpdmF0ZSBlbGVSZWY6IEVsZW1lbnRSZWYsXG4gICAgICBwcml2YXRlIHBhZ2U6IFBhZ2VcbiAgICApIHsgfVxuICAgIFxuICBcbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgXG4gICAgQElucHV0KCkgc2VsZWN0ZWRQYWdlOiBzdHJpbmc7XG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICB0aGlzLnVzZXIkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UudW5sb2FkZWRFdmVudCwgZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudXNlciQgPSB0aGlzLnN0b3JlLnNlbGVjdChmcm9tUm9vdC5nZXRVc2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVzZXIgPSB7fTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgfVxuICBcbiAgICBsb2dPdXQoKSB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uRmlyZUFjdGlvbihcImxvZ291dFwiKSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlJlc3RVc2VyQWN0aW9uKCkpO1xuICAgICAgfSwgMjAwKTtcbiAgICB9XG4gIFxuICAgIGlzUGFnZVNlbGVjdGVkKHBhZ2VUaXRsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gcGFnZVRpdGxlID09PSB0aGlzLnNlbGVjdGVkUGFnZTtcbiAgICB9XG4gIFxuICBcbiAgfVxuICAiXX0=