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
            application_settings_1.setBoolean("authenticated", true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLFdBQVc7QUFDWCx3Q0FJMEI7QUFFMUIsY0FBYztBQUNkLHFDQUFvQztBQUNwQyxrREFBb0Q7QUFHcEQsVUFBVTtBQUNWLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxzQ0FBOEM7QUFDOUMsbUdBQThHO0FBRzlHO0lBQ0UscUJBQ1UsSUFBVSxFQUNWLE9BQWdCLEVBQ2hCLElBQWtCLEVBQ2xCLFNBQW9CLEVBQ3BCLEtBQTRCO1FBTHRDLGlCQVlDO1FBWFMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBYztRQUNsQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBRXBDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsMkJBQUssR0FBTCxVQUFNLFdBQVc7UUFFZiwwQ0FBMEM7UUFDMUMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQztZQUNILGlDQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXRCLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNYLENBQUM7SUFHSCxDQUFDO0lBR0QsNEJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsV0FBVztRQUNsQiwwQ0FBMEM7UUFDMUMsZ0NBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBRXBELENBQUM7SUFDRCxvQ0FBYyxHQUFkLFVBQWUsV0FBVyxFQUFFLFdBQVc7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBR0Qsd0NBQWtCLEdBQWxCLFVBQW1CLElBQVM7UUFDMUIscUNBQXFDO1FBQ3JDLGdDQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUc3QyxDQUFDO0lBRUQsd0NBQWtCLEdBQWxCLFVBQW1CLElBQVMsRUFBRSxVQUFVO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdELHFDQUFlLEdBQWYsVUFBZ0IsVUFBa0I7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUM1QjtZQUNFLFVBQVUsRUFBRSxVQUFVO1NBQ3ZCLENBQ0YsQ0FBQztJQUNKLENBQUM7SUF6RVUsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUdLLFdBQUk7WUFDRCxhQUFPO1lBQ1Ysa0JBQVk7WUFDUCxlQUFTO1lBQ2IsYUFBSztPQU5YLFdBQVcsQ0EyRXZCO0lBQUQsa0JBQUM7Q0FBQSxBQTNFRCxJQTJFQztBQTNFWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuLy9TREsgJiBBUElcclxuaW1wb3J0IHtcclxuICBVc2VyQXBpLFxyXG4gIExvb3BCYWNrQXV0aCxcclxuICBHdWVzdHNBcGlcclxufSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Nka1wiO1xyXG5cclxuLy9SZWR1eCAmIFJ4SlNcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgZnJvbVJvb3QgZnJvbSBcIi4vLi4vLi4vc2hhcmVkL3JlZHVjZXJzXCI7XHJcbmltcG9ydCAqIGFzIGFwcEFjdGlvbiBmcm9tIFwiLi8uLi8uLi9zaGFyZWQvYWN0aW9ucy9hcHAuYWN0aW9uc1wiO1xyXG5cclxuLy9TZXJ2aWNlc1xyXG52YXIgZmV0Y2hNb2R1bGUgPSByZXF1aXJlKFwiZmV0Y2hcIik7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgc2V0Qm9vbGVhbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHAsXHJcbiAgICBwcml2YXRlIHVzZXJBcGk6IFVzZXJBcGksXHJcbiAgICBwcml2YXRlIGF1dGg6IExvb3BCYWNrQXV0aCxcclxuICAgIHByaXZhdGUgZ3Vlc3RzQXBpOiBHdWVzdHNBcGksXHJcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxmcm9tUm9vdC5TdGF0ZT5cclxuICApIHtcclxuICAgIHRoaXMuc3RvcmUuc2VsZWN0KGZyb21Sb290LmdldExhc3RBY3Rpb24pLnN1YnNjcmliZShhY3Rpb24gPT4ge1xyXG4gICAgICBpZiAoYWN0aW9uID09IFwibG9nb3V0XCIpIHtcclxuICAgICAgICB0aGlzLmxvZ291dCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFVzZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdXRoLmdldEN1cnJlbnRVc2VyRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlcklkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXV0aC5nZXRDdXJyZW50VXNlcklkKCk7XHJcbiAgfVxyXG5cclxuICBsb2dpbihjcmVkZW50aWFscykge1xyXG5cclxuICAgIC8vIHJldHVybiB0aGlzLnVzZXJBcGkubG9naW4oY3JlZGVudGlhbHMpO1xyXG4gICAgbGV0IHVzZXJTdHJpbmcgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcImFjY291bnRcIiwgXCJ7fVwiKSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBzZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgcmV0dXJuICh1c2VyU3RyaW5nKTtcclxuXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiB7fVxyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgbG9nb3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlckFwaS5sb2dvdXQoKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAvL3JldHVybiB0aGlzLnVzZXJBcGkuY3JlYXRlKGNyZWRlbnRpYWxzKTtcclxuICAgIHNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbHMpKTtcclxuXHJcbiAgfVxyXG4gIGNoYW5nZVBhc3N3b3JkKG9sZHBhc3N3b3JkLCBuZXdwYXNzd29yZCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlckFwaS5jaGFuZ2VQYXNzd29yZChvbGRwYXNzd29yZCwgbmV3cGFzc3dvcmQpXHJcbiAgfVxyXG5cclxuXHJcbiAgY3JlYXRlR3Vlc3RQcm9maWxlKGRhdGE6IGFueSkge1xyXG4gICAgLy9yZXR1cm4gdGhpcy5ndWVzdHNBcGkuY3JlYXRlKGRhdGEpO1xyXG4gICAgc2V0U3RyaW5nKFwicHJvZmlsZVwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG5cclxuICB9XHJcblxyXG4gIHVwZGF0ZUd1ZXN0UHJvZmlsZShkYXRhOiBhbnksIHByb2ZpbGVfaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmd1ZXN0c0FwaS5wYXRjaEF0dHJpYnV0ZXMocHJvZmlsZV9pZCwgZGF0YSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgc2V0R3Vlc3RQcm9maWxlKHByb2ZpbGVfaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlckFwaS51cGRhdGVCeUlkQWNjZXNzVG9rZW5zKFxyXG4gICAgICB0aGlzLmF1dGguZ2V0Q3VycmVudFVzZXJJZCgpLFxyXG4gICAgICB0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW5JZCgpLFxyXG4gICAgICB7XHJcbiAgICAgICAgcHJvZmlsZV9pZDogcHJvZmlsZV9pZFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbn1cclxuIl19