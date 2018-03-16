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
        this.textRegister = {
            condition: "Summo interpretaris mei te, pri an autem ornatus menandri. Per natum dicta petentium ne, tota euripidis concludaturque vim eu. Cu dicunt adipisci sed, duo agam ornatus ancillae in. Sea ad utinam delicatissimi, nobis offendit mea ea, an doming maluisset eloquentiam mei.\n\nMea eripuit aliquando sententiae ne, est harum ignota qualisque cu. Has ea intellegam inciderint, ei eius paulo rationibus vel. Minim euripidis disputationi id vix. Ei vim dicit aeterno dissentias, eum te viderer tractatos, magna aliquid torquatos ut nam.\n\nEam modo tacimates ea. Eros aeterno iuvaret has no, vituperata reprimique id eos. Cu cum labore vocibus. Falli detraxit eu sea, an erat solet ullamcorper per. Ius ut summo iusto, duo no postea ponderum lobortis, ut nemore honestatis cum. Ea cum natum iusto expetenda, an case ornatus pri, an est postea admodum. Ex etiam ceteros cotidieque eam, appetere iracundia ex mei, vocent labores denique eam cu.\n\nEripuit ornatus placerat an eum, nec no putent facilisi reprimique. In vim legendos periculis, eos solum commodo veritus ut, cu atqui error fuisset est. Nam vivendo eleifend no, duo homero honestatis ex. Te per admodum alienum, te has facer utamur. Ei vel quod nibh congue, his eu delicata constituto definitiones. Qui numquam ponderum necessitatibus te. Nostro dissentias efficiantur ut pro.\n    ",
        };
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
    Object.defineProperty(RegisterComponent.prototype, "textLayout", {
        get: function () {
            return this.textLayoutRef.nativeElement;
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
        return this.confirmPasswordLayout
            .animate({
            translate: { x: 0, y: -200 },
            duration: 150,
            opacity: 0
        })
            .then(function () {
        });
    };
    RegisterComponent.prototype.fadeInTextlayout = function () {
        return this.textLayout
            .animate({
            translate: { x: 0, y: 0 },
            duration: 150,
            opacity: 1
        });
    };
    RegisterComponent.prototype.fadeOutTextlayout = function () {
        var _this = this;
        return this.textLayout
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
        this.weightText.focus();
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
        else if (!this.showTextStep) {
            if (this.validateConfirmPassword()) {
                this.register();
                this.fadeOutConfirmPasswordlayout().then(function () {
                });
                this.fadeInTextlayout().then(function () {
                    _this.showTextStep = true;
                });
            }
        }
        else if (!this.showProfileStep) {
            if (this.validateConfirmPassword()) {
                //this.register();
                this.fadeOutTextlayout().then(function () {
                });
                this.fadeInProfilelayout().then(function () {
                    _this.showProfileStep = true;
                });
            }
        }
        else if (!this.showTypeStep) {
            if (this.validateConfirmPassword()) {
                //this.register();
                this.fadeOutProfilelayout().then(function () {
                });
                this.fadeInTypelayout().then(function () {
                    _this.showTypeStep = true;
                });
            }
        }
        /* else if (!this.showWelcome) {
           this.fadeOutTextlayout().then(() => {
           });
           this.fadeInWelcomelayout().then(() => {
             this.showWelcome = true;
           })
         }*/
    };
    /*displayShowTextStep() {
      this.fadeOutConfirmPasswordlayout().then(() => {
        this.fadeInTextlayout().then(() => {
          this.showTextStep = true;
        })
      });
  
    }*/
    RegisterComponent.prototype.navigateToWelcome = function () {
        this.routerExtensions.navigate(["/welcome"], {});
    };
    RegisterComponent.prototype.displayShowWelcome = function () {
        var _this = this;
        this.fadeOutTextlayout().then(function () {
        });
        this.fadeInWelcomelayout().then(function () {
            _this.showWelcome = true;
        });
    };
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
                        nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success", "your register was successful");
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
        core_1.ViewChild("textLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "textLayoutRef", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlGO0FBRWpGLFFBQVE7QUFDUixzREFBK0Q7QUFDL0QsMENBQWlEO0FBR2pELElBQUk7QUFDSixtRUFBNkU7QUFJN0UsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFHdkQseUVBQTBGO0FBQzFGLDhEQUE0RTtBQUc1RSxjQUFjO0FBQ2QscUNBQW9DO0FBRXBDLDhEQUFnRTtBQUdoRSxXQUFXO0FBQ1gsNkRBTzhCO0FBRTlCLHFDQUFrQztBQUVsQyxVQUFVO0FBQ1YsdURBQXFEO0FBQ3JELCtEQUE2RDtBQVM3RDtJQTBHRSwyQkFDVSxlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsV0FBd0IsRUFDeEIsS0FBcUIsRUFDckIsSUFBWSxFQUNaLEtBQTRCO1FBTDVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQW5DdEMsdUJBQWtCLEdBQUcscUJBQXFCLENBQUM7UUFDM0MsdUJBQWtCLEdBQUcsaUNBQWlDLENBQUM7UUFDdkQsaUJBQVksR0FBRztZQUNiLFNBQVMsRUFBRSwwekNBT1Y7U0FDRixDQUFDO1FBR0Ysa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFD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QixDQUFDO1NBQ3hDLENBQUM7eUNBNEcyQixrQ0FBZTtZQUNkLHlCQUFnQjtZQUNyQiwwQkFBVztZQUNqQix1QkFBYztZQUNmLGFBQU07WUFDTCxhQUFLO09BaEhYLGlCQUFpQixDQTRwQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTVwQkQsSUE0cEJDO0FBNXBCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuLy9Sb3V0ZXJcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbi8vVWlcclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXcvc2Nyb2xsLXZpZXdcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgQWJzb2x1dGVMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dC9hYnNvbHV0ZS1sYXlvdXRcIjtcclxubGV0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5cclxuXHJcbi8vUmVkdXggJiBSeEpzXHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuLy9QbGF0Zm9ybSBcclxuaW1wb3J0IHtcclxuICBnZXRCb29sZWFuLFxyXG4gIHNldEJvb2xlYW4sXHJcbiAgZ2V0U3RyaW5nLFxyXG4gIHNldFN0cmluZyxcclxuICByZW1vdmUsXHJcbiAgY2xlYXJcclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IEFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbi8vU2VydmljZXNcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2F1dGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3ZhbGlkYXRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcInJlZ2lzdGVyLWF1dGhcIixcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vcmVnaXN0ZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcIi4vcmVnaXN0ZXIuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gIEBWaWV3Q2hpbGQoXCJmaXJzdE5hbWVUZXh0XCIpIGZpcnN0TmFtZVRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImVtYWlsVGV4dFwiKSBlbWFpbFRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInNpemVUZXh0XCIpIHNpemVUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJ3ZWlnaHRUZXh0XCIpIHdlaWdodFRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImxhc3ROYW1lVGV4dFwiKSBsYXN0TmFtZVRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInBhc3N3b3JkVGV4dFwiKSBwYXNzd29yZFRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInBhc3N3b3JkQ29uZmlybVRleHRcIikgcGFzc3dvcmRDb25maXJtVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZmlyc3ROYW1lTGF5b3V0XCIpIGZpcnN0TmFtZUxheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwibGFzdE5hbWVMYXlvdXRcIikgbGFzdE5hbWVMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInBhc3N3b3JkTGF5b3V0XCIpIHBhc3N3b3JkTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJjb25maXJtUGFzc3dvcmRMYXlvdXRcIikgY29uZmlybVBhc3N3b3JkTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJ0ZXh0TGF5b3V0XCIpIHRleHRMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndlbGNvbWVMYXlvdXRcIikgd2VsY29tZUxheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZW1haWxMYXlvdXRcIikgZW1haWxMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInByb2ZpbGVMYXlvdXRcIikgcHJvZmlsZUxheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwidHlwZUxheW91dFwiKSB0eXBlTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuICBwcml2YXRlIGdldCBwYXNzd29yZExheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBmaXJzdE5hbWVUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5maXJzdE5hbWVUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGVtYWlsVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHNpemVUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5zaXplVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCB3ZWlnaHRUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy53ZWlnaHRUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGxhc3ROYW1lVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdE5hbWVUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHBhc3N3b3JkVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmRUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHBhc3N3b3JkQ29uZmlybVRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkQ29uZmlybVRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgY29uZmlybVBhc3N3b3JkTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpcm1QYXNzd29yZExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBmaXJzdE5hbWVMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGxhc3ROYW1lTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLmxhc3ROYW1lTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHRleHRMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCB3ZWxjb21lTGF5b3V0KCk6IEFic29sdXRlTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLndlbGNvbWVMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgZW1haWxMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgcHJvZmlsZUxheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHR5cGVMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZUxheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBzY3JlZW5XaWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgc2NyZWVuSGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcblxyXG4gIEVYSVNUX1BIT05FX05VTUJFUiA9IFwiQWRyZXNzZSBtYWlsIGV4aXN0ZVwiO1xyXG4gIFVTRV9BTl9PVEhFUl9FTUFJTCA9IFwiVXRpbGlzZXIgdW5lIGF1dHJlIGFkcmVzc2UgbWFpbFwiO1xyXG4gIHRleHRSZWdpc3RlciA9IHtcclxuICAgIGNvbmRpdGlvbjogYFN1bW1vIGludGVycHJldGFyaXMgbWVpIHRlLCBwcmkgYW4gYXV0ZW0gb3JuYXR1cyBtZW5hbmRyaS4gUGVyIG5hdHVtIGRpY3RhIHBldGVudGl1bSBuZSwgdG90YSBldXJpcGlkaXMgY29uY2x1ZGF0dXJxdWUgdmltIGV1LiBDdSBkaWN1bnQgYWRpcGlzY2kgc2VkLCBkdW8gYWdhbSBvcm5hdHVzIGFuY2lsbGFlIGluLiBTZWEgYWQgdXRpbmFtIGRlbGljYXRpc3NpbWksIG5vYmlzIG9mZmVuZGl0IG1lYSBlYSwgYW4gZG9taW5nIG1hbHVpc3NldCBlbG9xdWVudGlhbSBtZWkuXHJcblxyXG5NZWEgZXJpcHVpdCBhbGlxdWFuZG8gc2VudGVudGlhZSBuZSwgZXN0IGhhcnVtIGlnbm90YSBxdWFsaXNxdWUgY3UuIEhhcyBlYSBpbnRlbGxlZ2FtIGluY2lkZXJpbnQsIGVpIGVpdXMgcGF1bG8gcmF0aW9uaWJ1cyB2ZWwuIE1pbmltIGV1cmlwaWRpcyBkaXNwdXRhdGlvbmkgaWQgdml4LiBFaSB2aW0gZGljaXQgYWV0ZXJubyBkaXNzZW50aWFzLCBldW0gdGUgdmlkZXJlciB0cmFjdGF0b3MsIG1hZ25hIGFsaXF1aWQgdG9ycXVhdG9zIHV0IG5hbS5cclxuXHJcbkVhbSBtb2RvIHRhY2ltYXRlcyBlYS4gRXJvcyBhZXRlcm5vIGl1dmFyZXQgaGFzIG5vLCB2aXR1cGVyYXRhIHJlcHJpbWlxdWUgaWQgZW9zLiBDdSBjdW0gbGFib3JlIHZvY2lidXMuIEZhbGxpIGRldHJheGl0IGV1IHNlYSwgYW4gZXJhdCBzb2xldCB1bGxhbWNvcnBlciBwZXIuIEl1cyB1dCBzdW1tbyBpdXN0bywgZHVvIG5vIHBvc3RlYSBwb25kZXJ1bSBsb2JvcnRpcywgdXQgbmVtb3JlIGhvbmVzdGF0aXMgY3VtLiBFYSBjdW0gbmF0dW0gaXVzdG8gZXhwZXRlbmRhLCBhbiBjYXNlIG9ybmF0dXMgcHJpLCBhbiBlc3QgcG9zdGVhIGFkbW9kdW0uIEV4IGV0aWFtIGNldGVyb3MgY290aWRpZXF1ZSBlYW0sIGFwcGV0ZXJlIGlyYWN1bmRpYSBleCBtZWksIHZvY2VudCBsYWJvcmVzIGRlbmlxdWUgZWFtIGN1LlxyXG5cclxuRXJpcHVpdCBvcm5hdHVzIHBsYWNlcmF0IGFuIGV1bSwgbmVjIG5vIHB1dGVudCBmYWNpbGlzaSByZXByaW1pcXVlLiBJbiB2aW0gbGVnZW5kb3MgcGVyaWN1bGlzLCBlb3Mgc29sdW0gY29tbW9kbyB2ZXJpdHVzIHV0LCBjdSBhdHF1aSBlcnJvciBmdWlzc2V0IGVzdC4gTmFtIHZpdmVuZG8gZWxlaWZlbmQgbm8sIGR1byBob21lcm8gaG9uZXN0YXRpcyBleC4gVGUgcGVyIGFkbW9kdW0gYWxpZW51bSwgdGUgaGFzIGZhY2VyIHV0YW11ci4gRWkgdmVsIHF1b2QgbmliaCBjb25ndWUsIGhpcyBldSBkZWxpY2F0YSBjb25zdGl0dXRvIGRlZmluaXRpb25lcy4gUXVpIG51bXF1YW0gcG9uZGVydW0gbmVjZXNzaXRhdGlidXMgdGUuIE5vc3RybyBkaXNzZW50aWFzIGVmZmljaWFudHVyIHV0IHByby5cclxuICAgIGAsXHJcbiAgfTtcclxuICBpbnB1dDogYW55O1xyXG4gIGNvbmZpZzogYW55O1xyXG4gIHNob3dFbWFpbFN0ZXA6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHNob3dGaXJzdE5hbWVTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1Byb2ZpbGVTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1R5cGVTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd0xhc3ROYW1lU3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dQYXNzd29yZFN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93Q29uZmlybVBhc3N3b3JkU3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dUZXh0U3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dXZWxjb21lOiBib29sZWFuID0gZmFsc2U7XHJcbiAgZW5hYmxlT25lOiBib29sZWFuID0gdHJ1ZTtcclxuICBlbmFibGVUd286IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGVuYWJsZUw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGVuYWJsZUc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyB0eXBlID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVNlcnZpY2U6IFZhbGlkYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPlxyXG4gICkge1xyXG4gICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgZW1haWw6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgcGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybXBhc3N3b3JkOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGZpcnN0bmFtZToge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBsYXN0bmFtZToge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBzaXplOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHdlaWdodDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgIH0sXHJcblxyXG4gICAgfTtcclxuICAgIFxyXG4gIH1cclxuXHJcblxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuICAgIHRoaXMuZmFkZUluRW1haWxsYXlvdXQoKTtcclxuICAgIC8vdGhpcy5uZXh0UmVnaXN0ZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvbG9naW4oKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiYXV0aFwiLCBcImxvZ2luXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlXCJcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYmVnaW4oKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiaG9tZS1jb25uZWN0ZWRcIl0pO1xyXG4gIH1cclxuICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIGZhZGVJbkVtYWlsbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1haWxUZXh0LmZvY3VzKCk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0RW1haWxsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWFpbExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmYWRlSW5GaXJzdGxheW91dCgpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5maXJzdE5hbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lVGV4dC5mb2N1cygpO1xyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmFkZU91dEZpcnN0bGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZhZGVJbkxhc3RsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXN0TmFtZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZVRleHQuZm9jdXMoKTtcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRMYXN0bGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdE5hbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluUGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZFRleHQuZm9jdXMoKTtcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRQYXNzd29yZGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZENvbmZpcm1UZXh0LmZvY3VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluQ29uZmlybVBhc3N3b3JkbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlybVBhc3N3b3JkTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmFkZU91dENvbmZpcm1QYXNzd29yZGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpcm1QYXNzd29yZExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmYWRlSW5UZXh0bGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRUZXh0bGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2l6ZVRleHQuZm9jdXMoKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBmYWRlSW5UeXBlbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRUeXBlbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZmFkZUluUHJvZmlsZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2ZpbGVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0UHJvZmlsZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2ZpbGVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluV2VsY29tZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLndlbGNvbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pXHJcbiAgfVxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy53ZWlnaHRUZXh0LmZvY3VzKCk7XHJcbiAgfVxyXG4gIHBpY2tPbmUoKSB7XHJcbiAgICB0aGlzLmVuYWJsZU9uZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbmFibGVUd28gPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVMID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlRyA9IHRydWVcclxuICAgIHRoaXMuaW5wdXQudHlwZS52YWx1ZSA9IFwidHlwZSAxXCJcclxuXHJcbiAgfVxyXG4gIHBpY2tUd28oKSB7XHJcbiAgICB0aGlzLmVuYWJsZVR3byA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbmFibGVPbmUgPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVMID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlRyA9IHRydWVcclxuICAgIHRoaXMuaW5wdXQudHlwZS52YWx1ZSA9IFwidHlwZSAyXCJcclxuXHJcbiAgfVxyXG4gIHBpY2tHKCkge1xyXG4gICAgdGhpcy5lbmFibGVHID0gZmFsc2U7XHJcbiAgICB0aGlzLmVuYWJsZVR3byA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZUwgPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVPbmUgPSB0cnVlXHJcbiAgICB0aGlzLmlucHV0LnR5cGUudmFsdWUgPSBcImdlc3RhdGlvbm5lbFwiXHJcblxyXG4gIH1cclxuICBwaWNrTCgpIHtcclxuICAgIHRoaXMuZW5hYmxlVHdvID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlT25lID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlRyA9IHRydWVcclxuICAgIHRoaXMuZW5hYmxlTCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnB1dC50eXBlLnZhbHVlID0gXCJsYWRhXCJcclxuXHJcbiAgfVxyXG4gIG5leHRSZWdpc3RlcigpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuc2hvd0ZpcnN0TmFtZVN0ZXApIHtcclxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVFbWFpbCgpKSB7XHJcbiAgICAgICAgdGhpcy5zaG93RW1haWxTdGVwID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mYWRlT3V0RW1haWxsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZhZGVJbkZpcnN0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dGaXJzdE5hbWVTdGVwID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghdGhpcy5zaG93TGFzdE5hbWVTdGVwKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlRmlyc3QoKSkge1xyXG4gICAgICAgIHRoaXMuZmFkZU91dEZpcnN0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mYWRlSW5MYXN0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dMYXN0TmFtZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIXRoaXMuc2hvd1Bhc3N3b3JkU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUxhc3QoKSkge1xyXG4gICAgICAgIHRoaXMuZmFkZU91dExhc3RsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZhZGVJblBhc3N3b3JkbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZFN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dDb25maXJtUGFzc3dvcmRTdGVwKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKSkge1xyXG4gICAgICAgIHRoaXMuZmFkZU91dFBhc3N3b3JkbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mYWRlSW5Db25maXJtUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2hvd0NvbmZpcm1QYXNzd29yZFN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dUZXh0U3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUNvbmZpcm1QYXNzd29yZCgpKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xyXG4gICAgICAgIHRoaXMuZmFkZU91dENvbmZpcm1QYXNzd29yZGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluVGV4dGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93VGV4dFN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dQcm9maWxlU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUNvbmZpcm1QYXNzd29yZCgpKSB7XHJcbiAgICAgICAgLy90aGlzLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgdGhpcy5mYWRlT3V0VGV4dGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluUHJvZmlsZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93UHJvZmlsZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dUeXBlU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUNvbmZpcm1QYXNzd29yZCgpKSB7XHJcbiAgICAgICAgLy90aGlzLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgdGhpcy5mYWRlT3V0UHJvZmlsZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluVHlwZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93VHlwZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIGVsc2UgaWYgKCF0aGlzLnNob3dXZWxjb21lKSB7XHJcbiAgICAgICB0aGlzLmZhZGVPdXRUZXh0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICB9KTtcclxuICAgICAgIHRoaXMuZmFkZUluV2VsY29tZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICB0aGlzLnNob3dXZWxjb21lID0gdHJ1ZTtcclxuICAgICAgIH0pXHJcbiAgICAgfSovXHJcbiAgfVxyXG5cclxuICAvKmRpc3BsYXlTaG93VGV4dFN0ZXAoKSB7XHJcbiAgICB0aGlzLmZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5mYWRlSW5UZXh0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93VGV4dFN0ZXAgPSB0cnVlO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gIH0qL1xyXG4gIG5hdmlnYXRlVG9XZWxjb21lKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi93ZWxjb21lXCJdLCB7XHJcbiAgICAgIC8qIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgIG5ld2FjY291bnQ6IHRydWVcclxuICAgICAgIH0qL1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5U2hvd1dlbGNvbWUoKSB7XHJcbiAgICB0aGlzLmZhZGVPdXRUZXh0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZmFkZUluV2VsY29tZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnNob3dXZWxjb21lID0gdHJ1ZTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZWdpc3RlcigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5mb3JtVmFsaWRhdGUoKSkge1xyXG4gICAgICBsZXQgY3JlZHM7XHJcblxyXG4gICAgICBjcmVkcyA9IHtcclxuICAgICAgICBlbWFpbDogdGhpcy5pbnB1dC5lbWFpbC52YWx1ZSxcclxuICAgICAgICBwYXNzd29yZDogdGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjcmVkcykpO1xyXG5cclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNob3dMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlZ2lzdGVyKGNyZWRzKS5zdWJzY3JpYmUoXHJcblxyXG4gICAgICAgIHVzZXIgPT4ge1xyXG4gICAgICAgICAgbGV0IGd1ZXN0UHJvZmlsZTogYW55O1xyXG4gICAgICAgICAgZ3Vlc3RQcm9maWxlID0ge1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSxcclxuICAgICAgICAgICAgbGFzdG5hbWU6IHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUsXHJcbiAgICAgICAgICAgIHVzZXJJZDogU3RyaW5nKHVzZXIuaWQpLFxyXG4gICAgICAgICAgICAvLyBlbWFpbDogdGhpcy5pbnB1dC5lbWFpbC52YWx1ZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICAvLyBndWVzdFByb2ZpbGUuZW1haWwgPSB0aGlzLmlucHV0LmVtYWlsLnZhbHVlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyXCIsIHVzZXIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICAgICAgdGhpcy5hdXRoU2VydmljZVxyXG4gICAgICAgICAgICAuY3JlYXRlR3Vlc3RQcm9maWxlKGd1ZXN0UHJvZmlsZSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShhY2NvdW50ID0+IHtcclxuICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJndWVzdF9wcm9maWxlXCIsIEpTT04uc3RyaW5naWZ5KGFjY291bnQpKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhY2NvdW50KSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbihjcmVkcykuc3Vic2NyaWJlKHN1Y2Nlc3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5kaXNwbGF5U2hvd1RleHRTdGVwKClcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5GaXJlQWN0aW9uKFwibG9naW5cIikpO1xyXG4gICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcIlN1Y2Nlc3NcIiwgXCJ5b3VyIHJlZ2lzdGVyIHdhcyBzdWNjZXNzZnVsXCIpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgIGVycm9yID0gZXJyb3IuZXJyb3JcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcblxyXG4gICAgICAgICAgLy8gaWYgKFwiZW1haWxcIiBpbiBlcnJvci5kZXRhaWxzLmNvZGVzKSB7XHJcbiAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycmV1clwiLCBcIkVtYWlsIGV4aXN0ZVwiKTtcclxuICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogaW5pdFZpZXdGb3JtUGFzc3dvcmRFeHNpdCgpIHtcclxuICAgICB0aGlzLmZhZGVPdXRGaXJzdGxheW91dCgpXHJcbiAgICAgdGhpcy5mYWRlT3V0RW1haWxsYXlvdXQoKVxyXG4gICAgIHRoaXMuZmFkZU91dEZpcnN0bGF5b3V0KClcclxuICAgICB0aGlzLmZhZGVPdXRMYXN0bGF5b3V0KClcclxuICAgICB0aGlzLmZhZGVPdXRQYXNzd29yZGxheW91dCgpXHJcbiAgICAgdGhpcy5mYWRlT3V0Q29uZmlybVBhc3N3b3JkbGF5b3V0KClcclxuICAgICB0aGlzLnNob3dFbWFpbFN0ZXAgPSB0cnVlO1xyXG4gICAgIHRoaXMuc2hvd0ZpcnN0TmFtZVN0ZXAgPSBmYWxzZTtcclxuICAgICB0aGlzLnNob3dMYXN0TmFtZVN0ZXAgPSBmYWxzZTtcclxuICAgICB0aGlzLnNob3dQYXNzd29yZFN0ZXAgPSBmYWxzZTtcclxuICAgICB0aGlzLnNob3dDb25maXJtUGFzc3dvcmRTdGVwID0gZmFsc2U7XHJcbiAgICAgdGhpcy5zaG93VGV4dFN0ZXAgPSBmYWxzZTtcclxuICAgICB0aGlzLnNob3dXZWxjb21lID0gZmFsc2U7XHJcbiAgIH0qL1xyXG5cclxuXHJcbiAgdmFsaWRhdGVFbWFpbCgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1haWwodGhpcy5pbnB1dC5lbWFpbC52YWx1ZSkpIHtcclxuICAgICAgdGhpcy5pbnB1dC5lbWFpbC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5lbWFpbC5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVGaXJzdCgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZmlyc3RuYW1lLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LmZpcnN0bmFtZS5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVMYXN0KCkge1xyXG4gICAgbGV0IFZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVQYXNzd29yZCgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJhY2t0b1Bhc3N3b3JkKCkge1xyXG4gICAgdGhpcy5mYWRlSW5QYXNzd29yZGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnNob3dQYXNzd29yZFN0ZXAgPSB0cnVlO1xyXG4gICAgfSlcclxuICAgIHRoaXMuZmFkZU91dENvbmZpcm1QYXNzd29yZGxheW91dCgpO1xyXG4gICAgdGhpcy5zaG93Q29uZmlybVBhc3N3b3JkU3RlcCA9IGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVDb25maXJtUGFzc3dvcmQoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlLCAyNSkgJiZcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSA9PSB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybVZhbGlkYXRlKCkge1xyXG4gICAgbGV0IGZvcm1Jc1ZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVGaXJzdCgpICYmICF0aGlzLnZhbGlkYXRlTGFzdCgpICYmICF0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKSAmJiAhdGhpcy52YWxpZGF0ZUVtYWlsKClcclxuICAgICkge1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtSXNWYWxpZGU7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIl19