"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page/page");
var platform_1 = require("platform");
var data_1 = require("./data");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var picker = new ModalPicker();
var platform_2 = require("tns-core-modules/platform");
var application = require("application");
var element_registry_1 = require("nativescript-angular/element-registry");
var validate_service_1 = require("./validate.service");
element_registry_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; });
var moment = require("moment");
moment.locale("fr");
var store_1 = require("@ngrx/store");
var appAction = require("./../shared/actions/app.actions");
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
        this.chart = [
            {
                Date: "12:30",
                Mesure: 2,
            }
        ];
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
            this.chart.push(new data_1.Data(this.selectedTimeStr, this.mesure));
            this._SourceDaily.push(new data_1.Data(this.selectedTimeStr, this.mesure));
            var week = this.chart.reduce(function (a, b) { return a + b.Mesure; }, 0) / this.chart.length;
            this.chartWeek.push(new data_1.Data(this.date, week));
            this._SourceWeekly.push(new data_1.Data(this.date, week));
            var month = this.chartWeek.reduce(function (a, b) { return a + b.Mesure; }, 0) / this.chartWeek.length;
            this.chartMonth.push(new data_1.Data(this.month, month));
            this._SourceMonthly.push(new data_1.Data(this.month, month));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUtyRCxxQ0FBa0M7QUFDbEMsK0JBQThCO0FBQzlCLDRGQUFtSDtBQUNuSCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztBQUNyRixJQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLHNEQUE2RDtBQUU3RCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsMEVBQXdFO0FBQ3hFLHVEQUFxRDtBQUNyRCxrQ0FBZSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsR0FBRyxFQUFoRCxDQUFnRCxDQUFDLENBQUM7QUFDL0UsK0JBQWlDO0FBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFJcEIscUNBQW9DO0FBRXBDLDJEQUE2RDtBQVU3RDtJQStESSw2QkFDWSxLQUFXLEVBQ1gsTUFBd0IsRUFDeEIsZUFBZ0MsRUFDaEMsS0FBNEI7UUFINUIsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQS9EeEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBT3JCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLDhCQUF5QixHQUFXLGlCQUFpQixDQUFDO1FBRXRELHNCQUFp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QUM7a0NBQWtCLGdDQUFzQjtnRUFBQztJQUNyQztRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBZSxpQkFBVTs2REFBQztJQUN2QjtRQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQztrQ0FBaUIsaUJBQVU7K0RBQUM7SUFDNUI7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQW9CLGlCQUFVO2tFQUFDO0lBekM5QyxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzdDLENBQUM7eUNBaUVxQixXQUFJO1lBQ0gseUJBQWdCO1lBQ1Asa0NBQWU7WUFDekIsYUFBSztPQW5FZixtQkFBbUIsQ0EwVC9CO0lBQUQsMEJBQUM7Q0FBQSxBQTFURCxJQTBUQztBQTFUWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0L3N0YWNrLWxheW91dFwiO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXksIENoYW5nZWREYXRhLCBDaGFuZ2VUeXBlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcbmNvbnN0IE1vZGFsUGlja2VyID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlclwiKS5Nb2RhbERhdGV0aW1lcGlja2VyO1xuY29uc3QgcGlja2VyID0gbmV3IE1vZGFsUGlja2VyKCk7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcbmRlY2xhcmUgdmFyIGFuZHJvaWQ7XG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgVmFsaWRhdGVTZXJ2aWNlIH0gZnJvbSBcIi4vdmFsaWRhdGUuc2VydmljZVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiRmFiXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cIikuRmFiKTtcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5tb21lbnQubG9jYWxlKFwiZnJcIik7XG5pbXBvcnQgeyBBYnNvbHV0ZUxheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0L2Fic29sdXRlLWxheW91dFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xuaW1wb3J0ICogYXMgZnJvbVJvb3QgZnJvbSBcIi4vLi4vc2hhcmVkL3JlZHVjZXJzXCI7XG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcblxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImFkZC1nbHVjb3NlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQWRkR2x1Y29zZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb250aDogc3RyaW5nO1xuICAgXG4gICAgZW5hYmxlRGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgZW5hYmxlV2VlazogYm9vbGVhbiA9IHRydWU7XG4gICAgZW5hYmxlTW9udGg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlucHV0OiBhbnk7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGdsdWNvc2U6IHN0cmluZztcbiAgICBtZXN1cmU6IG51bWJlcjtcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGRhdGVUZXh0SG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBkYXRlVGV4dEhvbGRlckRlZmF1bHRUZXh0OiBzdHJpbmcgPSBcIkNob29zZSB0aGUgZGF0ZVwiO1xuICAgIHB1YmxpYyBjdXJyZW50RGF0ZTogRGF0ZTtcbiAgICBwdWJsaWMgY3VycmVudERhdGVIb2xkZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgc2hvd0FkZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dXZWVrbHlDaGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dNb250aGx5Q2hhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93RGFpbHlDaGFydDogYm9vbGVhbiA9IHRydWU7XG4gICAgUElDS19EQVRFID0gXCJDaG9vc2UgRGF0ZVwiO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIHNlbGVjdGVkVGltZVN0cjogc3RyaW5nID0gXCJcIjtcbiAgICBQSUNLX0hPVVIgPSBcIkNob29zZSBIb3VyXCI7XG4gICAgcHJpdmF0ZSBkYXRlU3RyO1xuICAgIHByaXZhdGUgaG91clN0cjtcbiAgICBwdWJsaWMgZnVsbGRhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBkYXRhID0gW107XG4gICAgY2hhcnQ6IERhdGFbXSA9IFtdO1xuICAgIGNoYXJ0V2VlazogRGF0YVtdID0gW107XG4gICAgY2hhcnRNb250aDogRGF0YVtdID0gW107XG4gICAgUExFQVNFX1NFTEVDVF9EQVRFID0gXCJWb3VzIGRldmV6IHPDqWxlY3Rpb25uZXIgbGEgZGF0ZVwiO1xuICAgIFBMRUFTRV9TRUxFQ1RfSE9VUiA9IFwiVm91cyBkZXZleiBzw6lsZWN0aW9ubmVyIGwnaGV1cmVcIjtcbiAgICAvL3RleHRJbnB1dCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBwdWJsaWMgc2xpZGVyVmFsdWUxID0gMTE2O1xuXG5cbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKFwiYWRkTGF5b3V0XCIpIGFkZExheW91dFJlZjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiY2hhcnRMYXlvdXRcIikgY2hhcnRMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcImlucHV0RmllbGRcIikgaW5wdXRGaWVsZEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XG4gICAgcHJpdmF0ZSBnZXQgYWRkTGF5b3V0KCk6IEFic29sdXRlTGF5b3V0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0IGNoYXJ0TGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnRMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgaW5wdXRGaWVsZEVsKCk6IFRleHRGaWVsZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0RmllbGRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0IHNjcmVlbkhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgc2NyZWVuV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcbiAgICB9XG4gICAgcHJpdmF0ZSBfU291cmNlRGFpbHk6IE9ic2VydmFibGVBcnJheTxEYXRhPjtcbiAgICBwcml2YXRlIF9Tb3VyY2VXZWVrbHk6IE9ic2VydmFibGVBcnJheTxEYXRhPjtcbiAgICBwcml2YXRlIF9Tb3VyY2VNb250aGx5OiBPYnNlcnZhYmxlQXJyYXk8RGF0YT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdGVTZXJ2aWNlOiBWYWxpZGF0ZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPiwgKSB7XG5cbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcblxuICAgICAgICAgICAgZ2x1Y29zZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jaGFydCA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBEYXRlOiBcIjEyOjMwXCIsXG4gICAgICAgICAgICAgICAgTWVzdXJlOiAyLFxuICAgICAgICAgICAgfV07XG4gICAgICAgIHRoaXMuY2hhcnRXZWVrID0gW1xuICAgICAgICAgICAgLy97XG4gICAgICAgICAgICAvLyBEYXRlOiBcIjcvMDMvMjAxOFwiLFxuICAgICAgICAgICAgLy8gTWVzdXJlOiA2LFxuICAgICAgICAgICAgLy99XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY2hhcnRNb250aCA9IFtcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9bmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUhvbGRlcj1tb21lbnQodGhpcy5jdXJyZW50RGF0ZSxcIm1tL2RkL3l5eXkgaGg6bW1cIikuZm9ybWF0KCdMTExMJylcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFkZExheW91dC50cmFuc2xhdGVZID0gdGhpcy5zY3JlZW5IZWlnaHQ7XG4gICAgICAgIHRoaXMuX1NvdXJjZURhaWx5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0KTtcbiAgICAgICAgdGhpcy5fU291cmNlV2Vla2x5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0V2Vlayk7XG4gICAgICAgIHRoaXMuX1NvdXJjZU1vbnRobHkgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhcnRNb250aCk7XG4gICAgICAgIC8vdGhpcy5zYXZlQWRkKCk7XG4gICAgICAgIC8vbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5pbnB1dEZpZWxkRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9iamVjdDtcblxuXG4gICAgfVxuXG5cbiAgICBnZXQgU291cmNlRGFpbHkoKTogT2JzZXJ2YWJsZUFycmF5PERhdGE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NvdXJjZURhaWx5O1xuICAgIH1cbiAgICBnZXQgU291cmNlV2Vla2x5KCk6IE9ic2VydmFibGVBcnJheTxEYXRhPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9Tb3VyY2VXZWVrbHk7XG4gICAgfVxuICAgIGdldCBTb3VyY2VNb250aGx5KCk6IE9ic2VydmFibGVBcnJheTxEYXRhPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9Tb3VyY2VNb250aGx5O1xuICAgIH1cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxuXG5cblxuICAgIGFkZEdsdWNvc2UoKSB7XG4gICAgICAgIHRoaXMuZGF0ZVRleHRIb2xkZXIgPSB0aGlzLmN1cnJlbnREYXRlSG9sZGVyO1xuICAgICAgICB0aGlzLmFkZExheW91dFxuICAgICAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KVxuICAgICAgICB0aGlzLnNob3dBZGQgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLnNob3dEYWlseUNoYXJ0ID0gZmFsc2U7XG4gICAgfVxuICAgIHNob3dEYXlDaGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93RGFpbHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd1dlZWtseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd01vbnRobHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZU1vbnRoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVEYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVXZWVrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaG93V2Vla0NoYXJ0KCkge1xuICAgICAgICB0aGlzLnNob3dXZWVrbHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93TW9udGhseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlTW9udGggPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZURheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IGZhbHNlO1xuICAgIH1cbiAgICBzaG93TW9udGhDaGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93V2Vla2x5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93RGFpbHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dNb250aGx5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZU1vbnRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlRGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVXZWVrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZWxlY3REYXRlKGZuKSB7XG4gICAgICAgIHBpY2tlclxuICAgICAgICAgICAgLnBpY2tEYXRlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTp0aGlzLmN1cnJlbnREYXRlSG9sZGVyLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgIC8vIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgc3RhcnRpbmdEYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVTdHIgPSByZXN1bHQuZGF5ICsgXCItXCIgKyByZXN1bHQubW9udGggKyBcIi1cIiArIHJlc3VsdC55ZWFyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoID0gcmVzdWx0Lm1vbnRoICsgXCItXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVTdHIgPVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRheSArIFwiL1wiICsgcmVzdWx0Lm1vbnRoICsgXCIvXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGV4dEhvbGRlciA9IHRoaXMuc2VsZWN0ZWREYXRlU3RyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm4pIGZuKCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEZvY3VzKCkge1xuICAgICAgICB0aGlzLmlucHV0RmllbGRFbC5mb2N1cygpO1xuXG4gICAgfVxuICAgIHBpY2tEYXRlVGltZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3REYXRlKHRoaXMuc2VsZWN0VGltZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cblxuICAgIHNlbGVjdFRpbWUoKSB7XG4gICAgICAgIHBpY2tlclxuICAgICAgICAgICAgLnBpY2tUaW1lKHtcbiAgICAgICAgICAgICAgICB0aXRsZTp0aGlzLmN1cnJlbnREYXRlSG9sZGVyLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VyU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZGF0ZVRleHRIb2xkZXIgPXRoaXMuc2VsZWN0ZWRUaW1lU3RyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxkYXRlU3RyID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlU3RyICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkVGltZVN0ciwgXCJtbS9kZC95eXl5IGhoOm1tXCIpLmZvcm1hdCgnTExMTCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZXh0SG9sZGVyID0gdGhpcy5mdWxsZGF0ZVN0cjtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbnB1dEZpZWxkRWwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGb2N1cygpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBjbG9zZUFkZCgpIHtcblxuICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5zaG93RGFpbHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkTGF5b3V0XG4gICAgICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IHRoaXMuc2NyZWVuSGVpZ2h0IH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAvLyB0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUgPSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm5QcmVzcyhhcmdzKSB7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMudmFsaWRhdGVJbnB1dCgpKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25SZXR1cm5cIik7XG4gICAgICAgIC8vIHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZSA9IE51bWJlcih0ZXh0RmllbGQudGV4dCk7XG4gICAgICAgIHRoaXMubWVzdXJlID0gTnVtYmVyKHRleHRGaWVsZC50ZXh0KTtcbiAgICAgICAgdGhpcy5zYXZlQWRkKCk7XG5cbiAgICB9XG5cblxuXG4gICAgc2F2ZUFkZCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREYXRlU3RyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIG5ldyBhcHBBY3Rpb24uU2hvd1RvYXN0QWN0aW9uKHRoaXMuUExFQVNFX1NFTEVDVF9EQVRFKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zZWxlY3RlZFRpbWVTdHIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgbmV3IGFwcEFjdGlvbi5TaG93VG9hc3RBY3Rpb24odGhpcy5QTEVBU0VfU0VMRUNUX0hPVVIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvL3RoaXMubWVzdXJlPXBhcnNlRmxvYXQodGhpcy5pbnB1dC5nbHVjb3NlLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlU3RyO1xuICAgICAgICAgICAgdGhpcy5jaGFydC5wdXNoKG5ldyBEYXRhKHRoaXMuc2VsZWN0ZWRUaW1lU3RyLCB0aGlzLm1lc3VyZSkpO1xuICAgICAgICAgICAgdGhpcy5fU291cmNlRGFpbHkucHVzaChuZXcgRGF0YSh0aGlzLnNlbGVjdGVkVGltZVN0ciwgdGhpcy5tZXN1cmUpKTtcbiAgICAgICAgICAgIGxldCB3ZWVrID0gdGhpcy5jaGFydC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLk1lc3VyZSwgMCkgLyB0aGlzLmNoYXJ0Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuY2hhcnRXZWVrLnB1c2gobmV3IERhdGEodGhpcy5kYXRlLCB3ZWVrKSk7XG4gICAgICAgICAgICB0aGlzLl9Tb3VyY2VXZWVrbHkucHVzaChuZXcgRGF0YSh0aGlzLmRhdGUsIHdlZWspKTtcbiAgICAgICAgICAgIGxldCBtb250aCA9IHRoaXMuY2hhcnRXZWVrLnJlZHVjZSgoYSwgYikgPT4gYSArIGIuTWVzdXJlLCAwKSAvIHRoaXMuY2hhcnRXZWVrLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuY2hhcnRNb250aC5wdXNoKG5ldyBEYXRhKHRoaXMubW9udGgsIG1vbnRoKSk7XG4gICAgICAgICAgICB0aGlzLl9Tb3VyY2VNb250aGx5LnB1c2gobmV3IERhdGEodGhpcy5tb250aCwgbW9udGgpKTtcbiAgICAgICAgICAgIC8qIHRoaXMuZGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgIERhdGU6IGl0ZW0uRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBNZXN1cmU6IGl0ZW0uTWVzdXJlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLmZvckVhY2goaXRlbSA9PiB0aGlzLnNvdXJjZS5wdXNoKGl0ZW0pKTsqL1xuICAgICAgICAgICAgdGhpcy5jbG9zZUFkZCgpO1xuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG5cbiAgICAvKiAgcHJpdmF0ZSB2YWxpZGF0ZUlucHV0KCkge1xuICAgICAgICAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNOdW1iZXIodGhpcy5pbnB1dC5nbHVjb3NlLnZhbHVlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICB0aGlzLmlucHV0LmdsdWNvc2UuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZ2x1Y29zZS5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICBWYWxpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgfVxuICAgICAgICAgICByZXR1cm4gVmFsaWRlO1xuICAgICAgIH0qL1xuXG4gICAgaGlkZUtleWJvYXJkKCkge1xuICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eSA9IGFwcGxpY2F0aW9uLmFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5O1xuICAgICAgICAgICAgICAgIGxldCBDb250ZXh0ID0gYXBwbGljYXRpb24uYW5kcm9pZC5jdXJyZW50Q29udGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRNYW5hZ2VyID0gQ29udGV4dC5nZXRTeXN0ZW1TZXJ2aWNlKFxuICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLmNvbnRlbnQuQ29udGV4dC5JTlBVVF9NRVRIT0RfU0VSVklDRVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaW5wdXRNYW5hZ2VyLmhpZGVTb2Z0SW5wdXRGcm9tV2luZG93KFxuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eS5nZXRDdXJyZW50Rm9jdXMoKS5nZXRXaW5kb3dUb2tlbigpLFxuICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLnZpZXcuaW5wdXRtZXRob2QuSW5wdXRNZXRob2RNYW5hZ2VyLkhJREVfTk9UX0FMV0FZU1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=