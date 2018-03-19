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
            if (this.mode == "email") {
                creds = {
                    email: this.input.email.value,
                    password: this.input.password.value
                };
            }
            else {
                creds = {
                    username: this.input.phone.value,
                    password: this.input.password.value
                };
            }
            this.store.dispatch(new appAction.ShowLoadingAction());
            var guestProfile = void 0;
            guestProfile = {
                name: this.input.firstname.value,
                lastname: this.input.lastname.value
            };
            if (this.mode == "email") {
                guestProfile.email = this.input.email.value;
            }
            else {
                guestProfile.phone = this.input.phone.value;
            }
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
        if ((this.mode = "phone")) {
        }
        else {
            if (this.validateService.isEmail(this.input.email.value)) {
                this.input.email.error = false;
            }
            else {
                this.input.email.error = true;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRjtBQUVqRixJQUFJO0FBQ0oseUVBQTBGO0FBQzFGLDhEQUE0RTtBQUc1RSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV2RCxtRUFBNkU7QUFFN0UsY0FBYztBQUNkLHFDQUFvQztBQUNwQyxrREFBb0Q7QUFDcEQsOERBQWdFO0FBR2hFLFVBQVU7QUFDViwrREFBNkQ7QUFDN0QsdURBQXFEO0FBV3JELFFBQVE7QUFDUixzREFBK0Q7QUFTL0Q7SUFtQ0UsMEJBQ1UsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLEtBQTRCLEVBQzVCLElBQVk7UUFKWixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBbkN0QixTQUFJLEdBQVcsT0FBTyxDQUFDO1FBR3ZCLG1CQUFjLEdBQUcsb0NBQW9DLENBQUM7UUFDdEQsNEJBQXVCLEdBQUcsc0NBQXNDLENBQUM7UUFDakUsNkJBQXdCLEdBQUcseUNBQXlDLENBQUM7UUFpQ3BFLGdEQUFnRDtRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNELFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsZUFBZSxF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V0FBVyxFQUFFLDBCQUEwQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN0QyxDQUFDO3lDQXFDMkIsa0NBQWU7WUFDZCx5QkFBZ0I7WUFDckIsMEJBQVc7WUFDakIsYUFBSztZQUNOLGFBQU07T0F4Q1gsZ0JBQWdCLENBK1E1QjtJQUFELHVCQUFDO0NBQUEsQUEvUUQsSUErUUM7QUEvUVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgTmdab25lLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8vVWlcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZC90ZXh0LWZpZWxkXCI7XHJcbmxldCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCIpO1xyXG5cclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5cclxuLy9SZWR1eCAmIFJ4SlNcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgZnJvbVJvb3QgZnJvbSBcIi4vLi4vLi4vc2hhcmVkL3JlZHVjZXJzXCI7XHJcbmltcG9ydCAqIGFzIGFwcEFjdGlvbiBmcm9tIFwiLi8uLi8uLi9zaGFyZWQvYWN0aW9ucy9hcHAuYWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcblxyXG4vL1NlcnZpY2VzXHJcbmltcG9ydCB7IFZhbGlkYXRlU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdmFsaWRhdGUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlXCI7XHJcblxyXG4vL1BsYXRmb3JtXHJcbmltcG9ydCB7XHJcbiAgZ2V0Qm9vbGVhbixcclxuICBzZXRCb29sZWFuLFxyXG4gIGdldFN0cmluZyxcclxuICBzZXRTdHJpbmcsXHJcbiAgcmVtb3ZlXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG4vL1JvdXRlclxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcInByb2ZpbGUtYXV0aFwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9wcm9maWxlLmNvbXBvbmVudC5odG1sXCIsXHJcbiBzdHlsZVVybHM6IFtcIi4vcHJvZmlsZS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG4gIGlucHV0OiBhbnk7XHJcbiAgbW9kZTogc3RyaW5nID0gXCJwaG9uZVwiO1xyXG4gIF9waG9uZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgY3VycmVudFVzZXI6IGFueTtcclxuICBVUERBVEVfU1VDQ0VTUyA9IFwiTWlzZSDDoCBqb3VyIGVmZmVjdHXDqWUgYXZlYyBzdWNjw6hzLlwiO1xyXG4gIFVQREFURV9TVUNDRVNTX1BBU1NXT1JEID0gXCJWb3RyZSBtb3QgZGUgcGFzc2UgYSDDqXTDqSBtaXMgw6Agam91ci5cIjtcclxuICBJTlZBTElEX0NVUlJFTlRfUEFTU1dPUkQgPSBcIlZvdHJlIG1vdCBkZSBwYXNzZSBhY3R1ZWwgZXN0IGludmFsaWRlLlwiO1xyXG4gIEBWaWV3Q2hpbGQoXCJuZXdwYXNzd29yZFwiKSBuZXdwYXNzd29yZFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiY29uZmlybW5ld3Bhc3N3b3JkXCIpIGNvbmZpcm1uZXdwYXNzd29yZFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZmlyc3ROYW1lXCIpIGZpcnN0TmFtZVJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwibGFzdE5hbWVcIikgbGFzdE5hbWVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInNpemVcIikgc2l6ZVJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwid2VpZ2h0XCIpIHdlaWdodFJlZjogRWxlbWVudFJlZjtcclxuICBwcml2YXRlIGdldCBmaXJzdE5hbWVFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGxhc3ROYW1lRWwoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLmxhc3ROYW1lUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHNpemVFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuc2l6ZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCB3ZWlnaHRFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IG5ld3Bhc3N3b3JkRWwoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLm5ld3Bhc3N3b3JkUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGNvbmZpcm1uZXdwYXNzd29yZEVsKCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maXJtbmV3cGFzc3dvcmRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlU2VydmljZTogVmFsaWRhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxmcm9tUm9vdC5TdGF0ZT4sXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxyXG4gICkge1xyXG5cclxuICAgLy8gdGhpcy5fcGhvbmUgPSBnZXRTdHJpbmcoXCJwaG9uZU51bWJlclwiLCBudWxsKTtcclxuICAgIHRoaXMuaW5wdXQgPSB7XHJcbiAgICAgIGVtYWlsOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhc3N3b3JkOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIG5ld3Bhc3N3b3JkOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpcm1wYXNzd29yZDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBmaXJzdG5hbWU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgbGFzdG5hbWU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgc2l6ZToge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICB3ZWlnaHQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAvKiBwaG9uZToge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLl9waG9uZSA/IHRoaXMuX3Bob25lIDogXCIrMzNcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSovXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICB0aGlzLnN0b3JlLnNlbGVjdChmcm9tUm9vdC5nZXRVc2VyKS5zdWJzY3JpYmUoKHVzZXI6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdXNlcjtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSA9IHRoaXMuY3VycmVudFVzZXIubmFtZTtcclxuICAgICAgdGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUgPSB0aGlzLmN1cnJlbnRVc2VyLmxhc3RuYW1lO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG5hdmlnYXRlVG9sb2dpbigpIHtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJhdXRoXCIsIFwibG9naW5cIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVcIlxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhc3N3b3JkKCkge1xyXG4gICAgaWYgKCF0aGlzLnBhc3N3b3JkRm9ybVZhbGlkZSgpKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uU2hvd0xvYWRpbmdBY3Rpb24oKSk7XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5jaGFuZ2VQYXNzd29yZCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgLy8gbGVnYWN5IG1vZGVcclxuICAgICAgbGV0IGludmFsaWRQYXNzd29yZCA9IEpTT04uc3RyaW5naWZ5KGVycm9yKS5pbmRleE9mKFwiSW52YWxpZCBjdXJyZW50IHBhc3N3b3JkXCIpICE9PSAtMTtcclxuICAgICAgaWYgKGludmFsaWRQYXNzd29yZCkge1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFxyXG4gICAgICAgICAgXCJFcnJldXIhXCIsXHJcbiAgICAgICAgICB0aGlzLklOVkFMSURfQ1VSUkVOVF9QQVNTV09SRFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcclxuICAgICAgICAgIFwiU3VjY2VzcyFcIixcclxuICAgICAgICAgIHRoaXMuVVBEQVRFX1NVQ0NFU1NfUEFTU1dPUkRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUgPSBcIlwiO1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaW5wdXQubmV3cGFzc3dvcmQudmFsdWUgPSBcIlwiO1xyXG4gICAgICB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlID0gXCJcIjtcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJvZmlsZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybVZhbGlkYXRlKCkpO1xyXG4gICAgaWYgKHRoaXMuZm9ybVZhbGlkYXRlKCkpIHtcclxuICAgICAgbGV0IGNyZWRzO1xyXG4gICAgICBpZiAodGhpcy5tb2RlID09IFwiZW1haWxcIikge1xyXG4gICAgICAgIGNyZWRzID0ge1xyXG4gICAgICAgICAgZW1haWw6IHRoaXMuaW5wdXQuZW1haWwudmFsdWUsXHJcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3JlZHMgPSB7XHJcbiAgICAgICAgICB1c2VybmFtZTogdGhpcy5pbnB1dC5waG9uZS52YWx1ZSxcclxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNob3dMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICBsZXQgZ3Vlc3RQcm9maWxlOiBhbnk7XHJcbiAgICAgIGd1ZXN0UHJvZmlsZSA9IHtcclxuICAgICAgICBuYW1lOiB0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSxcclxuICAgICAgICBsYXN0bmFtZTogdGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5tb2RlID09IFwiZW1haWxcIikge1xyXG4gICAgICAgIGd1ZXN0UHJvZmlsZS5lbWFpbCA9IHRoaXMuaW5wdXQuZW1haWwudmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ3Vlc3RQcm9maWxlLnBob25lID0gdGhpcy5pbnB1dC5waG9uZS52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlXHJcbiAgICAgICAgLnVwZGF0ZUd1ZXN0UHJvZmlsZShndWVzdFByb2ZpbGUsIHRoaXMuY3VycmVudFVzZXIuaWQpXHJcbiAgICAgICAgLnN1YnNjcmliZShhY2NvdW50ID0+IHtcclxuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgICAgIGxldCBfYWNjb3VudCA9IEpTT04uc3RyaW5naWZ5KGFjY291bnQpO1xyXG4gICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcclxuICAgICAgICAgICAgXCJTdWNjZXNzIVwiLFxyXG4gICAgICAgICAgICB0aGlzLlVQREFURV9TVUNDRVNTXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgcGFzc3dvcmRGb3JtVmFsaWRlKCkge1xyXG4gICAgbGV0IGZvcm1Jc1ZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5uZXdwYXNzd29yZC52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQubmV3cGFzc3dvcmQudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQubmV3cGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQubmV3cGFzc3dvcmQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlLCAyNSkgJiZcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUgPT0gdGhpcy5pbnB1dC5uZXdwYXNzd29yZC52YWx1ZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvcm1Jc1ZhbGlkZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBmb3JtVmFsaWRhdGUoKSB7XHJcbiAgICBsZXQgZm9ybUlzVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICgodGhpcy5tb2RlID0gXCJwaG9uZVwiKSkge1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1haWwodGhpcy5pbnB1dC5lbWFpbC52YWx1ZSkpIHtcclxuICAgICAgICB0aGlzLmlucHV0LmVtYWlsLmVycm9yID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dC5lbWFpbC5lcnJvciA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LmZpcnN0bmFtZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5maXJzdG5hbWUuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0Lmxhc3RuYW1lLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0Lmxhc3RuYW1lLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybUlzVmFsaWRlO1xyXG4gIH1cclxuICBuZXh0SW5wdXQoaW5wdXQpIHtcclxuICAgIHN3aXRjaCAoaW5wdXQpIHtcclxuICAgICAgY2FzZSAnbmV3cGFzc3dvcmQnOlxyXG4gICAgICAgIHRoaXMubmV3cGFzc3dvcmRFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjb25maXJtbmV3cGFzc3dvcmQnOlxyXG4gICAgICAgIHRoaXMuY29uZmlybW5ld3Bhc3N3b3JkRWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZmlyc3ROYW1lJzpcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZUVsLmZvY3VzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xhc3ROYW1lJzpcclxuICAgICAgICB0aGlzLmxhc3ROYW1lRWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzaXplJzpcclxuICAgICAgICB0aGlzLnNpemVFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3dlaWdodCc6XHJcbiAgICAgICAgdGhpcy53ZWlnaHRFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=