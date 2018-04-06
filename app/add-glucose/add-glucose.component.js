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
            application_settings_1.setString("mesure", JSON.stringify(this.mesure)); //last Mesure
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
            this.closeAdd();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUtyRCxxQ0FBa0M7QUFFbEMsNEZBQW1IO0FBQ25ILElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0FBQ3JGLElBQU0sTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDakMsc0RBQTZEO0FBRTdELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QywwRUFBd0U7QUFDeEUsdURBQXFEO0FBQ3JELGtDQUFlLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxHQUFHLEVBQWhELENBQWdELENBQUMsQ0FBQztBQUMvRSw0Q0FBNEM7QUFDNUMsa0RBQWtEO0FBQ2xELCtCQUFpQztBQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBSXBCLHFDQUFvQztBQUVwQywyREFBNkQ7QUFDN0QsbUdBQWtHO0FBV2xHO0lBK0RJLDZCQUNZLEtBQVcsRUFDWCxNQUF3QixFQUN4QixlQUFnQyxFQUNoQyxLQUE0QjtRQUg1QixVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBL0R4QyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFPckIsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsOEJBQXlCLEdB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QUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxlQUFlLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ2pFLGdDQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDL0MsZ0NBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLGFBQWE7WUFDOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFaLENBQVksRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUM1RSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ25ELGdDQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFaLENBQVksRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUNyRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ3JELGdDQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDOzs7OzsyREFLK0M7WUFDL0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFLTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O1VBV007SUFFTiwwQ0FBWSxHQUFaO1FBQ0ksRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUM7Z0JBQ0QsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztnQkFDdEQsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7Z0JBQ2pELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDdkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQy9DLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLHVCQUF1QixDQUNoQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FDOUQsQ0FBQztZQUNOLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBdFNvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCO2dFQUFDO0lBQ3JDO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFlLGlCQUFVOzZEQUFDO0lBQ3ZCO1FBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDO2tDQUFpQixpQkFBVTsrREFBQztJQUM1QjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBb0IsaUJBQVU7a0VBQUM7SUF6QzlDLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FpRXFCLFdBQUk7WUFDSCx5QkFBZ0I7WUFDUCxrQ0FBZTtZQUN6QixhQUFLO09BbkVmLG1CQUFtQixDQThVL0I7SUFBRCwwQkFBQztDQUFBLEFBOVVELElBOFVDO0FBOVVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSwgQ2hhbmdlZERhdGEsIENoYW5nZVR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuY29uc3QgTW9kYWxQaWNrZXIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCIpLk1vZGFsRGF0ZXRpbWVwaWNrZXI7XG5jb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIoKTtcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuZGVjbGFyZSB2YXIgYW5kcm9pZDtcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tIFwiLi92YWxpZGF0ZS5zZXJ2aWNlXCI7XG5yZWdpc3RlckVsZW1lbnQoXCJGYWJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblwiKS5GYWIpO1xuLy9yZWdpc3RlckVsZW1lbnQoJ1BERlZpZXcnLCAoKSA9PiBQREZWaWV3KTtcbi8vaW1wb3J0IHsgUERGVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wZGYtdmlldyc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xubW9tZW50LmxvY2FsZShcImZyXCIpO1xuaW1wb3J0IHsgQWJzb2x1dGVMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dC9hYnNvbHV0ZS1sYXlvdXRcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uL3NoYXJlZC9hY3Rpb25zL2FwcC5hY3Rpb25zXCI7XG5pbXBvcnQgeyBzZXRTdHJpbmcsIGdldFN0cmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImFkZC1nbHVjb3NlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQWRkR2x1Y29zZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb250aDogc3RyaW5nO1xuICAgXG4gICAgZW5hYmxlRGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgZW5hYmxlV2VlazogYm9vbGVhbiA9IHRydWU7XG4gICAgZW5hYmxlTW9udGg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlucHV0OiBhbnk7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGdsdWNvc2U6IHN0cmluZztcbiAgICBtZXN1cmU6IG51bWJlcjtcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGRhdGVUZXh0SG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBkYXRlVGV4dEhvbGRlckRlZmF1bHRUZXh0OiBzdHJpbmcgPSBcIkNob29zZSB0aGUgZGF0ZVwiO1xuICAgIHB1YmxpYyBjdXJyZW50RGF0ZTogRGF0ZTtcbiAgICBwdWJsaWMgY3VycmVudERhdGVIb2xkZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgc2hvd0FkZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dXZWVrbHlDaGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dNb250aGx5Q2hhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93RGFpbHlDaGFydDogYm9vbGVhbiA9IHRydWU7XG4gICAgUElDS19EQVRFID0gXCJDaG9vc2UgRGF0ZVwiO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIHNlbGVjdGVkVGltZVN0cjogc3RyaW5nID0gXCJcIjtcbiAgICBQSUNLX0hPVVIgPSBcIkNob29zZSBIb3VyXCI7XG4gICAgcHJpdmF0ZSBkYXRlU3RyO1xuICAgIHByaXZhdGUgaG91clN0cjtcbiAgICBwdWJsaWMgZnVsbGRhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBkYXRhID0gW107XG4gICAgY2hhcnQ6IGFueVtdID0gW107XG4gICAgY2hhcnRXZWVrOiBhbnlbXSA9IFtdO1xuICAgIGNoYXJ0TW9udGg6IGFueVtdID0gW107XG4gICAgUExFQVNFX1NFTEVDVF9EQVRFID0gXCJWb3VzIGRldmV6IHPDqWxlY3Rpb25uZXIgbGEgZGF0ZVwiO1xuICAgIFBMRUFTRV9TRUxFQ1RfSE9VUiA9IFwiVm91cyBkZXZleiBzw6lsZWN0aW9ubmVyIGwnaGV1cmVcIjtcbiAgICAvL3RleHRJbnB1dCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBwdWJsaWMgc2xpZGVyVmFsdWUxID0gMTE2O1xuXG5cbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKFwiYWRkTGF5b3V0XCIpIGFkZExheW91dFJlZjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiY2hhcnRMYXlvdXRcIikgY2hhcnRMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcImlucHV0RmllbGRcIikgaW5wdXRGaWVsZEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XG4gICAgcHJpdmF0ZSBnZXQgYWRkTGF5b3V0KCk6IEFic29sdXRlTGF5b3V0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0IGNoYXJ0TGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnRMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgaW5wdXRGaWVsZEVsKCk6IFRleHRGaWVsZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0RmllbGRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0IHNjcmVlbkhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgc2NyZWVuV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcbiAgICB9XG4gICAgcHJpdmF0ZSBfU291cmNlRGFpbHk6IE9ic2VydmFibGVBcnJheTxhbnk+O1xuICAgIHByaXZhdGUgX1NvdXJjZVdlZWtseTogT2JzZXJ2YWJsZUFycmF5PERhdGE+O1xuICAgIHByaXZhdGUgX1NvdXJjZU1vbnRobHk6IE9ic2VydmFibGVBcnJheTxEYXRhPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0ZVNlcnZpY2U6IFZhbGlkYXRlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8ZnJvbVJvb3QuU3RhdGU+LCApIHtcblxuICAgICAgICB0aGlzLmlucHV0ID0ge1xuXG4gICAgICAgICAgICBnbHVjb3NlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNoYXJ0ID0gW1xuICAgICAgICAgICAvKiB7XG4gICAgICAgICAgICAgICAgRGF0ZTogXCIxMjozMFwiLFxuICAgICAgICAgICAgICAgIE1lc3VyZToyLFxuICAgICAgICAgICAgfSovXTtcbiAgICAgICAgdGhpcy5jaGFydFdlZWsgPSBbXG4gICAgICAgICAgICAvL3tcbiAgICAgICAgICAgIC8vIERhdGU6IFwiNy8wMy8yMDE4XCIsXG4gICAgICAgICAgICAvLyBNZXN1cmU6IDYsXG4gICAgICAgICAgICAvL31cbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jaGFydE1vbnRoID0gW1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRlID1uZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRlSG9sZGVyPW1vbWVudCh0aGlzLmN1cnJlbnREYXRlLFwibW0vZGQveXl5eSBoaDptbVwiKS5mb3JtYXQoJ0xMTEwnKVxuICAgICAgICBcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuYWRkTGF5b3V0LnRyYW5zbGF0ZVkgPSB0aGlzLnNjcmVlbkhlaWdodDtcbiAgICAgICAgbGV0IGNoYXJ0cztcbiAgICAgICAgY2hhcnRzPSB7XG4gICAgICAgICAgICBjaGFydDogSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJjaGFydFwiLCBcInt9XCIpKSxcbiAgICAgICAgICAgIGNoYXJ0V2VlazogSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJjaGFydFdlZWtcIiwgXCJ7fVwiKSksXG4gICAgICAgICAgICBjaGFydE1vbnRoOiBKU09OLnBhcnNlKGdldFN0cmluZyhcImNoYXJ0TW9udGhcIiwgXCJ7fVwiKSksXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoY2hhcnRzLmNoYXJ0LCB0aGlzLmNoYXJ0KTtcbiAgICAgICAgdGhpcy5pbml0RGF0YUl0ZW1zKGNoYXJ0cy5jaGFydFdlZWssIHRoaXMuY2hhcnRXZWVrKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YUl0ZW1zKGNoYXJ0cy5jaGFydE1vbnRoLCB0aGlzLmNoYXJ0TW9udGgpO1xuICAgICAgICB0aGlzLl9Tb3VyY2VEYWlseSA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5jaGFydCk7XG4gICAgICAgIHRoaXMuX1NvdXJjZVdlZWtseSA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5jaGFydFdlZWspO1xuICAgICAgICB0aGlzLl9Tb3VyY2VNb250aGx5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0TW9udGgpO1xuICAgICAgICAvL3RoaXMuc2F2ZUFkZCgpO1xuICAgICAgICAvL2xldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuaW5wdXRGaWVsZEVsZW1lbnQubmF0aXZlRWxlbWVudC5vYmplY3Q7XG5cblxuICAgIH1cblxuXG4gICAgZ2V0IFNvdXJjZURhaWx5KCk6IE9ic2VydmFibGVBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NvdXJjZURhaWx5O1xuICAgIH1cbiAgICBnZXQgU291cmNlV2Vla2x5KCk6IE9ic2VydmFibGVBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NvdXJjZVdlZWtseTtcbiAgICB9XG4gICAgZ2V0IFNvdXJjZU1vbnRobHkoKTogT2JzZXJ2YWJsZUFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fU291cmNlTW9udGhseTtcbiAgICB9XG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgaW5pdERhdGFJdGVtcyhhcmdzMSwgYXJnczIpIHtcbiAgICAgICAgLy90aGlzLl9pdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8YW55PigpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnczEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3MyLnB1c2goYXJnczFbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkR2x1Y29zZSgpIHtcbiAgICAgICAgdGhpcy5kYXRlVGV4dEhvbGRlciA9IHRoaXMuY3VycmVudERhdGVIb2xkZXI7XG4gICAgICAgIHRoaXMuYWRkTGF5b3V0XG4gICAgICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2hvd0FkZCA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSBmYWxzZTtcbiAgICB9XG4gICAgc2hvd0RheUNoYXJ0KCkge1xuICAgICAgICB0aGlzLnNob3dEYWlseUNoYXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93V2Vla2x5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93TW9udGhseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlTW9udGggPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZURheSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZVdlZWsgPSB0cnVlO1xuICAgIH1cblxuICAgIHNob3dXZWVrQ2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1dlZWtseUNoYXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93RGFpbHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dNb250aGx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlRGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVXZWVrID0gZmFsc2U7XG4gICAgfVxuICAgIHNob3dNb250aENoYXJ0KCkge1xuICAgICAgICB0aGlzLnNob3dXZWVrbHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dEYWlseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd01vbnRobHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlTW9udGggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVEYXkgPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZVdlZWsgPSB0cnVlO1xuICAgIH1cblxuICAgIHNlbGVjdERhdGUoZm4pIHtcbiAgICAgICAgcGlja2VyXG4gICAgICAgICAgICAucGlja0RhdGUoe1xuICAgICAgICAgICAgICAgIHRpdGxlOnRoaXMuY3VycmVudERhdGVIb2xkZXIsXG4gICAgICAgICAgICAgICAgdGhlbWU6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgLy8gbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBzdGFydGluZ0RhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVN0ciA9IHJlc3VsdC5kYXkgKyBcIi1cIiArIHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LnllYXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGggPSByZXN1bHQubW9udGggKyBcIi1cIiArIHJlc3VsdC55ZWFyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVN0ciA9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF5ICsgXCIvXCIgKyByZXN1bHQubW9udGggKyBcIi9cIiArIHJlc3VsdC55ZWFyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZXh0SG9sZGVyID0gdGhpcy5zZWxlY3RlZERhdGVTdHI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmbikgZm4oKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRGaWVsZEVsLmZvY3VzKCk7XG5cbiAgICB9XG4gICAgcGlja0RhdGVUaW1lKCkge1xuICAgICAgICB0aGlzLnNlbGVjdERhdGUodGhpcy5zZWxlY3RUaW1lLmJpbmQodGhpcykpO1xuICAgIH1cblxuXG4gICAgc2VsZWN0VGltZSgpIHtcbiAgICAgICAgcGlja2VyXG4gICAgICAgICAgICAucGlja1RpbWUoe1xuICAgICAgICAgICAgICAgIHRpdGxlOnRoaXMuY3VycmVudERhdGVIb2xkZXIsXG4gICAgICAgICAgICAgICAgdGhlbWU6IFwiZGFya1wiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvdXJTdHIgPSByZXN1bHQuaG91ciArIFwiOlwiICsgcmVzdWx0Lm1pbnV0ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWVTdHIgPSByZXN1bHQuaG91ciArIFwiOlwiICsgcmVzdWx0Lm1pbnV0ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5kYXRlVGV4dEhvbGRlciA9dGhpcy5zZWxlY3RlZFRpbWVTdHI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbGRhdGVTdHIgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGVTdHIgKyBcIiBcIiArIHRoaXMuc2VsZWN0ZWRUaW1lU3RyLCBcIm1tL2RkL3l5eXkgaGg6bW1cIikuZm9ybWF0KCdMTExMJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRleHRIb2xkZXIgPSB0aGlzLmZ1bGxkYXRlU3RyO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmlucHV0RmllbGRFbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEZvY3VzKCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsb3NlQWRkKCkge1xuXG4gICAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnNob3dEYWlseUNoYXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGRMYXlvdXRcbiAgICAgICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogdGhpcy5zY3JlZW5IZWlnaHQgfSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIC8vIHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZSA9IFwiXCI7XG4gICAgfVxuICAgIHJldHVyblByZXNzKGFyZ3MpIHtcblxuICAgICAgICAvLyBpZiAodGhpcy52YWxpZGF0ZUlucHV0KCkpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJvblJldHVyblwiKTtcbiAgICAgICAgLy8gdGhpcy5pbnB1dC5nbHVjb3NlLnZhbHVlID0gTnVtYmVyKHRleHRGaWVsZC50ZXh0KTtcbiAgICAgICAgdGhpcy5tZXN1cmUgPSBOdW1iZXIodGV4dEZpZWxkLnRleHQpO1xuICAgICAgICB0aGlzLnNhdmVBZGQoKTtcblxuICAgIH1cblxuXG5cbiAgICBzYXZlQWRkKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZERhdGVTdHIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgbmV3IGFwcEFjdGlvbi5TaG93VG9hc3RBY3Rpb24odGhpcy5QTEVBU0VfU0VMRUNUX0RBVEUpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnNlbGVjdGVkVGltZVN0cikge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICBuZXcgYXBwQWN0aW9uLlNob3dUb2FzdEFjdGlvbih0aGlzLlBMRUFTRV9TRUxFQ1RfSE9VUilcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vdGhpcy5tZXN1cmU9cGFyc2VGbG9hdCh0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5zZWxlY3RlZERhdGVTdHI7XG4gICAgICAgICAgICB0aGlzLmNoYXJ0LnB1c2goe0RhdGU6dGhpcy5zZWxlY3RlZFRpbWVTdHIsTWVzdXJlOiB0aGlzLm1lc3VyZX0pO1xuICAgICAgICAgICAgc2V0U3RyaW5nKFwiY2hhcnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5jaGFydCkpO1xuICAgICAgICAgICAgc2V0U3RyaW5nKFwibWVzdXJlXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMubWVzdXJlKSk7Ly9sYXN0IE1lc3VyZVxuICAgICAgICAgICAgdGhpcy5fU291cmNlRGFpbHkucHVzaCh0aGlzLmNoYXJ0KTtcbiAgICAgICAgICAgIGxldCB3ZWVrID0gdGhpcy5jaGFydC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLk1lc3VyZSwgMCkgLyB0aGlzLmNoYXJ0Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuY2hhcnRXZWVrLnB1c2goe0RhdGU6dGhpcy5kYXRlLCBNZXN1cmU6d2Vla30pO1xuICAgICAgICAgICAgc2V0U3RyaW5nKFwiY2hhcnRXZWVrXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuY2hhcnRXZWVrKSk7XG4gICAgICAgICAgICB0aGlzLl9Tb3VyY2VXZWVrbHkucHVzaCh0aGlzLmNoYXJ0V2Vlayk7XG4gICAgICAgICAgICBsZXQgbW9udGggPSB0aGlzLmNoYXJ0V2Vlay5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLk1lc3VyZSwgMCkgLyB0aGlzLmNoYXJ0V2Vlay5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmNoYXJ0TW9udGgucHVzaCh7RGF0ZTp0aGlzLm1vbnRoLE1lc3VyZTptb250aH0pO1xuICAgICAgICAgICAgc2V0U3RyaW5nKFwiY2hhcnRNb250aFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmNoYXJ0TW9udGgpKTtcbiAgICAgICAgICAgIHRoaXMuX1NvdXJjZU1vbnRobHkucHVzaCh0aGlzLmNoYXJ0TW9udGgpO1xuICAgICAgICAgICAgLyogdGhpcy5kYXRhLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgRGF0ZTogaXRlbS5EYXRlLFxuICAgICAgICAgICAgICAgICAgICAgIE1lc3VyZTogaXRlbS5NZXN1cmVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkuZm9yRWFjaChpdGVtID0+IHRoaXMuc291cmNlLnB1c2goaXRlbSkpOyovXG4gICAgICAgICAgICB0aGlzLmNsb3NlQWRkKCk7XG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cblxuICAgIC8qICBwcml2YXRlIHZhbGlkYXRlSW5wdXQoKSB7XG4gICAgICAgICAgIGxldCBWYWxpZGUgPSB0cnVlO1xuICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5pc051bWJlcih0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZ2x1Y29zZS5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5nbHVjb3NlLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgIFZhbGlkZSA9IGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIHJldHVybiBWYWxpZGU7XG4gICAgICAgfSovXG5cbiAgICBoaWRlS2V5Ym9hcmQoKSB7XG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2aXR5ID0gYXBwbGljYXRpb24uYW5kcm9pZC5mb3JlZ3JvdW5kQWN0aXZpdHk7XG4gICAgICAgICAgICAgICAgbGV0IENvbnRleHQgPSBhcHBsaWNhdGlvbi5hbmRyb2lkLmN1cnJlbnRDb250ZXh0O1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dE1hbmFnZXIgPSBDb250ZXh0LmdldFN5c3RlbVNlcnZpY2UoXG4gICAgICAgICAgICAgICAgICAgIGFuZHJvaWQuY29udGVudC5Db250ZXh0LklOUFVUX01FVEhPRF9TRVJWSUNFXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpbnB1dE1hbmFnZXIuaGlkZVNvZnRJbnB1dEZyb21XaW5kb3coXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5LmdldEN1cnJlbnRGb2N1cygpLmdldFdpbmRvd1Rva2VuKCksXG4gICAgICAgICAgICAgICAgICAgIGFuZHJvaWQudmlldy5pbnB1dG1ldGhvZC5JbnB1dE1ldGhvZE1hbmFnZXIuSElERV9OT1RfQUxXQVlTXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==