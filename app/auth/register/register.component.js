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
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlGO0FBRWpGLFFBQVE7QUFDUixzREFBK0Q7QUFDL0QsMENBQWlEO0FBR2pELElBQUk7QUFDSixtRUFBNkU7QUFJN0UsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFHdkQseUVBQTBGO0FBQzFGLDhEQUE0RTtBQUc1RSxjQUFjO0FBQ2QscUNBQW9DO0FBRXBDLDhEQUFnRTtBQUloRSxXQUFXO0FBQ1gsNkRBTzhCO0FBRTlCLHFDQUFrQztBQUVsQyxVQUFVO0FBQ1YsdURBQXFEO0FBQ3JELCtEQUE2RDtBQUc3RCxJQUFJLFNBQVMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuQyxJQUFJLFlBQVksR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBUXRFO0lBc0dFLDJCQUNVLGVBQWdDLEVBQ2hDLGdCQUFrQyxFQUNsQyxXQUF3QixFQUN4QixLQUFxQixFQUNyQixJQUFZLEVBQ1osS0FBNEI7UUFMNUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBOUJ0Qyx1QkFBa0IsR0FBRyxxQkFBcUIsQ0FBQztRQUMzQyx1QkFBa0IsR0FBRyxpQ0FBaUMsQ0FBQztRQVF2RCxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsaUJBQVks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Z0JBQVMsQ0FBQyxpQkFBaUIsQ0FBQztrQ0FBcUIsaUJBQVU7aUVBQUM7SUFDaEM7UUFBNUIsZ0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztrQ0FBb0IsaUJBQVU7Z0VBQUM7SUFDOUI7UUFBNUIsZ0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztrQ0FBb0IsaUJBQVU7Z0VBQUM7SUFDdkI7UUFBbkMsZ0JBQVMsQ0FBQyx1QkFBdUIsQ0FBQztrQ0FBMkIsaUJBQVU7dUVBQUM7SUFDN0M7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQW1CLGlCQUFVOytEQUFDO0lBQy9CO1FBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDO2tDQUFpQixpQkFBVTs2REFBQztJQUN6QjtRQUEzQixnQkFBUyxDQUFDLGVBQWUsQ0FBQztrQ0FBbUIsaUJBQVU7K0RBQUM7SUFDaEM7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWdCLGlCQUFVOzREQUFDO0lBakJ4QyxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQ3hDLENBQUM7eUNBd0cyQixrQ0FBZTtZQUNkLHlCQUFnQjtZQUNyQiwwQkFBVztZQUNqQix1QkFBYztZQUNmLGFBQU07WUFDTCxhQUFLO09BNUdYLGlCQUFpQixDQWd4QjdCO0lBQUQsd0JBQUM7Q0FBQSxBQWh4QkQsSUFneEJDO0FBaHhCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuLy9Sb3V0ZXJcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbi8vVWlcclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXcvc2Nyb2xsLXZpZXdcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgQWJzb2x1dGVMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dC9hYnNvbHV0ZS1sYXlvdXRcIjtcclxubGV0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5cclxuXHJcbi8vUmVkdXggJiBSeEpzXHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuXHJcbi8vUGxhdGZvcm0gXHJcbmltcG9ydCB7XHJcbiAgZ2V0Qm9vbGVhbixcclxuICBzZXRCb29sZWFuLFxyXG4gIGdldFN0cmluZyxcclxuICBzZXRTdHJpbmcsXHJcbiAgcmVtb3ZlLFxyXG4gIGNsZWFyXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCBBcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcblxyXG4vL1NlcnZpY2VzXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9hdXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVmFsaWRhdGVTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC92YWxpZGF0ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidWkvbGlzdC1waWNrZXJcIjtcclxubGV0IGdlbnJlTGlzdCA9IFtcIkhvbW1lXCIsIFwiRmVtbWVcIl07XHJcbmxldCBhY3Rpdml0eUxpc3QgPSBbXCJBY3RpZlwiLCBcIk1vaW5zIGFjdGlmXCIsIFwiSW5hY3RpZlwiLCBcIkV4dHJhIGFjdGlmXCJdO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwicmVnaXN0ZXItYXV0aFwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9yZWdpc3Rlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi9yZWdpc3Rlci5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZChcImZpcnN0TmFtZVRleHRcIikgZmlyc3ROYW1lVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZW1haWxUZXh0XCIpIGVtYWlsVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwic2l6ZVRleHRcIikgc2l6ZVRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIndlaWdodFRleHRcIikgd2VpZ2h0VGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiYWdlVGV4dFwiKSBhZ2VUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJsYXN0TmFtZVRleHRcIikgbGFzdE5hbWVUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZFRleHRcIikgcGFzc3dvcmRUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZENvbmZpcm1UZXh0XCIpIHBhc3N3b3JkQ29uZmlybVRleHRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImZpcnN0TmFtZUxheW91dFwiKSBmaXJzdE5hbWVMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImxhc3ROYW1lTGF5b3V0XCIpIGxhc3ROYW1lTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZExheW91dFwiKSBwYXNzd29yZExheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiY29uZmlybVBhc3N3b3JkTGF5b3V0XCIpIGNvbmZpcm1QYXNzd29yZExheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwid2VsY29tZUxheW91dFwiKSB3ZWxjb21lTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlbWFpbExheW91dFwiKSBlbWFpbExheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicHJvZmlsZUxheW91dFwiKSBwcm9maWxlTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJ0eXBlTGF5b3V0XCIpIHR5cGVMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG4gIHByaXZhdGUgZ2V0IHBhc3N3b3JkTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGZpcnN0TmFtZVRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZVRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgZW1haWxUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWFpbFRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgc2l6ZVRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLnNpemVUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHdlaWdodFRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLndlaWdodFRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgYWdlVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuYWdlVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBsYXN0TmFtZVRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLmxhc3ROYW1lVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBwYXNzd29yZFRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBwYXNzd29yZENvbmZpcm1UZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZENvbmZpcm1UZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGNvbmZpcm1QYXNzd29yZExheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maXJtUGFzc3dvcmRMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgZmlyc3ROYW1lTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZUxheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBsYXN0TmFtZUxheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXN0TmFtZUxheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgd2VsY29tZUxheW91dCgpOiBBYnNvbHV0ZUxheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy53ZWxjb21lTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IGVtYWlsTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLmVtYWlsTGF5b3V0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHByb2ZpbGVMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZUxheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdldCB0eXBlTGF5b3V0KCk6IFN0YWNrTGF5b3V0IHtcclxuICAgIHJldHVybiB0aGlzLnR5cGVMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgc2NyZWVuV2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHM7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHNjcmVlbkhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XHJcblxyXG5cclxuICBFWElTVF9QSE9ORV9OVU1CRVIgPSBcIkFkcmVzc2UgbWFpbCBleGlzdGVcIjtcclxuICBVU0VfQU5fT1RIRVJfRU1BSUwgPSBcIlV0aWxpc2VyIHVuZSBhdXRyZSBhZHJlc3NlIG1haWxcIjtcclxuICBpbnB1dDogYW55O1xyXG4gIHB1YmxpYyBnZW5yZTogQXJyYXk8c3RyaW5nPjtcclxuICBwdWJsaWMgc2V4ZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBhY3Rpdml0eTogQXJyYXk8c3RyaW5nPjtcclxuICBwdWJsaWMgcGlja2VkQWN0aXZpdHk6IHN0cmluZztcclxuICBhY3Rpdml0eVJhdGU6IG51bWJlcjtcclxuICBjb25maWc6IGFueTtcclxuICBzaG93RW1haWxTdGVwOiBib29sZWFuID0gdHJ1ZTtcclxuICBzaG93Rmlyc3ROYW1lU3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dQcm9maWxlU3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dUeXBlU3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dMYXN0TmFtZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93UGFzc3dvcmRTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd0NvbmZpcm1QYXNzd29yZFN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93VGV4dFN0ZXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93V2VsY29tZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGVuYWJsZU9uZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgZW5hYmxlVHdvOiBib29sZWFuID0gdHJ1ZTtcclxuICBlbmFibGVMOiBib29sZWFuID0gdHJ1ZTtcclxuICBlbmFibGVHOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgdHlwZSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmFsaWRhdGVTZXJ2aWNlOiBWYWxpZGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxmcm9tUm9vdC5TdGF0ZT5cclxuICApIHtcclxuICAgIHRoaXMuaW5wdXQgPSB7XHJcbiAgICAgIGVtYWlsOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhc3N3b3JkOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpcm1wYXNzd29yZDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBmaXJzdG5hbWU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgbGFzdG5hbWU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgc2l6ZToge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICB3ZWlnaHQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgYWdlOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgfSxcclxuXHJcbiAgICB9O1xyXG4gICAgdGhpcy5nZW5yZSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2VucmVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuZ2VucmUucHVzaChnZW5yZUxpc3RbaV0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3Rpdml0eSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZpdHlMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZpdHkucHVzaChhY3Rpdml0eUxpc3RbaV0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICB0aGlzLmZhZGVJbkVtYWlsbGF5b3V0KCk7XHJcbiAgICAvL3RoaXMubmV4dFJlZ2lzdGVyKCk7XHJcblxyXG4gIH1cclxuICBwdWJsaWMgc2VsZWN0ZWRJbmRleENoYW5nZWRTZXhlKGFyZ3MpIHtcclxuICAgIGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcclxuICAgIGNvbnNvbGUubG9nKFwicGlja2VyIHNlbGVjdGlvbjogXCIgKyBwaWNrZXIuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgdGhpcy5zZXhlID0gdGhpcy5nZW5yZVtwaWNrZXIuc2VsZWN0ZWRJbmRleF07XHJcbiAgfVxyXG4gIHB1YmxpYyBzZWxlY3RlZEluZGV4Q2hhbmdlZEFjdGl2aXR5KGFyZ3MpIHtcclxuICAgIGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcclxuICAgIGNvbnNvbGUubG9nKFwicGlja2VyIHNlbGVjdGlvbjogXCIgKyBwaWNrZXIuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgdGhpcy5waWNrZWRBY3Rpdml0eSA9IHRoaXMuYWN0aXZpdHlbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUb2xvZ2luKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImF1dGhcIiwgXCJsb2dpblwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZVwiXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGJlZ2luKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImhvbWUtY29ubmVjdGVkXCJdKTtcclxuICB9XHJcbiAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICB9XHJcblxyXG4gIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBmYWRlSW5FbWFpbGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVtYWlsTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmVtYWlsVGV4dC5mb2N1cygpO1xyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmFkZU91dEVtYWlsbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluRmlyc3RsYXlvdXQoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZVRleHQuZm9jdXMoKTtcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRGaXJzdGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmYWRlSW5MYXN0bGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdE5hbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubGFzdE5hbWVUZXh0LmZvY3VzKCk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0TGFzdGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxhc3ROYW1lTGF5b3V0XHJcbiAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZhZGVJblBhc3N3b3JkbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmRMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmRUZXh0LmZvY3VzKCk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0UGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmRDb25maXJtVGV4dC5mb2N1cygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZhZGVJbkNvbmZpcm1QYXNzd29yZGxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpcm1QYXNzd29yZExheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maXJtUGFzc3dvcmRMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNpemVUZXh0LmZvY3VzKCk7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICBmYWRlSW5UeXBlbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIGZhZGVPdXRUeXBlbGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZUxheW91dFxyXG4gICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yMDAgfSxcclxuICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZmFkZUluUHJvZmlsZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2ZpbGVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBmYWRlT3V0UHJvZmlsZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2ZpbGVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmFkZUluV2VsY29tZWxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLndlbGNvbWVMYXlvdXRcclxuICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pXHJcbiAgfVxyXG4gIGZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGVTaXplKCkpIHtcclxuICAgICAgdGhpcy53ZWlnaHRUZXh0LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvY3VzQWdlKCkge1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGVXZWlnaHQoKSkge1xyXG4gICAgICB0aGlzLmFnZVRleHQuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcGlja09uZSgpIHtcclxuICAgIHRoaXMuZW5hYmxlT25lID0gZmFsc2U7XHJcbiAgICB0aGlzLmVuYWJsZVR3byA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZUwgPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVHID0gdHJ1ZVxyXG4gICAgdGhpcy5pbnB1dC50eXBlLnZhbHVlID0gXCJ0eXBlIDFcIlxyXG5cclxuICB9XHJcbiAgcGlja1R3bygpIHtcclxuICAgIHRoaXMuZW5hYmxlVHdvID0gZmFsc2U7XHJcbiAgICB0aGlzLmVuYWJsZU9uZSA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZUwgPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVHID0gdHJ1ZVxyXG4gICAgdGhpcy5pbnB1dC50eXBlLnZhbHVlID0gXCJ0eXBlIDJcIlxyXG5cclxuICB9XHJcbiAgcGlja0coKSB7XHJcbiAgICB0aGlzLmVuYWJsZUcgPSBmYWxzZTtcclxuICAgIHRoaXMuZW5hYmxlVHdvID0gdHJ1ZTtcclxuICAgIHRoaXMuZW5hYmxlTCA9IHRydWU7XHJcbiAgICB0aGlzLmVuYWJsZU9uZSA9IHRydWVcclxuICAgIHRoaXMuaW5wdXQudHlwZS52YWx1ZSA9IFwiZ2VzdGF0aW9ubmVsXCJcclxuXHJcbiAgfVxyXG4gIHBpY2tMKCkge1xyXG4gICAgdGhpcy5lbmFibGVUd28gPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVPbmUgPSB0cnVlO1xyXG4gICAgdGhpcy5lbmFibGVHID0gdHJ1ZVxyXG4gICAgdGhpcy5lbmFibGVMID0gZmFsc2U7XHJcbiAgICB0aGlzLmlucHV0LnR5cGUudmFsdWUgPSBcImxhZGFcIlxyXG5cclxuICB9XHJcbiAgbmV4dFJlZ2lzdGVyKCkge1xyXG5cclxuICAgIGlmICghdGhpcy5zaG93Rmlyc3ROYW1lU3RlcCkge1xyXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUVtYWlsKCkpIHtcclxuICAgICAgICB0aGlzLnNob3dFbWFpbFN0ZXAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZhZGVPdXRFbWFpbGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluRmlyc3RsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2hvd0ZpcnN0TmFtZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLnNob3dMYXN0TmFtZVN0ZXApIHtcclxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVGaXJzdCgpKSB7XHJcbiAgICAgICAgdGhpcy5mYWRlT3V0Rmlyc3RsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZhZGVJbkxhc3RsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2hvd0xhc3ROYW1lU3RlcCA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghdGhpcy5zaG93UGFzc3dvcmRTdGVwKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlTGFzdCgpKSB7XHJcbiAgICAgICAgdGhpcy5mYWRlT3V0TGFzdGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkU3RlcCA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIXRoaXMuc2hvd0NvbmZpcm1QYXNzd29yZFN0ZXApIHtcclxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVQYXNzd29yZCgpKSB7XHJcbiAgICAgICAgdGhpcy5mYWRlT3V0UGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZhZGVJbkNvbmZpcm1QYXNzd29yZGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93Q29uZmlybVBhc3N3b3JkU3RlcCA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogIGVsc2UgaWYgKCF0aGlzLnNob3dUZXh0U3RlcCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlQ29uZmlybVBhc3N3b3JkKCkpIHtcclxuICAgICAgICAgIHRoaXMucmVnaXN0ZXIoKTtcclxuICAgICAgICAgIHRoaXMuZmFkZU91dENvbmZpcm1QYXNzd29yZGxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmZhZGVJblRleHRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGV4dFN0ZXAgPSB0cnVlO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0qL1xyXG4gICAgZWxzZSBpZiAoIXRoaXMuc2hvd1Byb2ZpbGVTdGVwKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkYXRlQ29uZmlybVBhc3N3b3JkKCkpIHtcclxuICAgICAgICAvL3RoaXMucmVnaXN0ZXIoKTtcclxuICAgICAgICB0aGlzLmZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZhZGVJblByb2ZpbGVsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2hvd1Byb2ZpbGVTdGVwID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghdGhpcy5zaG93VHlwZVN0ZXApIHtcclxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVQcm9maWxlKCkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5mYWRlT3V0UHJvZmlsZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmFkZUluVHlwZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93VHlwZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy90aGlzLnJlZ2lzdGVyKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJldXJcIiwgXCJWZXVpbGxleiByZW1wbGlyIHRvdXMgbGVzIGNoYW1wc1wiKVxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIXRoaXMuc2hvd1dlbGNvbWUpIHtcclxuICAgICAgLy8gIHRoaXMucmVnaXN0ZXIoKTtcclxuICAgICAgdGhpcy5mYWRlT3V0VHlwZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5mYWRlSW5XZWxjb21lbGF5b3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93V2VsY29tZSA9IHRydWU7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvV2VsY29tZSgpIHtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS1jb25uZWN0ZWRcIl0sIHtcclxuICAgICAgcXVlcnlQYXJhbXM6IHtcclxuICAgICAgICBuZXdhY2NvdW50OiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUb0ludHJvKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9pbnRyb1wiXSwge1xyXG4gICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgIG5ld2FjY291bnQ6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qICBkaXNwbGF5U2hvd1dlbGNvbWUoKSB7XHJcbiAgICAgIHRoaXMuZmFkZU91dFR5cGVsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuZmFkZUluV2VsY29tZWxheW91dCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2hvd1dlbGNvbWUgPSB0cnVlO1xyXG4gICAgICB9KVxyXG4gICAgfSovXHJcblxyXG4gIHJlZ2lzdGVyKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmZvcm1WYWxpZGF0ZSgpKSB7XHJcbiAgICAgIGxldCBjcmVkcztcclxuXHJcbiAgICAgIGNyZWRzID0ge1xyXG4gICAgICAgIGVtYWlsOiB0aGlzLmlucHV0LmVtYWlsLnZhbHVlLFxyXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNyZWRzKSk7XHJcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVnaXN0ZXIoY3JlZHMpXHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5TaG93TG9hZGluZ0FjdGlvbigpKTtcclxuXHJcblxyXG4gICAgICBsZXQgcHJvZmlsZTogYW55O1xyXG4gICAgICBwcm9maWxlID0ge1xyXG4gICAgICAgIG5hbWU6IHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgIGxhc3RuYW1lOiB0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgIHdlaWdodDogdGhpcy5pbnB1dC53ZWlnaHQudmFsdWUsXHJcbiAgICAgICAgYWdlOiB0aGlzLmlucHV0LmFnZS52YWx1ZSxcclxuICAgICAgICBzaXplOiB0aGlzLmlucHV0LnNpemUudmFsdWUsXHJcbiAgICAgICAgdHlwZTogdGhpcy5pbnB1dC50eXBlLnZhbHVlLFxyXG4gICAgICAgIHNleGU6IHRoaXMuc2V4ZSxcclxuICAgICAgICBhY3Rpdml0eTogdGhpcy5waWNrZWRBY3Rpdml0eSxcclxuICAgICAgICAvLyB1c2VySWQ6IFN0cmluZyhwcm9maWxlLmlkKSxcclxuICAgICAgICAvLyBlbWFpbDogdGhpcy5pbnB1dC5lbWFpbC52YWx1ZSxcclxuICAgICAgfTtcclxuICAgICAgcHJvZmlsZS5lbWFpbCA9IHRoaXMuaW5wdXQuZW1haWwudmFsdWU7XHJcblxyXG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uU2V0VXNlckFjdGlvbihwcm9maWxlKSk7XHJcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UuY3JlYXRlR3Vlc3RQcm9maWxlKHByb2ZpbGUpO1xyXG4gICAgICBzZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgdGhpcy5jb3VudEdvYWxzKCk7XHJcbiAgICAgIC8vIHRoaXMuZGlzcGxheVNob3dUZXh0U3RlcCgpXHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5GaXJlQWN0aW9uKFwibG9naW5cIikpO1xyXG4gICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFwiU3VjY2Vzc1wiLCBcIkluc2NyaXB0aW9uIGVmZmVjdHXDqVwiKTtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvSW50cm8oKTtcclxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJldXJcIiwgXCJFbWFpbCBleGlzdGVcIilcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIGNvdW50R29hbHMoKSB7XHJcbiAgICBsZXQgYm1yO1xyXG4gICAgc3dpdGNoICh0aGlzLnBpY2tlZEFjdGl2aXR5KSB7XHJcbiAgICAgIGNhc2UgXCJBY3RpZlwiOiB0aGlzLmFjdGl2aXR5UmF0ZSA9IDEuNTU7XHJcbiAgICAgIGNhc2UgXCJJbmFjdGlmXCI6IHRoaXMuYWN0aXZpdHlSYXRlID0gMS4yO1xyXG4gICAgICBjYXNlIFwiTW9pbnMgYWN0aWZcIjogdGhpcy5hY3Rpdml0eVJhdGUgPSAxLjM3NTtcclxuICAgICAgY2FzZSBcIkV4dHJhIGFjdGlmXCI6IHRoaXMuYWN0aXZpdHlSYXRlID0gMS43MjU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zZXhlID09IFwiSG9tbWVcIikgeyAvLyA2Ni40NysgKDEzLjc1IHggVykgKyAoNS4wIHggSCkgLSAoNi43NSB4IEEpXHJcbiAgICAgIGJtciA9IDY2LjQ3ICsgKDEzLjc1ICogdGhpcy5pbnB1dC53ZWlnaHQudmFsdWUpICsgKDUuMCAqIHRoaXMuaW5wdXQuc2l6ZS52YWx1ZSkgLSAoNi43NSAqIHRoaXMuaW5wdXQuYWdlLnZhbHVlKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7Ly82NjUuMDkgKyAoOS41NiB4IFcpICsgKDEuODQgeCBIKSAtICg0LjY3IHggQSlcclxuICAgICAgYm1yID02NjUuMDkrKDkuNTYqdGhpcy5pbnB1dC53ZWlnaHQudmFsdWUpKygxLjg0ICogdGhpcy5pbnB1dC5zaXplLnZhbHVlKS0oNC42NyAqIHRoaXMuaW5wdXQuYWdlLnZhbHVlKVxyXG4gICAgfVxyXG4gICAgbGV0IGdvYWxzO1xyXG4gICAgZ29hbHM9e1xyXG4gICAgICBnb2FsVG9Db25zdW1lOmJtcip0aGlzLmFjdGl2aXR5UmF0ZSxcclxuICAgICAgZ29hbFRvQnVybjoxMDAwLFxyXG4gICAgfVxyXG4gICAgc2V0U3RyaW5nKFwiZ29hbHNEYXRhXCIsIEpTT04uc3RyaW5naWZ5KGdvYWxzKSk7XHJcbiAgfVxyXG5cclxuICAvKiAgLnN1YnNjcmliZShcclxuXHJcbiAgICAgIHByb2ZpbGUgPT4ge1xyXG4gICAgICAgIGxldCBndWVzdFByb2ZpbGU6IGFueTtcclxuICAgICAgICBndWVzdFByb2ZpbGUgPSB7XHJcbiAgICAgICAgICBuYW1lOiB0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSxcclxuICAgICAgICAgIGxhc3RuYW1lOiB0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlLFxyXG4gICAgICAgICAgd2VpZ2h0OiB0aGlzLmlucHV0LndlaWdodC52YWx1ZSxcclxuICAgICAgICAgIHNpemU6IHRoaXMuaW5wdXQuc2l6ZS52YWx1ZSxcclxuICAgICAgICAgIHR5cGU6dGhpcy5pbnB1dC50eXBlLnZhbHVlLFxyXG4gICAgICAgICAgdXNlcklkOiBTdHJpbmcocHJvZmlsZS5pZCksXHJcbiAgICAgICAgICAvLyBlbWFpbDogdGhpcy5pbnB1dC5lbWFpbC52YWx1ZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGd1ZXN0UHJvZmlsZS5lbWFpbCA9IHRoaXMuaW5wdXQuZW1haWwudmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyXCIsIHByb2ZpbGUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHByb2ZpbGUpKTtcclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlXHJcbiAgICAgICAgICAuY3JlYXRlR3Vlc3RQcm9maWxlKGd1ZXN0UHJvZmlsZSlcclxuICAgICAgICAgIC5zdWJzY3JpYmUoYWNjb3VudCA9PiB7XHJcbiAgICAgICAgICAgIHNldFN0cmluZyhcImd1ZXN0X3Byb2ZpbGVcIiwgSlNPTi5zdHJpbmdpZnkoYWNjb3VudCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhY2NvdW50KSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9naW4oY3JlZHMpLnN1YnNjcmliZShzdWNjZXNzID0+IHtcclxuICAgICAgICAgICAgICAvLyB0aGlzLmRpc3BsYXlTaG93VGV4dFN0ZXAoKVxyXG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5GaXJlQWN0aW9uKFwibG9naW5cIikpO1xyXG4gICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd1N1Y2Nlc3MoXCJTdWNjZXNzXCIsIFwiSW5zY3JpcHRpb24gZWZmZWN0dcOpXCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb1dlbGNvbWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBlcnJvciA9IGVycm9yLmVycm9yXHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcblxyXG4gICAgICAgIC8vIGlmIChcImVtYWlsXCIgaW4gZXJyb3IuZGV0YWlscy5jb2Rlcykge1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyZXVyXCIsIFwiRW1haWwgZXhpc3RlXCIpO1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgKTsqL1xyXG5cclxuXHJcblxyXG5cclxuICAvKiBpbml0Vmlld0Zvcm1QYXNzd29yZEV4c2l0KCkge1xyXG4gICAgIHRoaXMuZmFkZU91dEZpcnN0bGF5b3V0KClcclxuICAgICB0aGlzLmZhZGVPdXRFbWFpbGxheW91dCgpXHJcbiAgICAgdGhpcy5mYWRlT3V0Rmlyc3RsYXlvdXQoKVxyXG4gICAgIHRoaXMuZmFkZU91dExhc3RsYXlvdXQoKVxyXG4gICAgIHRoaXMuZmFkZU91dFBhc3N3b3JkbGF5b3V0KClcclxuICAgICB0aGlzLmZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKVxyXG4gICAgIHRoaXMuc2hvd0VtYWlsU3RlcCA9IHRydWU7XHJcbiAgICAgdGhpcy5zaG93Rmlyc3ROYW1lU3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd0xhc3ROYW1lU3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd1Bhc3N3b3JkU3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd0NvbmZpcm1QYXNzd29yZFN0ZXAgPSBmYWxzZTtcclxuICAgICB0aGlzLnNob3dUZXh0U3RlcCA9IGZhbHNlO1xyXG4gICAgIHRoaXMuc2hvd1dlbGNvbWUgPSBmYWxzZTtcclxuICAgfSovXHJcblxyXG5cclxuICB2YWxpZGF0ZUVtYWlsKCkge1xyXG4gICAgbGV0IFZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAodGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbWFpbCh0aGlzLmlucHV0LmVtYWlsLnZhbHVlKSkge1xyXG4gICAgICB0aGlzLmlucHV0LmVtYWlsLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LmVtYWlsLmVycm9yID0gdHJ1ZTtcclxuICAgICAgVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVmFsaWRlO1xyXG4gIH1cclxuICB2YWxpZGF0ZVNpemUoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICghdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LnNpemUudmFsdWUpICYmIHRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzTnVtYmVyKHRoaXMuaW5wdXQuc2l6ZS52YWx1ZSkpIHtcclxuXHJcbiAgICAgIHRoaXMuaW5wdXQuc2l6ZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5zaXplLmVycm9yID0gdHJ1ZTtcclxuICAgICAgVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVmFsaWRlO1xyXG4gIH1cclxuICB2YWxpZGF0ZVdlaWdodCgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQud2VpZ2h0LnZhbHVlKSAmJiB0aGlzLnZhbGlkYXRlU2VydmljZS5pc051bWJlcih0aGlzLmlucHV0LndlaWdodC52YWx1ZSkpIHtcclxuXHJcbiAgICAgIHRoaXMuaW5wdXQud2VpZ2h0LmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LndlaWdodC5lcnJvciA9IHRydWU7XHJcbiAgICAgIFZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhbGlkZTtcclxuICB9XHJcbiAgdmFsaWRhdGVBZ2UoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICghdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LmFnZS52YWx1ZSkgJiYgdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNBZ2UodGhpcy5pbnB1dC5hZ2UudmFsdWUpKSB7XHJcblxyXG4gICAgICB0aGlzLmlucHV0LmFnZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5hZ2UuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG4gIHZhbGlkYXRlUHJvZmlsZSgpIHtcclxuICAgIGxldCBmb3JtSXNWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlU2l6ZSgpICYmICF0aGlzLnZhbGlkYXRlQWdlKCkgJiYgIXRoaXMudmFsaWRhdGVXZWlnaHQoKVxyXG4gICAgKSB7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvcm1Jc1ZhbGlkZTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlRmlyc3QoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5maXJzdG5hbWUudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LmZpcnN0bmFtZS52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQuZmlyc3RuYW1lLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LmZpcnN0bmFtZS5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5maXJzdG5hbWUuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlTGFzdCgpIHtcclxuICAgIGxldCBWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0Lmxhc3RuYW1lLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5sYXN0bmFtZS52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQubGFzdG5hbWUudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQubGFzdG5hbWUuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQubGFzdG5hbWUuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlUGFzc3dvcmQoKSB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMudmFsaWRhdGVTZXJ2aWNlLmlzRW1wdHkodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSkgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWluTGVuZ3RoKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCAyNSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlucHV0LnBhc3N3b3JkLmVycm9yID0gdHJ1ZTtcclxuICAgICAgVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVmFsaWRlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBiYWNrdG9QYXNzd29yZCgpIHtcclxuICAgIHRoaXMuZmFkZUluUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5zaG93UGFzc3dvcmRTdGVwID0gdHJ1ZTtcclxuICAgIH0pXHJcbiAgICB0aGlzLmZhZGVPdXRDb25maXJtUGFzc3dvcmRsYXlvdXQoKTtcclxuICAgIHRoaXMuc2hvd0NvbmZpcm1QYXNzd29yZFN0ZXAgPSBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlQ29uZmlybVBhc3N3b3JkKCkge1xyXG4gICAgbGV0IFZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQuY29uZmlybXBhc3N3b3JkLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWUsIDIpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1heExlbmd0aCh0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC52YWx1ZSwgMjUpICYmXHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUgPT0gdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQudmFsdWVcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0LmNvbmZpcm1wYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5jb25maXJtcGFzc3dvcmQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1WYWxpZGF0ZSgpIHtcclxuICAgIGxldCBmb3JtSXNWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlRmlyc3QoKSAmJiAhdGhpcy52YWxpZGF0ZUxhc3QoKSAmJiAhdGhpcy52YWxpZGF0ZVBhc3N3b3JkKCkgJiYgIXRoaXMudmFsaWRhdGVFbWFpbCgpXHJcbiAgICApIHtcclxuICAgICAgZm9ybUlzVmFsaWRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybUlzVmFsaWRlO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==