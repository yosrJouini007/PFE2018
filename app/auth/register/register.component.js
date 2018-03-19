"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//Router
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
//Ui
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var frameModule = require("tns-core-modules/ui/frame");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
//Redux & RxJs
var store_1 = require("@ngrx/store");
var appAction = require("./../../shared/actions/app.actions");
//Platform 
var application_settings_1 = require("application-settings");
var platform_1 = require("platform");
//Services
var auth_service_1 = require("../shared/auth.service");
var validate_service_1 = require("../shared/validate.service");
var RegisterComponent = (function () {
    function RegisterComponent(validateService, routerExtensions, authService, route, zone, store) {
        this.validateService = validateService;
        this.routerExtensions = routerExtensions;
        this.authService = authService;
        this.route = route;
        this.zone = zone;
        this.store = store;
        this.EXIST_PHONE_NUMBER = "Adresse mail existe";
        this.USE_AN_OTHER_EMAIL = "Utiliser une autre adresse mail";
        this.showEmailStep = true;
        this.showFirstNameStep = false;
        this.showProfileStep = false;
        this.showTypeStep = false;
        this.showLastNameStep = false;
        this.showPasswordStep = false;
        this.showConfirmPasswordStep = false;
        this.showTextStep = false;
        this.showWelcome = false;
        this.enableOne = true;
        this.enableTwo = true;
        this.enableL = true;
        this.enableG = true;
        this.type = [];
        this.input = {
            email: {
                value: "",
                error: false
            },
            password: {
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
            type: {
                value: "",
            },
        };
    }
    Object.defineProperty(RegisterComponent.prototype, "passwordLayout", {
        get: function () {
            return this.passwordLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "firstNameText", {
        get: function () {
            return this.firstNameTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "emailText", {
        get: function () {
            return this.emailTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "sizeText", {
        get: function () {
            return this.sizeTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "weightText", {
        get: function () {
            return this.weightTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "lastNameText", {
        get: function () {
            return this.lastNameTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "passwordText", {
        get: function () {
            return this.passwordTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "passwordConfirmText", {
        get: function () {
            return this.passwordConfirmTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "confirmPasswordLayout", {
        get: function () {
            return this.confirmPasswordLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "firstNameLayout", {
        get: function () {
            return this.firstNameLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "lastNameLayout", {
        get: function () {
            return this.lastNameLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "welcomeLayout", {
        get: function () {
            return this.welcomeLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "emailLayout", {
        get: function () {
            return this.emailLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "profileLayout", {
        get: function () {
            return this.profileLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "typeLayout", {
        get: function () {
            return this.typeLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "screenWidth", {
        get: function () {
            return platform_1.screen.mainScreen.widthDIPs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "screenHeight", {
        get: function () {
            return platform_1.screen.mainScreen.heightDIPs;
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        this.fadeInEmaillayout();
        //this.nextRegister();
    };
    RegisterComponent.prototype.navigateTologin = function () {
        this.routerExtensions.navigate(["auth", "login"], {
            transition: {
                name: "slide"
            }
        });
    };
    RegisterComponent.prototype.begin = function () {
        this.routerExtensions.navigate(["home-connected"]);
    };
    Object.defineProperty(RegisterComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    RegisterComponent.prototype.fadeInEmaillayout = function () {
        var _this = this;
        return this.emailLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        }).then(function () {
            _this.emailText.focus();
        });
    };
    RegisterComponent.prototype.fadeOutEmaillayout = function () {
        return this.emailLayout
            .animate({
            translate: { x: 0, y: -200 },
            duration: 150,
            opacity: 0
        })
            .then(function () {
        });
    };
    RegisterComponent.prototype.fadeInFirstlayout = function () {
        var _this = this;
        return this.firstNameLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        }).then(function () {
            _this.firstNameText.focus();
        });
    };
    RegisterComponent.prototype.fadeOutFirstlayout = function () {
        return this.firstNameLayout
            .animate({
            translate: { x: 0, y: -200 },
            duration: 150,
            opacity: 0
        })
            .then(function () {
        });
    };
    RegisterComponent.prototype.fadeInLastlayout = function () {
        var _this = this;
        return this.lastNameLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        }).then(function () {
            _this.lastNameText.focus();
        });
    };
    RegisterComponent.prototype.fadeOutLastlayout = function () {
        return this.lastNameLayout
            .animate({
            translate: { x: 0, y: -200 },
            duration: 150,
            opacity: 0
        })
            .then(function () {
        });
    };
    RegisterComponent.prototype.fadeInPasswordlayout = function () {
        var _this = this;
        return this.passwordLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        }).then(function () {
            _this.passwordText.focus();
        });
    };
    RegisterComponent.prototype.fadeOutPasswordlayout = function () {
        var _this = this;
        return this.passwordLayout
            .animate({
            translate: { x: 0, y: -200 },
            duration: 150,
            opacity: 0
        })
            .then(function () {
            _this.passwordConfirmText.focus();
        });
    };
    RegisterComponent.prototype.fadeInConfirmPasswordlayout = function () {
        return this.confirmPasswordLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        });
    };
    RegisterComponent.prototype.fadeOutConfirmPasswordlayout = function () {
        var _this = this;
        return this.confirmPasswordLayout
            .animate({
            translate: { x: 0, y: -200 },
            duration: 150,
            opacity: 0
        })
            .then(function () {
            _this.sizeText.focus();
        });
    };
    RegisterComponent.prototype.fadeInTypelayout = function () {
        return this.typeLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        });
    };
    RegisterComponent.prototype.fadeOutTypelayout = function () {
        return this.typeLayout
            .animate({
            translate: { x: 0, y: -200 },
            duration: 150,
            opacity: 0
        })
            .then(function () {
        });
    };
    RegisterComponent.prototype.fadeInProfilelayout = function () {
        return this.profileLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        });
    };
    RegisterComponent.prototype.fadeOutProfilelayout = function () {
        return this.profileLayout
            .animate({
            translate: { x: 0, y: -200 },
            duration: 150,
            opacity: 0
        })
            .then(function () {
        });
    };
    RegisterComponent.prototype.fadeInWelcomelayout = function () {
        return this.welcomeLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        });
    };
    RegisterComponent.prototype.focus = function () {
        if (this.validateSize()) {
            this.weightText.focus();
        }
    };
    RegisterComponent.prototype.pickOne = function () {
        this.enableOne = false;
        this.enableTwo = true;
        this.enableL = true;
        this.enableG = true;
        this.input.type.value = "type 1";
    };
    RegisterComponent.prototype.pickTwo = function () {
        this.enableTwo = false;
        this.enableOne = true;
        this.enableL = true;
        this.enableG = true;
        this.input.type.value = "type 2";
    };
    RegisterComponent.prototype.pickG = function () {
        this.enableG = false;
        this.enableTwo = true;
        this.enableL = true;
        this.enableOne = true;
        this.input.type.value = "gestationnel";
    };
    RegisterComponent.prototype.pickL = function () {
        this.enableTwo = true;
        this.enableOne = true;
        this.enableG = true;
        this.enableL = false;
        this.input.type.value = "lada";
    };
    RegisterComponent.prototype.nextRegister = function () {
        var _this = this;
        if (!this.showFirstNameStep) {
            if (this.validateEmail()) {
                this.showEmailStep = false;
                this.fadeOutEmaillayout().then(function () {
                });
                this.fadeInFirstlayout().then(function () {
                    _this.showFirstNameStep = true;
                });
            }
        }
        else if (!this.showLastNameStep) {
            if (this.validateFirst()) {
                this.fadeOutFirstlayout().then(function () {
                });
                this.fadeInLastlayout().then(function () {
                    _this.showLastNameStep = true;
                });
            }
        }
        else if (!this.showPasswordStep) {
            if (this.validateLast()) {
                this.fadeOutLastlayout().then(function () {
                });
                this.fadeInPasswordlayout().then(function () {
                    _this.showPasswordStep = true;
                });
            }
        }
        else if (!this.showConfirmPasswordStep) {
            if (this.validatePassword()) {
                this.fadeOutPasswordlayout().then(function () {
                });
                this.fadeInConfirmPasswordlayout().then(function () {
                    _this.showConfirmPasswordStep = true;
                });
            }
        }
        else if (!this.showProfileStep) {
            if (this.validateConfirmPassword()) {
                //this.register();
                this.fadeOutConfirmPasswordlayout().then(function () {
                });
                this.fadeInProfilelayout().then(function () {
                    _this.showProfileStep = true;
                });
            }
        }
        else if (!this.showTypeStep) {
            if (this.validateWeight()) {
                this.fadeOutProfilelayout().then(function () {
                });
                this.fadeInTypelayout().then(function () {
                    _this.showTypeStep = true;
                });
                //this.register();
            }
        }
        else if (!this.showWelcome) {
            this.register();
            this.fadeOutTypelayout().then(function () {
            });
            this.fadeInWelcomelayout().then(function () {
                _this.showWelcome = true;
            });
        }
    };
    RegisterComponent.prototype.navigateToWelcome = function () {
        this.routerExtensions.navigate(["/welcome"], {});
    };
    /*  displayShowWelcome() {
        this.fadeOutTypelayout().then(() => {
        });
        this.fadeInWelcomelayout().then(() => {
          this.showWelcome = true;
        })
      }*/
    RegisterComponent.prototype.register = function () {
        var _this = this;
        if (this.formValidate()) {
            var creds_1;
            creds_1 = {
                email: this.input.email.value,
                password: this.input.password.value
            };
            console.log(JSON.stringify(creds_1));
            this.store.dispatch(new appAction.ShowLoadingAction());
            this.authService.register(creds_1).subscribe(function (user) {
                var guestProfile;
                guestProfile = {
                    name: _this.input.firstname.value,
                    lastname: _this.input.lastname.value,
                    weight: _this.input.weight.value,
                    size: _this.input.size.value,
                    userId: String(user.id),
                };
                // guestProfile.email = this.input.email.value;
                console.log("user", user);
                console.log(JSON.stringify(user));
                _this.authService
                    .createGuestProfile(guestProfile)
                    .subscribe(function (account) {
                    application_settings_1.setString("guest_profile", JSON.stringify(account));
                    console.log(JSON.stringify(account));
                    _this.authService.login(creds_1).subscribe(function (success) {
                        // this.displayShowTextStep()
                        _this.store.dispatch(new appAction.FireAction("login"));
                        nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success", "Inscription effectué");
                    });
                });
                _this.store.dispatch(new appAction.HideLoadingAction());
            }, function (error) {
                error = error.error;
                console.log(JSON.stringify(error));
                _this.store.dispatch(new appAction.HideLoadingAction());
                // if ("email" in error.details.codes) {
                nativescript_fancyalert_1.TNSFancyAlert.showError("Erreur", "Email existe");
                //  console.log(JSON.stringify(error));
            });
        }
    };
    /* initViewFormPasswordExsit() {
       this.fadeOutFirstlayout()
       this.fadeOutEmaillayout()
       this.fadeOutFirstlayout()
       this.fadeOutLastlayout()
       this.fadeOutPasswordlayout()
       this.fadeOutConfirmPasswordlayout()
       this.showEmailStep = true;
       this.showFirstNameStep = false;
       this.showLastNameStep = false;
       this.showPasswordStep = false;
       this.showConfirmPasswordStep = false;
       this.showTextStep = false;
       this.showWelcome = false;
     }*/
    RegisterComponent.prototype.validateEmail = function () {
        var Valide = true;
        if (this.validateService.isEmail(this.input.email.value)) {
            this.input.email.error = false;
        }
        else {
            this.input.email.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.validateSize = function () {
        var Valide = true;
        if (this.validateService.isNumber(this.input.size.value)) {
            this.input.size.error = false;
        }
        else {
            this.input.size.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.validateWeight = function () {
        var Valide = true;
        if (this.validateService.isNumber(this.input.weight.value)) {
            this.input.weight.error = false;
        }
        else {
            this.input.weight.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.validateFirst = function () {
        var Valide = true;
        if (!this.validateService.isEmpty(this.input.firstname.value) &&
            this.validateService.minLength(this.input.firstname.value, 2) &&
            this.validateService.maxLength(this.input.firstname.value, 25)) {
            this.input.firstname.error = false;
        }
        else {
            this.input.firstname.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.validateLast = function () {
        var Valide = true;
        if (!this.validateService.isEmpty(this.input.lastname.value) &&
            this.validateService.minLength(this.input.lastname.value, 2) &&
            this.validateService.maxLength(this.input.lastname.value, 25)) {
            this.input.lastname.error = false;
        }
        else {
            this.input.lastname.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.validatePassword = function () {
        var Valide = true;
        if (!this.validateService.isEmpty(this.input.password.value) &&
            this.validateService.minLength(this.input.password.value, 2) &&
            this.validateService.maxLength(this.input.password.value, 25)) {
            this.input.password.error = false;
        }
        else {
            this.input.password.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.backtoPassword = function () {
        var _this = this;
        this.fadeInPasswordlayout().then(function () {
            _this.showPasswordStep = true;
        });
        this.fadeOutConfirmPasswordlayout();
        this.showConfirmPasswordStep = false;
    };
    RegisterComponent.prototype.validateConfirmPassword = function () {
        var Valide = true;
        if (!this.validateService.isEmpty(this.input.confirmpassword.value) &&
            this.validateService.minLength(this.input.confirmpassword.value, 2) &&
            this.validateService.maxLength(this.input.confirmpassword.value, 25) &&
            this.input.password.value == this.input.confirmpassword.value) {
            this.input.confirmpassword.error = false;
        }
        else {
            this.input.confirmpassword.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.formValidate = function () {
        var formIsValide = true;
        if (!this.validateFirst() && !this.validateLast() && !this.validatePassword() && !this.validateEmail()) {
            formIsValide = false;
        }
        return formIsValide;
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], RegisterComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.ViewChild("firstNameText"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "firstNameTextRef", void 0);
    __decorate([
        core_1.ViewChild("emailText"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "emailTextRef", void 0);
    __decorate([
        core_1.ViewChild("sizeText"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "sizeTextRef", void 0);
    __decorate([
        core_1.ViewChild("weightText"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "weightTextRef", void 0);
    __decorate([
        core_1.ViewChild("lastNameText"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "lastNameTextRef", void 0);
    __decorate([
        core_1.ViewChild("passwordText"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "passwordTextRef", void 0);
    __decorate([
        core_1.ViewChild("passwordConfirmText"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "passwordConfirmTextRef", void 0);
    __decorate([
        core_1.ViewChild("firstNameLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "firstNameLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("lastNameLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "lastNameLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("passwordLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "passwordLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("confirmPasswordLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "confirmPasswordLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("welcomeLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "welcomeLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("emailLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "emailLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("profileLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "profileLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("typeLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "typeLayoutRef", void 0);
    RegisterComponent = __decorate([
        core_1.Component({
            selector: "register-auth",
            moduleId: module.id,
            templateUrl: "./register.component.html",
            styleUrls: ["./register.component.css"]
        }),
        __metadata("design:paramtypes", [validate_service_1.ValidateService,
            router_1.RouterExtensions,
            auth_service_1.AuthService,
            router_2.ActivatedRoute,
            core_1.NgZone,
            store_1.Store])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlGO0FBRWpGLFFBQVE7QUFDUixzREFBK0Q7QUFDL0QsMENBQWlEO0FBR2pELElBQUk7QUFDSixtRUFBNkU7QUFJN0UsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFHdkQseUVBQTBGO0FBQzFGLDhEQUE0RTtBQUc1RSxjQUFjO0FBQ2QscUNBQW9DO0FBRXBDLDhEQUFnRTtBQUdoRSxXQUFXO0FBQ1gsNkRBTzhCO0FBRTlCLHFDQUFrQztBQUVsQyxVQUFVO0FBQ1YsdURBQXFEO0FBQ3JELCtEQUE2RDtBQVM3RDtJQTZGRSwyQkFDVSxlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsV0FBd0IsRUFDeEIsS0FBcUIsRUFDckIsSUFBWSxFQUNaLEtBQTRCO1FBTDVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQXpCdEMsdUJBQWtCLEdBQUcscUJBQXFCLENBQUM7UUFDM0MsdUJBQWtCLEdBQUcsaUNBQWlDLENBQUM7UUFHdkQsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsNEJBQXVCLEdBQVksS0FBSyxDQUFDO1FBQ3pDLGlCQUFZLEdBQVksS0FBSyxD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LENBQUMsMEJBQTBCLENBQUM7U0FDeEMsQ0FBQzt5Q0ErRjJCLGtDQUFlO1lBQ2QseUJBQWdCO1lBQ3JCLDBCQUFXO1lBQ2pCLHVCQUFjO1lBQ2YsYUFBTTtZQUNMLGFBQUs7T0FuR1gsaUJBQWlCLENBaXBCN0I7SUFBRCx3QkFBQztDQUFBLEFBanBCRCxJQWlwQkM7QUFqcEJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG4vL1JvdXRlclxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuLy9VaVxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0LCBUTlNGYW5jeUFsZXJ0QnV0dG9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcbmltcG9ydCB7IFNjcm9sbFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlldy9zY3JvbGwtdmlld1wiO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0L3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBBYnNvbHV0ZUxheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0L2Fic29sdXRlLWxheW91dFwiO1xyXG5sZXQgZnJhbWVNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiKTtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZC90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcblxyXG5cclxuLy9SZWR1eCAmIFJ4SnNcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgZnJvbVJvb3QgZnJvbSBcIi4vLi4vLi4vc2hhcmVkL3JlZHVjZXJzXCI7XHJcbmltcG9ydCAqIGFzIGFwcEFjdGlvbiBmcm9tIFwiLi8uLi8uLi9zaGFyZWQvYWN0aW9ucy9hcHAuYWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcblxyXG4vL1BsYXRmb3JtIFxyXG5pbXBvcnQge1xyXG4gIGdldEJvb2xlYW4sXHJcbiAgc2V0Qm9vbGVhbixcclxuICBnZXRTdHJpbmcsXHJcbiAgc2V0U3RyaW5nLFxyXG4gIHJlbW92ZSxcclxuICBjbGVhclxyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgQXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5cclxuLy9TZXJ2aWNlc1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRlU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdmFsaWRhdGUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwicmVnaXN0ZXItYXV0aFwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9yZWdpc3Rlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi9yZWdpc3Rlci5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZChcImZpcnN0TmFtZVRleHRcIikgZmlyc3ROYW1lVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZW1haWxUZXh0XCIpIGVtYWlsVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwic2l6ZVRleHRcIikgc2l6ZVRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndlaWdodFRleHRcIikgd2VpZ2h0VGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwibGFzdE5hbWVUZXh0XCIpIGxhc3ROYW1lVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicGFzc3dvcmRUZXh0XCIpIHBhc3N3b3JkVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicGFzc3dvcmRDb25maXJtVGV4dFwiKSBwYXNzd29yZENvbmZpcm1UZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJmaXJzdE5hbWVMYXlvdXRcIikgZmlyc3ROYW1lTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJsYXN0TmFtZUxheW91dFwiKSBsYXN0TmFtZUxheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicGFzc3dvcmRMYXlvdXRcIikgcGFzc3dvcmRMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImNvbmZpcm1QYXNzd29yZExheW91dFwiKSBjb25maXJtUGFzc3dvcmRMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndlbGNvbWVMYXlvdXRcIikgd2VsY29tZUxheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZW1haWxMYXlvdXRcIikgZW1haWxMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInByb2ZpbGVMYXlvdXRcIikgcHJvZmlsZUxheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwidHlwZUxheW91dFwiKSB0eXBlTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuICBwcml2YXRlIGdldCBwYXNzd29yZExheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBmaXJzdE5hbWVUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5maXJzdE5hbWVUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGVtYWlsVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHNpemVUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5zaXplVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCB3ZWlnaHRUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy53ZWlnaHRUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGxhc3ROYW1lVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdE5hbWVUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHBhc3N3b3JkVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmRUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHBhc3N3b3JkQ29uZmlybVRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkQ29uZmlybVRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgY29uZmlybVBhc3N3b3JkTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpcm1QYXNzd29yZExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBmaXJzdE5hbWVMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGxhc3ROYW1lTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLmxhc3ROYW1lTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCB3ZWxjb21lTGF5b3V0KCk6IEFic29sdXRlTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLndlbGNvbWVMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgZW1haWxMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgcHJvZmlsZUxheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHR5cGVMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZUxheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBzY3JlZW5XaWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgc2NyZWVuSGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcblxyXG4gIEVYSVNUX1BIT05FX05VTUJFUiA9IFwiQWRyZXNzZSBtYWlsIGV4aXN0ZVwiO1xyXG4gIFVTRV9BTl9PVEhFUl9FTUFJTCA9IFwiVXRpbGlzZXIgdW5lIGF1dHJlIGFkcmVzc2UgbWFpbFwiO1xyXG4gIGlucHV0OiBhbnk7XHJcbiAgY29uZmlnOiBhbnk7XHJcbiAgc2hvd0VtYWlsU3RlcDogYm9vbGVhbiA9IHRydWU7XHJcbiAgc2hvd0ZpcnN0TmFtZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93UHJvZmlsZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93VHlwZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93TGFzdE5hbWVTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1Bhc3N3b3JkU3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dDb25maXJtUGFzc3dvcmRTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1RleHRTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1dlbGNvbWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBlbmFibGVPbmU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGVuYWJsZVR3bzogYm9vbGVhbiA9IHRydWU7XHJcbiAgZW5hYmxlTDogYm9vbGVhbiA9IHRydWU7XHJcbiAgZW5hYmxlRzogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIHR5cGUgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlU2VydmljZTogVmFsaWRhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8ZnJvbVJvb3QuU3RhdGU+XHJcbiAgKSB7XHJcbiAgICB0aGlzLmlucHV0ID0ge1xyXG4gICAgICBlbWFpbDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBwYXNzd29yZDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtcGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgZmlyc3RuYW1lOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGxhc3RuYW1lOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHNpemU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgd2VpZ2h0OiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgfSxcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICB0aGlzLmZhZGVJbkVtYWlsbGF5b3V0KCk7XHJcbiAgICAvL3RoaXMubmV4dFJlZ2lzdGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUb2xvZ2luKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImF1dGhcIiwgXCJsb2dpblwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZVwiXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGJlZ2luKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImhvbWUtY29ubmVjdGVkXCJdKTtcclxuICB9XHJcbiAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICB9XHJcblxyXG4gIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBmYWRlSW5FbWFpbGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVtYWlsTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmVtYWlsVGV4dC5mb2N1cygpO1xyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmFkZU91dEVtYWlsbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluRmlyc3RsYXlvdXQoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZVRleHQuZm9jdXMoKTtcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRGaXJzdGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmYWRlSW5MYXN0bGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdE5hbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubGFzdE5hbWVUZXh0LmZvY3VzKCk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0TGFzdGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxhc3ROYW1lTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZhZGVJblBhc3N3b3JkbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmRMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmRUZXh0LmZvY3VzKCk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0UGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmRDb25maXJtVGV4dC5mb2N1cygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZhZGVJbkNvbmZpcm1QYXNzd29yZGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpcm1QYXNzd29yZExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maXJtUGFzc3dvcmRMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNpemVUZXh0LmZvY3VzKCk7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICBmYWRlSW5UeXBlbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRUeXBlbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZmFkZUluUHJvZmlsZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2ZpbGVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0UHJvZmlsZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2ZpbGVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluV2VsY29tZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLndlbGNvbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pXHJcbiAgfVxyXG4gIGZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGVTaXplKCkpIHtcclxuICAgICAgdGhpcy53ZWlnaHRUZXh0LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHBpY2tPbmUoKSB7XHJcbiAgICB0aGlzLmVuYWJsZU9uZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbmFibGVUd28gPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVMID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlRyA9IHRydWVcclxuICAgIHRoaXMuaW5wdXQudHlwZS52YWx1ZSA9IFwidHlwZSAxXCJcclxuXHJcbiAgfVxyXG4gIHBpY2tUd28oKSB7XHJcbiAgICB0aGlzLmVuYWJsZVR3byA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbmFibGVPbmUgPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVMID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlRyA9IHRydWVcclxuICAgIHRoaXMuaW5wdXQudHlwZS52YWx1ZSA9IFwidHlwZSAyXCJcclxuXHJcbiAgfVxyXG4gIHBpY2tHKCkge1xyXG4gICAgdGhpcy5lbmFibGVHID0gZmFsc2U7XHJcbiAgICB0aGlzLmVuYWJsZVR3byA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZUwgPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVPbmUgPSB0cnVlXHJcbiAgICB0aGlzLmlucHV0LnR5cGUudmFsdWUgPSBcImdlc3RhdGlvbm5lbFwiXHJcblxyXG4gIH1cclxuICBwaWNrTCgpIHtcclxuICAgIHRoaXMuZW5hYmxlVHdvID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlT25lID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlRyA9IHRydWVcclxuICAgIHRoaXMuZW5hYmxlTCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnB1dC50eXBlLnZhbHVlID0gXCJsYWRhXCJcclxuXHJcbiAgfVxyXG4gIG5leHRSZWdpc3RlcigpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuc2hvd0ZpcnN0TmFtZVN0ZXApIHtcclxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVFbWFpbCgpKSB7XHJcbiAgICAgICAgdGhpcy5zaG93RW1haWxTdGVwID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mYWRlT3V0RW1haWxsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZhZGVJbkZpcnN0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dGaXJzdE5hbWVTdGVwID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghdGhpcy5zaG93TGFzdE5hbWVTdGVwKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlRmlyc3QoKSkge1xyXG4gICAgICAgIHRoaXMuZmFkZU91dEZpcnN0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mYWRlSW5MYXN0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dMYXN0TmFtZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIXRoaXMuc2hvd1Bhc3N3b3JkU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUxhc3QoKSkge1xyXG4gICAgICAgIHRoaXMuZmFkZU91dExhc3RsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZhZGVJblBhc3N3b3JkbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZFN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dDb25maXJtUGFzc3dvcmRTdGVwKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKSkge1xyXG4gICAgICAgIHRoaXMuZmFkZU91dFBhc3N3b3JkbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mYWRlSW5Db25maXJtUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2hvd0NvbmZpcm1QYXNzd29yZFN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8qICBlbHNlIGlmICghdGhpcy5zaG93VGV4dFN0ZXApIHtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUNvbmZpcm1QYXNzd29yZCgpKSB7XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgICB0aGlzLmZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5mYWRlSW5UZXh0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RleHRTdGVwID0gdHJ1ZTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9Ki9cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dQcm9maWxlU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUNvbmZpcm1QYXNzd29yZCgpKSB7XHJcbiAgICAgICAgLy90aGlzLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgdGhpcy5mYWRlT3V0Q29uZmlybVBhc3N3b3JkbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mYWRlSW5Qcm9maWxlbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dQcm9maWxlU3RlcCA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIXRoaXMuc2hvd1R5cGVTdGVwKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlV2VpZ2h0KCkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5mYWRlT3V0UHJvZmlsZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluVHlwZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93VHlwZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy90aGlzLnJlZ2lzdGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dXZWxjb21lKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXIoKTtcclxuICAgICAgdGhpcy5mYWRlT3V0VHlwZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5mYWRlSW5XZWxjb21lbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93V2VsY29tZSA9IHRydWU7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvV2VsY29tZSgpIHtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvd2VsY29tZVwiXSwge1xyXG4gICAgICAvKiBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICBuZXdhY2NvdW50OiB0cnVlXHJcbiAgICAgICB9Ki9cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyogIGRpc3BsYXlTaG93V2VsY29tZSgpIHtcclxuICAgICAgdGhpcy5mYWRlT3V0VHlwZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5mYWRlSW5XZWxjb21lbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93V2VsY29tZSA9IHRydWU7XHJcbiAgICAgIH0pXHJcbiAgICB9Ki9cclxuXHJcbiAgcmVnaXN0ZXIoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZm9ybVZhbGlkYXRlKCkpIHtcclxuICAgICAgbGV0IGNyZWRzO1xyXG5cclxuICAgICAgY3JlZHMgPSB7XHJcbiAgICAgICAgZW1haWw6IHRoaXMuaW5wdXQuZW1haWwudmFsdWUsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWVcclxuICAgICAgfTtcclxuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY3JlZHMpKTtcclxuXHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5TaG93TG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWdpc3RlcihjcmVkcykuc3Vic2NyaWJlKFxyXG5cclxuICAgICAgICB1c2VyID0+IHtcclxuICAgICAgICAgIGxldCBndWVzdFByb2ZpbGU6IGFueTtcclxuICAgICAgICAgIGd1ZXN0UHJvZmlsZSA9IHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUsXHJcbiAgICAgICAgICAgIGxhc3RuYW1lOiB0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgICAgICB3ZWlnaHQ6IHRoaXMuaW5wdXQud2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICBzaXplOiB0aGlzLmlucHV0LnNpemUudmFsdWUsXHJcbiAgICAgICAgICAgIHVzZXJJZDogU3RyaW5nKHVzZXIuaWQpLFxyXG4gICAgICAgICAgICAvLyBlbWFpbDogdGhpcy5pbnB1dC5lbWFpbC52YWx1ZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICAvLyBndWVzdFByb2ZpbGUuZW1haWwgPSB0aGlzLmlucHV0LmVtYWlsLnZhbHVlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyXCIsIHVzZXIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICAgICAgdGhpcy5hdXRoU2VydmljZVxyXG4gICAgICAgICAgICAuY3JlYXRlR3Vlc3RQcm9maWxlKGd1ZXN0UHJvZmlsZSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShhY2NvdW50ID0+IHtcclxuICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJndWVzdF9wcm9maWxlXCIsIEpTT04uc3RyaW5naWZ5KGFjY291bnQpKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhY2NvdW50KSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbihjcmVkcykuc3Vic2NyaWJlKHN1Y2Nlc3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5kaXNwbGF5U2hvd1RleHRTdGVwKClcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5GaXJlQWN0aW9uKFwibG9naW5cIikpO1xyXG4gICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcIlN1Y2Nlc3NcIiwgXCJJbnNjcmlwdGlvbiBlZmZlY3R1w6lcIik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgZXJyb3IgPSBlcnJvci5lcnJvclxyXG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuXHJcbiAgICAgICAgICAvLyBpZiAoXCJlbWFpbFwiIGluIGVycm9yLmRldGFpbHMuY29kZXMpIHtcclxuICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyZXVyXCIsIFwiRW1haWwgZXhpc3RlXCIpO1xyXG4gICAgICAgICAgLy8gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKiBpbml0Vmlld0Zvcm1QYXNzd29yZEV4c2l0KCkge1xyXG4gICAgIHRoaXMuZmFkZU91dEZpcnN0bGF5b3V0KClcclxuICAgICB0aGlzLmZhZGVPdXRFbWFpbGxheW91dCgpXHJcbiAgICAgdGhpcy5mYWRlT3V0Rmlyc3RsYXlvdXQoKVxyXG4gICAgIHRoaXMuZmFkZU91dExhc3RsYXlvdXQoKVxyXG4gICAgIHRoaXMuZmFkZU91dFBhc3N3b3JkbGF5b3V0KClcclxuICAgICB0aGlzLmZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKVxyXG4gICAgIHRoaXMuc2hvd0VtYWlsU3RlcCA9IHRydWU7XHJcbiAgICAgdGhpcy5zaG93Rmlyc3ROYW1lU3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd0xhc3ROYW1lU3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd1Bhc3N3b3JkU3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd0NvbmZpcm1QYXNzd29yZFN0ZXAgPSBmYWxzZTtcclxuICAgICB0aGlzLnNob3dUZXh0U3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd1dlbGNvbWUgPSBmYWxzZTtcclxuICAgfSovXHJcblxyXG5cclxuICB2YWxpZGF0ZUVtYWlsKCkge1xyXG4gICAgbGV0IFZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAodGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbWFpbCh0aGlzLmlucHV0LmVtYWlsLnZhbHVlKSkge1xyXG4gICAgICB0aGlzLmlucHV0LmVtYWlsLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LmVtYWlsLmVycm9yID0gdHJ1ZTtcclxuICAgICAgVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVmFsaWRlO1xyXG4gIH1cclxuICB2YWxpZGF0ZVNpemUoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnZhbGlkYXRlU2VydmljZS5pc051bWJlcih0aGlzLmlucHV0LnNpemUudmFsdWUpKSB7XHJcblxyXG4gICAgICB0aGlzLmlucHV0LnNpemUuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuc2l6ZS5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcbiAgdmFsaWRhdGVXZWlnaHQoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnZhbGlkYXRlU2VydmljZS5pc051bWJlcih0aGlzLmlucHV0LndlaWdodC52YWx1ZSkpIHtcclxuXHJcbiAgICAgIHRoaXMuaW5wdXQud2VpZ2h0LmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LndlaWdodC5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlRmlyc3QoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LmZpcnN0bmFtZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5maXJzdG5hbWUuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlTGFzdCgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQubGFzdG5hbWUuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQubGFzdG5hbWUuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlUGFzc3dvcmQoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gdHJ1ZTtcclxuICAgICAgVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVmFsaWRlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBiYWNrdG9QYXNzd29yZCgpIHtcclxuICAgIHRoaXMuZmFkZUluUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5zaG93UGFzc3dvcmRTdGVwID0gdHJ1ZTtcclxuICAgIH0pXHJcbiAgICB0aGlzLmZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKTtcclxuICAgIHRoaXMuc2hvd0NvbmZpcm1QYXNzd29yZFN0ZXAgPSBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlQ29uZmlybVBhc3N3b3JkKCkge1xyXG4gICAgbGV0IFZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSwgMjUpICYmXHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUgPT0gdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWVcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1WYWxpZGF0ZSgpIHtcclxuICAgIGxldCBmb3JtSXNWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlRmlyc3QoKSAmJiAhdGhpcy52YWxpZGF0ZUxhc3QoKSAmJiAhdGhpcy52YWxpZGF0ZVBhc3N3b3JkKCkgJiYgIXRoaXMudmFsaWRhdGVFbWFpbCgpXHJcbiAgICApIHtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybUlzVmFsaWRlO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==