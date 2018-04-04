"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//SDK & API
var sdk_1 = require("../../shared/sdk");
//Redux & RxJS
var store_1 = require("@ngrx/store");
var fromRoot = require("./../../shared/reducers");
//Services
var fetchModule = require("fetch");
var http_1 = require("@angular/http");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var AuthService = (function () {
    function AuthService(http, userApi, auth, guestsApi, store) {
        var _this = this;
        this.http = http;
        this.userApi = userApi;
        this.auth = auth;
        this.guestsApi = guestsApi;
        this.store = store;
        this.store.select(fromRoot.getLastAction).subscribe(function (action) {
            if (action == "logout") {
                _this.logout();
            }
        });
    }
    AuthService.prototype.getUser = function () {
        return this.auth.getCurrentUserData();
    };
    AuthService.prototype.getUserId = function () {
        return this.auth.getCurrentUserId();
    };
    AuthService.prototype.login = function (credentials) {
        // return this.userApi.login(credentials);
        var userString = JSON.parse(application_settings_1.getString("account", "{}"));
        try {
            return (userString);
        }
        catch (e) {
            return {};
        }
    };
    AuthService.prototype.logout = function () {
        return this.userApi.logout();
    };
    AuthService.prototype.register = function (credentials) {
        //return this.userApi.create(credentials);
        application_settings_1.setString("account", JSON.stringify(credentials));
    };
    AuthService.prototype.changePassword = function (oldpassword, newpassword) {
        return this.userApi.changePassword(oldpassword, newpassword);
    };
    AuthService.prototype.createGuestProfile = function (data) {
        //return this.guestsApi.create(data);
        application_settings_1.setString("profile", JSON.stringify(data));
        application_settings_1.setBoolean("authenticated", true);
    };
    AuthService.prototype.updateGuestProfile = function (data, profile_id) {
        return this.guestsApi.patchAttributes(profile_id, data);
    };
    AuthService.prototype.setGuestProfile = function (profile_id) {
        return this.userApi.updateByIdAccessTokens(this.auth.getCurrentUserId(), this.auth.getAccessTokenId(), {
            profile_id: profile_id
        });
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            sdk_1.UserApi,
            sdk_1.LoopBackAuth,
            sdk_1.GuestsApi,
            store_1.Store])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLFdBQVc7QUFDWCx3Q0FJMEI7QUFFMUIsY0FBYztBQUNkLHFDQUFvQztBQUNwQyxrREFBb0Q7QUFHcEQsVUFBVTtBQUNWLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxzQ0FBOEM7QUFDOUMsbUdBQThHO0FBRzlHO0lBQ0UscUJBQ1UsSUFBVSxFQUNWLE9BQWdCLEVBQ2hCLElBQWtCLEVBQ2xCLFNBQW9CLEVBQ3BCLEtBQTRCO1FBTHRDLGlCQVlDO1FBWFMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBYztRQUNsQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBRXBDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsMkJBQUssR0FBTCxVQUFNLFdBQVc7UUFFaEIsMENBQTBDO1FBQzFDLElBQUksVUFBVSxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0NBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUM7WUFFRCxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV0QixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBRSxFQUFFLENBQUE7UUFDWixDQUFDO0lBR0gsQ0FBQztJQUdBLDRCQUFNLEdBQU47UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLFdBQVc7UUFDbkIsMENBQTBDO1FBQzFDLGdDQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUVuRCxDQUFDO0lBQ0Qsb0NBQWMsR0FBZCxVQUFlLFdBQVcsRUFBRSxXQUFXO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUdELHdDQUFrQixHQUFsQixVQUFtQixJQUFTO1FBQzFCLHFDQUFxQztRQUNyQyxnQ0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0MsaUNBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsQ0FBQztJQUVELHdDQUFrQixHQUFsQixVQUFtQixJQUFTLEVBQUUsVUFBVTtRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFHRCxxQ0FBZSxHQUFmLFVBQWdCLFVBQWtCO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFDNUI7WUFDRSxVQUFVLEVBQUUsVUFBVTtTQUN2QixDQUNGLENBQUM7SUFDSixDQUFDO0lBekVVLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FHSyxXQUFJO1lBQ0QsYUFBTztZQUNWLGtCQUFZO1lBQ1AsZUFBUztZQUNiLGFBQUs7T0FOWCxXQUFXLENBMkV2QjtJQUFELGtCQUFDO0NBQUEsQUEzRUQsSUEyRUM7QUEzRVksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8vU0RLICYgQVBJXHJcbmltcG9ydCB7XHJcbiAgVXNlckFwaSxcclxuICBMb29wQmFja0F1dGgsXHJcbiAgR3Vlc3RzQXBpXHJcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zZGtcIjtcclxuXHJcbi8vUmVkdXggJiBSeEpTXHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcclxuXHJcbi8vU2VydmljZXNcclxudmFyIGZldGNoTW9kdWxlID0gcmVxdWlyZShcImZldGNoXCIpO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIHNldEJvb2xlYW4gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwLFxyXG4gICAgcHJpdmF0ZSB1c2VyQXBpOiBVc2VyQXBpLFxyXG4gICAgcHJpdmF0ZSBhdXRoOiBMb29wQmFja0F1dGgsXHJcbiAgICBwcml2YXRlIGd1ZXN0c0FwaTogR3Vlc3RzQXBpLFxyXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8ZnJvbVJvb3QuU3RhdGU+XHJcbiAgKSB7XHJcbiAgICB0aGlzLnN0b3JlLnNlbGVjdChmcm9tUm9vdC5nZXRMYXN0QWN0aW9uKS5zdWJzY3JpYmUoYWN0aW9uID0+IHtcclxuICAgICAgaWYgKGFjdGlvbiA9PSBcImxvZ291dFwiKSB7XHJcbiAgICAgICAgdGhpcy5sb2dvdXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXV0aC5nZXRDdXJyZW50VXNlckRhdGEoKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmF1dGguZ2V0Q3VycmVudFVzZXJJZCgpO1xyXG4gIH1cclxuXHJcbiAgbG9naW4oY3JlZGVudGlhbHMpIHtcclxuICAgIFxyXG4gICAvLyByZXR1cm4gdGhpcy51c2VyQXBpLmxvZ2luKGNyZWRlbnRpYWxzKTtcclxuICAgbGV0IHVzZXJTdHJpbmcgPUpTT04ucGFyc2UoZ2V0U3RyaW5nKFwiYWNjb3VudFwiLCBcInt9XCIpKTtcclxuIHRyeSB7XHJcbiAgICAgXHJcbiAgICAgcmV0dXJuICh1c2VyU3RyaW5nKTtcclxuXHJcbiAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICByZXR1cm4gIHt9XHJcbiAgIH1cclxuICAgIFxyXG4gIFxyXG4gfVxyXG4gIFxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyQXBpLmxvZ291dCgpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIoY3JlZGVudGlhbHMpIHtcclxuICAgLy9yZXR1cm4gdGhpcy51c2VyQXBpLmNyZWF0ZShjcmVkZW50aWFscyk7XHJcbiAgIHNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbHMpKTtcclxuICAgXHJcbiAgfVxyXG4gIGNoYW5nZVBhc3N3b3JkKG9sZHBhc3N3b3JkLCBuZXdwYXNzd29yZCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlckFwaS5jaGFuZ2VQYXNzd29yZChvbGRwYXNzd29yZCwgbmV3cGFzc3dvcmQpXHJcbiAgfVxyXG5cclxuXHJcbiAgY3JlYXRlR3Vlc3RQcm9maWxlKGRhdGE6IGFueSkge1xyXG4gICAgLy9yZXR1cm4gdGhpcy5ndWVzdHNBcGkuY3JlYXRlKGRhdGEpO1xyXG4gICAgc2V0U3RyaW5nKFwicHJvZmlsZVwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICBzZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuXHJcbiAgfVxyXG5cclxuICB1cGRhdGVHdWVzdFByb2ZpbGUoZGF0YTogYW55LCBwcm9maWxlX2lkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ndWVzdHNBcGkucGF0Y2hBdHRyaWJ1dGVzKHByb2ZpbGVfaWQsIGRhdGEpO1xyXG4gIH1cclxuXHJcblxyXG4gIHNldEd1ZXN0UHJvZmlsZShwcm9maWxlX2lkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJBcGkudXBkYXRlQnlJZEFjY2Vzc1Rva2VucyhcclxuICAgICAgdGhpcy5hdXRoLmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgdGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuSWQoKSxcclxuICAgICAge1xyXG4gICAgICAgIHByb2ZpbGVfaWQ6IHByb2ZpbGVfaWRcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbiAgXHJcbn1cclxuIl19