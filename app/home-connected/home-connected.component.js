"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page/page");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var HomeConnectedComponent = (function () {
    function HomeConnectedComponent(_page, router) {
        this._page = _page;
        this.router = router;
    }
    HomeConnectedComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        var stepsData = JSON.parse(application_settings_1.getString("stepsData", "{}"));
        this.steps = stepsData.number;
        var caloriesBurnedData = JSON.parse(application_settings_1.getString("caloriesBurnedData", "{}"));
        this.caloriesBurned = caloriesBurnedData.burned;
        var caloriesConsumedData = JSON.parse(application_settings_1.getString("caloriesConsumedData", "{}"));
        this.caloriesConsumed = caloriesConsumedData.consumed;
        this.mesure = JSON.parse(application_settings_1.getString("mesure", "{}"));
    };
    Object.defineProperty(HomeConnectedComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    HomeConnectedComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    HomeConnectedComponent.prototype.goToSugar = function () {
        this.router.navigate(["/add-glucose"], {
            clearHistory: true,
        });
    };
    HomeConnectedComponent.prototype.goToFood = function () {
        this.router.navigate(["/alimentation"], {
            clearHistory: true,
        });
    };
    HomeConnectedComponent.prototype.goToSteps = function () {
        this.router.navigate(["/steps"], {});
    };
    HomeConnectedComponent.prototype.goToCalories = function () {
        this.router.navigate(["/calories"], {});
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], HomeConnectedComponent.prototype, "drawerComponent", void 0);
    HomeConnectedComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home-connected.component.html",
            styleUrls: ["./home-connected.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions])
    ], HomeConnectedComponent);
    return HomeConnectedComponent;
}());
exports.HomeConnectedComponent = HomeConnectedComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1jb25uZWN0ZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1jb25uZWN0ZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUNyRCxtR0FBdUY7QUFRdkY7SUFVRyxnQ0FBb0IsS0FBVyxFQUFVLE1BQXdCO1FBQTdDLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUdqRSxDQUFDO0lBRUEseUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1EQUFzQixFQUFFLENBQUM7UUFDMUQsSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLGtCQUFrQixHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0NBQVMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxjQUFjLEdBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksb0JBQW9CLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBUyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLGdCQUFnQixHQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0NBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV0RCxDQUFDO0lBRUQsc0JBQUksd0RBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUdELGtEQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFDTSwwQ0FBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDckMsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNNLHlDQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ3RDLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTSwwQ0FBUyxHQUFoQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDZDQUFZLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUNuQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBL0NrQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCO21FQUFDO0lBTnBELHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDaEQsQ0FBQzt5Q0FXNEIsV0FBSSxFQUFrQix5QkFBZ0I7T0FWdkQsc0JBQXNCLENBdURsQztJQUFELDZCQUFDO0NBQUEsQUF2REQsSUF1REM7QUF2RFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLWNvbm5lY3RlZC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9ob21lLWNvbm5lY3RlZC5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb25uZWN0ZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzdGVwczogYW55O1xuICBjYWxvcmllc0J1cm5lZDphbnk7XG4gIGNhbG9yaWVzQ29uc3VtZWQ6YW55O1xuICBtZXN1cmU6YW55O1xuICBcbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMpXG4gICB7XG5cbiAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgIGxldCBzdGVwc0RhdGE9SlNPTi5wYXJzZShnZXRTdHJpbmcoXCJzdGVwc0RhdGFcIiwgXCJ7fVwiKSk7XG4gICAgICAgIHRoaXMuc3RlcHM9c3RlcHNEYXRhLm51bWJlcjtcbiAgICAgICAgbGV0IGNhbG9yaWVzQnVybmVkRGF0YT1KU09OLnBhcnNlKGdldFN0cmluZyhcImNhbG9yaWVzQnVybmVkRGF0YVwiLCBcInt9XCIpKTtcbiAgICAgICAgdGhpcy5jYWxvcmllc0J1cm5lZD1jYWxvcmllc0J1cm5lZERhdGEuYnVybmVkO1xuICAgICAgICBsZXQgY2Fsb3JpZXNDb25zdW1lZERhdGE9SlNPTi5wYXJzZShnZXRTdHJpbmcoXCJjYWxvcmllc0NvbnN1bWVkRGF0YVwiLCBcInt9XCIpKTtcbiAgICAgICAgdGhpcy5jYWxvcmllc0NvbnN1bWVkPWNhbG9yaWVzQ29uc3VtZWREYXRhLmNvbnN1bWVkO1xuICAgICAgICB0aGlzLm1lc3VyZT1KU09OLnBhcnNlKGdldFN0cmluZyhcIm1lc3VyZVwiLCBcInt9XCIpKTtcblxuICAgIH1cblxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG5cbiBcbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuICAgIHB1YmxpYyBnb1RvU3VnYXIoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9hZGQtZ2x1Y29zZVwiXSwge1xuICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBwdWJsaWMgZ29Ub0Zvb2QoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9hbGltZW50YXRpb25cIl0sIHtcbiAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcHVibGljIGdvVG9TdGVwcygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3N0ZXBzXCJdLCB7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBwdWJsaWMgZ29Ub0NhbG9yaWVzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvY2Fsb3JpZXNcIl0sIHtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gXG59XG4iXX0=