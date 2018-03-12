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
                value: 0,
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
        //  this._Source = new ObservableArray(this.getCategoricalSource());
        this._SourceDaily = new observable_array_1.ObservableArray(this.chart);
        this._SourceWeekly = new observable_array_1.ObservableArray(this.chartWeek);
        this._SourceMonthly = new observable_array_1.ObservableArray(this.chartMonth);
        //this.saveAdd();
        // let textField = <TextField>this.inputFieldElement.nativeElement.object;
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
        //   this.mesure= this.input.glucose.value;
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
    // this.addText = textField.text;
    //}
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
    AddGlucoseComponent.prototype.saveAdd = function () {
        var result;
        //  if (this.validateInput()) {
        /*    this._SourceDaily.on(ObservableArray.changeEvent, (args: ChangedData<number>) => {
    
                result = args;
    
            })*/
        this.date = this.selectedDateStr;
        // this.mesure = this.input.glucose.value;
        this.chart.push(new data_1.Data(this.selectedTimeStr, this.mesure));
        this._SourceDaily.push(new data_1.Data(this.selectedTimeStr, this.mesure));
        var week = this.chart.reduce(function (a, b) { return a + b.Mesure; }, 0) / this.chart.length;
        this.chartWeek.push(new data_1.Data(this.date, week));
        this._SourceWeekly.push(new data_1.Data(this.date, week));
        var month = this.chartWeek.reduce(function (a, b) { return a + b.Mesure; }, 0) / this.chartWeek.length;
        this.chartMonth.push(new data_1.Data(this.month, month));
        this._SourceMonthly.push(new data_1.Data(this.month, month));
        // this.chart.push( new Data(this.date,this.mesure));
        /* this.data.map(item => {
              return {
                  Date: item.Date,
                  Mesure: item.Mesure
              }
          }).forEach(item => this.source.push(item));*/
        this.closeAdd();
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
            validate_service_1.ValidateService])
    ], AddGlucoseComponent);
    return AddGlucoseComponent;
}());
exports.AddGlucoseComponent = AddGlucoseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUtyRCxxQ0FBa0M7QUFDbEMsK0JBQThCO0FBQzlCLDRGQUFtSDtBQUNuSCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztBQUNyRixJQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLHNEQUE2RDtBQUU3RCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsMEVBQXdFO0FBQ3hFLHVEQUFxRDtBQUNyRCxrQ0FBZSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsR0FBRyxFQUFoRCxDQUFnRCxDQUFDLENBQUM7QUFDL0UsK0JBQWlDO0FBWWpDO0lBMERJLDZCQUNZLEtBQVcsRUFDWCxNQUF3QixFQUN4QixlQUFnQztRQUZoQyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBekQ1QyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFPckIsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsOEJBQXlCLEdBQVcsaUJBQWlCLENBQUM7UUFDN0QsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IsY0FB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LENBQUM7Z0JBQ0YsWUFBWSxDQUFDLHVCQUF1QixDQUNoQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FDOUQsQ0FBQztZQUNOLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBalJvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCO2dFQUFDO0lBQ3JDO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFlLGlCQUFVOzZEQUFDO0lBQ3ZCO1FBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDO2tDQUFpQixpQkFBVTsrREFBQztJQUM1QjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBb0IsaUJBQVU7a0VBQUM7SUFwQzlDLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0E0RHFCLFdBQUk7WUFDSCx5QkFBZ0I7WUFDUCxrQ0FBZTtPQTdEbkMsbUJBQW1CLENBb1QvQjtJQUFELDBCQUFDO0NBQUEsQUFwVEQsSUFvVEM7QUFwVFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZC90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5LCBDaGFuZ2VkRGF0YSwgQ2hhbmdlVHlwZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5jb25zdCBNb2RhbFBpY2tlciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIikuTW9kYWxEYXRldGltZXBpY2tlcjtcbmNvbnN0IHBpY2tlciA9IG5ldyBNb2RhbFBpY2tlcigpO1xuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5kZWNsYXJlIHZhciBhbmRyb2lkO1xudmFyIGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbmltcG9ydCB7IFZhbGlkYXRlU2VydmljZSB9IGZyb20gXCIuL3ZhbGlkYXRlLnNlcnZpY2VcIjtcbnJlZ2lzdGVyRWxlbWVudChcIkZhYlwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWZsb2F0aW5nYWN0aW9uYnV0dG9uXCIpLkZhYik7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHsgQWJzb2x1dGVMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dC9hYnNvbHV0ZS1sYXlvdXRcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcblxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImFkZC1nbHVjb3NlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQWRkR2x1Y29zZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb250aDogc3RyaW5nO1xuICAgIHB1YmxpYyBjdXJyZW50ZGF0ZTogRGF0ZTtcbiAgICBlbmFibGVEYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBlbmFibGVXZWVrOiBib29sZWFuID0gdHJ1ZTtcbiAgICBlbmFibGVNb250aDogYm9vbGVhbiA9IHRydWU7XG4gICAgaW5wdXQ6IGFueTtcbiAgICBkYXRlOiBzdHJpbmc7XG4gICAgZ2x1Y29zZTogc3RyaW5nO1xuICAgIG1lc3VyZTogbnVtYmVyO1xuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgICBwdWJsaWMgZGF0ZVRleHRIb2xkZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIGRhdGVUZXh0SG9sZGVyRGVmYXVsdFRleHQ6IHN0cmluZyA9IFwiQ2hvb3NlIHRoZSBkYXRlXCI7XG4gICAgc2hvd0FkZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dXZWVrbHlDaGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dNb250aGx5Q2hhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93RGFpbHlDaGFydDogYm9vbGVhbiA9IHRydWU7XG4gICAgUElDS19EQVRFID0gXCJDaG9vc2UgRGF0ZVwiO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIHNlbGVjdGVkVGltZVN0cjogc3RyaW5nID0gXCJcIjtcbiAgICBQSUNLX0hPVVIgPSBcIkNob29zZSBIb3VyXCI7XG4gICAgcHJpdmF0ZSBkYXRlU3RyO1xuICAgIHByaXZhdGUgaG91clN0cjtcbiAgICBwdWJsaWMgZnVsbGRhdGVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBkYXRhID0gW107XG4gICAgY2hhcnQ6IERhdGFbXSA9IFtdO1xuICAgIGNoYXJ0V2VlazogRGF0YVtdID0gW107XG4gICAgY2hhcnRNb250aDogRGF0YVtdID0gW107XG4gICAgLy90ZXh0SW5wdXQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cblxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoXCJhZGRMYXlvdXRcIikgYWRkTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJjaGFydExheW91dFwiKSBjaGFydExheW91dFJlZjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiaW5wdXRGaWVsZFwiKSBpbnB1dEZpZWxkRWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICBwcml2YXRlIGdldCBhZGRMYXlvdXQoKTogQWJzb2x1dGVMYXlvdXQge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgY2hhcnRMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFydExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBpbnB1dEZpZWxkRWwoKTogVGV4dEZpZWxkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRGaWVsZEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXQgc2NyZWVuSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzO1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBzY3JlZW5XaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuICAgIH1cbiAgICBwcml2YXRlIF9Tb3VyY2VEYWlseTogT2JzZXJ2YWJsZUFycmF5PERhdGE+O1xuICAgIHByaXZhdGUgX1NvdXJjZVdlZWtseTogT2JzZXJ2YWJsZUFycmF5PERhdGE+O1xuICAgIHByaXZhdGUgX1NvdXJjZU1vbnRobHk6IE9ic2VydmFibGVBcnJheTxEYXRhPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0ZVNlcnZpY2U6IFZhbGlkYXRlU2VydmljZSwgKSB7XG5cbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcblxuICAgICAgICAgICAgZ2x1Y29zZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOjAsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNoYXJ0ID0gW1xuICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgRGF0ZTogXCIxMjozMFwiLFxuICAgICAgICAgICAgICAgIE1lc3VyZToyLFxuICAgICAgICAgICAgfV07XG4gICAgICAgIHRoaXMuY2hhcnRXZWVrID0gW1xuICAgICAgICAgICAgLy97XG4gICAgICAgICAgICAvLyBEYXRlOiBcIjcvMDMvMjAxOFwiLFxuICAgICAgICAgICAgLy8gTWVzdXJlOiA2LFxuICAgICAgICAgICAgLy99XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY2hhcnRNb250aCA9IFtcbiAgICAgICAgXTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuYWRkTGF5b3V0LnRyYW5zbGF0ZVkgPSB0aGlzLnNjcmVlbkhlaWdodDtcbiAgICAgICAgLy8gIHRoaXMuX1NvdXJjZSA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5nZXRDYXRlZ29yaWNhbFNvdXJjZSgpKTtcbiAgICAgICAgdGhpcy5fU291cmNlRGFpbHkgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhcnQpO1xuICAgICAgICB0aGlzLl9Tb3VyY2VXZWVrbHkgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhcnRXZWVrKTtcbiAgICAgICAgdGhpcy5fU291cmNlTW9udGhseSA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5jaGFydE1vbnRoKTtcbiAgICAgICAgLy90aGlzLnNhdmVBZGQoKTtcbiAgICAgICAvLyBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLmlucHV0RmllbGRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2JqZWN0O1xuXG5cbiAgICB9XG5cblxuICAgIGdldCBTb3VyY2VEYWlseSgpOiBPYnNlcnZhYmxlQXJyYXk8RGF0YT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fU291cmNlRGFpbHk7XG4gICAgfVxuICAgIGdldCBTb3VyY2VXZWVrbHkoKTogT2JzZXJ2YWJsZUFycmF5PERhdGE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NvdXJjZVdlZWtseTtcbiAgICB9XG4gICAgZ2V0IFNvdXJjZU1vbnRobHkoKTogT2JzZXJ2YWJsZUFycmF5PERhdGE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NvdXJjZU1vbnRobHk7XG4gICAgfVxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG5cblxuXG4gICAgYWRkR2x1Y29zZSgpIHtcbiAgICAgICAgdGhpcy5kYXRlVGV4dEhvbGRlciA9IHRoaXMuZGF0ZVRleHRIb2xkZXJEZWZhdWx0VGV4dDtcbiAgICAgICAgdGhpcy5hZGRMYXlvdXRcbiAgICAgICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zaG93QWRkID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5zaG93RGFpbHlDaGFydCA9IGZhbHNlO1xuICAgIH1cbiAgICBzaG93RGF5Q2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dXZWVrbHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dNb250aGx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlRGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IHRydWU7XG4gICAgfVxuXG4gICAgc2hvd1dlZWtDaGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93V2Vla2x5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dEYWlseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd01vbnRobHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZU1vbnRoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVEYXkgPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZVdlZWsgPSBmYWxzZTtcbiAgICB9XG4gICAgc2hvd01vbnRoQ2hhcnQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1dlZWtseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93TW9udGhseUNoYXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVNb250aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZURheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IHRydWU7XG4gICAgfVxuXG4gICAgc2VsZWN0RGF0ZShmbikge1xuICAgICAgICBwaWNrZXJcbiAgICAgICAgICAgIC5waWNrRGF0ZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuUElDS19EQVRFLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogbmV3IERhdGUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlU3RyID0gcmVzdWx0LmRheSArIFwiLVwiICsgcmVzdWx0Lm1vbnRoICsgXCItXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCA9IHJlc3VsdC5tb250aCArIFwiLVwiICsgcmVzdWx0LnllYXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlU3RyID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXkgKyBcIi9cIiArIHJlc3VsdC5tb250aCArIFwiL1wiICsgcmVzdWx0LnllYXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRleHRIb2xkZXIgPSB0aGlzLnNlbGVjdGVkRGF0ZVN0cjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuKSBmbigpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRGb2N1cygpIHtcbiAgICAgICAgdGhpcy5pbnB1dEZpZWxkRWwuZm9jdXMoKTtcblxuICAgIH1cbiAgICBwaWNrRGF0ZVRpbWUoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0RGF0ZSh0aGlzLnNlbGVjdFRpbWUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG5cbiAgICBzZWxlY3RUaW1lKCkge1xuICAgICAgICBwaWNrZXJcbiAgICAgICAgICAgIC5waWNrVGltZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuUElDS19IT1VSLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VyU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZGF0ZVRleHRIb2xkZXIgPXRoaXMuc2VsZWN0ZWRUaW1lU3RyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxkYXRlU3RyID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlU3RyICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkVGltZVN0ciwgXCJtbS9kZC95eXl5IGhoOm1tXCIpLmZvcm1hdCgnTExMTCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZXh0SG9sZGVyID0gdGhpcy5mdWxsZGF0ZVN0cjtcbiAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmlucHV0RmllbGRFbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRm9jdXMoKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xvc2VBZGQoKSB7XG5cbiAgICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmFkZExheW91dFxuICAgICAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiB0aGlzLnNjcmVlbkhlaWdodCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTAsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgIC8vICAgdGhpcy5tZXN1cmU9IHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZTtcbiAgICAgICAgIFxuICAgICAgIC8vIHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZSA9IFwiXCI7XG4gICAgfVxuICAgIHJldHVyblByZXNzKGFyZ3MpIHtcblxuICAgICAgICAvLyBpZiAodGhpcy52YWxpZGF0ZUlucHV0KCkpIHtcbiAgICAgICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25SZXR1cm5cIik7XG4gICAgICAgLy8gdGhpcy5pbnB1dC5nbHVjb3NlLnZhbHVlID0gTnVtYmVyKHRleHRGaWVsZC50ZXh0KTtcbiAgICAgICAgdGhpcy5tZXN1cmU9IE51bWJlcih0ZXh0RmllbGQudGV4dCkgO1xuICAgICAgICB0aGlzLnNhdmVBZGQoKTtcbiAgICB9XG4gICAgLy8gdGhpcy5hZGRUZXh0ID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgLy99XG4gICAgLyogcHJpdmF0ZSB2YWxpZGF0ZUlucHV0KCkge1xuICAgICAgICAgbGV0IFZhbGlkZSA9IHRydWU7XG4gICAgICAgICBpZiAoXG4gICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNOdW1iZXIodGhpcy5pbnB1dC5nbHVjb3NlLnZhbHVlKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgIHRoaXMuaW5wdXQuZ2x1Y29zZS5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICB0aGlzLmlucHV0LmdsdWNvc2UuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgIFZhbGlkZSA9IGZhbHNlO1xuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIFZhbGlkZTtcbiAgICAgfSovXG5cbiAgICBzYXZlQWRkKCkge1xuICAgICAgICBsZXQgcmVzdWx0OiBDaGFuZ2VkRGF0YTxudW1iZXI+O1xuXG4gICAgICAgIC8vICBpZiAodGhpcy52YWxpZGF0ZUlucHV0KCkpIHtcblxuICAgICAgICAvKiAgICB0aGlzLl9Tb3VyY2VEYWlseS5vbihPYnNlcnZhYmxlQXJyYXkuY2hhbmdlRXZlbnQsIChhcmdzOiBDaGFuZ2VkRGF0YTxudW1iZXI+KSA9PiB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXJncztcbiAgICBcbiAgICAgICAgICAgIH0pKi9cblxuICAgICAgICAgIFxuICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZVN0cjtcbiAgICAgLy8gdGhpcy5tZXN1cmUgPSB0aGlzLmlucHV0LmdsdWNvc2UudmFsdWU7XG4gICAgICAgIHRoaXMuY2hhcnQucHVzaChuZXcgRGF0YSh0aGlzLnNlbGVjdGVkVGltZVN0ciwgdGhpcy5tZXN1cmUpKTtcbiAgICAgICAgdGhpcy5fU291cmNlRGFpbHkucHVzaChuZXcgRGF0YSh0aGlzLnNlbGVjdGVkVGltZVN0ciwgdGhpcy5tZXN1cmUpKTtcbiAgICAgICAgbGV0IHdlZWsgPSB0aGlzLmNoYXJ0LnJlZHVjZSgoYSwgYikgPT4gYSArIGIuTWVzdXJlLCAwKSAvIHRoaXMuY2hhcnQubGVuZ3RoO1xuICAgICAgICB0aGlzLmNoYXJ0V2Vlay5wdXNoKG5ldyBEYXRhKHRoaXMuZGF0ZSwgd2VlaykpO1xuICAgICAgICB0aGlzLl9Tb3VyY2VXZWVrbHkucHVzaChuZXcgRGF0YSh0aGlzLmRhdGUsIHdlZWspKTtcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5jaGFydFdlZWsucmVkdWNlKChhLCBiKSA9PiBhICsgYi5NZXN1cmUsIDApIC8gdGhpcy5jaGFydFdlZWsubGVuZ3RoO1xuICAgICAgICB0aGlzLmNoYXJ0TW9udGgucHVzaChuZXcgRGF0YSh0aGlzLm1vbnRoLCBtb250aCkpO1xuICAgICAgICB0aGlzLl9Tb3VyY2VNb250aGx5LnB1c2gobmV3IERhdGEodGhpcy5tb250aCwgbW9udGgpKTtcbiAgICAgICAgLy8gdGhpcy5jaGFydC5wdXNoKCBuZXcgRGF0YSh0aGlzLmRhdGUsdGhpcy5tZXN1cmUpKTtcblxuICAgICAgICAvKiB0aGlzLmRhdGEubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgRGF0ZTogaXRlbS5EYXRlLFxuICAgICAgICAgICAgICAgICAgTWVzdXJlOiBpdGVtLk1lc3VyZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSkuZm9yRWFjaChpdGVtID0+IHRoaXMuc291cmNlLnB1c2goaXRlbSkpOyovXG4gICAgICAgIHRoaXMuY2xvc2VBZGQoKTtcblxuXG5cblxuICAgIH1cblxuXG4gICAgaGlkZUtleWJvYXJkKCkge1xuICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eSA9IGFwcGxpY2F0aW9uLmFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5O1xuICAgICAgICAgICAgICAgIGxldCBDb250ZXh0ID0gYXBwbGljYXRpb24uYW5kcm9pZC5jdXJyZW50Q29udGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRNYW5hZ2VyID0gQ29udGV4dC5nZXRTeXN0ZW1TZXJ2aWNlKFxuICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLmNvbnRlbnQuQ29udGV4dC5JTlBVVF9NRVRIT0RfU0VSVklDRVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaW5wdXRNYW5hZ2VyLmhpZGVTb2Z0SW5wdXRGcm9tV2luZG93KFxuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eS5nZXRDdXJyZW50Rm9jdXMoKS5nZXRXaW5kb3dUb2tlbigpLFxuICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLnZpZXcuaW5wdXRtZXRob2QuSW5wdXRNZXRob2RNYW5hZ2VyLkhJREVfTk9UX0FMV0FZU1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=