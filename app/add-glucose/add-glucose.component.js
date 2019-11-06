"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page/page");
var platform_1 = require("platform");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var picker = new ModalPicker();
var platform_2 = require("tns-core-modules/platform");
var application = require("application");
var element_registry_1 = require("nativescript-angular/element-registry");
var validate_service_1 = require("./validate.service");
element_registry_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; });
//registerElement('PDFView', () => PDFView);
//import { PDFView } from 'nativescript-pdf-view';
var moment = require("moment");
moment.locale("fr");
var store_1 = require("@ngrx/store");
var appAction = require("./../shared/actions/app.actions");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var LocalNotifications = require("nativescript-local-notifications");
var AddGlucoseComponent = (function () {
    function AddGlucoseComponent(_page, router, validateService, store) {
        this._page = _page;
        this.router = router;
        this.validateService = validateService;
        this.store = store;
        this.enableDay = false;
        this.enableWeek = true;
        this.enableMonth = true;
        this.dateTextHolder = "";
        this.description = "";
        this.dateTextHolderDefaultText = "Choose the date";
        this.currentDateHolder = "";
        this.showAdd = false;
        this.showWeeklyChart = false;
        this.showMonthlyChart = false;
        this.showDailyChart = true;
        this.selectedDateStr = "";
        this.selectedTimeStr = "";
        this.fulldateStr = "";
        this.data = [];
        this.chart = [];
        this.chartWeek = [];
        this.chartMonth = [];
        this.PLEASE_SELECT_DATE = "Vous devez sélectionner la date";
        this.PLEASE_SELECT_HOUR = "Vous devez sélectionner l'heure";
        this.input = {
            glucose: {
                value: "",
                error: false
            },
        };
        this.chart = [];
        this.chartWeek = [];
        this.chartMonth = [];
        this.currentDate = new Date();
        this.currentDateHolder = moment(this.currentDate, "mm/dd/yyyy hh:mm").format('LLLL');
    }
    Object.defineProperty(AddGlucoseComponent.prototype, "addLayout", {
        get: function () {
            return this.addLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGlucoseComponent.prototype, "chartLayout", {
        get: function () {
            return this.chartLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGlucoseComponent.prototype, "inputFieldEl", {
        get: function () {
            return this.inputFieldElement.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGlucoseComponent.prototype, "screenHeight", {
        get: function () {
            return platform_1.screen.mainScreen.heightDIPs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGlucoseComponent.prototype, "screenWidth", {
        get: function () {
            return platform_1.screen.mainScreen.widthDIPs;
        },
        enumerable: true,
        configurable: true
    });
    AddGlucoseComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        this.addLayout.translateY = this.screenHeight;
        this.userData = JSON.parse(application_settings_1.getString("profile", "{}"));
        var charts;
        charts = {
            chart: JSON.parse(application_settings_1.getString("chart", "{}")),
            chartWeek: JSON.parse(application_settings_1.getString("chartWeek", "{}")),
            chartMonth: JSON.parse(application_settings_1.getString("chartMonth", "{}")),
        };
        this.initDataItems(charts.chart, this.chart);
        this.initDataItems(charts.chartWeek, this.chartWeek);
        this.initDataItems(charts.chartMonth, this.chartMonth);
        this._SourceDaily = new observable_array_1.ObservableArray(this.chart);
        this._SourceWeekly = new observable_array_1.ObservableArray(this.chartWeek);
        this._SourceMonthly = new observable_array_1.ObservableArray(this.chartMonth);
    };
    Object.defineProperty(AddGlucoseComponent.prototype, "SourceDaily", {
        get: function () {
            return this._SourceDaily;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGlucoseComponent.prototype, "SourceWeekly", {
        get: function () {
            return this._SourceWeekly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGlucoseComponent.prototype, "SourceMonthly", {
        get: function () {
            return this._SourceMonthly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGlucoseComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    AddGlucoseComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    AddGlucoseComponent.prototype.initDataItems = function (args1, args2) {
        //this._items = new ObservableArray<any>();
        for (var i = 0; i < args1.length; i++) {
            args2.push(args1[i]);
        }
    };
    AddGlucoseComponent.prototype.addGlucose = function () {
        this.dateTextHolder = this.currentDateHolder;
        this.addLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 200,
            opacity: 1
        });
        this.showAdd = true;
        // this.showDailyChart = false;
    };
    AddGlucoseComponent.prototype.showDayChart = function () {
        this.showDailyChart = true;
        this.showWeeklyChart = false;
        this.showMonthlyChart = false;
        this.enableMonth = true;
        this.enableDay = false;
        this.enableWeek = true;
    };
    AddGlucoseComponent.prototype.showWeekChart = function () {
        this.showWeeklyChart = true;
        this.showDailyChart = false;
        this.showMonthlyChart = false;
        this.enableMonth = true;
        this.enableDay = true;
        this.enableWeek = false;
    };
    AddGlucoseComponent.prototype.showMonthChart = function () {
        this.showWeeklyChart = false;
        this.showDailyChart = false;
        this.showMonthlyChart = true;
        this.enableMonth = false;
        this.enableDay = true;
        this.enableWeek = true;
    };
    AddGlucoseComponent.prototype.selectDate = function (fn) {
        var _this = this;
        picker
            .pickDate({
            title: this.currentDateHolder,
            theme: "dark",
            //minDate: new Date(),
            maxDate: new Date(),
            startingDate: new Date()
        })
            .then(function (result) {
            if (result) {
                _this.dateStr = result.day + "-" + result.month + "-" + result.year;
                _this.month = result.month + "-" + result.year;
                _this.selectedDateStr =
                    result.day + "/" + result.month + "/" + result.year;
                _this.dateTextHolder = _this.selectedDateStr;
                if (fn)
                    fn();
            }
            else {
            }
        })
            .catch(function (error) {
            console.log("Error: " + error);
        });
    };
    AddGlucoseComponent.prototype.addFocus = function () {
        this.inputFieldEl.focus();
    };
    AddGlucoseComponent.prototype.pickDateTime = function () {
        this.selectDate(this.selectTime.bind(this));
    };
    AddGlucoseComponent.prototype.selectTime = function () {
        var _this = this;
        picker
            .pickTime({
            // title: this.currentDateHolder,
            theme: "dark"
        })
            .then(function (result) {
            if (result) {
                _this.hourStr = result.hour + ":" + result.minute;
                _this.selectedTimeStr = result.hour + ":" + result.minute;
                _this.fulldateStr = _this.selectedDateStr + " " + _this.selectedTimeStr;
                // this.fulldateStr = moment(this.selectedDateStr + " " + this.selectedTimeStr, "mm/dd/yyyy hh:mm").format('LLLL');
                _this.dateTextHolder = _this.fulldateStr;
                _this.addFocus();
            }
            else {
            }
        })
            .catch(function (error) {
            console.log("Error: " + error);
        });
    };
    AddGlucoseComponent.prototype.closeAdd = function () {
        this.showAdd = false;
        // this.showDailyChart = true;
        this.addLayout
            .animate({
            translate: { x: 0, y: this.screenHeight },
            duration: 250,
            opacity: 0
        });
        this.input.glucose.value = "";
    };
    AddGlucoseComponent.prototype.saveAdd = function () {
        if (!this.selectedDateStr) {
            this.store.dispatch(new appAction.ShowToastAction(this.PLEASE_SELECT_DATE));
        }
        else if (!this.selectedTimeStr) {
            this.store.dispatch(new appAction.ShowToastAction(this.PLEASE_SELECT_HOUR));
        }
        else {
            this.mesure = Number(this.input.glucose.value);
            this.date = this.selectedDateStr;
            this.chart.push({ Date: this.selectedTimeStr, Mesure: this.mesure });
            this.chart.sort(function (a, b) { return a.Date.localeCompare(b.Date); });
            application_settings_1.setString("chart", JSON.stringify(this.chart));
            var lastMesure = void 0;
            lastMesure = {
                mesure: this.mesure
            };
            application_settings_1.setString("mesure", JSON.stringify(lastMesure)); //last Mesure
            this._SourceDaily.push(this.chart);
            var week = this.chart.reduce(function (a, b) { return a + b.Mesure; }, 0) / this.chart.length;
            this.chartWeek.push({ Date: this.date, Mesure: week });
            application_settings_1.setString("chartWeek", JSON.stringify(this.chartWeek));
            this._SourceWeekly.push(this.chartWeek);
            var month = this.chartWeek.reduce(function (a, b) { return a + b.Mesure; }, 0) / this.chartWeek.length;
            this.chartMonth.push({ Date: this.month, Mesure: month });
            application_settings_1.setString("chartMonth", JSON.stringify(this.chartMonth));
            this._SourceMonthly.push(this.chartMonth);
            if (this.chart.length > 2) {
                this.showNotification();
            }
            this.closeAdd();
        }
    };
    AddGlucoseComponent.prototype.notification = function (args) {
        LocalNotifications.schedule([{
                id: 1,
                title: "Glycémie",
                body: args,
                badge: 1,
                at: new Date(new Date().getTime() + (10 * 1000)) // 5 minutes from now
            }]);
        // adding a handler, so we can do something with the received notification.. in this case an alert
        LocalNotifications.addOnMessageReceivedCallback(function (data) {
            alert({
                title: " Notification",
                message: "Titre: " + data.title + ", Description: " + data.body,
                okButtonText: "Ok"
            });
        });
    };
    AddGlucoseComponent.prototype.showNotification = function () {
        if (this.userData.type == "lada" || this.userData.type == "gestationnel") {
            if (Number(this.mesure) < 0.7) {
                this.description = " Attention vous avez une hypoglycémie ";
            }
            else if (Number(this.mesure) > 1.8) {
                this.description = " Attention vous avez une hyperglycémie ";
            }
            this.notification(this.description);
        }
        else if (this.userData.type == "type 1") {
            if (Number(this.mesure) < 0.7) {
                this.description = " Attention vous avez une hypoglycémie ";
            }
            else if (Number(this.mesure) > 1.5) {
                this.description = " Attention vous avez une hyperglycémie ";
            }
            this.notification(this.description);
        }
        else if (this.userData.type = "type 2") {
            if (Number(this.mesure) < 0.7) {
                this.description = " Attention vous avez une hypoglycémie ";
            }
            else if (Number(this.mesure) > 2.5) {
                this.description = " Attention vous avez une hyperglycémie ";
            }
            this.notification(this.description);
        }
    };
    AddGlucoseComponent.prototype.validateInput = function () {
        var Valide = true;
        if (this.validateService.isNumber(this.input.glucose.value)) {
            this.input.glucose.error = false;
        }
        else {
            this.input.glucose.error = true;
            Valide = false;
        }
        return Valide;
    };
    AddGlucoseComponent.prototype.hideKeyboard = function () {
        if (platform_2.isAndroid) {
            try {
                var activity = application.android.foregroundActivity;
                var Context = application.android.currentContext;
                var inputManager = Context.getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
                inputManager.hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken(), android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS);
            }
            catch (err) {
                console.log(err);
            }
        }
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], AddGlucoseComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.ViewChild("addLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], AddGlucoseComponent.prototype, "addLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("chartLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], AddGlucoseComponent.prototype, "chartLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("inputField"),
        __metadata("design:type", core_1.ElementRef)
    ], AddGlucoseComponent.prototype, "inputFieldElement", void 0);
    AddGlucoseComponent = __decorate([
        core_1.Component({
            selector: "add-glucose",
            moduleId: module.id,
            templateUrl: "./add-glucose.component.html",
            styleUrls: ["./add-glucose.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            validate_service_1.ValidateService,
            store_1.Store])
    ], AddGlucoseComponent);
    return AddGlucoseComponent;
}());
exports.AddGlucoseComponent = AddGlucoseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUtyRCxxQ0FBa0M7QUFFbEMsNEZBQW1IO0FBQ25ILElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0FBQ3JGLElBQU0sTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDakMsc0RBQTZEO0FBRTdELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QywwRUFBd0U7QUFDeEUsdURBQXFEO0FBQ3JELGtDQUFlLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxHQUFHLEVBQWhELENBQWdELENBQUMsQ0FBQztBQUMvRSw0Q0FBNEM7QUFDNUMsa0RBQWtEO0FBQ2xELCtCQUFpQztBQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBSXBCLHFDQUFvQztBQUVwQywyREFBNkQ7QUFDN0QsbUdBQWtHO0FBQ2xHLHFFQUF1RTtBQVV2RTtJQTRESSw2QkFDWSxLQUFXLEVBQ1gsTUFBd0IsRUFDeEIsZUFBZ0MsRUFDaEMsS0FBNEI7UUFINUIsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQTVEeEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBT3JCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FB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ZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSwgQ2hhbmdlZERhdGEsIENoYW5nZVR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuY29uc3QgTW9kYWxQaWNrZXIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCIpLk1vZGFsRGF0ZXRpbWVwaWNrZXI7XG5jb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIoKTtcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuZGVjbGFyZSB2YXIgYW5kcm9pZDtcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tIFwiLi92YWxpZGF0ZS5zZXJ2aWNlXCI7XG5yZWdpc3RlckVsZW1lbnQoXCJGYWJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblwiKS5GYWIpO1xuLy9yZWdpc3RlckVsZW1lbnQoJ1BERlZpZXcnLCAoKSA9PiBQREZWaWV3KTtcbi8vaW1wb3J0IHsgUERGVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wZGYtdmlldyc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xubW9tZW50LmxvY2FsZShcImZyXCIpO1xuaW1wb3J0IHsgQWJzb2x1dGVMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dC9hYnNvbHV0ZS1sYXlvdXRcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uL3NoYXJlZC9hY3Rpb25zL2FwcC5hY3Rpb25zXCI7XG5pbXBvcnQgeyBzZXRTdHJpbmcsIGdldFN0cmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBMb2NhbE5vdGlmaWNhdGlvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbC1ub3RpZmljYXRpb25zXCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJhZGQtZ2x1Y29zZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZGQtZ2x1Y29zZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9hZGQtZ2x1Y29zZS5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEFkZEdsdWNvc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgbW9udGg6IHN0cmluZztcbiAgICB1c2VyRGF0YTogYW55O1xuICAgIGVuYWJsZURheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGVuYWJsZVdlZWs6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGVuYWJsZU1vbnRoOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpbnB1dDogYW55O1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBnbHVjb3NlOiBzdHJpbmc7XG4gICAgbWVzdXJlOiBudW1iZXI7XG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xuICAgIHB1YmxpYyBkYXRlVGV4dEhvbGRlcjogc3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIGRhdGVUZXh0SG9sZGVyRGVmYXVsdFRleHQ6IHN0cmluZyA9IFwiQ2hvb3NlIHRoZSBkYXRlXCI7XG4gICAgcHVibGljIGN1cnJlbnREYXRlOiBEYXRlO1xuICAgIHB1YmxpYyBjdXJyZW50RGF0ZUhvbGRlcjogc3RyaW5nID0gXCJcIjtcbiAgICBzaG93QWRkOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2hvd1dlZWtseUNoYXJ0OiBib29sZWFuID0gZmFsc2U7XG4gICAgc2hvd01vbnRobHlDaGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dEYWlseUNoYXJ0OiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlU3RyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBzZWxlY3RlZFRpbWVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBkYXRlU3RyO1xuICAgIHByaXZhdGUgaG91clN0cjtcbiAgICBwdWJsaWMgZnVsbGRhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBkYXRhID0gW107XG4gICAgY2hhcnQ6IGFueVtdID0gW107XG4gICAgY2hhcnRXZWVrOiBhbnlbXSA9IFtdO1xuICAgIGNoYXJ0TW9udGg6IGFueVtdID0gW107XG4gICAgUExFQVNFX1NFTEVDVF9EQVRFID0gXCJWb3VzIGRldmV6IHPDqWxlY3Rpb25uZXIgbGEgZGF0ZVwiO1xuICAgIFBMRUFTRV9TRUxFQ1RfSE9VUiA9IFwiVm91cyBkZXZleiBzw6lsZWN0aW9ubmVyIGwnaGV1cmVcIjtcblxuXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChcImFkZExheW91dFwiKSBhZGRMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcImNoYXJ0TGF5b3V0XCIpIGNoYXJ0TGF5b3V0UmVmOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJpbnB1dEZpZWxkXCIpIGlucHV0RmllbGRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHByaXZhdGUgZ2V0IGFkZExheW91dCgpOiBBYnNvbHV0ZUxheW91dCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBjaGFydExheW91dCgpOiBTdGFja0xheW91dCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJ0TGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0IGlucHV0RmllbGRFbCgpOiBUZXh0RmllbGQge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dEZpZWxkRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBzY3JlZW5IZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHM7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0IHNjcmVlbldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHM7XG4gICAgfVxuICAgIHByaXZhdGUgX1NvdXJjZURhaWx5OiBPYnNlcnZhYmxlQXJyYXk8YW55PjtcbiAgICBwcml2YXRlIF9Tb3VyY2VXZWVrbHk6IE9ic2VydmFibGVBcnJheTxEYXRhPjtcbiAgICBwcml2YXRlIF9Tb3VyY2VNb250aGx5OiBPYnNlcnZhYmxlQXJyYXk8RGF0YT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdGVTZXJ2aWNlOiBWYWxpZGF0ZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPiwgKSB7XG5cbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcblxuICAgICAgICAgICAgZ2x1Y29zZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jaGFydCA9IFtcbiAgICAgICAgICBdO1xuICAgICAgICB0aGlzLmNoYXJ0V2VlayA9IFtcbiAgICAgICAgIFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmNoYXJ0TW9udGggPSBbXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRlSG9sZGVyID0gbW9tZW50KHRoaXMuY3VycmVudERhdGUsIFwibW0vZGQveXl5eSBoaDptbVwiKS5mb3JtYXQoJ0xMTEwnKVxuXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFkZExheW91dC50cmFuc2xhdGVZID0gdGhpcy5zY3JlZW5IZWlnaHQ7XG4gICAgICAgIHRoaXMudXNlckRhdGEgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcInByb2ZpbGVcIiwgXCJ7fVwiKSk7XG4gICAgICAgIGxldCBjaGFydHM7XG4gICAgICAgIGNoYXJ0cyA9IHtcbiAgICAgICAgICAgIGNoYXJ0OiBKU09OLnBhcnNlKGdldFN0cmluZyhcImNoYXJ0XCIsIFwie31cIikpLFxuICAgICAgICAgICAgY2hhcnRXZWVrOiBKU09OLnBhcnNlKGdldFN0cmluZyhcImNoYXJ0V2Vla1wiLCBcInt9XCIpKSxcbiAgICAgICAgICAgIGNoYXJ0TW9udGg6IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwiY2hhcnRNb250aFwiLCBcInt9XCIpKSxcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdERhdGFJdGVtcyhjaGFydHMuY2hhcnQsIHRoaXMuY2hhcnQpO1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoY2hhcnRzLmNoYXJ0V2VlaywgdGhpcy5jaGFydFdlZWspO1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoY2hhcnRzLmNoYXJ0TW9udGgsIHRoaXMuY2hhcnRNb250aCk7XG4gICAgICAgIHRoaXMuX1NvdXJjZURhaWx5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0KTtcbiAgICAgICAgdGhpcy5fU291cmNlV2Vla2x5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0V2Vlayk7XG4gICAgICAgIHRoaXMuX1NvdXJjZU1vbnRobHkgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhcnRNb250aCk7XG4gICAgfVxuXG5cbiAgICBnZXQgU291cmNlRGFpbHkoKTogT2JzZXJ2YWJsZUFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fU291cmNlRGFpbHk7XG4gICAgfVxuICAgIGdldCBTb3VyY2VXZWVrbHkoKTogT2JzZXJ2YWJsZUFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fU291cmNlV2Vla2x5O1xuICAgIH1cbiAgICBnZXQgU291cmNlTW9udGhseSgpOiBPYnNlcnZhYmxlQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9Tb3VyY2VNb250aGx5O1xuICAgIH1cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YUl0ZW1zKGFyZ3MxLCBhcmdzMikge1xuICAgICAgICAvL3RoaXMuX2l0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnczIucHVzaChhcmdzMVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRHbHVjb3NlKCkge1xuICAgICAgICB0aGlzLmRhdGVUZXh0SG9sZGVyID0gdGhpcy5jdXJyZW50RGF0ZUhvbGRlcjtcbiAgICAgICAgdGhpcy5hZGRMYXlvdXRcbiAgICAgICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zaG93QWRkID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5zaG93RGFpbHlDaGFydCA9IGZhbHNlO1xuICAgIH1cbiAgICBzaG93RGF5Q2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dXZWVrbHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dNb250aGx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlRGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IHRydWU7XG4gICAgfVxuXG4gICAgc2hvd1dlZWtDaGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93V2Vla2x5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dEYWlseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd01vbnRobHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZU1vbnRoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVEYXkgPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZVdlZWsgPSBmYWxzZTtcbiAgICB9XG4gICAgc2hvd01vbnRoQ2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1dlZWtseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93TW9udGhseUNoYXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZURheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IHRydWU7XG4gICAgfVxuXG4gICAgc2VsZWN0RGF0ZShmbikge1xuICAgICAgICBwaWNrZXJcbiAgICAgICAgICAgIC5waWNrRGF0ZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuY3VycmVudERhdGVIb2xkZXIsXG4gICAgICAgICAgICAgICAgdGhlbWU6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgIC8vbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBtYXhEYXRlOm5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgc3RhcnRpbmdEYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVTdHIgPSByZXN1bHQuZGF5ICsgXCItXCIgKyByZXN1bHQubW9udGggKyBcIi1cIiArIHJlc3VsdC55ZWFyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoID0gcmVzdWx0Lm1vbnRoICsgXCItXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVTdHIgPVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRheSArIFwiL1wiICsgcmVzdWx0Lm1vbnRoICsgXCIvXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGV4dEhvbGRlciA9IHRoaXMuc2VsZWN0ZWREYXRlU3RyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm4pIGZuKCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEZvY3VzKCkge1xuICAgICAgICB0aGlzLmlucHV0RmllbGRFbC5mb2N1cygpO1xuXG4gICAgfVxuICAgIHBpY2tEYXRlVGltZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3REYXRlKHRoaXMuc2VsZWN0VGltZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cblxuICAgIHNlbGVjdFRpbWUoKSB7XG4gICAgICAgIHBpY2tlclxuICAgICAgICAgICAgLnBpY2tUaW1lKHtcbiAgICAgICAgICAgICAgIC8vIHRpdGxlOiB0aGlzLmN1cnJlbnREYXRlSG9sZGVyLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VyU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbGRhdGVTdHIgPXRoaXMuc2VsZWN0ZWREYXRlU3RyICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkVGltZVN0cjtcbiAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmZ1bGxkYXRlU3RyID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlU3RyICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkVGltZVN0ciwgXCJtbS9kZC95eXl5IGhoOm1tXCIpLmZvcm1hdCgnTExMTCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZXh0SG9sZGVyID0gdGhpcy5mdWxsZGF0ZVN0cjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGb2N1cygpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBjbG9zZUFkZCgpIHtcblxuICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5zaG93RGFpbHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkTGF5b3V0XG4gICAgICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IHRoaXMuc2NyZWVuSGVpZ2h0IH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICB0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUgPVwiXCI7XG4gICAgfVxuXG4gICAgc2F2ZUFkZCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREYXRlU3RyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIG5ldyBhcHBBY3Rpb24uU2hvd1RvYXN0QWN0aW9uKHRoaXMuUExFQVNFX1NFTEVDVF9EQVRFKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zZWxlY3RlZFRpbWVTdHIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgbmV3IGFwcEFjdGlvbi5TaG93VG9hc3RBY3Rpb24odGhpcy5QTEVBU0VfU0VMRUNUX0hPVVIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLm1lc3VyZSA9IE51bWJlcih0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5zZWxlY3RlZERhdGVTdHI7XG4gICAgICAgICAgICB0aGlzLmNoYXJ0LnB1c2goeyBEYXRlOiB0aGlzLnNlbGVjdGVkVGltZVN0ciwgTWVzdXJlOiB0aGlzLm1lc3VyZSB9KTtcbiAgICAgICAgICAgIHRoaXMuY2hhcnQuc29ydCgoYSwgYikgPT4gYS5EYXRlLmxvY2FsZUNvbXBhcmUoYi5EYXRlKSk7XG4gICAgICAgICAgICBzZXRTdHJpbmcoXCJjaGFydFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmNoYXJ0KSk7XG4gICAgICAgICAgICBsZXQgbGFzdE1lc3VyZTtcbiAgICAgICAgICAgIGxhc3RNZXN1cmUgPSB7XG4gICAgICAgICAgICAgICAgbWVzdXJlOiB0aGlzLm1lc3VyZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0U3RyaW5nKFwibWVzdXJlXCIsIEpTT04uc3RyaW5naWZ5KGxhc3RNZXN1cmUpKTsvL2xhc3QgTWVzdXJlXG4gICAgICAgICAgICB0aGlzLl9Tb3VyY2VEYWlseS5wdXNoKHRoaXMuY2hhcnQpO1xuICAgICAgICAgICAgbGV0IHdlZWsgPSB0aGlzLmNoYXJ0LnJlZHVjZSgoYSwgYikgPT4gYSArIGIuTWVzdXJlLCAwKSAvIHRoaXMuY2hhcnQubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5jaGFydFdlZWsucHVzaCh7IERhdGU6IHRoaXMuZGF0ZSwgTWVzdXJlOiB3ZWVrIH0pO1xuICAgICAgICAgICAgc2V0U3RyaW5nKFwiY2hhcnRXZWVrXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuY2hhcnRXZWVrKSk7XG4gICAgICAgICAgICB0aGlzLl9Tb3VyY2VXZWVrbHkucHVzaCh0aGlzLmNoYXJ0V2Vlayk7XG4gICAgICAgICAgICBsZXQgbW9udGggPSB0aGlzLmNoYXJ0V2Vlay5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLk1lc3VyZSwgMCkgLyB0aGlzLmNoYXJ0V2Vlay5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmNoYXJ0TW9udGgucHVzaCh7IERhdGU6IHRoaXMubW9udGgsIE1lc3VyZTogbW9udGggfSk7XG4gICAgICAgICAgICBzZXRTdHJpbmcoXCJjaGFydE1vbnRoXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuY2hhcnRNb250aCkpO1xuICAgICAgICAgICAgdGhpcy5fU291cmNlTW9udGhseS5wdXNoKHRoaXMuY2hhcnRNb250aCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGFydC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNsb3NlQWRkKCk7XG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cbiAgICBub3RpZmljYXRpb24oYXJncyk6IHZvaWQge1xuICAgICAgICBMb2NhbE5vdGlmaWNhdGlvbnMuc2NoZWR1bGUoW3tcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGl0bGU6IFwiR2x5Y8OpbWllXCIsXG4gICAgICAgICAgICBib2R5OiBhcmdzLFxuICAgICAgICAgICAgYmFkZ2U6IDEsXG4gICAgICAgICAgICBhdDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAgKiAxMDAwKSkgLy8gNSBtaW51dGVzIGZyb20gbm93XG4gICAgICAgIH1dKTtcblxuXG4gICAgICAgIC8vIGFkZGluZyBhIGhhbmRsZXIsIHNvIHdlIGNhbiBkbyBzb21ldGhpbmcgd2l0aCB0aGUgcmVjZWl2ZWQgbm90aWZpY2F0aW9uLi4gaW4gdGhpcyBjYXNlIGFuIGFsZXJ0XG4gICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5hZGRPbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrKGRhdGEgPT4ge1xuICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIiBOb3RpZmljYXRpb25cIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgVGl0cmU6ICR7ZGF0YS50aXRsZX0sIERlc2NyaXB0aW9uOiAke2RhdGEuYm9keX1gLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNob3dOb3RpZmljYXRpb24oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdHlwZSAxIG5lIGRlcGFzc2UgcGFzIDEuNSBcbiAgICAvL3R5cGUgMiBuZSBkZXBhc3NlIHBhcyAyLjVcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLnR5cGUgPT0gXCJsYWRhXCIgfHwgdGhpcy51c2VyRGF0YS50eXBlID09IFwiZ2VzdGF0aW9ubmVsXCIpIHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5tZXN1cmUpIDwgMC43KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiIEF0dGVudGlvbiB2b3VzIGF2ZXogdW5lIGh5cG9nbHljw6ltaWUgXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMubWVzdXJlKSA+IDEuOCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCIgQXR0ZW50aW9uIHZvdXMgYXZleiB1bmUgaHlwZXJnbHljw6ltaWUgXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbih0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS50eXBlID09IFwidHlwZSAxXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMubWVzdXJlKSA8IDAuNykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCIgQXR0ZW50aW9uIHZvdXMgYXZleiB1bmUgaHlwb2dseWPDqW1pZSBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5tZXN1cmUpID4gMS41KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCIgQXR0ZW50aW9uIHZvdXMgYXZleiB1bmUgaHlwZXJnbHljw6ltaWUgXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKHRoaXMuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51c2VyRGF0YS50eXBlID0gXCJ0eXBlIDJcIikge1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5tZXN1cmUpIDwgMC43KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIiBBdHRlbnRpb24gdm91cyBhdmV6IHVuZSBoeXBvZ2x5Y8OpbWllIFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlcih0aGlzLm1lc3VyZSkgPiAyLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIiBBdHRlbnRpb24gdm91cyBhdmV6IHVuZSBoeXBlcmdseWPDqW1pZSBcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24odGhpcy5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgIHByaXZhdGUgdmFsaWRhdGVJbnB1dCgpIHtcbiAgICAgICAgICAgbGV0IFZhbGlkZSA9IHRydWU7XG4gICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzTnVtYmVyKHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5nbHVjb3NlLmVycm9yID0gZmFsc2U7XG4gICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICB0aGlzLmlucHV0LmdsdWNvc2UuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgVmFsaWRlID0gZmFsc2U7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgcmV0dXJuIFZhbGlkZTtcbiAgICAgICB9XG5cbiAgICBoaWRlS2V5Ym9hcmQoKSB7XG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2aXR5ID0gYXBwbGljYXRpb24uYW5kcm9pZC5mb3JlZ3JvdW5kQWN0aXZpdHk7XG4gICAgICAgICAgICAgICAgbGV0IENvbnRleHQgPSBhcHBsaWNhdGlvbi5hbmRyb2lkLmN1cnJlbnRDb250ZXh0O1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dE1hbmFnZXIgPSBDb250ZXh0LmdldFN5c3RlbVNlcnZpY2UoXG4gICAgICAgICAgICAgICAgICAgIGFuZHJvaWQuY29udGVudC5Db250ZXh0LklOUFVUX01FVEhPRF9TRVJWSUNFXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpbnB1dE1hbmFnZXIuaGlkZVNvZnRJbnB1dEZyb21XaW5kb3coXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5LmdldEN1cnJlbnRGb2N1cygpLmdldFdpbmRvd1Rva2VuKCksXG4gICAgICAgICAgICAgICAgICAgIGFuZHJvaWQudmlldy5pbnB1dG1ldGhvZC5JbnB1dE1ldGhvZE1hbmFnZXIuSElERV9OT1RfQUxXQVlTXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==