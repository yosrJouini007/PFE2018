"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidateService = (function () {
    function ValidateService() {
        this.numberRegx = /^(([0-9]*[.])?[0-9])$/;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0M7SUFFSTtRQURRLGVBQVUsR0FBRyx1QkFBdUIsQ0FBQztJQUM3QixDQUFDO0lBRWpCLGtDQUFRLEdBQVIsVUFBUyxHQUFHO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFDRCxpQ0FBTyxHQUFQLFVBQVEsS0FBSztRQUNULE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUE7SUFDckMsQ0FBQztJQUNELG1DQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUcsTUFBTTtRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQTtJQUNoRCxDQUFDO0lBRUQsbUNBQVMsR0FBVCxVQUFVLEtBQUssRUFBRyxNQUFNO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFBO0lBQ2hELENBQUM7SUFoQlEsZUFBZTtRQUQzQixpQkFBVSxFQUFFOztPQUNBLGVBQWUsQ0FrQjNCO0lBQUQsc0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztBQWxCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRlU2VydmljZSB7XHJcbiAgICBwcml2YXRlIG51bWJlclJlZ3ggPSAvXigoWzAtOV0qWy5dKT9bMC05XSkkLztcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgaXNOdW1iZXIobnVtKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtYmVyUmVneC50ZXN0KG51bSlcclxuICAgIH1cclxuICAgIGlzRW1wdHkoaW5wdXQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gXCJcIiA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgbWluTGVuZ3RoKGlucHV0ICwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0Lmxlbmd0aCA+PSBudW1iZXIgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBtYXhMZW5ndGgoaW5wdXQgLCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQubGVuZ3RoIDw9IG51bWJlciA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxufSJdfQ==