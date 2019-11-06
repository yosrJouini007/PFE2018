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
//Platform
var application_settings_1 = require("application-settings");
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
        this.profileData = JSON.parse(application_settings_1.getString("profile", "{}"));
        this.creds = JSON.parse(application_settings_1.getString("account", "{}"));
        this.input = {
            email: {
                value: this.creds.email,
                error: false
            },
            password: {
                value: this.creds.password,
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
                value: this.profileData.name,
                error: false
            },
            lastname: {
                value: this.profileData.lastname,
                error: false
            },
            size: {
                value: this.profileData.size,
                error: false
            },
            weight: {
                value: this.profileData.weight,
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
            application_settings_1.setString("account", JSON.stringify(creds));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRjtBQUVqRixJQUFJO0FBQ0oseUVBQTBGO0FBQzFGLDhEQUE0RTtBQUc1RSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV2RCxtRUFBNkU7QUFFN0UsY0FBYztBQUNkLHFDQUFvQztBQUNwQyxrREFBb0Q7QUFDcEQsOERBQWdFO0FBR2hFLFVBQVU7QUFDViwrREFBNkQ7QUFDN0QsdURBQXFEO0FBRXJELFVBQVU7QUFDViw2REFNOEI7QUFFOUIsUUFBUTtBQUNSLHNEQUErRDtBQVMvRDtJQXFDRSwwQkFDVSxlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsV0FBd0IsRUFDeEIsS0FBNEIsRUFDNUIsSUFBWTtRQUpaLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLFNBQUksR0FBSixJQUFJLENBQVE7UUFuQ3RCLFNBQUksR0FBVyxPQUFPLENBQUM7UUFHdkIsbUJBQWMsR0FBRyxvQ0FBb0MsQ0FBQztRQUN0RCw0QkFBdUIsR0FBRyxzQ0FBc0MsQ0FBQztRQUNqRSw2QkFBd0IsR0FBRyx5Q0FBeUMsQ0FBQztRQWlDcEUsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztnQkFDdEIsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDUixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUMxQixLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUM1QixLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7Z0JBQ2hDLEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDNUIsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2dCQUM5QixLQUFLLEVBQUUsS0FBSzthQUNiO1NBRUYsQ0FBQztJQUNKLENBQUM7SUFoRUQsc0JBQVkseUNBQVc7YUFBdkI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBWSx3Q0FBVTthQUF0QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUNELHNCQUFZLG9DQUFNO2FBQWxCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVksc0NBQVE7YUFBcEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBWSwyQ0FBYTthQUF6QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUNELHNCQUFZLGtEQUFvQjthQUFoQztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBaURELG1DQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1EQUFzQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVM7WUFDdEQsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2xELEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCwwQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNoRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxzQkFBSSxrREFBb0I7YUFBeEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQseUNBQWMsR0FBZDtRQUFBLGlCQTZCQztRQTVCQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNqRyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNOLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUN2RCxjQUFjO1lBQ2QsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2RixFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNwQix1Q0FBYSxDQUFDLFNBQVMsQ0FDckIsU0FBUyxFQUNULEtBQUksQ0FBQyx3QkFBd0IsQ0FDOUIsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTix1Q0FBYSxDQUFDLFdBQVcsQ0FDdkIsVUFBVSxFQUNWLEtBQUksQ0FBQyx1QkFBdUIsQ0FDN0IsQ0FBQztZQUNKLENBQUM7WUFDRCxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQy9CLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNsQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDdEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCw0Q0FBaUIsR0FBakI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsd0NBQWEsR0FBYjtRQUFBLGlCQXVDQztRQXRDQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxLQUFLLFNBQUEsQ0FBQztZQUVSLEtBQUssR0FBRztnQkFDTixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSztnQkFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUs7YUFDcEMsQ0FBQztZQUtKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUN2RCxnQ0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxZQUFZLFNBQUssQ0FBQztZQUN0QixZQUFZLEdBQUc7Z0JBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUs7Z0JBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLO2dCQUNuQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDL0IsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7YUFDNUIsQ0FBQztZQUVBLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzlDLElBQUksQ0FBQyxXQUFXO2lCQUNiLGtCQUFrQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztpQkFDckQsU0FBUyxDQUFDLFVBQUEsT0FBTztnQkFDaEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2Qyx1Q0FBYSxDQUFDLFdBQVcsQ0FDdkIsVUFBVSxFQUNWLEtBQUksQ0FBQyxjQUFjLENBQ3BCLENBQUM7WUFDSixDQUFDLEVBQUUsVUFBQSxLQUFLO2dCQUNOLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDO0lBQ0gsQ0FBQztJQUNPLDZDQUFrQixHQUExQjtRQUNFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FDRCxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUN4RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQzlELENBQUMsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNwQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUNELENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQzNELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDakUsQ0FBQyxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDcEMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQ0QsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7WUFDL0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUM3RCxDQUFDLENBQUMsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN4QyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDTyx1Q0FBWSxHQUFwQjtRQUNFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FDRCxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQy9ELENBQUMsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUNELENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDOUQsQ0FBQyxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUN6RCxDQUFDO1lBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQzdCLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDM0QsQ0FBQztZQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUMvQixZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDTSx1Q0FBWSxHQUFuQjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUUzQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Msb0NBQVMsR0FBVCxVQUFVLEtBQUs7UUFDYixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxhQUFhO2dCQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMzQixLQUFLLENBQUM7WUFDUixLQUFLLG9CQUFvQjtnQkFDdkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNsQyxLQUFLLENBQUM7WUFDUixLQUFLLFdBQVc7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDekIsS0FBSyxDQUFDO1lBQ1IsS0FBSyxVQUFVO2dCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQztZQUNOLEtBQUssTUFBTTtnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNwQixLQUFLLENBQUM7WUFDTixLQUFLLFFBQVE7Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxDQUFDO1FBQ1YsQ0FBQztJQUNILENBQUM7SUF6Um9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7NkRBQUM7SUFTbkM7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWlCLGlCQUFVOzREQUFDO0lBQ3BCO1FBQWhDLGdCQUFTLENBQUMsb0JBQW9CLENBQUM7a0NBQXdCLGlCQUFVO21FQUFDO0lBQzNDO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFlLGlCQUFVOzBEQUFDO0lBQzFCO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFjLGlCQUFVO3lEQUFDO0lBQzVCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFVLGlCQUFVO3FEQUFDO0lBQ2xCO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFZLGlCQUFVO3VEQUFDO0lBbEJoQyxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3RDLENBQUM7eUNBdUMyQixrQ0FBZTtZQUNkLHlCQUFnQjtZQUNyQiwwQkFBVztZQUNqQixhQUFLO1lBQ04sYUFBTTtPQTFDWCxnQkFBZ0IsQ0E4UjVCO0lBQUQsdUJBQUM7Q0FBQSxBQTlSRCxJQThSQztBQTlSWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBOZ1pvbmUsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuLy9VaVxyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGRcIjtcclxubGV0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XHJcblxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0LCBUTlNGYW5jeUFsZXJ0QnV0dG9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcblxyXG4vL1JlZHV4ICYgUnhKU1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBmcm9tUm9vdCBmcm9tIFwiLi8uLi8uLi9zaGFyZWQvcmVkdWNlcnNcIjtcclxuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uLy4uL3NoYXJlZC9hY3Rpb25zL2FwcC5hY3Rpb25zXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuXHJcbi8vU2VydmljZXNcclxuaW1wb3J0IHsgVmFsaWRhdGVTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC92YWxpZGF0ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9hdXRoLnNlcnZpY2VcIjtcclxuXHJcbi8vUGxhdGZvcm1cclxuaW1wb3J0IHtcclxuICBnZXRCb29sZWFuLFxyXG4gIHNldEJvb2xlYW4sXHJcbiAgZ2V0U3RyaW5nLFxyXG4gIHNldFN0cmluZyxcclxuICByZW1vdmVcclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbi8vUm91dGVyXHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwicHJvZmlsZS1hdXRoXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL3Byb2ZpbGUuY29tcG9uZW50Lmh0bWxcIixcclxuIHN0eWxlVXJsczogW1wiLi9wcm9maWxlLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjcmVkczogYW55O1xyXG4gIHByb2ZpbGVEYXRhOiBhbnk7XHJcbiAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG4gIGlucHV0OiBhbnk7XHJcbiAgbW9kZTogc3RyaW5nID0gXCJwaG9uZVwiO1xyXG4gIF9waG9uZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgY3VycmVudFVzZXI6IGFueTtcclxuICBVUERBVEVfU1VDQ0VTUyA9IFwiTWlzZSDDoCBqb3VyIGVmZmVjdHXDqWUgYXZlYyBzdWNjw6hzLlwiO1xyXG4gIFVQREFURV9TVUNDRVNTX1BBU1NXT1JEID0gXCJWb3RyZSBtb3QgZGUgcGFzc2UgYSDDqXTDqSBtaXMgw6Agam91ci5cIjtcclxuICBJTlZBTElEX0NVUlJFTlRfUEFTU1dPUkQgPSBcIlZvdHJlIG1vdCBkZSBwYXNzZSBhY3R1ZWwgZXN0IGludmFsaWRlLlwiO1xyXG4gIEBWaWV3Q2hpbGQoXCJuZXdwYXNzd29yZFwiKSBuZXdwYXNzd29yZFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiY29uZmlybW5ld3Bhc3N3b3JkXCIpIGNvbmZpcm1uZXdwYXNzd29yZFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZmlyc3ROYW1lXCIpIGZpcnN0TmFtZVJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwibGFzdE5hbWVcIikgbGFzdE5hbWVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInNpemVcIikgc2l6ZVJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwid2VpZ2h0XCIpIHdlaWdodFJlZjogRWxlbWVudFJlZjtcclxuICBwcml2YXRlIGdldCBmaXJzdE5hbWVFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGxhc3ROYW1lRWwoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLmxhc3ROYW1lUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHNpemVFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuc2l6ZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCB3ZWlnaHRFbCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IG5ld3Bhc3N3b3JkRWwoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLm5ld3Bhc3N3b3JkUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGNvbmZpcm1uZXdwYXNzd29yZEVsKCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maXJtbmV3cGFzc3dvcmRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlU2VydmljZTogVmFsaWRhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxmcm9tUm9vdC5TdGF0ZT4sXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxyXG4gICkge1xyXG5cclxuICAgLy8gdGhpcy5fcGhvbmUgPSBnZXRTdHJpbmcoXCJwaG9uZU51bWJlclwiLCBudWxsKTtcclxuICAgdGhpcy5wcm9maWxlRGF0YT1KU09OLnBhcnNlKGdldFN0cmluZyhcInByb2ZpbGVcIiwgXCJ7fVwiKSk7XHJcbiAgIHRoaXMuY3JlZHM9SlNPTi5wYXJzZShnZXRTdHJpbmcoXCJhY2NvdW50XCIsIFwie31cIikpO1xyXG4gICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgZW1haWw6IHtcclxuICAgICAgICB2YWx1ZTp0aGlzLmNyZWRzLmVtYWlsLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBwYXNzd29yZDoge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLmNyZWRzLnBhc3N3b3JkLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBuZXdwYXNzd29yZDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtcGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgZmlyc3RuYW1lOiB7XHJcbiAgICAgICAgdmFsdWU6IHRoaXMucHJvZmlsZURhdGEubmFtZSxcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgbGFzdG5hbWU6IHtcclxuICAgICAgICB2YWx1ZTogdGhpcy5wcm9maWxlRGF0YS5sYXN0bmFtZSxcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgc2l6ZToge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLnByb2ZpbGVEYXRhLnNpemUsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHdlaWdodDoge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLnByb2ZpbGVEYXRhLndlaWdodCxcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICBcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuICAgIHRoaXMuc3RvcmUuc2VsZWN0KGZyb21Sb290LmdldFVzZXIpLnN1YnNjcmliZSgodXNlcjogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuY3VycmVudFVzZXIgPSB1c2VyO1xyXG4gICAgICB0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlID0gdGhpcy5jdXJyZW50VXNlci5uYW1lO1xyXG4gICAgICB0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSA9IHRoaXMuY3VycmVudFVzZXIubGFzdG5hbWU7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUb2xvZ2luKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImF1dGhcIiwgXCJsb2dpblwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZVwiXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGFzc3dvcmQoKSB7XHJcbiAgICBpZiAoIXRoaXMucGFzc3dvcmRGb3JtVmFsaWRlKCkpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5TaG93TG9hZGluZ0FjdGlvbigpKTtcclxuXHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmNoYW5nZVBhc3N3b3JkKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIHRoaXMuaW5wdXQubmV3cGFzc3dvcmQudmFsdWUpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAvLyBsZWdhY3kgbW9kZVxyXG4gICAgICBsZXQgaW52YWxpZFBhc3N3b3JkID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IpLmluZGV4T2YoXCJJbnZhbGlkIGN1cnJlbnQgcGFzc3dvcmRcIikgIT09IC0xO1xyXG4gICAgICBpZiAoaW52YWxpZFBhc3N3b3JkKSB7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXHJcbiAgICAgICAgICBcIkVycmV1ciFcIixcclxuICAgICAgICAgIHRoaXMuSU5WQUxJRF9DVVJSRU5UX1BBU1NXT1JEXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFxyXG4gICAgICAgICAgXCJTdWNjZXNzIVwiLFxyXG4gICAgICAgICAgdGhpcy5VUERBVEVfU1VDQ0VTU19QQVNTV09SRFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgICAgdGhpcy5pbnB1dC5uZXdwYXNzd29yZC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuaW5wdXQubmV3cGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUgPSBcIlwiO1xyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcm9maWxlKCkge1xyXG4gICAgY29uc29sZS5sb2codGhpcy5mb3JtVmFsaWRhdGUoKSk7XHJcbiAgICBpZiAodGhpcy5mb3JtVmFsaWRhdGUoKSkge1xyXG4gICAgICBsZXQgY3JlZHM7XHJcbiAgICAgIFxyXG4gICAgICAgIGNyZWRzID0ge1xyXG4gICAgICAgICAgZW1haWw6IHRoaXMuaW5wdXQuZW1haWwudmFsdWUsXHJcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgIFxyXG5cclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNob3dMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICBzZXRTdHJpbmcoXCJhY2NvdW50XCIsIEpTT04uc3RyaW5naWZ5KGNyZWRzKSk7XHJcbiAgICAgIGxldCBndWVzdFByb2ZpbGU6IGFueTtcclxuICAgICAgZ3Vlc3RQcm9maWxlID0ge1xyXG4gICAgICAgIG5hbWU6IHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgIGxhc3RuYW1lOiB0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgIHdlaWdodDogdGhpcy5pbnB1dC53ZWlnaHQudmFsdWUsXHJcbiAgICAgICAgc2l6ZTogdGhpcy5pbnB1dC5zaXplLnZhbHVlLFxyXG4gICAgICB9O1xyXG4gICAgIFxyXG4gICAgICAgIGd1ZXN0UHJvZmlsZS5lbWFpbCA9IHRoaXMuaW5wdXQuZW1haWwudmFsdWU7XHJcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2VcclxuICAgICAgICAudXBkYXRlR3Vlc3RQcm9maWxlKGd1ZXN0UHJvZmlsZSwgdGhpcy5jdXJyZW50VXNlci5pZClcclxuICAgICAgICAuc3Vic2NyaWJlKGFjY291bnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAgICAgbGV0IF9hY2NvdW50ID0gSlNPTi5zdHJpbmdpZnkoYWNjb3VudCk7XHJcbiAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFxyXG4gICAgICAgICAgICBcIlN1Y2Nlc3MhXCIsXHJcbiAgICAgICAgICAgIHRoaXMuVVBEQVRFX1NVQ0NFU1NcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBwYXNzd29yZEZvcm1WYWxpZGUoKSB7XHJcbiAgICBsZXQgZm9ybUlzVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQubmV3cGFzc3dvcmQudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5uZXdwYXNzd29yZC52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5uZXdwYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5uZXdwYXNzd29yZC5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUsIDI1KSAmJlxyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSA9PSB0aGlzLmlucHV0Lm5ld3Bhc3N3b3JkLnZhbHVlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybUlzVmFsaWRlO1xyXG4gIH1cclxuICBwcml2YXRlIGZvcm1WYWxpZGF0ZSgpIHtcclxuICAgIGxldCBmb3JtSXNWYWxpZGUgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbWFpbCh0aGlzLmlucHV0LmVtYWlsLnZhbHVlKSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmlucHV0LmVtYWlsLmVycm9yID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgXHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5maXJzdG5hbWUuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZmlyc3RuYW1lLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuc2l6ZS52YWx1ZSkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuaW5wdXQuc2l6ZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5zaXplLmVycm9yID0gdHJ1ZTtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC53ZWlnaHQudmFsdWUpKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmlucHV0LndlaWdodC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC53ZWlnaHQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtSXNWYWxpZGU7XHJcbiAgfVxyXG4gIHB1YmxpYyBiYWNrVG9Qcm9maWwoKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Byb2ZpbFwiXSwge1xyXG4gICAgICAgLy8gY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgfSk7XHJcbn1cclxuICBuZXh0SW5wdXQoaW5wdXQpIHtcclxuICAgIHN3aXRjaCAoaW5wdXQpIHtcclxuICAgICAgY2FzZSAnbmV3cGFzc3dvcmQnOlxyXG4gICAgICAgIHRoaXMubmV3cGFzc3dvcmRFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjb25maXJtbmV3cGFzc3dvcmQnOlxyXG4gICAgICAgIHRoaXMuY29uZmlybW5ld3Bhc3N3b3JkRWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZmlyc3ROYW1lJzpcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZUVsLmZvY3VzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xhc3ROYW1lJzpcclxuICAgICAgICB0aGlzLmxhc3ROYW1lRWwuZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzaXplJzpcclxuICAgICAgICB0aGlzLnNpemVFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3dlaWdodCc6XHJcbiAgICAgICAgdGhpcy53ZWlnaHRFbC5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=