"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Redux & RxJS
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/last");
require("rxjs/add/operator/distinctUntilChanged");
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var appActions = require("../actions/app.actions");
//Ui
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var Toast = require("nativescript-toast");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
//Configs & Helper
var loader = new LoadingIndicator();
var options = {
    message: "Chargement...",
    progress: 0,
    android: {
        indeterminate: true,
        cancelable: true,
        cancelListener: function (dialog) {
            console.log("Loading cancelled");
        },
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 0,
        secondaryProgress: 1
    },
    ios: {
        margin: 10,
        dimBackground: true,
        color: "#4B9ED6",
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: "yellow",
        hideBezel: true // default false, can hide the surrounding bezel
    }
};
//import * as moment from "moment";
var AppEffects = (function () {
    function AppEffects(actions$) {
        var _this = this;
        this.actions$ = actions$;
        this.lastErrorDate = new Date();
        this.isShow = false;
        this.CHECK_YOUR_INTERNET_CONNEXION = "Check your internet connexion";
        this.showLoading$ = this.actions$
            .ofType(appActions.SHOW_LOADING)
            .do(function (action) {
            if (!_this.isShow) {
                _this.isShow = true;
                loader.show(options);
            }
        });
        this.hideLoading$ = this.actions$
            .ofType(appActions.HIDE_LOADING || "LOAD_FAILED")
            .do(function (action) {
            setTimeout(function () {
                if (_this.isShow) {
                    _this.isShow = false;
                    loader.hide();
                }
            });
        });
        this.showToast$ = this.actions$
            .ofType(appActions.SHOW_TOAST)
            .do(function (action) {
            Toast.makeText(action.payload).show();
        });
        this.showError$ = this.actions$
            .ofType(appActions.SHOW_ERROR)
            .do(function (action) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Erreur", action.payload);
        });
        this.showNoInternetConnexion$ = this.actions$
            .ofType(appActions.NO_INTERNET)
            .debounceTime(1000)
            .map(function (val) { return val; })
            .distinctUntilChanged()
            .do(function (action) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Erreur", _this.CHECK_YOUR_INTERNET_CONNEXION);
        });
    }
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], AppEffects.prototype, "showLoading$", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], AppEffects.prototype, "hideLoading$", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], AppEffects.prototype, "showToast$", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], AppEffects.prototype, "showError$", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], AppEffects.prototype, "showNoInternetConnexion$", void 0);
    AppEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions])
    ], AppEffects);
    return AppEffects;
}());
exports.AppEffects = AppEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0MsZUFBZTtBQUNmLGlDQUErQjtBQUMvQixzQ0FBb0M7QUFDcEMsbUNBQWlDO0FBQ2pDLGdDQUE4QjtBQUM5QiwwQ0FBd0M7QUFDeEMsa0NBQWdDO0FBQ2hDLGtEQUFnRDtBQUdoRCw4Q0FBNkM7QUFFN0MseUNBQWdEO0FBQ2hELG1EQUFxRDtBQUVyRCxJQUFJO0FBQ0osbUVBQTZFO0FBQzdFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7QUFFbEYsa0JBQWtCO0FBQ2xCLElBQUksTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUNwQyxJQUFJLE9BQU8sR0FBRztJQUNaLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLFFBQVEsRUFBRSxDQUFDO0lBQ1gsT0FBTyxFQUFFO1FBQ1AsYUFBYSxFQUFFLElBQUk7UUFDbkIsVUFBVSxFQUFFLElBQUk7UUFDaEIsY0FBYyxFQUFFLFVBQVUsTUFBTTtZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELEdBQUcsRUFBRSxHQUFHO1FBQ1Isb0JBQW9CLEVBQUUsU0FBUztRQUMvQixxQkFBcUIsRUFBRSxJQUFJO1FBQzNCLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLGlCQUFpQixFQUFFLENBQUM7S0FDckI7SUFDRCxHQUFHLEVBQUU7UUFDSCxNQUFNLEVBQUUsRUFBRTtRQUNWLGFBQWEsRUFBRSxJQUFJO1FBQ25CLEtBQUssRUFBRSxTQUFTO1FBQ2hCLGtDQUFrQztRQUNsQyx1Q0FBdUM7UUFDdkMsZUFBZSxFQUFFLFFBQVE7UUFDekIsU0FBUyxFQUFFLElB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QVUsQ0FvRHRCO0lBQUQsaUJBQUM7Q0FBQSxBQXBERCxJQW9EQztBQXBEWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuXHJcbi8vIFJlZHV4ICYgUnhKU1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWVyZ2VNYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZGVib3VuY2VUaW1lXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2xhc3RcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZGlzdGluY3RVbnRpbENoYW5nZWRcIjtcclxuaW1wb3J0IHsgb2YgfSBmcm9tIFwicnhqcy9vYnNlcnZhYmxlL29mXCI7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcclxuaW1wb3J0IHsgQWN0aW9ucywgRWZmZWN0IH0gZnJvbSBcIkBuZ3J4L2VmZmVjdHNcIjtcclxuaW1wb3J0ICogYXMgYXBwQWN0aW9ucyBmcm9tIFwiLi4vYWN0aW9ucy9hcHAuYWN0aW9uc1wiO1xyXG5cclxuLy9VaVxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0LCBUTlNGYW5jeUFsZXJ0QnV0dG9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcbnZhciBUb2FzdCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdG9hc3RcIik7XHJcbnZhciBMb2FkaW5nSW5kaWNhdG9yID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiKS5Mb2FkaW5nSW5kaWNhdG9yO1xyXG5cclxuLy9Db25maWdzICYgSGVscGVyXHJcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG52YXIgb3B0aW9ucyA9IHtcclxuICBtZXNzYWdlOiBcIkNoYXJnZW1lbnQuLi5cIixcclxuICBwcm9ncmVzczogMCxcclxuICBhbmRyb2lkOiB7XHJcbiAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgIGNhbmNlbExpc3RlbmVyOiBmdW5jdGlvbiAoZGlhbG9nKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBjYW5jZWxsZWRcIik7XHJcbiAgICB9LFxyXG4gICAgbWF4OiAxMDAsXHJcbiAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgICBwcm9ncmVzc1BlcmNlbnRGb3JtYXQ6IDAuNTMsXHJcbiAgICBwcm9ncmVzc1N0eWxlOiAwLFxyXG4gICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcclxuICB9LFxyXG4gIGlvczoge1xyXG4gICAgbWFyZ2luOiAxMCxcclxuICAgIGRpbUJhY2tncm91bmQ6IHRydWUsXHJcbiAgICBjb2xvcjogXCIjNEI5RUQ2XCIsIC8vIGNvbG9yIG9mIGluZGljYXRvciBhbmQgbGFiZWxzXHJcbiAgICAvLyBiYWNrZ3JvdW5kIGJveCBhcm91bmQgaW5kaWNhdG9yXHJcbiAgICAvLyBoaWRlQmV6ZWwgd2lsbCBvdmVycmlkZSB0aGlzIGlmIHRydWVcclxuICAgIGJhY2tncm91bmRDb2xvcjogXCJ5ZWxsb3dcIixcclxuICAgIGhpZGVCZXplbDogdHJ1ZSAvLyBkZWZhdWx0IGZhbHNlLCBjYW4gaGlkZSB0aGUgc3Vycm91bmRpbmcgYmV6ZWxcclxuICB9XHJcbn07XHJcblxyXG4vL2ltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcHBFZmZlY3RzIHtcclxuICBwcml2YXRlIGxhc3RFcnJvckRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIHByaXZhdGUgaXNTaG93ID0gZmFsc2U7XHJcbiAgQ0hFQ0tfWU9VUl9JTlRFUk5FVF9DT05ORVhJT04gPSBcIkNoZWNrIHlvdXIgaW50ZXJuZXQgY29ubmV4aW9uXCI7XHJcblxyXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcclxuICBzaG93TG9hZGluZyQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyRcclxuICAgIC5vZlR5cGUoYXBwQWN0aW9ucy5TSE9XX0xPQURJTkcpXHJcbiAgICAuZG8oKGFjdGlvbjogYW55KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pc1Nob3cpIHtcclxuICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XHJcbiAgICAgICAgbG9hZGVyLnNob3cob3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXHJcbiAgaGlkZUxvYWRpbmckOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkXHJcbiAgICAub2ZUeXBlKGFwcEFjdGlvbnMuSElERV9MT0FESU5HIHx8IFwiTE9BRF9GQUlMRURcIilcclxuICAgIC5kbygoYWN0aW9uOiBhbnkpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93KSB7XHJcbiAgICAgICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcclxuICBzaG93VG9hc3QkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkXHJcbiAgICAub2ZUeXBlKGFwcEFjdGlvbnMuU0hPV19UT0FTVClcclxuICAgIC5kbygoYWN0aW9uOiBhbnkpID0+IHtcclxuICAgICAgVG9hc3QubWFrZVRleHQoYWN0aW9uLnBheWxvYWQpLnNob3coKTtcclxuICAgIH0pO1xyXG5cclxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXHJcbiAgc2hvd0Vycm9yJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zJFxyXG4gICAgLm9mVHlwZShhcHBBY3Rpb25zLlNIT1dfRVJST1IpXHJcbiAgICAuZG8oKGFjdGlvbjogYW55KSA9PiB7XHJcbiAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyZXVyXCIsIGFjdGlvbi5wYXlsb2FkKTtcclxuICAgIH0pO1xyXG5cclxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXHJcbiAgc2hvd05vSW50ZXJuZXRDb25uZXhpb24kOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkXHJcbiAgICAub2ZUeXBlKGFwcEFjdGlvbnMuTk9fSU5URVJORVQpXHJcbiAgICAuZGVib3VuY2VUaW1lKDEwMDApXHJcbiAgICAubWFwKHZhbCA9PiB2YWwpXHJcbiAgICAuZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgLmRvKChhY3Rpb246IGFueSkgPT4ge1xyXG4gICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycmV1clwiLCB0aGlzLkNIRUNLX1lPVVJfSU5URVJORVRfQ09OTkVYSU9OKTtcclxuICAgIH0pO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnMkOiBBY3Rpb25zKSB7IH1cclxufVxyXG4iXX0=