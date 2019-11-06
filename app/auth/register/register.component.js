"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//Router
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
//Ui
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var frameModule = require("tns-core-modules/ui/frame");
//Redux & RxJs
var store_1 = require("@ngrx/store");
var appAction = require("./../../shared/actions/app.actions");
//Platform 
var application_settings_1 = require("application-settings");
var platform_1 = require("platform");
//Services
var auth_service_1 = require("../shared/auth.service");
var validate_service_1 = require("../shared/validate.service");
var genreList = ["Homme", "Femme"];
var activityList = ["Actif", "Moins actif", "Inactif", "Extra actif"];
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
            age: {
                value: "",
                error: false
            },
            type: {
                value: "",
            },
        };
        this.genre = [];
        for (var i = 0; i < genreList.length; i++) {
            this.genre.push(genreList[i]);
        }
        this.activity = [];
        for (var i = 0; i < activityList.length; i++) {
            this.activity.push(activityList[i]);
        }
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
    Object.defineProperty(RegisterComponent.prototype, "ageText", {
        get: function () {
            return this.ageTextRef.nativeElement;
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
        this.fadeInEmaillayout();
        //this.nextRegister();
    };
    RegisterComponent.prototype.selectedIndexChangedSexe = function (args) {
        var picker = args.object;
        console.log("picker selection: " + picker.selectedIndex);
        this.sexe = this.genre[picker.selectedIndex];
    };
    RegisterComponent.prototype.selectedIndexChangedActivity = function (args) {
        var picker = args.object;
        console.log("picker selection: " + picker.selectedIndex);
        this.pickedActivity = this.activity[picker.selectedIndex];
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
    RegisterComponent.prototype.focusAge = function () {
        if (this.validateWeight()) {
            this.ageText.focus();
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
            if (this.validateProfile()) {
                this.fadeOutProfilelayout().then(function () {
                });
                this.fadeInTypelayout().then(function () {
                    _this.showTypeStep = true;
                });
                //this.register();
            }
            else {
                nativescript_fancyalert_1.TNSFancyAlert.showError("Erreur", "Veuillez remplir tous les champs");
            }
        }
        else if (!this.showWelcome) {
            //  this.register();
            this.fadeOutTypelayout().then(function () {
            });
            this.fadeInWelcomelayout().then(function () {
                _this.showWelcome = true;
            });
        }
    };
    RegisterComponent.prototype.navigateToWelcome = function () {
        this.routerExtensions.navigate(["/home-connected"], {
            queryParams: {
                newaccount: true
            }
        });
    };
    RegisterComponent.prototype.navigateToIntro = function () {
        this.routerExtensions.navigate(["/intro"], {
            queryParams: {
                newaccount: true
            }
        });
    };
    /*  displayShowWelcome() {
        this.fadeOutTypelayout().then(() => {
        });
        this.fadeInWelcomelayout().then(() => {
          this.showWelcome = true;
        })
      }*/
    RegisterComponent.prototype.register = function () {
        if (this.formValidate()) {
            var creds = void 0;
            creds = {
                email: this.input.email.value,
                password: this.input.password.value
            };
            console.log(JSON.stringify(creds));
            this.authService.register(creds);
            this.store.dispatch(new appAction.ShowLoadingAction());
            var profile = void 0;
            profile = {
                name: this.input.firstname.value,
                lastname: this.input.lastname.value,
                weight: this.input.weight.value,
                age: this.input.age.value,
                size: this.input.size.value,
                type: this.input.type.value,
                sexe: this.sexe,
                activity: this.pickedActivity,
            };
            profile.email = this.input.email.value;
            this.store.dispatch(new appAction.SetUserAction(profile));
            this.authService.createGuestProfile(profile);
            application_settings_1.setBoolean("authenticated", true);
            this.countGoals();
            // this.displayShowTextStep()
            this.store.dispatch(new appAction.FireAction("login"));
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success", "Inscription effectué");
            this.navigateToIntro();
            this.store.dispatch(new appAction.HideLoadingAction());
        }
        else {
            this.store.dispatch(new appAction.HideLoadingAction());
            nativescript_fancyalert_1.TNSFancyAlert.showError("Erreur", "Email existe");
        }
    };
    RegisterComponent.prototype.countGoals = function () {
        var bmr;
        switch (this.pickedActivity) {
            case "Actif": this.activityRate = 1.55;
            case "Inactif": this.activityRate = 1.2;
            case "Moins actif": this.activityRate = 1.375;
            case "Extra actif": this.activityRate = 1.725;
        }
        if (this.sexe == "Homme") {
            bmr = 66.47 + (13.75 * this.input.weight.value) + (5.0 * this.input.size.value) - (6.75 * this.input.age.value);
        }
        else {
            bmr = 665.09 + (9.56 * this.input.weight.value) + (1.84 * this.input.size.value) - (4.67 * this.input.age.value);
        }
        var goals;
        goals = {
            goalToConsume: bmr * this.activityRate,
            goalToBurn: 1000,
        };
        application_settings_1.setString("goalsData", JSON.stringify(goals));
    };
    /*  .subscribe(
  
        profile => {
          let guestProfile: any;
          guestProfile = {
            name: this.input.firstname.value,
            lastname: this.input.lastname.value,
            weight: this.input.weight.value,
            size: this.input.size.value,
            type:this.input.type.value,
            userId: String(profile.id),
            // email: this.input.email.value,
          };
          // guestProfile.email = this.input.email.value;
          console.log("user", profile);
          console.log(JSON.stringify(profile));
          this.authService
            .createGuestProfile(guestProfile)
            .subscribe(account => {
              setString("guest_profile", JSON.stringify(account));
              console.log(JSON.stringify(account));
              this.authService.login(creds).subscribe(success => {
                // this.displayShowTextStep()
                this.store.dispatch(new appAction.FireAction("login"));
                TNSFancyAlert.showSuccess("Success", "Inscription effectué");
                this.navigateToWelcome();
              });
            });
          this.store.dispatch(new appAction.HideLoadingAction());
        },
        error => {
          error = error.error
          console.log(JSON.stringify(error));
          this.store.dispatch(new appAction.HideLoadingAction());
  
          // if ("email" in error.details.codes) {
          TNSFancyAlert.showError("Erreur", "Email existe");
          //  console.log(JSON.stringify(error));
        }
  
      );*/
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
        if (!this.validateService.isEmpty(this.input.size.value) && this.validateService.isNumber(this.input.size.value)) {
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
        if (!this.validateService.isEmpty(this.input.weight.value) && this.validateService.isNumber(this.input.weight.value)) {
            this.input.weight.error = false;
        }
        else {
            this.input.weight.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.validateAge = function () {
        var Valide = true;
        if (!this.validateService.isEmpty(this.input.age.value) && this.validateService.isAge(this.input.age.value)) {
            this.input.age.error = false;
        }
        else {
            this.input.age.error = true;
            Valide = false;
        }
        return Valide;
    };
    RegisterComponent.prototype.validateProfile = function () {
        var formIsValide = true;
        if (!this.validateSize() && !this.validateAge() && !this.validateWeight()) {
            formIsValide = false;
        }
        return formIsValide;
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
    RegisterComponent.prototype.backToHome = function () {
        this.routerExtensions.navigate(["/home"], {
            clearHistory: true,
        });
    };
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
        core_1.ViewChild("ageText"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "ageTextRef", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlGO0FBRWpGLFFBQVE7QUFDUixzREFBK0Q7QUFDL0QsMENBQWlEO0FBR2pELElBQUk7QUFDSixtRUFBNkU7QUFJN0UsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFJdkQsY0FBYztBQUNkLHFDQUFvQztBQUVwQyw4REFBZ0U7QUFJaEUsV0FBVztBQUNYLDZEQU84QjtBQUU5QixxQ0FBa0M7QUFFbEMsVUFBVTtBQUNWLHVEQUFxRDtBQUNyRCwrREFBNkQ7QUFHN0QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQVF0RTtJQW1HRSwyQkFDVSxlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsV0FBd0IsRUFDeEIsS0FBcUIsRUFDckIsSUFBWSxFQUNaLEtBQTRCO1FBTDVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQTlCdEMsdUJBQWtCLEdBQUcscUJBQXFCLENBQUM7UUFDM0MsdUJBQWtCLEdBQUcsaUNBQWlDLENBQUM7UUFRdkQsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLHFCQUFn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UyxDQUFDLHVCQUF1QixDQUFDO2tDQUEyQixpQkFBVTt1RUFBQztJQUM3QztRQUEzQixnQkFBUyxDQUFDLGVBQWUsQ0FBQztrQ0FBbUIsaUJBQVU7K0RBQUM7SUFDL0I7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWlCLGlCQUFVOzZEQUFDO0lBQ3pCO1FBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDO2tDQUFtQixpQkFBVTsrREFBQztJQUNoQztRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBZ0IsaUJBQVU7NERBQUM7SUFoQnhDLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDeEMsQ0FBQzt5Q0FxRzJCLGtDQUFlO1lBQ2QseUJBQWdCO1lBQ3JCLDBCQUFXO1lBQ2pCLHVCQUFjO1lBQ2YsYUFBTTtZQUNMLGFBQUs7T0F6R1gsaUJBQWlCLENBMndCN0I7SUFBRCx3QkFBQztDQUFBLEFBM3dCRCxJQTJ3QkM7QUEzd0JZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG4vL1JvdXRlclxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuLy9VaVxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0LCBUTlNGYW5jeUFsZXJ0QnV0dG9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcbmltcG9ydCB7IFNjcm9sbFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlldy9zY3JvbGwtdmlld1wiO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0L3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBBYnNvbHV0ZUxheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0L2Fic29sdXRlLWxheW91dFwiO1xyXG5sZXQgZnJhbWVNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiKTtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZC90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbi8vUmVkdXggJiBSeEpzXHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuXHJcbi8vUGxhdGZvcm0gXHJcbmltcG9ydCB7XHJcbiAgZ2V0Qm9vbGVhbixcclxuICBzZXRCb29sZWFuLFxyXG4gIGdldFN0cmluZyxcclxuICBzZXRTdHJpbmcsXHJcbiAgcmVtb3ZlLFxyXG4gIGNsZWFyXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCBBcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcblxyXG4vL1NlcnZpY2VzXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9hdXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVmFsaWRhdGVTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC92YWxpZGF0ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidWkvbGlzdC1waWNrZXJcIjtcclxubGV0IGdlbnJlTGlzdCA9IFtcIkhvbW1lXCIsIFwiRmVtbWVcIl07XHJcbmxldCBhY3Rpdml0eUxpc3QgPSBbXCJBY3RpZlwiLCBcIk1vaW5zIGFjdGlmXCIsIFwiSW5hY3RpZlwiLCBcIkV4dHJhIGFjdGlmXCJdO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwicmVnaXN0ZXItYXV0aFwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9yZWdpc3Rlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi9yZWdpc3Rlci5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQFZpZXdDaGlsZChcImZpcnN0TmFtZVRleHRcIikgZmlyc3ROYW1lVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZW1haWxUZXh0XCIpIGVtYWlsVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwic2l6ZVRleHRcIikgc2l6ZVRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndlaWdodFRleHRcIikgd2VpZ2h0VGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiYWdlVGV4dFwiKSBhZ2VUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJsYXN0TmFtZVRleHRcIikgbGFzdE5hbWVUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZFRleHRcIikgcGFzc3dvcmRUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZENvbmZpcm1UZXh0XCIpIHBhc3N3b3JkQ29uZmlybVRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImZpcnN0TmFtZUxheW91dFwiKSBmaXJzdE5hbWVMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImxhc3ROYW1lTGF5b3V0XCIpIGxhc3ROYW1lTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZExheW91dFwiKSBwYXNzd29yZExheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiY29uZmlybVBhc3N3b3JkTGF5b3V0XCIpIGNvbmZpcm1QYXNzd29yZExheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwid2VsY29tZUxheW91dFwiKSB3ZWxjb21lTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlbWFpbExheW91dFwiKSBlbWFpbExheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicHJvZmlsZUxheW91dFwiKSBwcm9maWxlTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJ0eXBlTGF5b3V0XCIpIHR5cGVMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG4gIHByaXZhdGUgZ2V0IHBhc3N3b3JkTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGZpcnN0TmFtZVRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZVRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgZW1haWxUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWFpbFRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgc2l6ZVRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLnNpemVUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHdlaWdodFRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLndlaWdodFRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgYWdlVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuYWdlVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBsYXN0TmFtZVRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLmxhc3ROYW1lVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBwYXNzd29yZFRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBwYXNzd29yZENvbmZpcm1UZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZENvbmZpcm1UZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGNvbmZpcm1QYXNzd29yZExheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maXJtUGFzc3dvcmRMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgZmlyc3ROYW1lTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZUxheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBsYXN0TmFtZUxheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXN0TmFtZUxheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgd2VsY29tZUxheW91dCgpOiBBYnNvbHV0ZUxheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy53ZWxjb21lTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGVtYWlsTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLmVtYWlsTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHByb2ZpbGVMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZUxheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCB0eXBlTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLnR5cGVMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgc2NyZWVuV2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHM7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHNjcmVlbkhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHM7XHJcbiAgfVxyXG5cclxuXHJcbiAgRVhJU1RfUEhPTkVfTlVNQkVSID0gXCJBZHJlc3NlIG1haWwgZXhpc3RlXCI7XHJcbiAgVVNFX0FOX09USEVSX0VNQUlMID0gXCJVdGlsaXNlciB1bmUgYXV0cmUgYWRyZXNzZSBtYWlsXCI7XHJcbiAgaW5wdXQ6IGFueTtcclxuICBwdWJsaWMgZ2VucmU6IEFycmF5PHN0cmluZz47XHJcbiAgcHVibGljIHNleGU6IHN0cmluZztcclxuICBwdWJsaWMgYWN0aXZpdHk6IEFycmF5PHN0cmluZz47XHJcbiAgcHVibGljIHBpY2tlZEFjdGl2aXR5OiBzdHJpbmc7XHJcbiAgYWN0aXZpdHlSYXRlOiBudW1iZXI7XHJcbiAgY29uZmlnOiBhbnk7XHJcbiAgc2hvd0VtYWlsU3RlcDogYm9vbGVhbiA9IHRydWU7XHJcbiAgc2hvd0ZpcnN0TmFtZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93UHJvZmlsZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93VHlwZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93TGFzdE5hbWVTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1Bhc3N3b3JkU3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dDb25maXJtUGFzc3dvcmRTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1RleHRTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1dlbGNvbWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBlbmFibGVPbmU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGVuYWJsZVR3bzogYm9vbGVhbiA9IHRydWU7XHJcbiAgZW5hYmxlTDogYm9vbGVhbiA9IHRydWU7XHJcbiAgZW5hYmxlRzogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIHR5cGUgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlU2VydmljZTogVmFsaWRhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8ZnJvbVJvb3QuU3RhdGU+XHJcbiAgKSB7XHJcbiAgICB0aGlzLmlucHV0ID0ge1xyXG4gICAgICBlbWFpbDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBwYXNzd29yZDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtcGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgZmlyc3RuYW1lOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGxhc3RuYW1lOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHNpemU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgd2VpZ2h0OiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGFnZToge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgIH0sXHJcblxyXG4gICAgfTtcclxuICAgIHRoaXMuZ2VucmUgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdlbnJlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLmdlbnJlLnB1c2goZ2VucmVMaXN0W2ldKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZpdHkgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2aXR5TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLmFjdGl2aXR5LnB1c2goYWN0aXZpdHlMaXN0W2ldKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgXHJcbiAgICB0aGlzLmZhZGVJbkVtYWlsbGF5b3V0KCk7XHJcbiAgICAvL3RoaXMubmV4dFJlZ2lzdGVyKCk7XHJcblxyXG4gIH1cclxuICBwdWJsaWMgc2VsZWN0ZWRJbmRleENoYW5nZWRTZXhlKGFyZ3MpIHtcclxuICAgIGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcclxuICAgIGNvbnNvbGUubG9nKFwicGlja2VyIHNlbGVjdGlvbjogXCIgKyBwaWNrZXIuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgdGhpcy5zZXhlID0gdGhpcy5nZW5yZVtwaWNrZXIuc2VsZWN0ZWRJbmRleF07XHJcbiAgfVxyXG4gIHB1YmxpYyBzZWxlY3RlZEluZGV4Q2hhbmdlZEFjdGl2aXR5KGFyZ3MpIHtcclxuICAgIGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcclxuICAgIGNvbnNvbGUubG9nKFwicGlja2VyIHNlbGVjdGlvbjogXCIgKyBwaWNrZXIuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgdGhpcy5waWNrZWRBY3Rpdml0eSA9IHRoaXMuYWN0aXZpdHlbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUb2xvZ2luKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImF1dGhcIiwgXCJsb2dpblwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZVwiXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGJlZ2luKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImhvbWUtY29ubmVjdGVkXCJdKTtcclxuICB9XHJcblxyXG4gIGZhZGVJbkVtYWlsbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1haWxUZXh0LmZvY3VzKCk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0RW1haWxsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWFpbExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmYWRlSW5GaXJzdGxheW91dCgpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5maXJzdE5hbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lVGV4dC5mb2N1cygpO1xyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmFkZU91dEZpcnN0bGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZhZGVJbkxhc3RsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXN0TmFtZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZVRleHQuZm9jdXMoKTtcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRMYXN0bGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdE5hbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluUGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZFRleHQuZm9jdXMoKTtcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRQYXNzd29yZGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZENvbmZpcm1UZXh0LmZvY3VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluQ29uZmlybVBhc3N3b3JkbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlybVBhc3N3b3JkTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmFkZU91dENvbmZpcm1QYXNzd29yZGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpcm1QYXNzd29yZExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2l6ZVRleHQuZm9jdXMoKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gIGZhZGVJblR5cGVsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50eXBlTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmFkZU91dFR5cGVsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50eXBlTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBmYWRlSW5Qcm9maWxlbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRQcm9maWxlbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmYWRlSW5XZWxjb21lbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMud2VsY29tZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSlcclxuICB9XHJcbiAgZm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy52YWxpZGF0ZVNpemUoKSkge1xyXG4gICAgICB0aGlzLndlaWdodFRleHQuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcbiAgZm9jdXNBZ2UoKSB7XHJcbiAgICBpZiAodGhpcy52YWxpZGF0ZVdlaWdodCgpKSB7XHJcbiAgICAgIHRoaXMuYWdlVGV4dC5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwaWNrT25lKCkge1xyXG4gICAgdGhpcy5lbmFibGVPbmUgPSBmYWxzZTtcclxuICAgIHRoaXMuZW5hYmxlVHdvID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlTCA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZUcgPSB0cnVlXHJcbiAgICB0aGlzLmlucHV0LnR5cGUudmFsdWUgPSBcInR5cGUgMVwiXHJcblxyXG4gIH1cclxuICBwaWNrVHdvKCkge1xyXG4gICAgdGhpcy5lbmFibGVUd28gPSBmYWxzZTtcclxuICAgIHRoaXMuZW5hYmxlT25lID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlTCA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZUcgPSB0cnVlXHJcbiAgICB0aGlzLmlucHV0LnR5cGUudmFsdWUgPSBcInR5cGUgMlwiXHJcblxyXG4gIH1cclxuICBwaWNrRygpIHtcclxuICAgIHRoaXMuZW5hYmxlRyA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbmFibGVUd28gPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVMID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlT25lID0gdHJ1ZVxyXG4gICAgdGhpcy5pbnB1dC50eXBlLnZhbHVlID0gXCJnZXN0YXRpb25uZWxcIlxyXG5cclxuICB9XHJcbiAgcGlja0woKSB7XHJcbiAgICB0aGlzLmVuYWJsZVR3byA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZU9uZSA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZUcgPSB0cnVlXHJcbiAgICB0aGlzLmVuYWJsZUwgPSBmYWxzZTtcclxuICAgIHRoaXMuaW5wdXQudHlwZS52YWx1ZSA9IFwibGFkYVwiXHJcblxyXG4gIH1cclxuICBuZXh0UmVnaXN0ZXIoKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3dGaXJzdE5hbWVTdGVwKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlRW1haWwoKSkge1xyXG4gICAgICAgIHRoaXMuc2hvd0VtYWlsU3RlcCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmFkZU91dEVtYWlsbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mYWRlSW5GaXJzdGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93Rmlyc3ROYW1lU3RlcCA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIXRoaXMuc2hvd0xhc3ROYW1lU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUZpcnN0KCkpIHtcclxuICAgICAgICB0aGlzLmZhZGVPdXRGaXJzdGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluTGFzdGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93TGFzdE5hbWVTdGVwID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dQYXNzd29yZFN0ZXApIHtcclxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVMYXN0KCkpIHtcclxuICAgICAgICB0aGlzLmZhZGVPdXRMYXN0bGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mYWRlSW5QYXNzd29yZGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmRTdGVwID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghdGhpcy5zaG93Q29uZmlybVBhc3N3b3JkU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZVBhc3N3b3JkKCkpIHtcclxuICAgICAgICB0aGlzLmZhZGVPdXRQYXNzd29yZGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluQ29uZmlybVBhc3N3b3JkbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dDb25maXJtUGFzc3dvcmRTdGVwID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiAgZWxzZSBpZiAoIXRoaXMuc2hvd1RleHRTdGVwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVDb25maXJtUGFzc3dvcmQoKSkge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5mYWRlT3V0Q29uZmlybVBhc3N3b3JkbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuZmFkZUluVGV4dGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUZXh0U3RlcCA9IHRydWU7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSovXHJcbiAgICBlbHNlIGlmICghdGhpcy5zaG93UHJvZmlsZVN0ZXApIHtcclxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVDb25maXJtUGFzc3dvcmQoKSkge1xyXG4gICAgICAgIC8vdGhpcy5yZWdpc3RlcigpO1xyXG4gICAgICAgIHRoaXMuZmFkZU91dENvbmZpcm1QYXNzd29yZGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluUHJvZmlsZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93UHJvZmlsZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dUeXBlU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZVByb2ZpbGUoKSkge1xyXG5cclxuICAgICAgICB0aGlzLmZhZGVPdXRQcm9maWxlbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mYWRlSW5UeXBlbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dUeXBlU3RlcCA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL3RoaXMucmVnaXN0ZXIoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycmV1clwiLCBcIlZldWlsbGV6IHJlbXBsaXIgdG91cyBsZXMgY2hhbXBzXCIpXHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghdGhpcy5zaG93V2VsY29tZSkge1xyXG4gICAgICAvLyAgdGhpcy5yZWdpc3RlcigpO1xyXG4gICAgICB0aGlzLmZhZGVPdXRUeXBlbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmZhZGVJbldlbGNvbWVsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNob3dXZWxjb21lID0gdHJ1ZTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5hdmlnYXRlVG9XZWxjb21lKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lLWNvbm5lY3RlZFwiXSwge1xyXG4gICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgIG5ld2FjY291bnQ6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvSW50cm8oKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2ludHJvXCJdLCB7XHJcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgbmV3YWNjb3VudDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyogIGRpc3BsYXlTaG93V2VsY29tZSgpIHtcclxuICAgICAgdGhpcy5mYWRlT3V0VHlwZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5mYWRlSW5XZWxjb21lbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93V2VsY29tZSA9IHRydWU7XHJcbiAgICAgIH0pXHJcbiAgICB9Ki9cclxuXHJcbiAgcmVnaXN0ZXIoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZm9ybVZhbGlkYXRlKCkpIHtcclxuICAgICAgbGV0IGNyZWRzO1xyXG5cclxuICAgICAgY3JlZHMgPSB7XHJcbiAgICAgICAgZW1haWw6IHRoaXMuaW5wdXQuZW1haWwudmFsdWUsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWVcclxuICAgICAgfTtcclxuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY3JlZHMpKTtcclxuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWdpc3RlcihjcmVkcylcclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNob3dMb2FkaW5nQWN0aW9uKCkpO1xyXG5cclxuXHJcbiAgICAgIGxldCBwcm9maWxlOiBhbnk7XHJcbiAgICAgIHByb2ZpbGUgPSB7XHJcbiAgICAgICAgbmFtZTogdGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUsXHJcbiAgICAgICAgbGFzdG5hbWU6IHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUsXHJcbiAgICAgICAgd2VpZ2h0OiB0aGlzLmlucHV0LndlaWdodC52YWx1ZSxcclxuICAgICAgICBhZ2U6IHRoaXMuaW5wdXQuYWdlLnZhbHVlLFxyXG4gICAgICAgIHNpemU6IHRoaXMuaW5wdXQuc2l6ZS52YWx1ZSxcclxuICAgICAgICB0eXBlOiB0aGlzLmlucHV0LnR5cGUudmFsdWUsXHJcbiAgICAgICAgc2V4ZTogdGhpcy5zZXhlLFxyXG4gICAgICAgIGFjdGl2aXR5OiB0aGlzLnBpY2tlZEFjdGl2aXR5LFxyXG4gICAgICAgIC8vIHVzZXJJZDogU3RyaW5nKHByb2ZpbGUuaWQpLFxyXG4gICAgICAgIC8vIGVtYWlsOiB0aGlzLmlucHV0LmVtYWlsLnZhbHVlLFxyXG4gICAgICB9O1xyXG4gICAgICBwcm9maWxlLmVtYWlsID0gdGhpcy5pbnB1dC5lbWFpbC52YWx1ZTtcclxuXHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5TZXRVc2VyQWN0aW9uKHByb2ZpbGUpKTtcclxuICAgICAgdGhpcy5hdXRoU2VydmljZS5jcmVhdGVHdWVzdFByb2ZpbGUocHJvZmlsZSk7XHJcbiAgICAgIHNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICB0aGlzLmNvdW50R29hbHMoKTtcclxuICAgICAgLy8gdGhpcy5kaXNwbGF5U2hvd1RleHRTdGVwKClcclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkZpcmVBY3Rpb24oXCJsb2dpblwiKSk7XHJcbiAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd1N1Y2Nlc3MoXCJTdWNjZXNzXCIsIFwiSW5zY3JpcHRpb24gZWZmZWN0dcOpXCIpO1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG9JbnRybygpO1xyXG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycmV1clwiLCBcIkVtYWlsIGV4aXN0ZVwiKVxyXG4gICAgfVxyXG5cclxuICB9XHJcbiAgY291bnRHb2FscygpIHtcclxuICAgIGxldCBibXI7XHJcbiAgICBzd2l0Y2ggKHRoaXMucGlja2VkQWN0aXZpdHkpIHtcclxuICAgICAgY2FzZSBcIkFjdGlmXCI6IHRoaXMuYWN0aXZpdHlSYXRlID0gMS41NTtcclxuICAgICAgY2FzZSBcIkluYWN0aWZcIjogdGhpcy5hY3Rpdml0eVJhdGUgPSAxLjI7XHJcbiAgICAgIGNhc2UgXCJNb2lucyBhY3RpZlwiOiB0aGlzLmFjdGl2aXR5UmF0ZSA9IDEuMzc1O1xyXG4gICAgICBjYXNlIFwiRXh0cmEgYWN0aWZcIjogdGhpcy5hY3Rpdml0eVJhdGUgPSAxLjcyNTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNleGUgPT0gXCJIb21tZVwiKSB7IC8vIDY2LjQ3KyAoMTMuNzUgeCBXKSArICg1LjAgeCBIKSAtICg2Ljc1IHggQSlcclxuICAgICAgYm1yID0gNjYuNDcgKyAoMTMuNzUgKiB0aGlzLmlucHV0LndlaWdodC52YWx1ZSkgKyAoNS4wICogdGhpcy5pbnB1dC5zaXplLnZhbHVlKSAtICg2Ljc1ICogdGhpcy5pbnB1dC5hZ2UudmFsdWUpXHJcbiAgICB9XHJcbiAgICBlbHNlIHsvLzY2NS4wOSArICg5LjU2IHggVykgKyAoMS44NCB4IEgpIC0gKDQuNjcgeCBBKVxyXG4gICAgICBibXIgPTY2NS4wOSsoOS41Nip0aGlzLmlucHV0LndlaWdodC52YWx1ZSkrKDEuODQgKiB0aGlzLmlucHV0LnNpemUudmFsdWUpLSg0LjY3ICogdGhpcy5pbnB1dC5hZ2UudmFsdWUpXHJcbiAgICB9XHJcbiAgICBsZXQgZ29hbHM7XHJcbiAgICBnb2Fscz17XHJcbiAgICAgIGdvYWxUb0NvbnN1bWU6Ym1yKnRoaXMuYWN0aXZpdHlSYXRlLFxyXG4gICAgICBnb2FsVG9CdXJuOjEwMDAsXHJcbiAgICB9XHJcbiAgICBzZXRTdHJpbmcoXCJnb2Fsc0RhdGFcIiwgSlNPTi5zdHJpbmdpZnkoZ29hbHMpKTtcclxuICB9XHJcblxyXG4gIC8qICAuc3Vic2NyaWJlKFxyXG5cclxuICAgICAgcHJvZmlsZSA9PiB7XHJcbiAgICAgICAgbGV0IGd1ZXN0UHJvZmlsZTogYW55O1xyXG4gICAgICAgIGd1ZXN0UHJvZmlsZSA9IHtcclxuICAgICAgICAgIG5hbWU6IHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgICAgbGFzdG5hbWU6IHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUsXHJcbiAgICAgICAgICB3ZWlnaHQ6IHRoaXMuaW5wdXQud2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgc2l6ZTogdGhpcy5pbnB1dC5zaXplLnZhbHVlLFxyXG4gICAgICAgICAgdHlwZTp0aGlzLmlucHV0LnR5cGUudmFsdWUsXHJcbiAgICAgICAgICB1c2VySWQ6IFN0cmluZyhwcm9maWxlLmlkKSxcclxuICAgICAgICAgIC8vIGVtYWlsOiB0aGlzLmlucHV0LmVtYWlsLnZhbHVlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gZ3Vlc3RQcm9maWxlLmVtYWlsID0gdGhpcy5pbnB1dC5lbWFpbC52YWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVzZXJcIiwgcHJvZmlsZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocHJvZmlsZSkpO1xyXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2VcclxuICAgICAgICAgIC5jcmVhdGVHdWVzdFByb2ZpbGUoZ3Vlc3RQcm9maWxlKVxyXG4gICAgICAgICAgLnN1YnNjcmliZShhY2NvdW50ID0+IHtcclxuICAgICAgICAgICAgc2V0U3RyaW5nKFwiZ3Vlc3RfcHJvZmlsZVwiLCBKU09OLnN0cmluZ2lmeShhY2NvdW50KSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFjY291bnQpKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbihjcmVkcykuc3Vic2NyaWJlKHN1Y2Nlc3MgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIHRoaXMuZGlzcGxheVNob3dUZXh0U3RlcCgpXHJcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkZpcmVBY3Rpb24oXCJsb2dpblwiKSk7XHJcbiAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcIlN1Y2Nlc3NcIiwgXCJJbnNjcmlwdGlvbiBlZmZlY3R1w6lcIik7XHJcbiAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvV2VsY29tZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGVycm9yID0gZXJyb3IuZXJyb3JcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuXHJcbiAgICAgICAgLy8gaWYgKFwiZW1haWxcIiBpbiBlcnJvci5kZXRhaWxzLmNvZGVzKSB7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJldXJcIiwgXCJFbWFpbCBleGlzdGVcIik7XHJcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICApOyovXHJcblxyXG5cclxuXHJcblxyXG4gIC8qIGluaXRWaWV3Rm9ybVBhc3N3b3JkRXhzaXQoKSB7XHJcbiAgICAgdGhpcy5mYWRlT3V0Rmlyc3RsYXlvdXQoKVxyXG4gICAgIHRoaXMuZmFkZU91dEVtYWlsbGF5b3V0KClcclxuICAgICB0aGlzLmZhZGVPdXRGaXJzdGxheW91dCgpXHJcbiAgICAgdGhpcy5mYWRlT3V0TGFzdGxheW91dCgpXHJcbiAgICAgdGhpcy5mYWRlT3V0UGFzc3dvcmRsYXlvdXQoKVxyXG4gICAgIHRoaXMuZmFkZU91dENvbmZpcm1QYXNzd29yZGxheW91dCgpXHJcbiAgICAgdGhpcy5zaG93RW1haWxTdGVwID0gdHJ1ZTtcclxuICAgICB0aGlzLnNob3dGaXJzdE5hbWVTdGVwID0gZmFsc2U7XHJcbiAgICAgdGhpcy5zaG93TGFzdE5hbWVTdGVwID0gZmFsc2U7XHJcbiAgICAgdGhpcy5zaG93UGFzc3dvcmRTdGVwID0gZmFsc2U7XHJcbiAgICAgdGhpcy5zaG93Q29uZmlybVBhc3N3b3JkU3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd1RleHRTdGVwID0gZmFsc2U7XHJcbiAgICAgdGhpcy5zaG93V2VsY29tZSA9IGZhbHNlO1xyXG4gICB9Ki9cclxuXHJcblxyXG4gIHZhbGlkYXRlRW1haWwoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtYWlsKHRoaXMuaW5wdXQuZW1haWwudmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG4gIHZhbGlkYXRlU2l6ZSgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuc2l6ZS52YWx1ZSkgJiYgdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNOdW1iZXIodGhpcy5pbnB1dC5zaXplLnZhbHVlKSkge1xyXG5cclxuICAgICAgdGhpcy5pbnB1dC5zaXplLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LnNpemUuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG4gIHZhbGlkYXRlV2VpZ2h0KCkge1xyXG4gICAgbGV0IFZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC53ZWlnaHQudmFsdWUpICYmIHRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzTnVtYmVyKHRoaXMuaW5wdXQud2VpZ2h0LnZhbHVlKSkge1xyXG5cclxuICAgICAgdGhpcy5pbnB1dC53ZWlnaHQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQud2VpZ2h0LmVycm9yID0gdHJ1ZTtcclxuICAgICAgVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVmFsaWRlO1xyXG4gIH1cclxuICB2YWxpZGF0ZUFnZSgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuYWdlLnZhbHVlKSAmJiB0aGlzLnZhbGlkYXRlU2VydmljZS5pc0FnZSh0aGlzLmlucHV0LmFnZS52YWx1ZSkpIHtcclxuXHJcbiAgICAgIHRoaXMuaW5wdXQuYWdlLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LmFnZS5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcbiAgdmFsaWRhdGVQcm9maWxlKCkge1xyXG4gICAgbGV0IGZvcm1Jc1ZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVTaXplKCkgJiYgIXRoaXMudmFsaWRhdGVBZ2UoKSAmJiAhdGhpcy52YWxpZGF0ZVdlaWdodCgpXHJcbiAgICApIHtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybUlzVmFsaWRlO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVGaXJzdCgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZmlyc3RuYW1lLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LmZpcnN0bmFtZS5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVMYXN0KCkge1xyXG4gICAgbGV0IFZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5sYXN0bmFtZS5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVQYXNzd29yZCgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJhY2t0b1Bhc3N3b3JkKCkge1xyXG4gICAgdGhpcy5mYWRlSW5QYXNzd29yZGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnNob3dQYXNzd29yZFN0ZXAgPSB0cnVlO1xyXG4gICAgfSlcclxuICAgIHRoaXMuZmFkZU91dENvbmZpcm1QYXNzd29yZGxheW91dCgpO1xyXG4gICAgdGhpcy5zaG93Q29uZmlybVBhc3N3b3JkU3RlcCA9IGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVDb25maXJtUGFzc3dvcmQoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlLCAyNSkgJiZcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSA9PSB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybVZhbGlkYXRlKCkge1xyXG4gICAgbGV0IGZvcm1Jc1ZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVGaXJzdCgpICYmICF0aGlzLnZhbGlkYXRlTGFzdCgpICYmICF0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKSAmJiAhdGhpcy52YWxpZGF0ZUVtYWlsKClcclxuICAgICkge1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtSXNWYWxpZGU7XHJcbiAgfVxyXG4gIHB1YmxpYyBiYWNrVG9Ib21lKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7XHJcbiAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG59XHJcbiJdfQ==