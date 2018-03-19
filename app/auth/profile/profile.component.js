"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//Ui
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var frameModule = require("tns-core-modules/ui/frame");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
//Redux & RxJS
var store_1 = require("@ngrx/store");
var fromRoot = require("./../../shared/reducers");
var appAction = require("./../../shared/actions/app.actions");
//Services
var validate_service_1 = require("../shared/validate.service");
var auth_service_1 = require("../shared/auth.service");
//Router
var router_1 = require("nativescript-angular/router");
var ProfileComponent = (function () {
    function ProfileComponent(validateService, routerExtensions, authService, store, zone) {
        this.validateService = validateService;
        this.routerExtensions = routerExtensions;
        this.authService = authService;
        this.store = store;
        this.zone = zone;
        this.mode = "phone";
        this.UPDATE_SUCCESS = "Mise à jour effectuée avec succès.";
        this.UPDATE_SUCCESS_PASSWORD = "Votre mot de passe a été mis à jour.";
        this.INVALID_CURRENT_PASSWORD = "Votre mot de passe actuel est invalide.";
        // this._phone = getString("phoneNumber", null);
        this.input = {
            email: {
                value: "",
                error: false
            },
            password: {
                value: "",
                error: false
            },
            newpassword: {
                value: "",
                error: false
            },
            confirmpassword: {
                value: "",
                error: false
            },
            firstname: {
                value: "",
                error: false
            },
            lastname: {
                value: "",
                error: false
            },
            size: {
                value: "",
                error: false
            },
            weight: {
                value: "",
                error: false
            },
        };
    }
    Object.defineProperty(ProfileComponent.prototype, "firstNameEl", {
        get: function () {
            return this.firstNameRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "lastNameEl", {
        get: function () {
            return this.lastNameRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "sizeEl", {
        get: function () {
            return this.sizeRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "weightEl", {
        get: function () {
            return this.weightRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "newpasswordEl", {
        get: function () {
            return this.newpasswordRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "confirmnewpasswordEl", {
        get: function () {
            return this.confirmnewpasswordRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        this.store.select(fromRoot.getUser).subscribe(function (user) {
            _this.currentUser = user;
            _this.input.lastname.value = _this.currentUser.name;
            _this.input.firstname.value = _this.currentUser.lastname;
        });
    };
    ProfileComponent.prototype.navigateTologin = function () {
        this.routerExtensions.navigate(["auth", "login"], {
            transition: {
                name: "slide"
            }
        });
    };
    Object.defineProperty(ProfileComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    ProfileComponent.prototype.updatePassword = function () {
        var _this = this;
        if (!this.passwordFormValide())
            return false;
        this.store.dispatch(new appAction.ShowLoadingAction());
        this.authService.changePassword(this.input.password.value, this.input.newpassword.value).subscribe(function () {
            _this.store.dispatch(new appAction.HideLoadingAction());
        }, function (error) {
            _this.store.dispatch(new appAction.HideLoadingAction());
            // legacy mode
            var invalidPassword = JSON.stringify(error).indexOf("Invalid current password") !== -1;
            if (invalidPassword) {
                nativescript_fancyalert_1.TNSFancyAlert.showError("Erreur!", _this.INVALID_CURRENT_PASSWORD);
            }
            else {
                nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", _this.UPDATE_SUCCESS_PASSWORD);
            }
            _this.input.password.value = "";
            _this.input.password.error = false;
            _this.input.newpassword.value = "";
            _this.input.newpassword.error = false;
            _this.input.confirmpassword.value = "";
            _this.input.confirmpassword.error = false;
        });
    };
    ProfileComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    ProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        console.log(this.formValidate());
        if (this.formValidate()) {
            var creds = void 0;
            creds = {
                email: this.input.email.value,
                password: this.input.password.value
            };
            this.store.dispatch(new appAction.ShowLoadingAction());
            var guestProfile = void 0;
            guestProfile = {
                name: this.input.firstname.value,
                lastname: this.input.lastname.value,
                weight: this.input.weight.value,
                size: this.input.size.value,
            };
            guestProfile.email = this.input.email.value;
            this.authService
                .updateGuestProfile(guestProfile, this.currentUser.id)
                .subscribe(function (account) {
                _this.store.dispatch(new appAction.HideLoadingAction());
                var _account = JSON.stringify(account);
                nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", _this.UPDATE_SUCCESS);
            }, function (error) {
                _this.store.dispatch(new appAction.HideLoadingAction());
                console.log(JSON.stringify(error));
            });
        }
    };
    ProfileComponent.prototype.passwordFormValide = function () {
        var formIsValide = true;
        if (!this.validateService.isEmpty(this.input.password.value) &&
            this.validateService.minLength(this.input.password.value, 2) &&
            this.validateService.maxLength(this.input.password.value, 25)) {
            this.input.password.error = false;
        }
        else {
            this.input.password.error = true;
            formIsValide = false;
        }
        if (!this.validateService.isEmpty(this.input.newpassword.value) &&
            this.validateService.minLength(this.input.newpassword.value, 2) &&
            this.validateService.maxLength(this.input.newpassword.value, 25)) {
            this.input.newpassword.error = false;
        }
        else {
            this.input.newpassword.error = true;
            formIsValide = false;
        }
        if (!this.validateService.isEmpty(this.input.confirmpassword.value) &&
            this.validateService.minLength(this.input.confirmpassword.value, 2) &&
            this.validateService.maxLength(this.input.confirmpassword.value, 25) &&
            this.input.confirmpassword.value == this.input.newpassword.value) {
            this.input.confirmpassword.error = false;
        }
        else {
            this.input.confirmpassword.error = true;
            formIsValide = false;
        }
        return formIsValide;
    };
    ProfileComponent.prototype.formValidate = function () {
        var formIsValide = true;
        if (this.validateService.isEmail(this.input.email.value)) {
            this.input.email.error = false;
        }
        else {
            this.input.email.error = true;
        }
        if (!this.validateService.isEmpty(this.input.firstname.value) &&
            this.validateService.minLength(this.input.firstname.value, 2) &&
            this.validateService.maxLength(this.input.firstname.value, 25)) {
            this.input.firstname.error = false;
        }
        else {
            this.input.firstname.error = true;
            formIsValide = false;
        }
        if (!this.validateService.isEmpty(this.input.lastname.value) &&
            this.validateService.minLength(this.input.lastname.value, 2) &&
            this.validateService.maxLength(this.input.lastname.value, 25)) {
            this.input.lastname.error = false;
        }
        else {
            this.input.lastname.error = true;
            formIsValide = false;
        }
        if (!this.validateService.isEmpty(this.input.size.value)) {
            this.input.size.error = false;
        }
        else {
            this.input.size.error = true;
            formIsValide = false;
        }
        if (!this.validateService.isEmpty(this.input.weight.value)) {
            this.input.weight.error = false;
        }
        else {
            this.input.weight.error = true;
            formIsValide = false;
        }
        return formIsValide;
    };
    ProfileComponent.prototype.nextInput = function (input) {
        switch (input) {
            case 'newpassword':
                this.newpasswordEl.focus();
                break;
            case 'confirmnewpassword':
                this.confirmnewpasswordEl.focus();
                break;
            case 'firstName':
                this.firstNameEl.focus();
                break;
            case 'lastName':
                this.lastNameEl.focus();
                break;
            case 'size':
                this.sizeEl.focus();
                break;
            case 'weight':
                this.weightEl.focus();
                break;
        }
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], ProfileComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.ViewChild("newpassword"),
        __metadata("design:type", core_1.ElementRef)
    ], ProfileComponent.prototype, "newpasswordRef", void 0);
    __decorate([
        core_1.ViewChild("confirmnewpassword"),
        __metadata("design:type", core_1.ElementRef)
    ], ProfileComponent.prototype, "confirmnewpasswordRef", void 0);
    __decorate([
        core_1.ViewChild("firstName"),
        __metadata("design:type", core_1.ElementRef)
    ], ProfileComponent.prototype, "firstNameRef", void 0);
    __decorate([
        core_1.ViewChild("lastName"),
        __metadata("design:type", core_1.ElementRef)
    ], ProfileComponent.prototype, "lastNameRef", void 0);
    __decorate([
        core_1.ViewChild("size"),
        __metadata("design:type", core_1.ElementRef)
    ], ProfileComponent.prototype, "sizeRef", void 0);
    __decorate([
        core_1.ViewChild("weight"),
        __metadata("design:type", core_1.ElementRef)
    ], ProfileComponent.prototype, "weightRef", void 0);
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "profile-auth",
            moduleId: module.id,
            templateUrl: "./profile.component.html",
            styleUrls: ["./profile.component.css"]
        }),
        __metadata("design:paramtypes", [validate_service_1.ValidateService,
            router_1.RouterExtensions,
            auth_service_1.AuthService,
            store_1.Store,
            core_1.NgZone])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRjtBQUVqRixJQUFJO0FBQ0oseUVBQTBGO0FBQzFGLDhEQUE0RTtBQUc1RSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV2RCxtRUFBNkU7QUFFN0UsY0FBYztBQUNkLHFDQUFvQztBQUNwQyxrREFBb0Q7QUFDcEQsOERBQWdFO0FBR2hFLFVBQVU7QUFDViwrREFBNkQ7QUFDN0QsdURBQXFEO0FBV3JELFFBQVE7QUFDUixzREFBK0Q7QUFTL0Q7SUFtQ0UsMEJBQ1UsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLEtBQTRCLEVBQzVCLElBQVk7UUFKWixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBbkN0QixTQUFJLEdBQVcsT0FBTyxDQUFDO1FBR3ZCLG1CQUFjLEdBQUcsb0NBQW9DLENBQUM7UUFDdEQsNEJBQXVCLEdBQUcsc0NBQXNDLENBQUM7UUFDakUsNkJBQXdCLEdBQUcseUNBQXlDLENBQUM7UUFpQ3BFLGdEQUFnRDtRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNELFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsZUFBZSxF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QUFNLENBQUM7a0NBQVUsaUJBQVU7cURBQUM7SUFDbEI7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQVksaUJBQVU7dURBQUM7SUFoQmhDLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwwQkFBMEI7WUFDeEMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdEMsQ0FBQzt5Q0FxQzJCLGtDQUFlO1lBQ2QseUJBQWdCO1lBQ3JCLDBCQUFXO1lBQ2pCLGFBQUs7WUFDTixhQUFNO09BeENYLGdCQUFnQixDQW9SNUI7SUFBRCx1QkFBQztDQUFBLEFBcFJELElBb1JDO0FBcFJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIE5nWm9uZSwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG4vL1VpXHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZFwiO1xyXG5sZXQgZnJhbWVNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiKTtcclxuXHJcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQsIFROU0ZhbmN5QWxlcnRCdXR0b24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcclxuXHJcbi8vUmVkdXggJiBSeEpTXHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuLy9TZXJ2aWNlc1xyXG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3ZhbGlkYXRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2F1dGguc2VydmljZVwiO1xyXG5cclxuLy9QbGF0Zm9ybVxyXG5pbXBvcnQge1xyXG4gIGdldEJvb2xlYW4sXHJcbiAgc2V0Qm9vbGVhbixcclxuICBnZXRTdHJpbmcsXHJcbiAgc2V0U3RyaW5nLFxyXG4gIHJlbW92ZVxyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuLy9Sb3V0ZXJcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJwcm9maWxlLWF1dGhcIixcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vcHJvZmlsZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gc3R5bGVVcmxzOiBbXCIuL3Byb2ZpbGUuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuICBpbnB1dDogYW55O1xyXG4gIG1vZGU6IHN0cmluZyA9IFwicGhvbmVcIjtcclxuICBfcGhvbmU6IHN0cmluZztcclxuICBwcml2YXRlIGN1cnJlbnRVc2VyOiBhbnk7XHJcbiAgVVBEQVRFX1NVQ0NFU1MgPSBcIk1pc2Ugw6Agam91ciBlZmZlY3R1w6llIGF2ZWMgc3VjY8Oocy5cIjtcclxuICBVUERBVEVfU1VDQ0VTU19QQVNTV09SRCA9IFwiVm90cmUgbW90IGRlIHBhc3NlIGEgw6l0w6kgbWlzIMOgIGpvdXIuXCI7XHJcbiAgSU5WQUxJRF9DVVJSRU5UX1BBU1NXT1JEID0gXCJWb3RyZSBtb3QgZGUgcGFzc2UgYWN0dWVsIGVzdCBpbnZhbGlkZS5cIjtcclxuICBAVmlld0NoaWxkKFwibmV3cGFzc3dvcmRcIikgbmV3cGFzc3dvcmRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImNvbmZpcm1uZXdwYXNzd29yZFwiKSBjb25maXJtbmV3cGFzc3dvcmRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImZpcnN0TmFtZVwiKSBmaXJzdE5hbWVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImxhc3ROYW1lXCIpIGxhc3ROYW1lUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJzaXplXCIpIHNpemVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndlaWdodFwiKSB3ZWlnaHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgcHJpdmF0ZSBnZXQgZmlyc3ROYW1lRWwoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBsYXN0TmFtZUVsKCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXN0TmFtZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBzaXplRWwoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLnNpemVSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgd2VpZ2h0RWwoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLndlaWdodFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBuZXdwYXNzd29yZEVsKCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5uZXdwYXNzd29yZFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBjb25maXJtbmV3cGFzc3dvcmRFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlybW5ld3Bhc3N3b3JkUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVNlcnZpY2U6IFZhbGlkYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8ZnJvbVJvb3QuU3RhdGU+LFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcclxuICApIHtcclxuXHJcbiAgIC8vIHRoaXMuX3Bob25lID0gZ2V0U3RyaW5nKFwicGhvbmVOdW1iZXJcIiwgbnVsbCk7XHJcbiAgICB0aGlzLmlucHV0ID0ge1xyXG4gICAgICBlbWFpbDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBwYXNzd29yZDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBuZXdwYXNzd29yZDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtcGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgZmlyc3RuYW1lOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGxhc3RuYW1lOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHNpemU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgd2VpZ2h0OiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICB0aGlzLnN0b3JlLnNlbGVjdChmcm9tUm9vdC5nZXRVc2VyKS5zdWJzY3JpYmUoKHVzZXI6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdXNlcjtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSA9IHRoaXMuY3VycmVudFVzZXIubmFtZTtcclxuICAgICAgdGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUgPSB0aGlzLmN1cnJlbnRVc2VyLmxhc3RuYW1lO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG5hdmlnYXRlVG9sb2dpbigpIHtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJhdXRoXCIsIFwibG9naW5cIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVcIlxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhc3N3b3JkKCkge1xyXG4gICAgaWYgKCF0aGlzLnBhc3N3b3JkRm9ybVZhbGlkZSgpKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uU2hvd0xvYWRpbmdBY3Rpb24oKSk7XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5jaGFuZ2VQYXNzd29yZCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgLy8gbGVnYWN5IG1vZGVcclxuICAgICAgbGV0IGludmFsaWRQYXNzd29yZCA9IEpTT04uc3RyaW5naWZ5KGVycm9yKS5pbmRleE9mKFwiSW52YWxpZCBjdXJyZW50IHBhc3N3b3JkXCIpICE9PSAtMTtcclxuICAgICAgaWYgKGludmFsaWRQYXNzd29yZCkge1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFxyXG4gICAgICAgICAgXCJFcnJldXIhXCIsXHJcbiAgICAgICAgICB0aGlzLklOVkFMSURfQ1VSUkVOVF9QQVNTV09SRFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcclxuICAgICAgICAgIFwiU3VjY2VzcyFcIixcclxuICAgICAgICAgIHRoaXMuVVBEQVRFX1NVQ0NFU1NfUEFTU1dPUkRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUgPSBcIlwiO1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaW5wdXQubmV3cGFzc3dvcmQudmFsdWUgPSBcIlwiO1xyXG4gICAgICB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlID0gXCJcIjtcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJvZmlsZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybVZhbGlkYXRlKCkpO1xyXG4gICAgaWYgKHRoaXMuZm9ybVZhbGlkYXRlKCkpIHtcclxuICAgICAgbGV0IGNyZWRzO1xyXG4gICAgICBcclxuICAgICAgICBjcmVkcyA9IHtcclxuICAgICAgICAgIGVtYWlsOiB0aGlzLmlucHV0LmVtYWlsLnZhbHVlLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgIFxyXG4gICAgICAgIFxyXG4gICAgICBcclxuXHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5TaG93TG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgbGV0IGd1ZXN0UHJvZmlsZTogYW55O1xyXG4gICAgICBndWVzdFByb2ZpbGUgPSB7XHJcbiAgICAgICAgbmFtZTogdGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUsXHJcbiAgICAgICAgbGFzdG5hbWU6IHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUsXHJcbiAgICAgICAgd2VpZ2h0OiB0aGlzLmlucHV0LndlaWdodC52YWx1ZSxcclxuICAgICAgICBzaXplOiB0aGlzLmlucHV0LnNpemUudmFsdWUsXHJcbiAgICAgIH07XHJcbiAgICAgXHJcbiAgICAgICAgZ3Vlc3RQcm9maWxlLmVtYWlsID0gdGhpcy5pbnB1dC5lbWFpbC52YWx1ZTtcclxuICAgICAgdGhpcy5hdXRoU2VydmljZVxyXG4gICAgICAgIC51cGRhdGVHdWVzdFByb2ZpbGUoZ3Vlc3RQcm9maWxlLCB0aGlzLmN1cnJlbnRVc2VyLmlkKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoYWNjb3VudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICAgICAgICBsZXQgX2FjY291bnQgPSBKU09OLnN0cmluZ2lmeShhY2NvdW50KTtcclxuICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd1N1Y2Nlc3MoXHJcbiAgICAgICAgICAgIFwiU3VjY2VzcyFcIixcclxuICAgICAgICAgICAgdGhpcy5VUERBVEVfU1VDQ0VTU1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIHBhc3N3b3JkRm9ybVZhbGlkZSgpIHtcclxuICAgIGxldCBmb3JtSXNWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5uZXdwYXNzd29yZC52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQubmV3cGFzc3dvcmQudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSwgMjUpICYmXHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlID09IHRoaXMuaW5wdXQubmV3cGFzc3dvcmQudmFsdWVcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtSXNWYWxpZGU7XHJcbiAgfVxyXG4gIHByaXZhdGUgZm9ybVZhbGlkYXRlKCkge1xyXG4gICAgbGV0IGZvcm1Jc1ZhbGlkZSA9IHRydWU7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtYWlsKHRoaXMuaW5wdXQuZW1haWwudmFsdWUpKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dC5lbWFpbC5lcnJvciA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICBcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LmZpcnN0bmFtZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5maXJzdG5hbWUuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0Lmxhc3RuYW1lLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0Lmxhc3RuYW1lLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5zaXplLnZhbHVlKSlcclxuICAgIHtcclxuICAgICAgdGhpcy5pbnB1dC5zaXplLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LnNpemUuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LndlaWdodC52YWx1ZSkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuaW5wdXQud2VpZ2h0LmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LndlaWdodC5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvcm1Jc1ZhbGlkZTtcclxuICB9XHJcbiAgbmV4dElucHV0KGlucHV0KSB7XHJcbiAgICBzd2l0Y2ggKGlucHV0KSB7XHJcbiAgICAgIGNhc2UgJ25ld3Bhc3N3b3JkJzpcclxuICAgICAgICB0aGlzLm5ld3Bhc3N3b3JkRWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY29uZmlybW5ld3Bhc3N3b3JkJzpcclxuICAgICAgICB0aGlzLmNvbmZpcm1uZXdwYXNzd29yZEVsLmZvY3VzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2ZpcnN0TmFtZSc6XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWVFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsYXN0TmFtZSc6XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZUVsLmZvY3VzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc2l6ZSc6XHJcbiAgICAgICAgdGhpcy5zaXplRWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd3ZWlnaHQnOlxyXG4gICAgICAgIHRoaXMud2VpZ2h0RWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19