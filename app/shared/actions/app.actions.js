"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOAD = "[App] Load";
exports.ADD = "[App] ADD";
exports.SET_USER = "[App] SET_USER";
exports.RESET_USER = "[App] RESET USER";
exports.SHOW_ERROR = "[App] Show Error action";
exports.FIRE_ACTION = "[App] Fire action";
exports.SHOW_LOADING = "[App] Show Loading action";
exports.HIDE_LOADING = "[App] Hide Loading action";
exports.SET_CONNEXION = "[App] Set Connexion action";
exports.NO_INTERNET = "[App] No Connexion action";
exports.SHOW_TOAST = "[App] Show Toast action";
exports.SELECT = "[App] Select";
exports.LOAD_START = "[App] Load";
exports.LOAD_ERROR = "[App] Load Error";
exports.LOAD_COMPLETE = "[App] Load";
exports.STARTED = "[App] Started";
var FireAction = (function () {
    function FireAction(payload) {
        this.payload = payload;
        this.type = exports.FIRE_ACTION;
    }
    return FireAction;
}());
exports.FireAction = FireAction;
var ShowLoadingAction = (function () {
    function ShowLoadingAction() {
        this.type = exports.SHOW_LOADING;
    }
    return ShowLoadingAction;
}());
exports.ShowLoadingAction = ShowLoadingAction;
var HideLoadingAction = (function () {
    function HideLoadingAction() {
        this.type = exports.HIDE_LOADING;
    }
    return HideLoadingAction;
}());
exports.HideLoadingAction = HideLoadingAction;
var SetConnexionAction = (function () {
    function SetConnexionAction(payload) {
        this.payload = payload;
        this.type = exports.SET_CONNEXION;
    }
    return SetConnexionAction;
}());
exports.SetConnexionAction = SetConnexionAction;
var SetUserAction = (function () {
    function SetUserAction(payload) {
        this.payload = payload;
        this.type = exports.SET_USER;
    }
    return SetUserAction;
}());
exports.SetUserAction = SetUserAction;
var SetStartAction = (function () {
    function SetStartAction() {
        this.type = exports.STARTED;
    }
    return SetStartAction;
}());
exports.SetStartAction = SetStartAction;
var NoInternetAction = (function () {
    function NoInternetAction(payload) {
        this.payload = payload;
        this.type = exports.NO_INTERNET;
    }
    return NoInternetAction;
}());
exports.NoInternetAction = NoInternetAction;
var ShowToastAction = (function () {
    function ShowToastAction(payload) {
        this.payload = payload;
        this.type = exports.SHOW_TOAST;
    }
    return ShowToastAction;
}());
exports.ShowToastAction = ShowToastAction;
var ShowErrorAction = (function () {
    function ShowErrorAction(payload) {
        this.payload = payload;
        this.type = exports.SHOW_ERROR;
    }
    return ShowErrorAction;
}());
exports.ShowErrorAction = ShowErrorAction;
var RestUserAction = (function () {
    function RestUserAction() {
        this.type = exports.RESET_USER;
    }
    return RestUserAction;
}());
exports.RestUserAction = RestUserAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVhLFFBQUEsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUNwQixRQUFBLEdBQUcsR0FBRyxXQUFXLENBQUM7QUFDbEIsUUFBQSxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUIsUUFBQSxVQUFVLEdBQUcsa0JBQWtCLENBQUM7QUFDaEMsUUFBQSxVQUFVLEdBQUcseUJBQXlCLENBQUM7QUFDdkMsUUFBQSxXQUFXLEdBQUcsbUJBQW1CLENBQUM7QUFDbEMsUUFBQSxZQUFZLEdBQUcsMkJBQTJCLENBQUM7QUFDM0MsUUFBQSxZQUFZLEdBQUcsMkJBQTJCLENBQUM7QUFDM0MsUUFBQSxhQUFhLEdBQUcsNEJBQTRCLENBQUM7QUFDN0MsUUFBQSxXQUFXLEdBQUcsMkJBQTJCLENBQUM7QUFDMUMsUUFBQSxVQUFVLEdBQUcseUJBQXlCLENBQUM7QUFDdkMsUUFBQSxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQ3hCLFFBQUEsVUFBVSxHQUFHLFlBQVksQ0FBQztBQUMxQixRQUFBLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztBQUNoQyxRQUFBLGFBQWEsR0FBRyxZQUFZLENBQUM7QUFDN0IsUUFBQSxPQUFPLEdBQUcsZUFBZSxDQUFDO0FBRXZDO0lBRUUsb0JBQW1CLE9BQU87UUFBUCxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBRGpCLFNBQUksR0FBRyxtQkFBVyxDQUFDO0lBQ0MsQ0FBQztJQUNoQyxpQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksZ0NBQVU7QUFJdkI7SUFBQTtRQUNXLFNBQUksR0FBRyxvQkFBWSxDQUFDO0lBQy9CLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksOENBQWlCO0FBSTlCO0lBQUE7UUFDVyxTQUFJLEdBQUcsb0JBQVksQ0FBQztJQUMvQixDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDhDQUFpQjtBQUc5QjtJQUVFLDRCQUFtQixPQUFPO1FBQVAsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQURqQixTQUFJLEdBQUcscUJBQWEsQ0FBQztJQUNELENBQUM7SUFDaEMseUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLGdEQUFrQjtBQUsvQjtJQUVFLHVCQUFtQixPQUFPO1FBQVAsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQURqQixTQUFJLEdBQUcsZ0JBQVEsQ0FBQztJQUNJLENBQUM7SUFDaEMsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHNDQUFhO0FBSTFCO0lBQUE7UUFDVyxTQUFJLEdBQUcsZUFBTyxDQUFDO0lBQzFCLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksd0NBQWM7QUFJM0I7SUFFRSwwQkFBbUIsT0FBTztRQUFQLFlBQU8sR0FBUCxPQUFPLENBQUE7UUFEakIsU0FBSSxHQUFHLG1CQUFXLENBQUM7SUFDQyxDQUFDO0lBQ2hDLHVCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSw0Q0FBZ0I7QUFLN0I7SUFFRSx5QkFBbUIsT0FBTztRQUFQLFlBQU8sR0FBUCxPQUFPLENBQUE7UUFEakIsU0FBSSxHQUFHLGtCQUFVLENBQUM7SUFDRSxDQUFDO0lBQ2hDLHNCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSwwQ0FBZTtBQUs1QjtJQUVFLHlCQUFtQixPQUFPO1FBQVAsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQURqQixTQUFJLEdBQUcsa0JBQVUsQ0FBQztJQUNFLENBQUM7SUFDaEMsc0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLDBDQUFlO0FBSzVCO0lBQUE7UUFDVyxTQUFJLEdBQUcsa0JBQVUsQ0FBQztJQUM3QixDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgTE9BRCA9IFwiW0FwcF0gTG9hZFwiO1xyXG5leHBvcnQgY29uc3QgQUREID0gXCJbQXBwXSBBRERcIjtcclxuZXhwb3J0IGNvbnN0IFNFVF9VU0VSID0gXCJbQXBwXSBTRVRfVVNFUlwiO1xyXG5leHBvcnQgY29uc3QgUkVTRVRfVVNFUiA9IFwiW0FwcF0gUkVTRVQgVVNFUlwiO1xyXG5leHBvcnQgY29uc3QgU0hPV19FUlJPUiA9IFwiW0FwcF0gU2hvdyBFcnJvciBhY3Rpb25cIjtcclxuZXhwb3J0IGNvbnN0IEZJUkVfQUNUSU9OID0gXCJbQXBwXSBGaXJlIGFjdGlvblwiO1xyXG5leHBvcnQgY29uc3QgU0hPV19MT0FESU5HID0gXCJbQXBwXSBTaG93IExvYWRpbmcgYWN0aW9uXCI7XHJcbmV4cG9ydCBjb25zdCBISURFX0xPQURJTkcgPSBcIltBcHBdIEhpZGUgTG9hZGluZyBhY3Rpb25cIjtcclxuZXhwb3J0IGNvbnN0IFNFVF9DT05ORVhJT04gPSBcIltBcHBdIFNldCBDb25uZXhpb24gYWN0aW9uXCI7XHJcbmV4cG9ydCBjb25zdCBOT19JTlRFUk5FVCA9IFwiW0FwcF0gTm8gQ29ubmV4aW9uIGFjdGlvblwiO1xyXG5leHBvcnQgY29uc3QgU0hPV19UT0FTVCA9IFwiW0FwcF0gU2hvdyBUb2FzdCBhY3Rpb25cIjtcclxuZXhwb3J0IGNvbnN0IFNFTEVDVCA9IFwiW0FwcF0gU2VsZWN0XCI7XHJcbmV4cG9ydCBjb25zdCBMT0FEX1NUQVJUID0gXCJbQXBwXSBMb2FkXCI7XHJcbmV4cG9ydCBjb25zdCBMT0FEX0VSUk9SID0gXCJbQXBwXSBMb2FkIEVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBMT0FEX0NPTVBMRVRFID0gXCJbQXBwXSBMb2FkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFSVEVEID0gXCJbQXBwXSBTdGFydGVkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlyZUFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgcmVhZG9ubHkgdHlwZSA9IEZJUkVfQUNUSU9OO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkKSB7fVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTaG93TG9hZGluZ0FjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgcmVhZG9ubHkgdHlwZSA9IFNIT1dfTE9BRElORztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhpZGVMb2FkaW5nQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcclxuICByZWFkb25seSB0eXBlID0gSElERV9MT0FESU5HO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBTZXRDb25uZXhpb25BY3Rpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xyXG4gIHJlYWRvbmx5IHR5cGUgPSBTRVRfQ09OTkVYSU9OO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2V0VXNlckFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgcmVhZG9ubHkgdHlwZSA9IFNFVF9VU0VSO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkKSB7fVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTZXRTdGFydEFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgcmVhZG9ubHkgdHlwZSA9IFNUQVJURUQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb0ludGVybmV0QWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcclxuICByZWFkb25seSB0eXBlID0gTk9fSU5URVJORVQ7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaG93VG9hc3RBY3Rpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xyXG4gIHJlYWRvbmx5IHR5cGUgPSBTSE9XX1RPQVNUO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2hvd0Vycm9yQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcclxuICByZWFkb25seSB0eXBlID0gU0hPV19FUlJPUjtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3RVc2VyQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcclxuICByZWFkb25seSB0eXBlID0gUkVTRVRfVVNFUjtcclxufVxyXG5leHBvcnQgdHlwZSBBbGwgPSBGaXJlQWN0aW9uIHwgU2V0VXNlckFjdGlvbiB8IFNldFN0YXJ0QWN0aW9uO1xyXG4iXX0=