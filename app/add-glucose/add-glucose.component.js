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
    AddGlucoseComponent.prototype.notification = function (args) {
        LocalNotifications.schedule([{
                id: 1,
                title: "Glycémie",
                body: args,
                badge: 1,
                at: new Date(new Date().getTime() + (300 * 1000)) // 5 minutes from now
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
        if (Number(this.mesure) < 0.7) {
            this.description = " Attention vous avez une hypoglycémie ";
        }
        else if (Number(this.mesure) > 1.8) {
            this.description = " Attention vous avez une hyperglycémie ";
        }
        this.notification(this.description);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWdsdWNvc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWdsdWNvc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFDNUUsc0RBQStEO0FBQy9ELHNEQUFxRDtBQUtyRCxxQ0FBa0M7QUFFbEMsNEZBQW1IO0FBQ25ILElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0FBQ3JGLElBQU0sTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDakMsc0RBQTZEO0FBRTdELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QywwRUFBd0U7QUFDeEUsdURBQXFEO0FBQ3JELGtDQUFlLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxHQUFHLEVBQWhELENBQWdELENBQUMsQ0FBQztBQUMvRSw0Q0FBNEM7QUFDNUMsa0RBQWtEO0FBQ2xELCtCQUFpQztBQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBSXBCLHFDQUFvQztBQUVwQywyREFBNkQ7QUFDN0QsbUdBQWtHO0FBQ2xHLHFFQUF1RTtBQVV2RTtJQWdFSSw2QkFDWSxLQUFXLEVBQ1gsTUFBd0IsRUFDeEIsZUFBZ0MsRUFDaEMsS0FBNEI7UUFINUIsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQWhFeEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBT3JCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FB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c0I7Z0VBQUM7SUFDckM7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQWUsaUJBQVU7NkRBQUM7SUFDdkI7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWlCLGlCQUFVOytEQUFDO0lBQzVCO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFvQixpQkFBVTtrRUFBQztJQTFDOUMsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDO3lDQWtFcUIsV0FBSTtZQUNILHlCQUFnQjtZQUNQLGtDQUFlO1lBQ3pCLGFBQUs7T0FwRWYsbUJBQW1CLENBK1cvQjtJQUFELDBCQUFDO0NBQUEsQUEvV0QsSUErV0M7QUEvV1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZC90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5LCBDaGFuZ2VkRGF0YSwgQ2hhbmdlVHlwZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5jb25zdCBNb2RhbFBpY2tlciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIikuTW9kYWxEYXRldGltZXBpY2tlcjtcbmNvbnN0IHBpY2tlciA9IG5ldyBNb2RhbFBpY2tlcigpO1xuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5kZWNsYXJlIHZhciBhbmRyb2lkO1xudmFyIGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbmltcG9ydCB7IFZhbGlkYXRlU2VydmljZSB9IGZyb20gXCIuL3ZhbGlkYXRlLnNlcnZpY2VcIjtcbnJlZ2lzdGVyRWxlbWVudChcIkZhYlwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWZsb2F0aW5nYWN0aW9uYnV0dG9uXCIpLkZhYik7XG4vL3JlZ2lzdGVyRWxlbWVudCgnUERGVmlldycsICgpID0+IFBERlZpZXcpO1xuLy9pbXBvcnQgeyBQREZWaWV3IH0gZnJvbSAnbmF0aXZlc2NyaXB0LXBkZi12aWV3JztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5tb21lbnQubG9jYWxlKFwiZnJcIik7XG5pbXBvcnQgeyBBYnNvbHV0ZUxheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0L2Fic29sdXRlLWxheW91dFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xuaW1wb3J0ICogYXMgZnJvbVJvb3QgZnJvbSBcIi4vLi4vc2hhcmVkL3JlZHVjZXJzXCI7XG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcbmltcG9ydCB7IHNldFN0cmluZywgZ2V0U3RyaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIExvY2FsTm90aWZpY2F0aW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIjtcblxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImFkZC1nbHVjb3NlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2FkZC1nbHVjb3NlLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQWRkR2x1Y29zZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb250aDogc3RyaW5nO1xuICAgXG4gICAgZW5hYmxlRGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgZW5hYmxlV2VlazogYm9vbGVhbiA9IHRydWU7XG4gICAgZW5hYmxlTW9udGg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlucHV0OiBhbnk7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGdsdWNvc2U6IHN0cmluZztcbiAgICBtZXN1cmU6IG51bWJlcjtcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGRhdGVUZXh0SG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgZGF0ZVRleHRIb2xkZXJEZWZhdWx0VGV4dDogc3RyaW5nID0gXCJDaG9vc2UgdGhlIGRhdGVcIjtcbiAgICBwdWJsaWMgY3VycmVudERhdGU6IERhdGU7XG4gICAgcHVibGljIGN1cnJlbnREYXRlSG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHNob3dBZGQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93V2Vla2x5Q2hhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93TW9udGhseUNoYXJ0OiBib29sZWFuID0gZmFsc2U7XG4gICAgc2hvd0RhaWx5Q2hhcnQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFBJQ0tfREFURSA9IFwiQ2hvb3NlIERhdGVcIjtcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlU3RyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBzZWxlY3RlZFRpbWVTdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgUElDS19IT1VSID0gXCJDaG9vc2UgSG91clwiO1xuICAgIHByaXZhdGUgZGF0ZVN0cjtcbiAgICBwcml2YXRlIGhvdXJTdHI7XG4gICAgcHVibGljIGZ1bGxkYXRlU3RyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgZGF0YSA9IFtdO1xuICAgIGNoYXJ0OiBhbnlbXSA9IFtdO1xuICAgIGNoYXJ0V2VlazogYW55W10gPSBbXTtcbiAgICBjaGFydE1vbnRoOiBhbnlbXSA9IFtdO1xuICAgIFBMRUFTRV9TRUxFQ1RfREFURSA9IFwiVm91cyBkZXZleiBzw6lsZWN0aW9ubmVyIGxhIGRhdGVcIjtcbiAgICBQTEVBU0VfU0VMRUNUX0hPVVIgPSBcIlZvdXMgZGV2ZXogc8OpbGVjdGlvbm5lciBsJ2hldXJlXCI7XG4gICAgLy90ZXh0SW5wdXQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgcHVibGljIHNsaWRlclZhbHVlMSA9IDExNjtcblxuXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChcImFkZExheW91dFwiKSBhZGRMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcImNoYXJ0TGF5b3V0XCIpIGNoYXJ0TGF5b3V0UmVmOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJpbnB1dEZpZWxkXCIpIGlucHV0RmllbGRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHByaXZhdGUgZ2V0IGFkZExheW91dCgpOiBBYnNvbHV0ZUxheW91dCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBjaGFydExheW91dCgpOiBTdGFja0xheW91dCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJ0TGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0IGlucHV0RmllbGRFbCgpOiBUZXh0RmllbGQge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dEZpZWxkRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBwcml2YXRlIGdldCBzY3JlZW5IZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHM7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0IHNjcmVlbldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHM7XG4gICAgfVxuICAgIHByaXZhdGUgX1NvdXJjZURhaWx5OiBPYnNlcnZhYmxlQXJyYXk8YW55PjtcbiAgICBwcml2YXRlIF9Tb3VyY2VXZWVrbHk6IE9ic2VydmFibGVBcnJheTxEYXRhPjtcbiAgICBwcml2YXRlIF9Tb3VyY2VNb250aGx5OiBPYnNlcnZhYmxlQXJyYXk8RGF0YT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdGVTZXJ2aWNlOiBWYWxpZGF0ZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPiwgKSB7XG5cbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcblxuICAgICAgICAgICAgZ2x1Y29zZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jaGFydCA9IFtcbiAgICAgICAgICAgLyoge1xuICAgICAgICAgICAgICAgIERhdGU6IFwiMTI6MzBcIixcbiAgICAgICAgICAgICAgICBNZXN1cmU6MixcbiAgICAgICAgICAgIH0qL107XG4gICAgICAgIHRoaXMuY2hhcnRXZWVrID0gW1xuICAgICAgICAgICAgLy97XG4gICAgICAgICAgICAvLyBEYXRlOiBcIjcvMDMvMjAxOFwiLFxuICAgICAgICAgICAgLy8gTWVzdXJlOiA2LFxuICAgICAgICAgICAgLy99XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY2hhcnRNb250aCA9IFtcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9bmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUhvbGRlcj1tb21lbnQodGhpcy5jdXJyZW50RGF0ZSxcIm1tL2RkL3l5eXkgaGg6bW1cIikuZm9ybWF0KCdMTExMJylcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFkZExheW91dC50cmFuc2xhdGVZID0gdGhpcy5zY3JlZW5IZWlnaHQ7XG4gICAgICAgIGxldCBjaGFydHM7XG4gICAgICAgIGNoYXJ0cz0ge1xuICAgICAgICAgICAgY2hhcnQ6IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwiY2hhcnRcIiwgXCJ7fVwiKSksXG4gICAgICAgICAgICBjaGFydFdlZWs6IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwiY2hhcnRXZWVrXCIsIFwie31cIikpLFxuICAgICAgICAgICAgY2hhcnRNb250aDogSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJjaGFydE1vbnRoXCIsIFwie31cIikpLFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0RGF0YUl0ZW1zKGNoYXJ0cy5jaGFydCwgdGhpcy5jaGFydCk7XG4gICAgICAgIHRoaXMuaW5pdERhdGFJdGVtcyhjaGFydHMuY2hhcnRXZWVrLCB0aGlzLmNoYXJ0V2Vlayk7XG4gICAgICAgIHRoaXMuaW5pdERhdGFJdGVtcyhjaGFydHMuY2hhcnRNb250aCwgdGhpcy5jaGFydE1vbnRoKTtcbiAgICAgICAgdGhpcy5fU291cmNlRGFpbHkgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhcnQpO1xuICAgICAgICB0aGlzLl9Tb3VyY2VXZWVrbHkgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuY2hhcnRXZWVrKTtcbiAgICAgICAgdGhpcy5fU291cmNlTW9udGhseSA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5jaGFydE1vbnRoKTtcbiAgICAgICAgLy90aGlzLnNhdmVBZGQoKTtcbiAgICAgICAgLy9sZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLmlucHV0RmllbGRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2JqZWN0O1xuXG5cbiAgICB9XG5cblxuICAgIGdldCBTb3VyY2VEYWlseSgpOiBPYnNlcnZhYmxlQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9Tb3VyY2VEYWlseTtcbiAgICB9XG4gICAgZ2V0IFNvdXJjZVdlZWtseSgpOiBPYnNlcnZhYmxlQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9Tb3VyY2VXZWVrbHk7XG4gICAgfVxuICAgIGdldCBTb3VyY2VNb250aGx5KCk6IE9ic2VydmFibGVBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NvdXJjZU1vbnRobHk7XG4gICAgfVxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGluaXREYXRhSXRlbXMoYXJnczEsIGFyZ3MyKSB7XG4gICAgICAgIC8vdGhpcy5faXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PGFueT4oKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzMi5wdXNoKGFyZ3MxW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEdsdWNvc2UoKSB7XG4gICAgICAgIHRoaXMuZGF0ZVRleHRIb2xkZXIgPSB0aGlzLmN1cnJlbnREYXRlSG9sZGVyO1xuICAgICAgICB0aGlzLmFkZExheW91dFxuICAgICAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KVxuICAgICAgICB0aGlzLnNob3dBZGQgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLnNob3dEYWlseUNoYXJ0ID0gZmFsc2U7XG4gICAgfVxuICAgIHNob3dEYXlDaGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93RGFpbHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd1dlZWtseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd01vbnRobHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZU1vbnRoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVEYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVXZWVrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaG93V2Vla0NoYXJ0KCkge1xuICAgICAgICB0aGlzLnNob3dXZWVrbHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd0RhaWx5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93TW9udGhseUNoYXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlTW9udGggPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZURheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5hYmxlV2VlayA9IGZhbHNlO1xuICAgIH1cbiAgICBzaG93TW9udGhDaGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93V2Vla2x5Q2hhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93RGFpbHlDaGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dNb250aGx5Q2hhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVuYWJsZU1vbnRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlRGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVXZWVrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZWxlY3REYXRlKGZuKSB7XG4gICAgICAgIHBpY2tlclxuICAgICAgICAgICAgLnBpY2tEYXRlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTp0aGlzLmN1cnJlbnREYXRlSG9sZGVyLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgIC8vIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgc3RhcnRpbmdEYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVTdHIgPSByZXN1bHQuZGF5ICsgXCItXCIgKyByZXN1bHQubW9udGggKyBcIi1cIiArIHJlc3VsdC55ZWFyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoID0gcmVzdWx0Lm1vbnRoICsgXCItXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVTdHIgPVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRheSArIFwiL1wiICsgcmVzdWx0Lm1vbnRoICsgXCIvXCIgKyByZXN1bHQueWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGV4dEhvbGRlciA9IHRoaXMuc2VsZWN0ZWREYXRlU3RyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm4pIGZuKCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEZvY3VzKCkge1xuICAgICAgICB0aGlzLmlucHV0RmllbGRFbC5mb2N1cygpO1xuXG4gICAgfVxuICAgIHBpY2tEYXRlVGltZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3REYXRlKHRoaXMuc2VsZWN0VGltZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cblxuICAgIHNlbGVjdFRpbWUoKSB7XG4gICAgICAgIHBpY2tlclxuICAgICAgICAgICAgLnBpY2tUaW1lKHtcbiAgICAgICAgICAgICAgICB0aXRsZTp0aGlzLmN1cnJlbnREYXRlSG9sZGVyLFxuICAgICAgICAgICAgICAgIHRoZW1lOiBcImRhcmtcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VyU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lU3RyID0gcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZGF0ZVRleHRIb2xkZXIgPXRoaXMuc2VsZWN0ZWRUaW1lU3RyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxkYXRlU3RyID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlU3RyICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkVGltZVN0ciwgXCJtbS9kZC95eXl5IGhoOm1tXCIpLmZvcm1hdCgnTExMTCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZXh0SG9sZGVyID0gdGhpcy5mdWxsZGF0ZVN0cjtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbnB1dEZpZWxkRWwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGb2N1cygpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBjbG9zZUFkZCgpIHtcblxuICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5zaG93RGFpbHlDaGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkTGF5b3V0XG4gICAgICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IHRoaXMuc2NyZWVuSGVpZ2h0IH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAvLyB0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUgPSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm5QcmVzcyhhcmdzKSB7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMudmFsaWRhdGVJbnB1dCgpKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25SZXR1cm5cIik7XG4gICAgICAgIC8vIHRoaXMuaW5wdXQuZ2x1Y29zZS52YWx1ZSA9IE51bWJlcih0ZXh0RmllbGQudGV4dCk7XG4gICAgICAgIHRoaXMubWVzdXJlID0gTnVtYmVyKHRleHRGaWVsZC50ZXh0KTtcbiAgICAgICAgdGhpcy5zYXZlQWRkKCk7XG5cbiAgICB9XG5cblxuXG4gICAgc2F2ZUFkZCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREYXRlU3RyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIG5ldyBhcHBBY3Rpb24uU2hvd1RvYXN0QWN0aW9uKHRoaXMuUExFQVNFX1NFTEVDVF9EQVRFKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zZWxlY3RlZFRpbWVTdHIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgbmV3IGFwcEFjdGlvbi5TaG93VG9hc3RBY3Rpb24odGhpcy5QTEVBU0VfU0VMRUNUX0hPVVIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvL3RoaXMubWVzdXJlPXBhcnNlRmxvYXQodGhpcy5pbnB1dC5nbHVjb3NlLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlU3RyO1xuICAgICAgICAgICAgdGhpcy5jaGFydC5wdXNoKHtEYXRlOnRoaXMuc2VsZWN0ZWRUaW1lU3RyLE1lc3VyZTogdGhpcy5tZXN1cmV9KTtcbiAgICAgICAgICAgIHNldFN0cmluZyhcImNoYXJ0XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuY2hhcnQpKTtcbiAgICAgICAgICAgIHNldFN0cmluZyhcIm1lc3VyZVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLm1lc3VyZSkpOy8vbGFzdCBNZXN1cmVcbiAgICAgICAgICAgIHRoaXMuX1NvdXJjZURhaWx5LnB1c2godGhpcy5jaGFydCk7XG4gICAgICAgICAgICBsZXQgd2VlayA9IHRoaXMuY2hhcnQucmVkdWNlKChhLCBiKSA9PiBhICsgYi5NZXN1cmUsIDApIC8gdGhpcy5jaGFydC5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmNoYXJ0V2Vlay5wdXNoKHtEYXRlOnRoaXMuZGF0ZSwgTWVzdXJlOndlZWt9KTtcbiAgICAgICAgICAgIHNldFN0cmluZyhcImNoYXJ0V2Vla1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmNoYXJ0V2VlaykpO1xuICAgICAgICAgICAgdGhpcy5fU291cmNlV2Vla2x5LnB1c2godGhpcy5jaGFydFdlZWspO1xuICAgICAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5jaGFydFdlZWsucmVkdWNlKChhLCBiKSA9PiBhICsgYi5NZXN1cmUsIDApIC8gdGhpcy5jaGFydFdlZWsubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5jaGFydE1vbnRoLnB1c2goe0RhdGU6dGhpcy5tb250aCxNZXN1cmU6bW9udGh9KTtcbiAgICAgICAgICAgIHNldFN0cmluZyhcImNoYXJ0TW9udGhcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5jaGFydE1vbnRoKSk7XG4gICAgICAgICAgICB0aGlzLl9Tb3VyY2VNb250aGx5LnB1c2godGhpcy5jaGFydE1vbnRoKTtcbiAgICAgICAgICAgIC8qIHRoaXMuZGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgIERhdGU6IGl0ZW0uRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBNZXN1cmU6IGl0ZW0uTWVzdXJlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLmZvckVhY2goaXRlbSA9PiB0aGlzLnNvdXJjZS5wdXNoKGl0ZW0pKTsqL1xuICAgICAgICAgICAgdGhpcy5jbG9zZUFkZCgpO1xuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG4gICAgbm90aWZpY2F0aW9uKGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgTG9jYWxOb3RpZmljYXRpb25zLnNjaGVkdWxlKFt7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIHRpdGxlOlwiR2x5Y8OpbWllXCIsXG4gICAgICAgICAgICBib2R5OmFyZ3MsXG4gICAgICAgICAgICBiYWRnZTogMSxcbiAgICAgICAgICAgIGF0OiBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgzMDAgKiAxMDAwKSApIC8vIDUgbWludXRlcyBmcm9tIG5vd1xuICAgICAgICB9XSk7XG4gICAgICAgIFxuXG4gICAgICAgIC8vIGFkZGluZyBhIGhhbmRsZXIsIHNvIHdlIGNhbiBkbyBzb21ldGhpbmcgd2l0aCB0aGUgcmVjZWl2ZWQgbm90aWZpY2F0aW9uLi4gaW4gdGhpcyBjYXNlIGFuIGFsZXJ0XG4gICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5hZGRPbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrKGRhdGEgPT4ge1xuICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIiBOb3RpZmljYXRpb25cIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgVGl0cmU6ICR7ZGF0YS50aXRsZX0sIERlc2NyaXB0aW9uOiAke2RhdGEuYm9keX1gLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7fVxuICAgICAgICBzaG93Tm90aWZpY2F0aW9uKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3R5cGUgMSBuZSBkZXBhc3NlIHBhcyAxLjUgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90eXBlIDIgbmUgZGVwYXNzZSBwYXMgMi41XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5tZXN1cmUpPDAuNylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uPVwiIEF0dGVudGlvbiB2b3VzIGF2ZXogdW5lIGh5cG9nbHljw6ltaWUgXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5tZXN1cmUpPjEuOClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uPVwiIEF0dGVudGlvbiB2b3VzIGF2ZXogdW5lIGh5cGVyZ2x5Y8OpbWllIFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24odGhpcy5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cblxuICAgIC8qICBwcml2YXRlIHZhbGlkYXRlSW5wdXQoKSB7XG4gICAgICAgICAgIGxldCBWYWxpZGUgPSB0cnVlO1xuICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5pc051bWJlcih0aGlzLmlucHV0LmdsdWNvc2UudmFsdWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZ2x1Y29zZS5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5nbHVjb3NlLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgIFZhbGlkZSA9IGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIHJldHVybiBWYWxpZGU7XG4gICAgICAgfSovXG5cbiAgICBoaWRlS2V5Ym9hcmQoKSB7XG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2aXR5ID0gYXBwbGljYXRpb24uYW5kcm9pZC5mb3JlZ3JvdW5kQWN0aXZpdHk7XG4gICAgICAgICAgICAgICAgbGV0IENvbnRleHQgPSBhcHBsaWNhdGlvbi5hbmRyb2lkLmN1cnJlbnRDb250ZXh0O1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dE1hbmFnZXIgPSBDb250ZXh0LmdldFN5c3RlbVNlcnZpY2UoXG4gICAgICAgICAgICAgICAgICAgIGFuZHJvaWQuY29udGVudC5Db250ZXh0LklOUFVUX01FVEhPRF9TRVJWSUNFXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpbnB1dE1hbmFnZXIuaGlkZVNvZnRJbnB1dEZyb21XaW5kb3coXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5LmdldEN1cnJlbnRGb2N1cygpLmdldFdpbmRvd1Rva2VuKCksXG4gICAgICAgICAgICAgICAgICAgIGFuZHJvaWQudmlldy5pbnB1dG1ldGhvZC5JbnB1dE1ldGhvZE1hbmFnZXIuSElERV9OT1RfQUxXQVlTXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==