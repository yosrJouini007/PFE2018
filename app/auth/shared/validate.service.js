"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidateService = (function () {
    function ValidateService() {
        this.emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    ValidateService.prototype.isEmail = function (email) {
        return this.emailRegx.test(email);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0M7SUFFSTtRQURRLGNBQVMsR0FBRyx3SkFBd0osQ0FBQztJQUM3SixDQUFDO0lBRWpCLGlDQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFDRCxpQ0FBTyxHQUFQLFVBQVEsS0FBSztRQUNULE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUE7SUFDckMsQ0FBQztJQUNELG1DQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUcsTUFBTTtRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQTtJQUNoRCxDQUFDO0lBRUQsbUNBQVMsR0FBVCxVQUFVLEtBQUssRUFBRyxNQUFNO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFBO0lBQ2hELENBQUM7SUFoQlEsZUFBZTtRQUQzQixpQkFBVSxFQUFFOztPQUNBLGVBQWUsQ0FrQjNCO0lBQUQsc0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztBQWxCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRlU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGVtYWlsUmVneCA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBpc0VtYWlsKGVtYWlsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxSZWd4LnRlc3QoZW1haWwpXHJcbiAgICB9XHJcbiAgICBpc0VtcHR5KGlucHV0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IFwiXCIgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuICAgIG1pbkxlbmd0aChpbnB1dCAsIG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbnB1dC5sZW5ndGggPj0gbnVtYmVyID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgbWF4TGVuZ3RoKGlucHV0ICwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0Lmxlbmd0aCA8PSBudW1iZXIgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbn0iXX0=