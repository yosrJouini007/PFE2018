"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidateService = (function () {
    function ValidateService() {
        this.emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.numberRegx = /^[0-9]+(\.[0-9]{1,2})$/;
    }
    ValidateService.prototype.isEmail = function (email) {
        return this.emailRegx.test(email);
    };
    ValidateService.prototype.isNumber = function (num) {
        return this.numberRegx.test(num);
    };
    ValidateService.prototype.isEmpty = function (input) {
        return input == "" ? true : false;
    };
    ValidateService.prototype.minLength = function (input, number) {
        return input.length >= number ? true : false;
    };
    ValidateService.prototype.maxLength = function (input, number) {
        return input.length <= number ? true : false;
    };
    ValidateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ValidateService);
    return ValidateService;
}());
exports.ValidateService = ValidateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0M7SUFHSTtRQUZRLGNBQVMsR0FBRyx3SkFBd0osQ0FBQztRQUNySyxlQUFVLEdBQUMsd0JBQXdCLENBQUM7SUFDNUIsQ0FBQztJQUVqQixpQ0FBTyxHQUFQLFVBQVEsS0FBSztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBQ0Qsa0NBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVELGlDQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1QsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQTtJQUNyQyxDQUFDO0lBQ0QsbUNBQVMsR0FBVCxVQUFVLEtBQUssRUFBRyxNQUFNO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFBO0lBQ2hELENBQUM7SUFFRCxtQ0FBUyxHQUFULFVBQVUsS0FBSyxFQUFHLE1BQU07UUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUE7SUFDaEQsQ0FBQztJQXJCUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7O09BQ0EsZUFBZSxDQXVCM0I7SUFBRCxzQkFBQztDQUFBLEFBdkJELElBdUJDO0FBdkJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGVTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgZW1haWxSZWd4ID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICBwcml2YXRlIG51bWJlclJlZ3g9L15bMC05XSsoXFwuWzAtOV17MSwyfSkkLztcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgaXNFbWFpbChlbWFpbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlsUmVneC50ZXN0KGVtYWlsKVxyXG4gICAgfVxyXG4gICAgaXNOdW1iZXIobnVtKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtYmVyUmVneC50ZXN0KG51bSlcclxuICAgIH1cclxuICBcclxuICAgIGlzRW1wdHkoaW5wdXQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gXCJcIiA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgbWluTGVuZ3RoKGlucHV0ICwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0Lmxlbmd0aCA+PSBudW1iZXIgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBtYXhMZW5ndGgoaW5wdXQgLCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQubGVuZ3RoIDw9IG51bWJlciA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxufSJdfQ==