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
var AddGlucoseComponent = (function () {
    function AddGlucoseComponent(_page, router, validateService) {
        this._page = _page;
        this.router = router;
        this.validateService = validateService;
        this.enableDay = false;
        this.enableWeek = true;
        this.enableMonth = true;
        this.dateTextHolder = "";
        this.dateTextHolderDefaultText = "Choose the date";
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
        this.currentdate = new Date();
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
        this.dateTextHolder = this.dateTextHolderDefaultText;
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
            title: this.PICK_DATE,
            theme: "dark",
            minDate: new Date(),
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
            title: this.PICK_HOUR,
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
        //  if (this.validateInput()) {
        // this.mesure=Number(this.input.glucose.value);
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
    };
    /* private validateInput() {
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
            validate_service_1.ValidateService])
    ], AddGlucoseComponent);
    return AddGlucoseComponent;
}());
exports.AddGlucoseComponent = AddGlucoseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUtyRCxxQ0FBa0M7QUFDbEMsK0JBQThCO0FBQzlCLDRGQUFtSDtBQUNuSCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztBQUNyRixJQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLHNEQUE2RDtBQUU3RCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsMEVBQXdFO0FBQ3hFLHVEQUFxRDtBQUNyRCxrQ0FBZSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsR0FBRyxFQUFoRCxDQUFnRCxDQUFDLENBQUM7QUFDL0UsK0JBQWlDO0FBYWpDO0lBMERJLDZCQUNZLEtBQVcsRUFDWCxNQUF3QixFQUN4QixlQUFnQztRQUZoQyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBekQ1QyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFPckIsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsOEJBQXlCLEdBQVcsaUJBQWlCLENBQUM7UUFDN0QsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IsY0FB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QUUsQ0FBQyxjQUFjLEVBQUUsRUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUM5RCxDQUFDO1lBQ04sQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUF0UW9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7Z0VBQUM7SUFDckM7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQWUsaUJBQVU7NkRBQUM7SUFDdkI7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWlCLGlCQUFVOytEQUFDO0lBQzVCO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFvQixpQkFBVTtrRUFBQztJQXBDOUMsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDO3lDQTREcUIsV0FBSTtZQUNILHlCQUFnQjtZQUNQLGtDQUFlO09BN0RuQyxtQkFBbUIsQ0F5Uy9CO0lBQUQsMEJBQUM7Q0FBQSxBQXpTRCxJQXlTQztBQXpTWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0L3N0YWNrLWxheW91dFwiO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXksIENoYW5nZWREYXRhLCBDaGFuZ2VUeXBlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcbmNvbnN0IE1vZGFsUGlja2VyID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlclwiKS5Nb2RhbERhdGV0aW1lcGlja2VyO1xuY29uc3QgcGlja2VyID0gbmV3IE1vZGFsUGlja2VyKCk7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcbmRlY2xhcmUgdmFyIGFuZHJvaWQ7XG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgVmFsaWRhdGVTZXJ2aWNlIH0gZnJvbSBcIi4vdmFsaWRhdGUuc2VydmljZVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiRmFiXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cIikuRmFiKTtcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgeyBBYnNvbHV0ZUxheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0L2Fic29sdXRlLWxheW91dFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3JtcydcblxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImFkZC1nbHVjb3NlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQWRkR2x1Y29zZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb250aDogc3RyaW5nO1xuICAgIHB1YmxpYyBjdXJyZW50ZGF0ZTogRGF0ZTtcbiAgICBlbmFibGVEYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBlbmFibGVXZWVrOiBib29sZWFuID0gdHJ1ZTtcbiAgICBlbmFibGVNb250aDogYm9vbGVhbiA9IHRydWU7XG4gICAgaW5wdXQ6IGFueTtcbiAgICBkYXRlOiBzdHJpbmc7XG4gICAgZ2x1Y29zZTogc3RyaW5nO1xuICAgIG1lc3VyZTogbnVtYmVyO1xuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgICBwdWJsaWMgZGF0ZVRleHRIb2xkZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIGRhdGVUZXh0SG9sZGVyRGVmYXVsdFRleHQ6IHN0cmluZyA9IFwiQ2hvb3NlIHRoZSBkYXRlXCI7XG4gICAgc2hvd0FkZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dXZWVrbHlDaGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dNb250aGx5Q2hhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93RGFpbHlDaGFydDogYm9vbGVhbiA9IHRydWU7XG4gICAgUElDS19EQVRFID0gXCJDaG9vc2UgRGF0ZVwiO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIHNlbGVjdGVkVGltZVN0cjogc3RyaW5nID0gXCJcIjtcbiAgICBQSUNLX0hPVVIgPSBcIkNob29zZSBIb3VyXCI7XG4gICAgcHJpdmF0ZSBkYXRlU3RyO1xuICAgIHByaXZhdGUgaG91clN0cjtcbiAgICBwdWJsaWMgZnVsbGRhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBkYXRhID0gW107XG4gICAgY2hhcnQ6IERhdGFbXSA9IFtdO1xuICAgIGNoYXJ0V2VlazogRGF0YVtdID0gW107XG4gICAgY2hhcnRNb250aDogRGF0YVtdID0gW107XG4gICAgLy90ZXh0SW5wdXQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cblxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoXCJhZGRMYXlvdXRcIikgYWRkTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJjaGFydExheW91dFwiKSBjaGFydExheW91dFJlZjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiaW5wdXRGaWVsZFwiKSBpbnB1dEZpZWxkRWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICBwcml2YXRlIGdldCBhZGRMYXlvdXQoKTogQWJzb2x1dGVMYXlvdXQge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgY2hhcnRMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFydExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBpbnB1dEZpZWxkRWwoKTogVGV4dEZpZWxkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRGaWVsZEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgc2NyZWVuSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzO1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBzY3JlZW5XaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuICAgIH1cbiAgICBwcml2YXRlIF9Tb3VyY2VEYWlseTogT2JzZXJ2YWJsZUFycmF5PERhdGE+O1xuICAgIHByaXZhdGUgX1NvdXJjZVdlZWtseTogT2JzZXJ2YWJsZUFycmF5PERhdGE+O1xuICAgIHByaXZhdGUgX1NvdXJjZU1vbnRobHk6IE9ic2VydmFibGVBcnJheTxEYXRhPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0ZVNlcnZpY2U6IFZhbGlkYXRlU2VydmljZSwgKSB7XG5cbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcblxuICAgICAgICAgICAgZ2x1Y29zZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOlwiXCIsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNoYXJ0ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIERhdGU6IFwiMTI6MzBcIixcbiAgICAgICAgICAgICAgICBNZXN1cmU6IDIsXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgdGhpcy5jaGFydFdlZWsgPSBbXG4gICAgICAgICAgICAvL3tcbiAgICAgICAgICAgIC8vIERhdGU6IFwiNy8wMy8yMDE4XCIsXG4gICAgICAgICAgICAvLyBNZXN1cmU6IDYsXG4gICAgICAgICAgICAvL31cbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jaGFydE1vbnRoID0gW1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRkYXRlPW5ldyBEYXRlKCk7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFkZExheW91dC50cmFuc2xhdGVZID0gdGhpcy5zY3JlZW5IZWlnaHQ7XG4gICAgICAgIHRoaXMuX1NvdXJjZURhaWx5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0KTtcbiAgICAgICAgdGhpcy5fU291cmNlV2Vla2x5ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmNoYXJ0V2Vlayk7XG4gICAgICAgIHRoaXMuX1NvdXJjZU1vbnRobHkgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhcnRNb250aCk7XG4gICAgICAgIC8vdGhpcy5zYXZlQWRkKCk7XG4gICAgICAgLy9sZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLmlucHV0RmllbGRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2JqZWN0O1xuXG5cbiAgICB9XG5cblxuICAgIGdldCBTb3VyY2VEYWlseSgpOiBPYnNlcnZhYmxlQXJyYXk8RGF0YT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fU291cmNlRGFpbHk7XG4gICAgfVxuICAgIGdldCBTb3VyY2VXZWVrbHkoKTogT2JzZXJ2YWJsZUFycmF5PERhdGE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NvdXJjZVdlZWtseTtcbiAgICB9XG4gICAgZ2V0IFNvdXJjZU1vbnRobHkoKTogT2JzZXJ2YWJsZUFycmF5PERhdGE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NvdXJjZU1vbnRobHk7XG4gICAgfVxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG5cblxuXG4gICAgYWRkR2x1Y29zZSgpIHtcbiAgICAgICAgdGhpcy5kYXRlVGV4dEhvbGRlciA9IHRoaXMuZGF0ZVRleHRIb2xkZXJEZWZhdWx0VGV4dDtcbiAgICAgICAgdGhpcy5hZGRMYXlvdXRcbiAgICAgICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zaG93QWRkID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5zaG93RGFpbHlDaGFydCA9IGZhbHNlO1xuICAgIH1cbiAgICBzaG93RGF5Q2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dXZWVrbHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dNb250aGx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlRGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IHRydWU7XG4gICAgfVxuXG4gICAgc2hvd1dlZWtDaGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93V2Vla2x5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dEYWlseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd01vbnRobHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZU1vbnRoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVEYXkgPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZVdlZWsgPSBmYWxzZTtcbiAgICB9XG4gICAgc2hvd01vbnRoQ2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1dlZWtseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93TW9udGhseUNoYXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZURheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IHRydWU7XG4gICAgfVxuXG4gICAgc2VsZWN0RGF0ZShmbikge1xuICAgICAgICBwaWNrZXJcbiAgICAgICAgICAgIC5waWNrRGF0ZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuUElDS19EQVRFLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogbmV3IERhdGUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlU3RyID0gcmVzdWx0LmRheSArIFwiLVwiICsgcmVzdWx0Lm1vbnRoICsgXCItXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCA9IHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LnllYXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlU3RyID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXkgKyBcIi9cIiArIHJlc3VsdC5tb250aCArIFwiL1wiICsgcmVzdWx0LnllYXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRleHRIb2xkZXIgPSB0aGlzLnNlbGVjdGVkRGF0ZVN0cjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuKSBmbigpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRGb2N1cygpIHtcbiAgICAgICAgdGhpcy5pbnB1dEZpZWxkRWwuZm9jdXMoKTtcblxuICAgIH1cbiAgICBwaWNrRGF0ZVRpbWUoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0RGF0ZSh0aGlzLnNlbGVjdFRpbWUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG5cbiAgICBzZWxlY3RUaW1lKCkge1xuICAgICAgICBwaWNrZXJcbiAgICAgICAgICAgIC5waWNrVGltZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuUElDS19IT1VSLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VyU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZGF0ZVRleHRIb2xkZXIgPXRoaXMuc2VsZWN0ZWRUaW1lU3RyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxkYXRlU3RyID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlU3RyICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkVGltZVN0ciwgXCJtbS9kZC95eXl5IGhoOm1tXCIpLmZvcm1hdCgnTExMTCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZXh0SG9sZGVyID0gdGhpcy5mdWxsZGF0ZVN0cjtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbnB1dEZpZWxkRWwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGb2N1cygpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBjbG9zZUFkZCgpIHtcblxuICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5zaG93RGFpbHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkTGF5b3V0XG4gICAgICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IHRoaXMuc2NyZWVuSGVpZ2h0IH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAvLyB0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUgPSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm5QcmVzcyhhcmdzKSB7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMudmFsaWRhdGVJbnB1dCgpKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25SZXR1cm5cIik7XG4gICAgICAgIC8vIHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZSA9IE51bWJlcih0ZXh0RmllbGQudGV4dCk7XG4gICAgICAgIHRoaXMubWVzdXJlID0gTnVtYmVyKHRleHRGaWVsZC50ZXh0KTtcbiAgICAgICAgdGhpcy5zYXZlQWRkKCk7XG5cbiAgICB9XG4gICBcbiBcblxuICAgIHNhdmVBZGQoKSB7XG5cblxuICAgICAgICAvLyAgaWYgKHRoaXMudmFsaWRhdGVJbnB1dCgpKSB7XG4gICAgICAgLy8gdGhpcy5tZXN1cmU9TnVtYmVyKHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZSk7XG4gICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlU3RyO1xuICAgICAgICB0aGlzLmNoYXJ0LnB1c2gobmV3IERhdGEodGhpcy5zZWxlY3RlZFRpbWVTdHIsIHRoaXMubWVzdXJlKSk7XG4gICAgICAgIHRoaXMuX1NvdXJjZURhaWx5LnB1c2gobmV3IERhdGEodGhpcy5zZWxlY3RlZFRpbWVTdHIsIHRoaXMubWVzdXJlKSk7XG4gICAgICAgIGxldCB3ZWVrID0gdGhpcy5jaGFydC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLk1lc3VyZSwgMCkgLyB0aGlzLmNoYXJ0Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5jaGFydFdlZWsucHVzaChuZXcgRGF0YSh0aGlzLmRhdGUsIHdlZWspKTtcbiAgICAgICAgdGhpcy5fU291cmNlV2Vla2x5LnB1c2gobmV3IERhdGEodGhpcy5kYXRlLCB3ZWVrKSk7XG4gICAgICAgIGxldCBtb250aCA9IHRoaXMuY2hhcnRXZWVrLnJlZHVjZSgoYSwgYikgPT4gYSArIGIuTWVzdXJlLCAwKSAvIHRoaXMuY2hhcnRXZWVrLmxlbmd0aDtcbiAgICAgICAgdGhpcy5jaGFydE1vbnRoLnB1c2gobmV3IERhdGEodGhpcy5tb250aCwgbW9udGgpKTtcbiAgICAgICAgdGhpcy5fU291cmNlTW9udGhseS5wdXNoKG5ldyBEYXRhKHRoaXMubW9udGgsIG1vbnRoKSk7XG4gICAgICAgIC8qIHRoaXMuZGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBEYXRlOiBpdGVtLkRhdGUsXG4gICAgICAgICAgICAgICAgICBNZXN1cmU6IGl0ZW0uTWVzdXJlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5zb3VyY2UucHVzaChpdGVtKSk7Ki9cbiAgICAgICAgdGhpcy5jbG9zZUFkZCgpO1xuXG5cblxuXG4gICAgfVxuXG4gICAvKiBwcml2YXRlIHZhbGlkYXRlSW5wdXQoKSB7XG4gICAgICAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcbiAgICAgICAgIGlmIChcbiAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5pc051bWJlcih0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAgdGhpcy5pbnB1dC5nbHVjb3NlLmVycm9yID0gZmFsc2U7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIHRoaXMuaW5wdXQuZ2x1Y29zZS5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgVmFsaWRlID0gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gVmFsaWRlO1xuICAgICB9Ki9cblxuICAgIGhpZGVLZXlib2FyZCgpIHtcbiAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZpdHkgPSBhcHBsaWNhdGlvbi5hbmRyb2lkLmZvcmVncm91bmRBY3Rpdml0eTtcbiAgICAgICAgICAgICAgICBsZXQgQ29udGV4dCA9IGFwcGxpY2F0aW9uLmFuZHJvaWQuY3VycmVudENvbnRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0TWFuYWdlciA9IENvbnRleHQuZ2V0U3lzdGVtU2VydmljZShcbiAgICAgICAgICAgICAgICAgICAgYW5kcm9pZC5jb250ZW50LkNvbnRleHQuSU5QVVRfTUVUSE9EX1NFUlZJQ0VcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlucHV0TWFuYWdlci5oaWRlU29mdElucHV0RnJvbVdpbmRvdyhcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHkuZ2V0Q3VycmVudEZvY3VzKCkuZ2V0V2luZG93VG9rZW4oKSxcbiAgICAgICAgICAgICAgICAgICAgYW5kcm9pZC52aWV3LmlucHV0bWV0aG9kLklucHV0TWV0aG9kTWFuYWdlci5ISURFX05PVF9BTFdBWVNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19