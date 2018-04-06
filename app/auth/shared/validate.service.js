"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidateService = (function () {
    function ValidateService() {
        this.emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.numberRegx = /^[0-9]+(\.[0-9]{1,2})$/;
        this.ageRegx = /^([1-9]\d?)?$/;
    }
    ValidateService.prototype.isEmail = function (email) {
        return this.emailRegx.test(email);
    };
    ValidateService.prototype.isNumber = function (num) {
        return this.numberRegx.test(num);
    };
    ValidateService.prototype.isAge = function (age) {
        return this.ageRegx.test(age);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0M7SUFJSTtRQUhRLGNBQVMsR0FBRyx3SkFBd0osQ0FBQztRQUNySyxlQUFVLEdBQUMsd0JBQXdCLENBQUM7UUFDcEMsWUFBTyxHQUFDLGVBQWUsQ0FBQztJQUNoQixDQUFDO0lBRWpCLGlDQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFDRCxrQ0FBUSxHQUFSLFVBQVMsR0FBRztRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBQ0QsK0JBQUssR0FBTCxVQUFNLEdBQUc7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELGlDQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1QsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQTtJQUNyQyxDQUFDO0lBQ0QsbUNBQVMsR0FBVCxVQUFVLEtBQUssRUFBRyxNQUFNO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFBO0lBQ2hELENBQUM7SUFFRCxtQ0FBUyxHQUFULFVBQVUsS0FBSyxFQUFHLE1BQU07UUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUE7SUFDaEQsQ0FBQztJQXpCUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7O09BQ0EsZUFBZSxDQTJCM0I7SUFBRCxzQkFBQztDQUFBLEFBM0JELElBMkJDO0FBM0JZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGVTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgZW1haWxSZWd4ID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICBwcml2YXRlIG51bWJlclJlZ3g9L15bMC05XSsoXFwuWzAtOV17MSwyfSkkLztcclxuICAgIHByaXZhdGUgYWdlUmVneD0vXihbMS05XVxcZD8pPyQvO1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBpc0VtYWlsKGVtYWlsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxSZWd4LnRlc3QoZW1haWwpXHJcbiAgICB9XHJcbiAgICBpc051bWJlcihudW0pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5udW1iZXJSZWd4LnRlc3QobnVtKVxyXG4gICAgfVxyXG4gICAgaXNBZ2UoYWdlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdlUmVneC50ZXN0KGFnZSlcclxuICAgIH1cclxuICBcclxuICAgIGlzRW1wdHkoaW5wdXQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gXCJcIiA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgbWluTGVuZ3RoKGlucHV0ICwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0Lmxlbmd0aCA+PSBudW1iZXIgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBtYXhMZW5ndGgoaW5wdXQgLCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQubGVuZ3RoIDw9IG51bWJlciA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxufSJdfQ==