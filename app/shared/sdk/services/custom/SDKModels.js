"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core_1 = require("@angular/core");
var User_1 = require("../../models/User");
var Container_1 = require("../../models/Container");
var Guests_1 = require("../../models/Guests");
var SDKModels = (function () {
    function SDKModels() {
        this.models = {
            User: User_1.User,
            Container: Container_1.Container,
            Guests: Guests_1.Guests,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RLTW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RLTW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCLHNDQUEyQztBQUMzQywwQ0FBeUM7QUFDekMsb0RBQW1EO0FBQ25ELDhDQUE2QztBQU83QztJQURBO1FBR1UsV0FBTSxHQUFXO1lBQ3ZCLElBQUksRUFBRSxXQUFJO1lBQ1YsU0FBUyxFQUFFLHFCQUFTO1lBQ3BCLE1BQU0sRUFBRSxlQUFNO1NBR2YsQ0FBQztJQWFKLENBQUM7SUFYUSx1QkFBRyxHQUFWLFVBQVcsU0FBaUI7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLDBCQUFNLEdBQWI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0saUNBQWEsR0FBcEI7UUFDRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQXBCVSxTQUFTO1FBRHJCLGlCQUFVLEVBQUU7T0FDQSxTQUFTLENBcUJyQjtJQUFELGdCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvVXNlcic7XHJcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4uLy4uL21vZGVscy9Db250YWluZXInO1xyXG5pbXBvcnQgeyBHdWVzdHMgfSBmcm9tICcuLi8uLi9tb2RlbHMvR3Vlc3RzJztcclxuXHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb2RlbHMgeyBbbmFtZTogc3RyaW5nXTogYW55IH1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNES01vZGVscyB7XHJcblxyXG4gIHByaXZhdGUgbW9kZWxzOiBNb2RlbHMgPSB7XHJcbiAgICBVc2VyOiBVc2VyLFxyXG4gICAgQ29udGFpbmVyOiBDb250YWluZXIsXHJcbiAgICBHdWVzdHM6IEd1ZXN0cyxcclxuICAgXHJcbiAgICBcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0KG1vZGVsTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm1vZGVsc1ttb2RlbE5hbWVdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEFsbCgpOiBNb2RlbHMge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWxzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1vZGVsTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubW9kZWxzKTtcclxuICB9XHJcbn1cclxuIl19