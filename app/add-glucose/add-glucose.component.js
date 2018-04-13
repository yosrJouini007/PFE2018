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
        this.PICK_DATE = "Choose Date";
        this.selectedDateStr = "";
        this.selectedTimeStr = "";
        this.PICK_HOUR = "Choose Hour";
        this.fulldateStr = "";
        this.data = [];
        this.chart = [];
        this.chartWeek = [];
        this.chartMonth = [];
        this.PLEASE_SELECT_DATE = "Vous devez sélectionner la date";
        this.PLEASE_SELECT_HOUR = "Vous devez sélectionner l'heure";
        //textInput = new Subject<string>();
        this.sliderValue1 = 116;
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
        //this.saveAdd();
        //let textField = <TextField>this.inputFieldElement.nativeElement.object;
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
            // minDate: new Date(),
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
            title: this.currentDateHolder,
            theme: "dark"
        })
            .then(function (result) {
            if (result) {
                _this.hourStr = result.hour + ":" + result.minute;
                _this.selectedTimeStr = result.hour + ":" + result.minute;
                // this.dateTextHolder =this.selectedTimeStr;
                _this.fulldateStr = moment(_this.selectedDateStr + " " + _this.selectedTimeStr, "mm/dd/yyyy hh:mm").format('LLLL');
                _this.dateTextHolder = _this.fulldateStr;
                // this.inputFieldEl.focus();
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
        // this.input.glucose.value = "";
    };
    AddGlucoseComponent.prototype.returnPress = function (args) {
        // if (this.validateInput()) {
        var textField = args.object;
        console.log("onReturn");
        // this.input.glucose.value = Number(textField.text);
        this.mesure = Number(textField.text);
        this.saveAdd();
    };
    AddGlucoseComponent.prototype.saveAdd = function () {
        if (!this.selectedDateStr) {
            this.store.dispatch(new appAction.ShowToastAction(this.PLEASE_SELECT_DATE));
        }
        else if (!this.selectedTimeStr) {
            this.store.dispatch(new appAction.ShowToastAction(this.PLEASE_SELECT_HOUR));
        }
        else {
            //this.mesure=parseFloat(this.input.glucose.value);
            this.date = this.selectedDateStr;
            this.chart.push({ Date: this.selectedTimeStr, Mesure: this.mesure });
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
            /* this.data.map(item => {
                  return {
                      Date: item.Date,
                      Mesure: item.Mesure
                  }
              }).forEach(item => this.source.push(item));*/
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
    /*  private validateInput() {
           let Valide = true;
           if (
               this.validateService.isNumber(this.input.glucose.value)
            ) {
               this.input.glucose.error = false;
           } else {
               this.input.glucose.error = true;
               Valide = false;
           }
           return Valide;
       }*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUtyRCxxQ0FBa0M7QUFFbEMsNEZBQW1IO0FBQ25ILElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0FBQ3JGLElBQU0sTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDakMsc0RBQTZEO0FBRTdELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QywwRUFBd0U7QUFDeEUsdURBQXFEO0FBQ3JELGtDQUFlLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxHQUFHLEVBQWhELENBQWdELENBQUMsQ0FBQztBQUMvRSw0Q0FBNEM7QUFDNUMsa0RBQWtEO0FBQ2xELCtCQUFpQztBQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBSXBCLHFDQUFvQztBQUVwQywyREFBNkQ7QUFDN0QsbUdBQWtHO0FBQ2xHLHFFQUF1RTtBQVV2RTtJQWdFSSw2QkFDWSxLQUFXLEVBQ1gsTUFBd0IsRUFDeEIsZUFBZ0MsRUFDaEMsS0FBNEI7UUFINUIsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQWhFeEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBT3JCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FB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LENBQUM7Z0JBQ0YsWUFBWSxDQUFDLHVCQUF1QixDQUNoQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FDOUQsQ0FBQztZQUNOLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBcldvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCO2dFQUFDO0lBQ3JDO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFlLGlCQUFVOzZEQUFDO0lBQ3ZCO1FBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDO2tDQUFpQixpQkFBVTsrREFBQztJQUM1QjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBb0IsaUJBQVU7a0VBQUM7SUExQzlDLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FrRXFCLFdBQUk7WUFDSCx5QkFBZ0I7WUFDUCxrQ0FBZTtZQUN6QixhQUFLO09BcEVmLG1CQUFtQixDQThZL0I7SUFBRCwwQkFBQztDQUFBLEFBOVlELElBOFlDO0FBOVlZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSwgQ2hhbmdlZERhdGEsIENoYW5nZVR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuY29uc3QgTW9kYWxQaWNrZXIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCIpLk1vZGFsRGF0ZXRpbWVwaWNrZXI7XG5jb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIoKTtcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuZGVjbGFyZSB2YXIgYW5kcm9pZDtcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tIFwiLi92YWxpZGF0ZS5zZXJ2aWNlXCI7XG5yZWdpc3RlckVsZW1lbnQoXCJGYWJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblwiKS5GYWIpO1xuLy9yZWdpc3RlckVsZW1lbnQoJ1BERlZpZXcnLCAoKSA9PiBQREZWaWV3KTtcbi8vaW1wb3J0IHsgUERGVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wZGYtdmlldyc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xubW9tZW50LmxvY2FsZShcImZyXCIpO1xuaW1wb3J0IHsgQWJzb2x1dGVMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dC9hYnNvbHV0ZS1sYXlvdXRcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uL3NoYXJlZC9hY3Rpb25zL2FwcC5hY3Rpb25zXCI7XG5pbXBvcnQgeyBzZXRTdHJpbmcsIGdldFN0cmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBMb2NhbE5vdGlmaWNhdGlvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbC1ub3RpZmljYXRpb25zXCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJhZGQtZ2x1Y29zZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZGQtZ2x1Y29zZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9hZGQtZ2x1Y29zZS5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEFkZEdsdWNvc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgbW9udGg6IHN0cmluZztcbiAgICB1c2VyRGF0YTogYW55O1xuICAgIGVuYWJsZURheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGVuYWJsZVdlZWs6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGVuYWJsZU1vbnRoOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpbnB1dDogYW55O1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBnbHVjb3NlOiBzdHJpbmc7XG4gICAgbWVzdXJlOiBudW1iZXI7XG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xuICAgIHB1YmxpYyBkYXRlVGV4dEhvbGRlcjogc3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIGRhdGVUZXh0SG9sZGVyRGVmYXVsdFRleHQ6IHN0cmluZyA9IFwiQ2hvb3NlIHRoZSBkYXRlXCI7XG4gICAgcHVibGljIGN1cnJlbnREYXRlOiBEYXRlO1xuICAgIHB1YmxpYyBjdXJyZW50RGF0ZUhvbGRlcjogc3RyaW5nID0gXCJcIjtcbiAgICBzaG93QWRkOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2hvd1dlZWtseUNoYXJ0OiBib29sZWFuID0gZmFsc2U7XG4gICAgc2hvd01vbnRobHlDaGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dEYWlseUNoYXJ0OiBib29sZWFuID0gdHJ1ZTtcbiAgICBQSUNLX0RBVEUgPSBcIkNob29zZSBEYXRlXCI7XG4gICAgcHVibGljIHNlbGVjdGVkRGF0ZVN0cjogc3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgc2VsZWN0ZWRUaW1lU3RyOiBzdHJpbmcgPSBcIlwiO1xuICAgIFBJQ0tfSE9VUiA9IFwiQ2hvb3NlIEhvdXJcIjtcbiAgICBwcml2YXRlIGRhdGVTdHI7XG4gICAgcHJpdmF0ZSBob3VyU3RyO1xuICAgIHB1YmxpYyBmdWxsZGF0ZVN0cjogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIGRhdGEgPSBbXTtcbiAgICBjaGFydDogYW55W10gPSBbXTtcbiAgICBjaGFydFdlZWs6IGFueVtdID0gW107XG4gICAgY2hhcnRNb250aDogYW55W10gPSBbXTtcbiAgICBQTEVBU0VfU0VMRUNUX0RBVEUgPSBcIlZvdXMgZGV2ZXogc8OpbGVjdGlvbm5lciBsYSBkYXRlXCI7XG4gICAgUExFQVNFX1NFTEVDVF9IT1VSID0gXCJWb3VzIGRldmV6IHPDqWxlY3Rpb25uZXIgbCdoZXVyZVwiO1xuICAgIC8vdGV4dElucHV0ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHB1YmxpYyBzbGlkZXJWYWx1ZTEgPSAxMTY7XG5cblxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoXCJhZGRMYXlvdXRcIikgYWRkTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJjaGFydExheW91dFwiKSBjaGFydExheW91dFJlZjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiaW5wdXRGaWVsZFwiKSBpbnB1dEZpZWxkRWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICBwcml2YXRlIGdldCBhZGRMYXlvdXQoKTogQWJzb2x1dGVMYXlvdXQge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgY2hhcnRMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFydExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBpbnB1dEZpZWxkRWwoKTogVGV4dEZpZWxkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRGaWVsZEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgc2NyZWVuSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzO1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBzY3JlZW5XaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuICAgIH1cbiAgICBwcml2YXRlIF9Tb3VyY2VEYWlseTogT2JzZXJ2YWJsZUFycmF5PGFueT47XG4gICAgcHJpdmF0ZSBfU291cmNlV2Vla2x5OiBPYnNlcnZhYmxlQXJyYXk8RGF0YT47XG4gICAgcHJpdmF0ZSBfU291cmNlTW9udGhseTogT2JzZXJ2YWJsZUFycmF5PERhdGE+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIHZhbGlkYXRlU2VydmljZTogVmFsaWRhdGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxmcm9tUm9vdC5TdGF0ZT4sICkge1xuXG4gICAgICAgIHRoaXMuaW5wdXQgPSB7XG5cbiAgICAgICAgICAgIGdsdWNvc2U6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICAgICAgICBlcnJvcjogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2hhcnQgPSBbXG4gICAgICAgICAgIC8qIHtcbiAgICAgICAgICAgICAgICBEYXRlOiBcIjEyOjMwXCIsXG4gICAgICAgICAgICAgICAgTWVzdXJlOjIsXG4gICAgICAgICAgICB9Ki9dO1xuICAgICAgICB0aGlzLmNoYXJ0V2VlayA9IFtcbiAgICAgICAgICAgIC8ve1xuICAgICAgICAgICAgLy8gRGF0ZTogXCI3LzAzLzIwMThcIixcbiAgICAgICAgICAgIC8vIE1lc3VyZTogNixcbiAgICAgICAgICAgIC8vfVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmNoYXJ0TW9udGggPSBbXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRlSG9sZGVyID0gbW9tZW50KHRoaXMuY3VycmVudERhdGUsIFwibW0vZGQveXl5eSBoaDptbVwiKS5mb3JtYXQoJ0xMTEwnKVxuXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFkZExheW91dC50cmFuc2xhdGVZID0gdGhpcy5zY3JlZW5IZWlnaHQ7XG4gICAgICAgIHRoaXMudXNlckRhdGEgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcInByb2ZpbGVcIiwgXCJ7fVwiKSk7XG4gICAgICAgIGxldCBjaGFydHM7XG4gICAgICAgIGNoYXJ0cyA9IHtcbiAgICAgICAgICAgIGNoYXJ0OiBKU09OLnBhcnNlKGdldFN0cmluZyhcImNoYXJ0XCIsIFwie31cIikpLFxuICAgICAgICAgICAgY2hhcnRXZWVrOiBKU09OLnBhcnNlKGdldFN0cmluZyhcImNoYXJ0V2Vla1wiLCBcInt9XCIpKSxcbiAgICAgICAgICAgIGNoYXJ0TW9udGg6IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwiY2hhcnRNb250aFwiLCBcInt9XCIpKSxcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdERhdGFJdGVtcyhjaGFydHMuY2hhcnQsIHRoaXMuY2hhcnQpO1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoY2hhcnRzLmNoYXJ0V2VlaywgdGhpcy5jaGFydFdlZWspO1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoY2hhcnRzLmNoYXJ0TW9udGgsIHRoaXMuY2hhcnRNb250aCk7XG4gICAgICAgIHRoaXMuX1NvdXJjZURhaWx5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0KTtcbiAgICAgICAgdGhpcy5fU291cmNlV2Vla2x5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0V2Vlayk7XG4gICAgICAgIHRoaXMuX1NvdXJjZU1vbnRobHkgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhcnRNb250aCk7XG4gICAgICAgIC8vdGhpcy5zYXZlQWRkKCk7XG4gICAgICAgIC8vbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5pbnB1dEZpZWxkRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9iamVjdDtcblxuXG4gICAgfVxuXG5cbiAgICBnZXQgU291cmNlRGFpbHkoKTogT2JzZXJ2YWJsZUFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fU291cmNlRGFpbHk7XG4gICAgfVxuICAgIGdldCBTb3VyY2VXZWVrbHkoKTogT2JzZXJ2YWJsZUFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fU291cmNlV2Vla2x5O1xuICAgIH1cbiAgICBnZXQgU291cmNlTW9udGhseSgpOiBPYnNlcnZhYmxlQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9Tb3VyY2VNb250aGx5O1xuICAgIH1cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YUl0ZW1zKGFyZ3MxLCBhcmdzMikge1xuICAgICAgICAvL3RoaXMuX2l0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnczIucHVzaChhcmdzMVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRHbHVjb3NlKCkge1xuICAgICAgICB0aGlzLmRhdGVUZXh0SG9sZGVyID0gdGhpcy5jdXJyZW50RGF0ZUhvbGRlcjtcbiAgICAgICAgdGhpcy5hZGRMYXlvdXRcbiAgICAgICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zaG93QWRkID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5zaG93RGFpbHlDaGFydCA9IGZhbHNlO1xuICAgIH1cbiAgICBzaG93RGF5Q2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dXZWVrbHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dNb250aGx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlRGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IHRydWU7XG4gICAgfVxuXG4gICAgc2hvd1dlZWtDaGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93V2Vla2x5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dEYWlseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd01vbnRobHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZU1vbnRoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVEYXkgPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZVdlZWsgPSBmYWxzZTtcbiAgICB9XG4gICAgc2hvd01vbnRoQ2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1dlZWtseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93TW9udGhseUNoYXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZURheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IHRydWU7XG4gICAgfVxuXG4gICAgc2VsZWN0RGF0ZShmbikge1xuICAgICAgICBwaWNrZXJcbiAgICAgICAgICAgIC5waWNrRGF0ZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuY3VycmVudERhdGVIb2xkZXIsXG4gICAgICAgICAgICAgICAgdGhlbWU6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgIC8vIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgc3RhcnRpbmdEYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVTdHIgPSByZXN1bHQuZGF5ICsgXCItXCIgKyByZXN1bHQubW9udGggKyBcIi1cIiArIHJlc3VsdC55ZWFyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoID0gcmVzdWx0Lm1vbnRoICsgXCItXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVTdHIgPVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRheSArIFwiL1wiICsgcmVzdWx0Lm1vbnRoICsgXCIvXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGV4dEhvbGRlciA9IHRoaXMuc2VsZWN0ZWREYXRlU3RyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm4pIGZuKCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEZvY3VzKCkge1xuICAgICAgICB0aGlzLmlucHV0RmllbGRFbC5mb2N1cygpO1xuXG4gICAgfVxuICAgIHBpY2tEYXRlVGltZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3REYXRlKHRoaXMuc2VsZWN0VGltZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cblxuICAgIHNlbGVjdFRpbWUoKSB7XG4gICAgICAgIHBpY2tlclxuICAgICAgICAgICAgLnBpY2tUaW1lKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5jdXJyZW50RGF0ZUhvbGRlcixcbiAgICAgICAgICAgICAgICB0aGVtZTogXCJkYXJrXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG91clN0ciA9IHJlc3VsdC5ob3VyICsgXCI6XCIgKyByZXN1bHQubWludXRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGltZVN0ciA9IHJlc3VsdC5ob3VyICsgXCI6XCIgKyByZXN1bHQubWludXRlO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmRhdGVUZXh0SG9sZGVyID10aGlzLnNlbGVjdGVkVGltZVN0cjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mdWxsZGF0ZVN0ciA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZVN0ciArIFwiIFwiICsgdGhpcy5zZWxlY3RlZFRpbWVTdHIsIFwibW0vZGQveXl5eSBoaDptbVwiKS5mb3JtYXQoJ0xMTEwnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGV4dEhvbGRlciA9IHRoaXMuZnVsbGRhdGVTdHI7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaW5wdXRGaWVsZEVsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRm9jdXMoKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xvc2VBZGQoKSB7XG5cbiAgICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmFkZExheW91dFxuICAgICAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiB0aGlzLnNjcmVlbkhlaWdodCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTAsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgLy8gdGhpcy5pbnB1dC5nbHVjb3NlLnZhbHVlID0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuUHJlc3MoYXJncykge1xuXG4gICAgICAgIC8vIGlmICh0aGlzLnZhbGlkYXRlSW5wdXQoKSkge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uUmV0dXJuXCIpO1xuICAgICAgICAvLyB0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUgPSBOdW1iZXIodGV4dEZpZWxkLnRleHQpO1xuICAgICAgICB0aGlzLm1lc3VyZSA9IE51bWJlcih0ZXh0RmllbGQudGV4dCk7XG4gICAgICAgIHRoaXMuc2F2ZUFkZCgpO1xuXG4gICAgfVxuXG5cblxuICAgIHNhdmVBZGQoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkRGF0ZVN0cikge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICBuZXcgYXBwQWN0aW9uLlNob3dUb2FzdEFjdGlvbih0aGlzLlBMRUFTRV9TRUxFQ1RfREFURSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc2VsZWN0ZWRUaW1lU3RyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIG5ldyBhcHBBY3Rpb24uU2hvd1RvYXN0QWN0aW9uKHRoaXMuUExFQVNFX1NFTEVDVF9IT1VSKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy90aGlzLm1lc3VyZT1wYXJzZUZsb2F0KHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZVN0cjtcbiAgICAgICAgICAgIHRoaXMuY2hhcnQucHVzaCh7IERhdGU6IHRoaXMuc2VsZWN0ZWRUaW1lU3RyLCBNZXN1cmU6IHRoaXMubWVzdXJlIH0pO1xuICAgICAgICAgICAgc2V0U3RyaW5nKFwiY2hhcnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5jaGFydCkpO1xuICAgICAgICAgICAgbGV0IGxhc3RNZXN1cmU7XG4gICAgICAgICAgICBsYXN0TWVzdXJlPXtcbiAgICAgICAgICAgICAgICBtZXN1cmU6dGhpcy5tZXN1cmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFN0cmluZyhcIm1lc3VyZVwiLCBKU09OLnN0cmluZ2lmeShsYXN0TWVzdXJlKSk7Ly9sYXN0IE1lc3VyZVxuICAgICAgICAgICAgdGhpcy5fU291cmNlRGFpbHkucHVzaCh0aGlzLmNoYXJ0KTtcbiAgICAgICAgICAgIGxldCB3ZWVrID0gdGhpcy5jaGFydC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLk1lc3VyZSwgMCkgLyB0aGlzLmNoYXJ0Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuY2hhcnRXZWVrLnB1c2goeyBEYXRlOiB0aGlzLmRhdGUsIE1lc3VyZTogd2VlayB9KTtcbiAgICAgICAgICAgIHNldFN0cmluZyhcImNoYXJ0V2Vla1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmNoYXJ0V2VlaykpO1xuICAgICAgICAgICAgdGhpcy5fU291cmNlV2Vla2x5LnB1c2godGhpcy5jaGFydFdlZWspO1xuICAgICAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5jaGFydFdlZWsucmVkdWNlKChhLCBiKSA9PiBhICsgYi5NZXN1cmUsIDApIC8gdGhpcy5jaGFydFdlZWsubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5jaGFydE1vbnRoLnB1c2goeyBEYXRlOiB0aGlzLm1vbnRoLCBNZXN1cmU6IG1vbnRoIH0pO1xuICAgICAgICAgICAgc2V0U3RyaW5nKFwiY2hhcnRNb250aFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmNoYXJ0TW9udGgpKTtcbiAgICAgICAgICAgIHRoaXMuX1NvdXJjZU1vbnRobHkucHVzaCh0aGlzLmNoYXJ0TW9udGgpO1xuICAgICAgICAgICAgLyogdGhpcy5kYXRhLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgRGF0ZTogaXRlbS5EYXRlLFxuICAgICAgICAgICAgICAgICAgICAgIE1lc3VyZTogaXRlbS5NZXN1cmVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkuZm9yRWFjaChpdGVtID0+IHRoaXMuc291cmNlLnB1c2goaXRlbSkpOyovXG4gICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJ0Lmxlbmd0aD4yKVxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jbG9zZUFkZCgpO1xuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG4gICAgbm90aWZpY2F0aW9uKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgTG9jYWxOb3RpZmljYXRpb25zLnNjaGVkdWxlKFt7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIHRpdGxlOiBcIkdseWPDqW1pZVwiLFxuICAgICAgICAgICAgYm9keTogYXJncyxcbiAgICAgICAgICAgIGJhZGdlOiAxLFxuICAgICAgICAgICAgYXQ6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwICogMTAwMCkpIC8vIDUgbWludXRlcyBmcm9tIG5vd1xuICAgICAgICB9XSk7XG5cblxuICAgICAgICAvLyBhZGRpbmcgYSBoYW5kbGVyLCBzbyB3ZSBjYW4gZG8gc29tZXRoaW5nIHdpdGggdGhlIHJlY2VpdmVkIG5vdGlmaWNhdGlvbi4uIGluIHRoaXMgY2FzZSBhbiBhbGVydFxuICAgICAgICBMb2NhbE5vdGlmaWNhdGlvbnMuYWRkT25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjayhkYXRhID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCIgTm90aWZpY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYFRpdHJlOiAke2RhdGEudGl0bGV9LCBEZXNjcmlwdGlvbjogJHtkYXRhLmJvZHl9YCxcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaG93Tm90aWZpY2F0aW9uKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3R5cGUgMSBuZSBkZXBhc3NlIHBhcyAxLjUgXG4gICAgLy90eXBlIDIgbmUgZGVwYXNzZSBwYXMgMi41XG4gICAge1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS50eXBlID09IFwibGFkYVwiIHx8IHRoaXMudXNlckRhdGEudHlwZSA9PSBcImdlc3RhdGlvbm5lbFwiKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMubWVzdXJlKSA8IDAuNykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIiBBdHRlbnRpb24gdm91cyBhdmV6IHVuZSBoeXBvZ2x5Y8OpbWllIFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcih0aGlzLm1lc3VyZSkgPiAxLjgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiIEF0dGVudGlvbiB2b3VzIGF2ZXogdW5lIGh5cGVyZ2x5Y8OpbWllIFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24odGhpcy5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgKHRoaXMudXNlckRhdGEudHlwZSA9PSBcInR5cGUgMVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcih0aGlzLm1lc3VyZSkgPCAwLjcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiIEF0dGVudGlvbiB2b3VzIGF2ZXogdW5lIGh5cG9nbHljw6ltaWUgXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMubWVzdXJlKSA+IDEuNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiIEF0dGVudGlvbiB2b3VzIGF2ZXogdW5lIGh5cGVyZ2x5Y8OpbWllIFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbih0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXNlckRhdGEudHlwZSA9IFwidHlwZSAyXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMubWVzdXJlKSA8IDAuNykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCIgQXR0ZW50aW9uIHZvdXMgYXZleiB1bmUgaHlwb2dseWPDqW1pZSBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5tZXN1cmUpID4gMi41KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCIgQXR0ZW50aW9uIHZvdXMgYXZleiB1bmUgaHlwZXJnbHljw6ltaWUgXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbih0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiAgcHJpdmF0ZSB2YWxpZGF0ZUlucHV0KCkge1xuICAgICAgICAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNOdW1iZXIodGhpcy5pbnB1dC5nbHVjb3NlLnZhbHVlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICB0aGlzLmlucHV0LmdsdWNvc2UuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZ2x1Y29zZS5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICBWYWxpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgfVxuICAgICAgICAgICByZXR1cm4gVmFsaWRlO1xuICAgICAgIH0qL1xuXG4gICAgaGlkZUtleWJvYXJkKCkge1xuICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eSA9IGFwcGxpY2F0aW9uLmFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5O1xuICAgICAgICAgICAgICAgIGxldCBDb250ZXh0ID0gYXBwbGljYXRpb24uYW5kcm9pZC5jdXJyZW50Q29udGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRNYW5hZ2VyID0gQ29udGV4dC5nZXRTeXN0ZW1TZXJ2aWNlKFxuICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLmNvbnRlbnQuQ29udGV4dC5JTlBVVF9NRVRIT0RfU0VSVklDRVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaW5wdXRNYW5hZ2VyLmhpZGVTb2Z0SW5wdXRGcm9tV2luZG93KFxuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eS5nZXRDdXJyZW50Rm9jdXMoKS5nZXRXaW5kb3dUb2tlbigpLFxuICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLnZpZXcuaW5wdXRtZXRob2QuSW5wdXRNZXRob2RNYW5hZ2VyLkhJREVfTk9UX0FMV0FZU1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=