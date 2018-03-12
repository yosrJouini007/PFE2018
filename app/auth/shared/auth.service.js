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
        return this.userApi.login(credentials);
    };
    AuthService.prototype.logout = function () {
        return this.userApi.logout();
    };
    AuthService.prototype.register = function (credentials) {
        return this.userApi.create(credentials);
    };
    AuthService.prototype.changePassword = function (oldpassword, newpassword) {
        return this.userApi.changePassword(oldpassword, newpassword);
    };
    AuthService.prototype.createGuestProfile = function (data) {
        return this.guestsApi.create(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLFdBQVc7QUFDWCx3Q0FJMEI7QUFFMUIsY0FBYztBQUNkLHFDQUFvQztBQUNwQyxrREFBb0Q7QUFHcEQsVUFBVTtBQUNWLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxzQ0FBOEM7QUFHOUM7SUFDRSxxQkFDVSxJQUFVLEVBQ1YsT0FBZ0IsRUFDaEIsSUFBa0IsRUFDbEIsU0FBb0IsRUFDcEIsS0FBNEI7UUFMdEMsaUJBWUM7UUFYUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsVUFBSyxHQUFMLEtBQUssQ0FBdUI7UUFFcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDeEQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCwyQkFBSyxHQUFMLFVBQU0sV0FBVztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsV0FBVztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELG9DQUFjLEdBQWQsVUFBZSxXQUFXLEVBQUUsV0FBVztRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlELENBQUM7SUFHRCx3Q0FBa0IsR0FBbEIsVUFBbUIsSUFBUztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHdDQUFrQixHQUFsQixVQUFtQixJQUFTLEVBQUUsVUFBVTtRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFHRCxxQ0FBZSxHQUFmLFVBQWdCLFVBQWtCO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFDNUI7WUFDRSxVQUFVLEVBQUUsVUFBVTtTQUN2QixDQUNGLENBQUM7SUFDSixDQUFDO0lBeERVLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FHSyxXQUFJO1lBQ0QsYUFBTztZQUNWLGtCQUFZO1lBQ1AsZUFBUztZQUNiLGFBQUs7T0FOWCxXQUFXLENBMER2QjtJQUFELGtCQUFDO0NBQUEsQUExREQsSUEwREM7QUExRFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8vU0RLICYgQVBJXHJcbmltcG9ydCB7XHJcbiAgVXNlckFwaSxcclxuICBMb29wQmFja0F1dGgsXHJcbiAgR3Vlc3RzQXBpXHJcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zZGtcIjtcclxuXHJcbi8vUmVkdXggJiBSeEpTXHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcclxuXHJcbi8vU2VydmljZXNcclxudmFyIGZldGNoTW9kdWxlID0gcmVxdWlyZShcImZldGNoXCIpO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cCxcclxuICAgIHByaXZhdGUgdXNlckFwaTogVXNlckFwaSxcclxuICAgIHByaXZhdGUgYXV0aDogTG9vcEJhY2tBdXRoLFxyXG4gICAgcHJpdmF0ZSBndWVzdHNBcGk6IEd1ZXN0c0FwaSxcclxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPlxyXG4gICkge1xyXG4gICAgdGhpcy5zdG9yZS5zZWxlY3QoZnJvbVJvb3QuZ2V0TGFzdEFjdGlvbikuc3Vic2NyaWJlKGFjdGlvbiA9PiB7XHJcbiAgICAgIGlmIChhY3Rpb24gPT0gXCJsb2dvdXRcIikge1xyXG4gICAgICAgIHRoaXMubG9nb3V0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmF1dGguZ2V0Q3VycmVudFVzZXJEYXRhKCk7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VySWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdXRoLmdldEN1cnJlbnRVc2VySWQoKTtcclxuICB9XHJcblxyXG4gIGxvZ2luKGNyZWRlbnRpYWxzKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyQXBpLmxvZ2luKGNyZWRlbnRpYWxzKTtcclxuICB9XHJcblxyXG4gIGxvZ291dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJBcGkubG9nb3V0KCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlcihjcmVkZW50aWFscykge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlckFwaS5jcmVhdGUoY3JlZGVudGlhbHMpO1xyXG4gIH1cclxuICBjaGFuZ2VQYXNzd29yZChvbGRwYXNzd29yZCwgbmV3cGFzc3dvcmQpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJBcGkuY2hhbmdlUGFzc3dvcmQob2xkcGFzc3dvcmQsIG5ld3Bhc3N3b3JkKVxyXG4gIH1cclxuXHJcblxyXG4gIGNyZWF0ZUd1ZXN0UHJvZmlsZShkYXRhOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmd1ZXN0c0FwaS5jcmVhdGUoZGF0YSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHdWVzdFByb2ZpbGUoZGF0YTogYW55LCBwcm9maWxlX2lkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ndWVzdHNBcGkucGF0Y2hBdHRyaWJ1dGVzKHByb2ZpbGVfaWQsIGRhdGEpO1xyXG4gIH1cclxuXHJcblxyXG4gIHNldEd1ZXN0UHJvZmlsZShwcm9maWxlX2lkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJBcGkudXBkYXRlQnlJZEFjY2Vzc1Rva2VucyhcclxuICAgICAgdGhpcy5hdXRoLmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgdGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuSWQoKSxcclxuICAgICAge1xyXG4gICAgICAgIHByb2ZpbGVfaWQ6IHByb2ZpbGVfaWRcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbiAgXHJcbn1cclxuIl19