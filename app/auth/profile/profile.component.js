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
    ProfileComponent.prototype.backToProfil = function () {
        this.routerExtensions.navigate(["/profil"], {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRjtBQUVqRixJQUFJO0FBQ0oseUVBQTBGO0FBQzFGLDhEQUE0RTtBQUc1RSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV2RCxtRUFBNkU7QUFFN0UsY0FBYztBQUNkLHFDQUFvQztBQUNwQyxrREFBb0Q7QUFDcEQsOERBQWdFO0FBR2hFLFVBQVU7QUFDViwrREFBNkQ7QUFDN0QsdURBQXFEO0FBV3JELFFBQVE7QUFDUixzREFBK0Q7QUFTL0Q7SUFtQ0UsMEJBQ1UsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLEtBQTRCLEVBQzVCLElBQVk7UUFKWixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBbkN0QixTQUFJLEdBQVcsT0FBTyxDQUFDO1FBR3ZCLG1CQUFjLEdBQUcsb0NBQW9DLENBQUM7UUFDdEQsNEJBQXVCLEdBQUcsc0NBQXNDLENBQUM7UUFDakUsNkJBQXdCLEdBQUcseUNBQXlDLENBQUM7UUFpQ3BFLGdEQUFnRDtRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNELFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsZUFBZSxF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VyxDQUFDO2tDQUFlLGlCQUFVOzBEQUFDO0lBQzFCO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFjLGlCQUFVO3lEQUFDO0lBQzVCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFVLGlCQUFVO3FEQUFDO0lBQ2xCO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFZLGlCQUFVO3VEQUFDO0lBaEJoQyxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3RDLENBQUM7eUNBcUMyQixrQ0FBZTtZQUNkLHlCQUFnQjtZQUNyQiwwQkFBVztZQUNqQixhQUFLO1lBQ04sYUFBTTtPQXhDWCxnQkFBZ0IsQ0F5UjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXpSRCxJQXlSQztBQXpSWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBOZ1pvbmUsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuLy9VaVxyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGRcIjtcclxubGV0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XHJcblxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0LCBUTlNGYW5jeUFsZXJ0QnV0dG9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcblxyXG4vL1JlZHV4ICYgUnhKU1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBmcm9tUm9vdCBmcm9tIFwiLi8uLi8uLi9zaGFyZWQvcmVkdWNlcnNcIjtcclxuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uLy4uL3NoYXJlZC9hY3Rpb25zL2FwcC5hY3Rpb25zXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuXHJcbi8vU2VydmljZXNcclxuaW1wb3J0IHsgVmFsaWRhdGVTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC92YWxpZGF0ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9hdXRoLnNlcnZpY2VcIjtcclxuXHJcbi8vUGxhdGZvcm1cclxuaW1wb3J0IHtcclxuICBnZXRCb29sZWFuLFxyXG4gIHNldEJvb2xlYW4sXHJcbiAgZ2V0U3RyaW5nLFxyXG4gIHNldFN0cmluZyxcclxuICByZW1vdmVcclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbi8vUm91dGVyXHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwicHJvZmlsZS1hdXRoXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL3Byb2ZpbGUuY29tcG9uZW50Lmh0bWxcIixcclxuIHN0eWxlVXJsczogW1wiLi9wcm9maWxlLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XHJcbiAgaW5wdXQ6IGFueTtcclxuICBtb2RlOiBzdHJpbmcgPSBcInBob25lXCI7XHJcbiAgX3Bob25lOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBjdXJyZW50VXNlcjogYW55O1xyXG4gIFVQREFURV9TVUNDRVNTID0gXCJNaXNlIMOgIGpvdXIgZWZmZWN0dcOpZSBhdmVjIHN1Y2PDqHMuXCI7XHJcbiAgVVBEQVRFX1NVQ0NFU1NfUEFTU1dPUkQgPSBcIlZvdHJlIG1vdCBkZSBwYXNzZSBhIMOpdMOpIG1pcyDDoCBqb3VyLlwiO1xyXG4gIElOVkFMSURfQ1VSUkVOVF9QQVNTV09SRCA9IFwiVm90cmUgbW90IGRlIHBhc3NlIGFjdHVlbCBlc3QgaW52YWxpZGUuXCI7XHJcbiAgQFZpZXdDaGlsZChcIm5ld3Bhc3N3b3JkXCIpIG5ld3Bhc3N3b3JkUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJjb25maXJtbmV3cGFzc3dvcmRcIikgY29uZmlybW5ld3Bhc3N3b3JkUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJmaXJzdE5hbWVcIikgZmlyc3ROYW1lUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJsYXN0TmFtZVwiKSBsYXN0TmFtZVJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwic2l6ZVwiKSBzaXplUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJ3ZWlnaHRcIikgd2VpZ2h0UmVmOiBFbGVtZW50UmVmO1xyXG4gIHByaXZhdGUgZ2V0IGZpcnN0TmFtZUVsKCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5maXJzdE5hbWVSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgbGFzdE5hbWVFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdE5hbWVSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgc2l6ZUVsKCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5zaXplUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHdlaWdodEVsKCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy53ZWlnaHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgbmV3cGFzc3dvcmRFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMubmV3cGFzc3dvcmRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgY29uZmlybW5ld3Bhc3N3b3JkRWwoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpcm1uZXdwYXNzd29yZFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmFsaWRhdGVTZXJ2aWNlOiBWYWxpZGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPixcclxuICAgIHByaXZhdGUgem9uZTogTmdab25lXHJcbiAgKSB7XHJcblxyXG4gICAvLyB0aGlzLl9waG9uZSA9IGdldFN0cmluZyhcInBob25lTnVtYmVyXCIsIG51bGwpO1xyXG4gICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgZW1haWw6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgcGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgbmV3cGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybXBhc3N3b3JkOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGZpcnN0bmFtZToge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBsYXN0bmFtZToge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBzaXplOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHdlaWdodDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gIFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG4gICAgdGhpcy5zdG9yZS5zZWxlY3QoZnJvbVJvb3QuZ2V0VXNlcikuc3Vic2NyaWJlKCh1c2VyOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5jdXJyZW50VXNlciA9IHVzZXI7XHJcbiAgICAgIHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUgPSB0aGlzLmN1cnJlbnRVc2VyLm5hbWU7XHJcbiAgICAgIHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlID0gdGhpcy5jdXJyZW50VXNlci5sYXN0bmFtZTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvbG9naW4oKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiYXV0aFwiLCBcImxvZ2luXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlXCJcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQYXNzd29yZCgpIHtcclxuICAgIGlmICghdGhpcy5wYXNzd29yZEZvcm1WYWxpZGUoKSlcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNob3dMb2FkaW5nQWN0aW9uKCkpO1xyXG5cclxuICAgIHRoaXMuYXV0aFNlcnZpY2UuY2hhbmdlUGFzc3dvcmQodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSwgdGhpcy5pbnB1dC5uZXdwYXNzd29yZC52YWx1ZSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICAgIC8vIGxlZ2FjeSBtb2RlXHJcbiAgICAgIGxldCBpbnZhbGlkUGFzc3dvcmQgPSBKU09OLnN0cmluZ2lmeShlcnJvcikuaW5kZXhPZihcIkludmFsaWQgY3VycmVudCBwYXNzd29yZFwiKSAhPT0gLTE7XHJcbiAgICAgIGlmIChpbnZhbGlkUGFzc3dvcmQpIHtcclxuICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcclxuICAgICAgICAgIFwiRXJyZXVyIVwiLFxyXG4gICAgICAgICAgdGhpcy5JTlZBTElEX0NVUlJFTlRfUEFTU1dPUkRcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd1N1Y2Nlc3MoXHJcbiAgICAgICAgICBcIlN1Y2Nlc3MhXCIsXHJcbiAgICAgICAgICB0aGlzLlVQREFURV9TVUNDRVNTX1BBU1NXT1JEXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlID0gXCJcIjtcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlID0gXCJcIjtcclxuICAgICAgdGhpcy5pbnB1dC5uZXdwYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByb2ZpbGUoKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1WYWxpZGF0ZSgpKTtcclxuICAgIGlmICh0aGlzLmZvcm1WYWxpZGF0ZSgpKSB7XHJcbiAgICAgIGxldCBjcmVkcztcclxuICAgICAgXHJcbiAgICAgICAgY3JlZHMgPSB7XHJcbiAgICAgICAgICBlbWFpbDogdGhpcy5pbnB1dC5lbWFpbC52YWx1ZSxcclxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICBcclxuICAgICAgICBcclxuICAgICAgXHJcblxyXG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uU2hvd0xvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICAgIGxldCBndWVzdFByb2ZpbGU6IGFueTtcclxuICAgICAgZ3Vlc3RQcm9maWxlID0ge1xyXG4gICAgICAgIG5hbWU6IHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgIGxhc3RuYW1lOiB0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgIHdlaWdodDogdGhpcy5pbnB1dC53ZWlnaHQudmFsdWUsXHJcbiAgICAgICAgc2l6ZTogdGhpcy5pbnB1dC5zaXplLnZhbHVlLFxyXG4gICAgICB9O1xyXG4gICAgIFxyXG4gICAgICAgIGd1ZXN0UHJvZmlsZS5lbWFpbCA9IHRoaXMuaW5wdXQuZW1haWwudmFsdWU7XHJcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2VcclxuICAgICAgICAudXBkYXRlR3Vlc3RQcm9maWxlKGd1ZXN0UHJvZmlsZSwgdGhpcy5jdXJyZW50VXNlci5pZClcclxuICAgICAgICAuc3Vic2NyaWJlKGFjY291bnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAgICAgbGV0IF9hY2NvdW50ID0gSlNPTi5zdHJpbmdpZnkoYWNjb3VudCk7XHJcbiAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFxyXG4gICAgICAgICAgICBcIlN1Y2Nlc3MhXCIsXHJcbiAgICAgICAgICAgIHRoaXMuVVBEQVRFX1NVQ0NFU1NcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBwYXNzd29yZEZvcm1WYWxpZGUoKSB7XHJcbiAgICBsZXQgZm9ybUlzVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQubmV3cGFzc3dvcmQudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5uZXdwYXNzd29yZC52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5uZXdwYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5uZXdwYXNzd29yZC5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUsIDI1KSAmJlxyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSA9PSB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybUlzVmFsaWRlO1xyXG4gIH1cclxuICBwcml2YXRlIGZvcm1WYWxpZGF0ZSgpIHtcclxuICAgIGxldCBmb3JtSXNWYWxpZGUgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbWFpbCh0aGlzLmlucHV0LmVtYWlsLnZhbHVlKSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmlucHV0LmVtYWlsLmVycm9yID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgXHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5maXJzdG5hbWUuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZmlyc3RuYW1lLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuc2l6ZS52YWx1ZSkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuaW5wdXQuc2l6ZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5zaXplLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC53ZWlnaHQudmFsdWUpKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmlucHV0LndlaWdodC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC53ZWlnaHQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtSXNWYWxpZGU7XHJcbiAgfVxyXG4gIHB1YmxpYyBiYWNrVG9Qcm9maWwoKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Byb2ZpbFwiXSwge1xyXG4gICAgICAgLy8gY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgfSk7XHJcbn1cclxuICBuZXh0SW5wdXQoaW5wdXQpIHtcclxuICAgIHN3aXRjaCAoaW5wdXQpIHtcclxuICAgICAgY2FzZSAnbmV3cGFzc3dvcmQnOlxyXG4gICAgICAgIHRoaXMubmV3cGFzc3dvcmRFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjb25maXJtbmV3cGFzc3dvcmQnOlxyXG4gICAgICAgIHRoaXMuY29uZmlybW5ld3Bhc3N3b3JkRWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZmlyc3ROYW1lJzpcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZUVsLmZvY3VzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xhc3ROYW1lJzpcclxuICAgICAgICB0aGlzLmxhc3ROYW1lRWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzaXplJzpcclxuICAgICAgICB0aGlzLnNpemVFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3dlaWdodCc6XHJcbiAgICAgICAgdGhpcy53ZWlnaHRFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=