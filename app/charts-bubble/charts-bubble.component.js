"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page/page");
var data_service_1 = require("./data-service/data.service");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var ChartsBubbleComponent = (function () {
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    function ChartsBubbleComponent(_page, router, _dataService) {
        this._page = _page;
        this.router = router;
        this._dataService = _dataService;
    }
    Object.defineProperty(ChartsBubbleComponent.prototype, "highDataModel", {
        get: function () {
            return this._highDataModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartsBubbleComponent.prototype, "middleDataModel", {
        get: function () {
            return this._middleDataModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartsBubbleComponent.prototype, "lowDataModel", {
        get: function () {
            return this._lowDataModel;
        },
        enumerable: true,
        configurable: true
    });
    ChartsBubbleComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        this._highDataModel = new observable_array_1.ObservableArray(this._dataService.getHighDataModel());
        this._middleDataModel = new observable_array_1.ObservableArray(this._dataService.getMiddleDataModel());
        this._lowDataModel = new observable_array_1.ObservableArray(this._dataService.getLowDataModel());
    };
    Object.defineProperty(ChartsBubbleComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    ChartsBubbleComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], ChartsBubbleComponent.prototype, "drawerComponent", void 0);
    ChartsBubbleComponent = __decorate([
        core_1.Component({
            selector: "Charts",
            moduleId: module.id,
            providers: [data_service_1.DataService],
            templateUrl: "./charts-bubble.component.html",
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions, data_service_1.DataService])
    ], ChartsBubbleComponent);
    return ChartsBubbleComponent;
}());
exports.ChartsBubbleComponent = ChartsBubbleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRzLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGFydHMtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCx5RUFBMEY7QUFDMUYsOERBQTRFO0FBQzVFLHNEQUErRDtBQUMvRCxzREFBcUQ7QUFDckQsNERBQTBEO0FBRTFELDJFQUF5RTtBQVV6RTtJQVlJOztrRUFFOEQ7SUFDL0QsK0JBQW9CLEtBQVcsRUFBVSxNQUF3QixFQUFTLFlBQXlCO1FBQS9FLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFhO0lBR25HLENBQUM7SUFFRCxzQkFBSSxnREFBYTthQUFqQjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRUQsc0JBQUksa0RBQWU7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0NBQVk7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVHLHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtREFBc0IsRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGtDQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxzQkFBSSx1REFBb0I7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQ7OztrRUFHOEQ7SUFDOUQsaURBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQTVDb0I7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWtCLGdDQUFzQjtrRUFBQztJQUxwRCxxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSxnQ0FBZ0M7U0FFaEQsQ0FBQzt5Q0FnQjRCLFdBQUksRUFBa0IseUJBQWdCLEVBQXVCLDBCQUFXO09BZnpGLHFCQUFxQixDQW9EakM7SUFBRCw0QkFBQztDQUFBLEFBcERELElBb0RDO0FBcERZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2VcIjtcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhLXNlcnZpY2UvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7Q291bnRyeSB9IGZyb20gJy4vZGF0YS1zZXJ2aWNlL2RhdGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiQ2hhcnRzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtEYXRhU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jaGFydHMtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIC8vICBzdHlsZVVybHM6IFtcIi4vaG9tZS5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0c0J1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHByaXZhdGUgX2hpZ2hEYXRhTW9kZWw6IE9ic2VydmFibGVBcnJheTxDb3VudHJ5PjtcbiAgICBwcml2YXRlIF9taWRkbGVEYXRhTW9kZWw6IE9ic2VydmFibGVBcnJheTxDb3VudHJ5PjtcbiAgICBwcml2YXRlIF9sb3dEYXRhTW9kZWw6IE9ic2VydmFibGVBcnJheTxDb3VudHJ5PjtcblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBfZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKVxuICAge1xuXG4gICB9XG4gICBcbiAgIGdldCBoaWdoRGF0YU1vZGVsKCk6IE9ic2VydmFibGVBcnJheTxDb3VudHJ5PiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZ2hEYXRhTW9kZWw7XG59XG5cbmdldCBtaWRkbGVEYXRhTW9kZWwoKTogT2JzZXJ2YWJsZUFycmF5PENvdW50cnk+IHtcbiAgICByZXR1cm4gdGhpcy5fbWlkZGxlRGF0YU1vZGVsO1xufVxuXG5nZXQgbG93RGF0YU1vZGVsKCk6IE9ic2VydmFibGVBcnJheTxDb3VudHJ5PiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvd0RhdGFNb2RlbDtcbn1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX2hpZ2hEYXRhTW9kZWwgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuX2RhdGFTZXJ2aWNlLmdldEhpZ2hEYXRhTW9kZWwoKSk7XG4gICAgICAgIHRoaXMuX21pZGRsZURhdGFNb2RlbCA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5fZGF0YVNlcnZpY2UuZ2V0TWlkZGxlRGF0YU1vZGVsKCkpO1xuICAgICAgICB0aGlzLl9sb3dEYXRhTW9kZWwgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuX2RhdGFTZXJ2aWNlLmdldExvd0RhdGFNb2RlbCgpKTtcbiAgICB9XG5cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbiBcbn1cbiJdfQ==