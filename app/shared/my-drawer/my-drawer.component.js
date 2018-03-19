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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LWRyYXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FPeUI7QUFDdkIsc0RBQStEO0FBRS9ELElBQUk7QUFDSiw4REFBNEU7QUFDNUUsZ0NBQStCO0FBRS9CLFdBQVc7QUFDWCwrREFBNkQ7QUFFN0QsY0FBYztBQUNkLHFDQUFvQztBQUNwQyx3Q0FBMEM7QUFDMUMsb0RBQXNEO0FBUXREO0lBR0UsMkJBQ1UsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLEtBQTRCLEVBQzVCLE1BQWtCLEVBQ2xCLElBQVU7UUFKVixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUNoQixDQUFDO0lBTUwsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELG9DQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxhQUFhLEVBQUUsVUFBQSxLQUFLO1lBQ3BDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFlLEdBQWY7SUFDQSxDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDeEQsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLFNBQWlCO1FBQzlCLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN6QyxDQUFDO0lBQ0QsNENBQWdCLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQy9DLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXRDb0I7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWtCLGdDQUFzQjs4REFBQztJQUVwRDtRQUFSLFlBQUssRUFBRTs7MkRBQXNCO0lBZG5CLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDekMsQ0FBQzt5Q0FLNEIseUJBQWdCO1lBQ3JCLDBCQUFXO1lBQ2pCLGFBQUs7WUFDSixpQkFBVTtZQUNaLFdBQUk7T0FSVCxpQkFBaUIsQ0FvRDdCO0lBQUQsd0JBQUM7Q0FBQSxBQXBERCxJQW9EQztBQXBEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgQWZ0ZXJWaWV3SW5pdFxuICB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4gIGltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG4gIFxuICAvL1VpXG4gIGltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuICBpbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbiAgXG4gIC8vU2VydmljZXMgXG4gIGltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2F1dGgvc2hhcmVkL2F1dGguc2VydmljZVwiO1xuICBcbiAgLy9SZWR1eCAmIFJ4SlNcbiAgaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcbiAgaW1wb3J0ICogYXMgZnJvbVJvb3QgZnJvbSBcIi4vLi4vcmVkdWNlcnNcIjtcbiAgaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcbiAgXG4gIEBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIk15RHJhd2VyXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL215LWRyYXdlci5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9teS1kcmF3ZXIuY29tcG9uZW50LmNzc1wiXVxuICB9KVxuICBleHBvcnQgY2xhc3MgTXlEcmF3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIHVzZXI7XG4gICAgdXNlciQ7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPixcbiAgICAgIHByaXZhdGUgZWxlUmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlXG4gICAgKSB7IH1cbiAgICBcbiAgXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIFxuICAgIEBJbnB1dCgpIHNlbGVjdGVkUGFnZTogc3RyaW5nO1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgdGhpcy51c2VyJC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgIHRoaXMucGFnZS5vbihQYWdlLnVubG9hZGVkRXZlbnQsIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnVzZXIkID0gdGhpcy5zdG9yZS5zZWxlY3QoZnJvbVJvb3QuZ2V0VXNlcikuc3Vic2NyaWJlKHVzZXIgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51c2VyID0ge307XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIH1cbiAgXG4gICAgbG9nT3V0KCkge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkZpcmVBY3Rpb24oXCJsb2dvdXRcIikpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5SZXN0VXNlckFjdGlvbigpKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgfVxuICBcbiAgICBpc1BhZ2VTZWxlY3RlZChwYWdlVGl0bGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHBhZ2VUaXRsZSA9PT0gdGhpcy5zZWxlY3RlZFBhZ2U7XG4gICAgfVxuICAgIGdvdFRvRWRpdEFjY291bnQoKSB7XG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2F1dGgvcHJvZmlsXCJdLCB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgbW9kZTogXCJlZGl0XCJcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICBcbiAgfVxuICAiXX0=