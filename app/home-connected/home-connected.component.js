"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page/page");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var platform_1 = require("platform");
var moment = require("moment");
moment.locale("fr");
var HomeConnectedComponent = (function () {
    function HomeConnectedComponent(_page, router) {
        this._page = _page;
        this.router = router;
        this.history = [];
        this.showHistory = false;
        this.showHome = true;
        this.currentDateHolder = "";
        this.currentDate = new Date();
        this.currentDateHolder = moment(this.currentDate, "mm/dd/yyyy hh:mm").format('LLLL');
        var date = new Date('2018-04-18T10:20:30Z');
        this.history = [{ mesure: 2, date: date, steps: 32, caloriesBurned: 16, caloriesConsumed: 110, day: this.currentDateHolder }];
    }
    Object.defineProperty(HomeConnectedComponent.prototype, "historyLayout", {
        get: function () {
            return this.historyLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeConnectedComponent.prototype, "screenHeight", {
        get: function () {
            return platform_1.screen.mainScreen.heightDIPs;
        },
        enumerable: true,
        configurable: true
    });
    HomeConnectedComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        this.historyLayout.translateY = this.screenHeight;
        if (!application_settings_1.getBoolean("authenticated", false)) {
            this.router.navigate(["auth/login"], { clearHistory: true });
        }
        var stepsData = JSON.parse(application_settings_1.getString("stepsData", "{}"));
        this.steps = stepsData.number;
        var caloriesBurnedData = JSON.parse(application_settings_1.getString("caloriesBurnedData", "{}"));
        this.caloriesBurned = caloriesBurnedData.burned;
        var caloriesConsumedData = JSON.parse(application_settings_1.getString("caloriesConsumedData", "{}"));
        this.caloriesConsumed = caloriesConsumedData.consumed;
        this.mesure = JSON.parse(application_settings_1.getString("mesure", "{}")).mesure;
        this.historyData = JSON.parse(application_settings_1.getString("history", "{}"));
        this.initFoodItems(this.historyData, this.history);
        this.saveHistory();
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
    HomeConnectedComponent.prototype.saveHistory = function () {
        //  let midnight = new Date();
        //  midnight.setHours(24, 0, 0, 0);
        // if (midnight == this.currentDate) 
        var length = this.history.length;
        var lastDate = new Date(this.history[length - 1].date).getDate();
        if (this.currentDate.getDate() != lastDate) {
            this.history.push({
                mesure: this.mesure, caloriesBurned: this.caloriesBurned, caloriesConsumed: this.caloriesConsumed,
                steps: this.steps, day: this.currentDateHolder, date: this.currentDate
            });
            application_settings_1.setString("history", JSON.stringify(this.history));
        }
        else if (this.history[length - 1].mesure != this.mesure || this.history[length - 1].steps != this.steps || this.history[length - 1].caloriesConsumed != this.caloriesConsumed || this.history[length - 1].caloriesBurned != this.caloriesBurned) {
            this.history.pop();
            this.history.push({
                mesure: this.mesure, caloriesBurned: this.caloriesBurned, caloriesConsumed: this.caloriesConsumed,
                steps: this.steps, day: this.currentDateHolder, date: this.currentDate
            });
            application_settings_1.setString("history", JSON.stringify(this.history));
        }
    };
    HomeConnectedComponent.prototype.initFoodItems = function (args1, args2) {
        //this._items = new ObservableArray<any>();
        for (var i = 0; i < args1.length; i++) {
            args2.push(args1[i]);
        }
    };
    HomeConnectedComponent.prototype.goToHistory = function () {
        this.historyLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 200,
            opacity: 1
        });
        this.showHistory = true;
        this.showHome = false;
    };
    HomeConnectedComponent.prototype.closeHistory = function () {
        this.showHistory = false;
        this.showHome = true;
        this.historyLayout
            .animate({
            translate: { x: 0, y: this.screenHeight },
            duration: 250,
            opacity: 0
        });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], HomeConnectedComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.ViewChild("historyLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], HomeConnectedComponent.prototype, "historyLayoutRef", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1jb25uZWN0ZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1jb25uZWN0ZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUNyRCxtR0FBc0g7QUFFdEgscUNBQWtDO0FBQ2xDLCtCQUFpQztBQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBUXBCO0lBd0JFLGdDQUFvQixLQUFXLEVBQVUsTUFBd0I7UUFBN0MsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBbEIxRCxZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQzlCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFbEIsc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBZXBDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDcEYsSUFBSSxJQUFJLEdBQUMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLEVBQUUsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLGdCQUFnQixFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBYkQsc0JBQVksaURBQWE7YUFBekI7WUFDRSxNQUFNLENBQUMs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QyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhO2FBQ2YsT0FBTyxDQUFDO1lBQ1AsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN6QyxRQUFRLEVBQUUsR0FBRztZQUNiLE9BQU8sRUFBRSxDQUFDO1NBQ1gsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQXJIb0I7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWtCLGdDQUFzQjttRUFBQztJQUNqQztRQUEzQixnQkFBUyxDQUFDLGVBQWUsQ0FBQztrQ0FBbUIsaUJBQVU7b0VBQUM7SUFiOUMsc0JBQXNCO1FBTmxDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUM5QyxDQUFDO3lDQXlCMkIsV0FBSSxFQUFrQix5QkFBZ0I7T0F4QnRELHNCQUFzQixDQW1JbEM7SUFBRCw2QkFBQztDQUFBLEFBbklELElBbUlDO0FBbklZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2VcIjtcbmltcG9ydCB7IGdldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0U3RyaW5nLCByZW1vdmUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQWJzb2x1dGVMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dC9hYnNvbHV0ZS1sYXlvdXRcIjtcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbm1vbWVudC5sb2NhbGUoXCJmclwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIkhvbWVcIixcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLWNvbm5lY3RlZC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vaG9tZS1jb25uZWN0ZWQuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29ubmVjdGVkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaGlzdG9yeURhdGE6IGFueTtcbiAgc3RlcHM6IGFueTtcbiAgY2Fsb3JpZXNCdXJuZWQ6IGFueTtcbiAgY2Fsb3JpZXNDb25zdW1lZDogYW55O1xuICBtZXN1cmU6IGFueTtcbiAgcHVibGljIGhpc3Rvcnk6IEFycmF5PGFueT49W107XG4gIHNob3dIaXN0b3J5OiBib29sZWFuID0gZmFsc2U7XG4gIHNob3dIb21lOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGN1cnJlbnREYXRlOiBEYXRlO1xuICBwdWJsaWMgY3VycmVudERhdGVIb2xkZXI6IHN0cmluZyA9IFwiXCI7XG5cbiAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJoaXN0b3J5TGF5b3V0XCIpIGhpc3RvcnlMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICBwcml2YXRlIGdldCBoaXN0b3J5TGF5b3V0KCk6IEFic29sdXRlTGF5b3V0IHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5TGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIGdldCBzY3JlZW5IZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZUhvbGRlciA9IG1vbWVudCh0aGlzLmN1cnJlbnREYXRlLCBcIm1tL2RkL3l5eXkgaGg6bW1cIikuZm9ybWF0KCdMTExMJylcbiAgICBsZXQgZGF0ZT1uZXcgRGF0ZSgnMjAxOC0wNC0xOFQxMDoyMDozMFonKTtcbiAgICB0aGlzLmhpc3RvcnkgPSBbe21lc3VyZToyLGRhdGU6ZGF0ZSwgc3RlcHM6MzIsY2Fsb3JpZXNCdXJuZWQ6MTYsY2Fsb3JpZXNDb25zdW1lZDoxMTAsZGF5OnRoaXMuY3VycmVudERhdGVIb2xkZXJ9XTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICB0aGlzLmhpc3RvcnlMYXlvdXQudHJhbnNsYXRlWSA9IHRoaXMuc2NyZWVuSGVpZ2h0O1xuICAgIGlmICghZ2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJhdXRoL2xvZ2luXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgbGV0IHN0ZXBzRGF0YSA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwic3RlcHNEYXRhXCIsIFwie31cIikpO1xuICAgIHRoaXMuc3RlcHMgPSBzdGVwc0RhdGEubnVtYmVyO1xuICAgIGxldCBjYWxvcmllc0J1cm5lZERhdGEgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcImNhbG9yaWVzQnVybmVkRGF0YVwiLCBcInt9XCIpKTtcbiAgICB0aGlzLmNhbG9yaWVzQnVybmVkID0gY2Fsb3JpZXNCdXJuZWREYXRhLmJ1cm5lZDtcbiAgICBsZXQgY2Fsb3JpZXNDb25zdW1lZERhdGEgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcImNhbG9yaWVzQ29uc3VtZWREYXRhXCIsIFwie31cIikpO1xuICAgIHRoaXMuY2Fsb3JpZXNDb25zdW1lZCA9IGNhbG9yaWVzQ29uc3VtZWREYXRhLmNvbnN1bWVkO1xuICAgIHRoaXMubWVzdXJlID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJtZXN1cmVcIiwgXCJ7fVwiKSkubWVzdXJlO1xuICAgIHRoaXMuaGlzdG9yeURhdGEgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcImhpc3RvcnlcIiwgXCJ7fVwiKSk7XG4gICAgdGhpcy5pbml0Rm9vZEl0ZW1zKHRoaXMuaGlzdG9yeURhdGEsIHRoaXMuaGlzdG9yeSk7XG4gICAgdGhpcy5zYXZlSGlzdG9yeSgpO1xuXG4gIH1cblxuICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgfVxuXG5cbiAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gIH1cbiAgcHVibGljIGdvVG9TdWdhcigpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWRkLWdsdWNvc2VcIl0sIHtcbiAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ29Ub0Zvb2QoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FsaW1lbnRhdGlvblwiXSwge1xuICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxuICAgIH0pO1xuICB9XG4gIHB1YmxpYyBnb1RvU3RlcHMoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3N0ZXBzXCJdLCB7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0NhbG9yaWVzKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jYWxvcmllc1wiXSwge1xuICAgIH0pO1xuICB9XG4gIHNhdmVIaXN0b3J5KCkge1xuICAgIC8vICBsZXQgbWlkbmlnaHQgPSBuZXcgRGF0ZSgpO1xuXG4gICAgLy8gIG1pZG5pZ2h0LnNldEhvdXJzKDI0LCAwLCAwLCAwKTtcbiAgICAvLyBpZiAobWlkbmlnaHQgPT0gdGhpcy5jdXJyZW50RGF0ZSkgXG4gICAgbGV0IGxlbmd0aCA9IHRoaXMuaGlzdG9yeS5sZW5ndGg7XG4gICAgbGV0IGxhc3REYXRlID1uZXcgRGF0ZSAodGhpcy5oaXN0b3J5W2xlbmd0aCAtIDFdLmRhdGUpLmdldERhdGUoKTtcbiAgICBpZiAodGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkhPSBsYXN0RGF0ZSkge1xuICAgICAgdGhpcy5oaXN0b3J5LnB1c2goe1xuICAgICAgICBtZXN1cmU6IHRoaXMubWVzdXJlLCBjYWxvcmllc0J1cm5lZDogdGhpcy5jYWxvcmllc0J1cm5lZCwgY2Fsb3JpZXNDb25zdW1lZDogdGhpcy5jYWxvcmllc0NvbnN1bWVkLFxuICAgICAgICBzdGVwczogdGhpcy5zdGVwcywgZGF5OiB0aGlzLmN1cnJlbnREYXRlSG9sZGVyLGRhdGU6dGhpcy5jdXJyZW50RGF0ZVxuICAgICAgfSk7XG4gICAgICBzZXRTdHJpbmcoXCJoaXN0b3J5XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaGlzdG9yeSkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmhpc3RvcnlbbGVuZ3RoLTFdLm1lc3VyZSE9dGhpcy5tZXN1cmV8fHRoaXMuaGlzdG9yeVtsZW5ndGgtMV0uc3RlcHMhPXRoaXMuc3RlcHN8fHRoaXMuaGlzdG9yeVtsZW5ndGgtMV0uY2Fsb3JpZXNDb25zdW1lZCE9dGhpcy5jYWxvcmllc0NvbnN1bWVkfHx0aGlzLmhpc3RvcnlbbGVuZ3RoLTFdLmNhbG9yaWVzQnVybmVkIT10aGlzLmNhbG9yaWVzQnVybmVkKVxuICAgIHtcbiAgICAgIHRoaXMuaGlzdG9yeS5wb3AoKTtcbiAgICAgIHRoaXMuaGlzdG9yeS5wdXNoKHtcbiAgICAgICAgbWVzdXJlOiB0aGlzLm1lc3VyZSwgY2Fsb3JpZXNCdXJuZWQ6IHRoaXMuY2Fsb3JpZXNCdXJuZWQsIGNhbG9yaWVzQ29uc3VtZWQ6IHRoaXMuY2Fsb3JpZXNDb25zdW1lZCxcbiAgICAgICAgc3RlcHM6IHRoaXMuc3RlcHMsIGRheTogdGhpcy5jdXJyZW50RGF0ZUhvbGRlcixkYXRlOnRoaXMuY3VycmVudERhdGVcbiAgICAgIH0pO1xuICAgICAgc2V0U3RyaW5nKFwiaGlzdG9yeVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmhpc3RvcnkpKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBpbml0Rm9vZEl0ZW1zKGFyZ3MxLCBhcmdzMikge1xuICAgIC8vdGhpcy5faXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PGFueT4oKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnczEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MyLnB1c2goYXJnczFbaV0pO1xuICAgIH1cbiAgfVxuICBnb1RvSGlzdG9yeSgpIHtcbiAgICB0aGlzLmhpc3RvcnlMYXlvdXRcbiAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgICAgfSlcbiAgICB0aGlzLnNob3dIaXN0b3J5ID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dIb21lID0gZmFsc2U7XG5cbiAgfVxuICBjbG9zZUhpc3RvcnkoKSB7XG5cbiAgICB0aGlzLnNob3dIaXN0b3J5ID0gZmFsc2U7XG4gICAgdGhpcy5zaG93SG9tZSA9IHRydWU7XG4gICAgdGhpcy5oaXN0b3J5TGF5b3V0XG4gICAgICAuYW5pbWF0ZSh7XG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiB0aGlzLnNjcmVlbkhlaWdodCB9LFxuICAgICAgICBkdXJhdGlvbjogMjUwLFxuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9KVxuICB9XG5cbn1cbiJdfQ==