"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core_1 = require("@angular/core");
var User_1 = require("../../models/User");
var Gyms_1 = require("../../models/Gyms");
var Container_1 = require("../../models/Container");
var PhoneVerification_1 = require("../../models/PhoneVerification");
var Guests_1 = require("../../models/Guests");
var Sessions_1 = require("../../models/Sessions");
var Tmp_1 = require("../../models/Tmp");
var Card_1 = require("../../models/Card");
var SDKModels = (function () {
    function SDKModels() {
        this.models = {
            User: User_1.User,
            Gyms: Gyms_1.Gyms,
            Container: Container_1.Container,
            PhoneVerification: PhoneVerification_1.PhoneVerification,
            Guests: Guests_1.Guests,
            Sessions: Sessions_1.Sessions,
            Tmp: Tmp_1.Tmp,
            Card: Card_1.Card,
        };
    }
    SDKModels.prototype.get = function (modelName) {
        return this.models[modelName];
    };
    SDKModels.prototype.getAll = function () {
        return this.models;
    };
    SDKModels.prototype.getModelNames = function () {
        return Object.keys(this.models);
    };
    SDKModels = __decorate([
        core_1.Injectable()
    ], SDKModels);
    return SDKModels;
}());
exports.SDKModels = SDKModels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RLTW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RLTW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCLHNDQUEyQztBQUMzQywwQ0FBeUM7QUFDekMsMENBQXlDO0FBQ3pDLG9EQUFtRDtBQUNuRCxvRUFBbUU7QUFDbkUsOENBQTZDO0FBQzdDLGtEQUFpRDtBQUNqRCx3Q0FBdUM7QUFDdkMsMENBQXlDO0FBS3pDO0lBREE7UUFHVSxXQUFNLEdBQVc7WUFDdkIsSUFBSSxFQUFFLFdBQUk7WUFDVixJQUFJLEVBQUUsV0FBSTtZQUNWLFNBQVMsRUFBRSxxQkFBUztZQUNwQixpQkFBaUIsRUFBRSxxQ0FBaUI7WUFDcEMsTUFBTSxFQUFFLGVBQU07WUFDZCxRQUFRLEVBQUUsbUJBQVE7WUFDbEIsR0FBRyxFQUFFLFNBQUc7WUFDUixJQUFJLEVBQUUsV0FBSTtTQUVYLENBQUM7SUFhSixDQUFDO0lBWFEsdUJBQUcsR0FBVixVQUFXLFNBQWlCO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSwwQkFBTSxHQUFiO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVNLGlDQUFhLEdBQXBCO1FBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUF4QlUsU0FBUztRQURyQixpQkFBVSxFQUFFO09BQ0EsU0FBUyxDQXlCckI7SUFBRCxnQkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1VzZXInO1xyXG5pbXBvcnQgeyBHeW1zIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0d5bXMnO1xyXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvQ29udGFpbmVyJztcclxuaW1wb3J0IHsgUGhvbmVWZXJpZmljYXRpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvUGhvbmVWZXJpZmljYXRpb24nO1xyXG5pbXBvcnQgeyBHdWVzdHMgfSBmcm9tICcuLi8uLi9tb2RlbHMvR3Vlc3RzJztcclxuaW1wb3J0IHsgU2Vzc2lvbnMgfSBmcm9tICcuLi8uLi9tb2RlbHMvU2Vzc2lvbnMnO1xyXG5pbXBvcnQgeyBUbXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvVG1wJztcclxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uLy4uL21vZGVscy9DYXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxzIHsgW25hbWU6IHN0cmluZ106IGFueSB9XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTREtNb2RlbHMge1xyXG5cclxuICBwcml2YXRlIG1vZGVsczogTW9kZWxzID0ge1xyXG4gICAgVXNlcjogVXNlcixcclxuICAgIEd5bXM6IEd5bXMsXHJcbiAgICBDb250YWluZXI6IENvbnRhaW5lcixcclxuICAgIFBob25lVmVyaWZpY2F0aW9uOiBQaG9uZVZlcmlmaWNhdGlvbixcclxuICAgIEd1ZXN0czogR3Vlc3RzLFxyXG4gICAgU2Vzc2lvbnM6IFNlc3Npb25zLFxyXG4gICAgVG1wOiBUbXAsXHJcbiAgICBDYXJkOiBDYXJkLFxyXG4gICAgXHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldChtb2RlbE5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5tb2RlbHNbbW9kZWxOYW1lXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRBbGwoKTogTW9kZWxzIHtcclxuICAgIHJldHVybiB0aGlzLm1vZGVscztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWVzKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm1vZGVscyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==