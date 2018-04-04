"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Router
var router_1 = require("nativescript-angular/router");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
//Redux & RxJS
var store_1 = require("@ngrx/store");
var appAction = require("./../../shared/actions/app.actions");
//Platform & Helpers
var appSettings = require("tns-core-modules/application-settings");
var application = require("application");
var frameModule = require("tns-core-modules/ui/frame");
// Services
var auth_service_1 = require("../shared/auth.service");
var validate_service_1 = require("../shared/validate.service");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var LoginComponent = (function () {
    function LoginComponent(validateService, authService, routerExtensions, store) {
        /* if (application.android) {
           application.android.on(
             application.AndroidApplication.activityBackPressedEvent,
             this.onBackButtonTap.bind(this)
           );
         }*/
        this.validateService = validateService;
        this.authService = authService;
        this.routerExtensions = routerExtensions;
        this.store = store;
        this.spinner = false;
        this.showPasswordStep = false;
        this.showEmailStep = true;
        this.INVALID_EMAIL = "S'il vous plaît entrer une adresse mail valide!";
        this.INVALID_LOGIN_CREDS = "Nous ne pouvons pas trouver votre compte ou votre compte n'est pas activé";
        this.input = {
            email: {
                value: "",
                error: false
            },
            password: {
                value: "",
                error: false
            }
        };
    }
    Object.defineProperty(LoginComponent.prototype, "emailLayout", {
        get: function () {
            return this.emailLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "emailText", {
        get: function () {
            return this.emailTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "passwordText", {
        get: function () {
            return this.passwordTextRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "passwordLayout", {
        get: function () {
            return this.passwordLayoutRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
    };
    Object.defineProperty(LoginComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    LoginComponent.prototype.validateEmail = function () {
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
    LoginComponent.prototype.focus = function () {
        if (this.validateEmail()) {
            this.passwordText.focus();
        }
    };
    /*
    
     fadeInEmaillayout() {
       return this.emailLayout
         .animate({
           translate: { x: 0, y: 0 },
           duration: 150,
           opacity: 1
         }).then(() => {
           this.emailText.focus();
         })
     }
   
     fadeOutEmaillayout() {
       return this.emailLayout
         .animate({
           translate: { x: 0, y: -200 },
           duration: 150,
           opacity: 0
         })
         .then(() => {
   
         });
     }
   
     fadeInPasswordlayout() {
       return this.passwordLayout
         .animate({
           translate: { x: 0, y: -100 },
           duration: 150,
           opacity: 1
         })
     }
   
     fadeOutPasswordlayout() {
       return this.passwordLayout
         .animate({
           translate: { x: 0, y: -200 },
           duration: 150,
           opacity: 0
         })
         .then(() => {
   
         });
     }
    nextLogin() {
       console.log(this.validateEmail());
       if (!this.showPasswordStep) {
         if (this.validateEmail()) {
           this.showEmailStep = false;
           this.fadeOutEmaillayout().then(() => {
           });
           this.fadeInPasswordlayout().then(() => {
   
             this.showPasswordStep = true;
             this.passwordText.focus();
             {
   
               //this.login()
             }
           })
         } else {
           dialogs.alert(this.INVALID_EMAIL).then(() => {
           })
         }
       } else {
         if (this.formValidate()) {
           this.login()
         } else {
           console.log('Error: Form invalid');
         }
       }
   
     }*/
    LoginComponent.prototype.login = function () {
        this.store.dispatch(new appAction.ShowLoadingAction());
        if (this.formValidate()) {
            var creds = void 0;
            creds = {
                password: this.input.password.value,
                email: this.input.email.value
            };
            var account = this.authService.login(creds);
            if (creds.email == account.email && creds.password == account.password) {
                application_settings_1.setBoolean("authenticated", true);
                this.routerExtensions.navigate(["/home-connected"], { clearHistory: true });
                this.store.dispatch(new appAction.HideLoadingAction());
            }
            else {
                this.store.dispatch(new appAction.HideLoadingAction());
                nativescript_fancyalert_1.TNSFancyAlert.showError("Erreur!", this.INVALID_LOGIN_CREDS);
            }
        }
    };
    LoginComponent.prototype.formValidate = function () {
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
        return formIsValide;
    };
    LoginComponent.prototype.navigateTologin = function () {
        this.routerExtensions.navigate(["auth", "register"], {
            transition: {
                name: "slide"
            }
        });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], LoginComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.ViewChild("emailLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "emailLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("passwordLayout"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "passwordLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("emailText"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "emailTextRef", void 0);
    __decorate([
        core_1.ViewChild("passwordText"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "passwordTextRef", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "login-auth",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.css"]
        }),
        __metadata("design:paramtypes", [validate_service_1.ValidateService,
            auth_service_1.AuthService,
            router_1.RouterExtensions,
            store_1.Store])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBRXpFLFNBQVM7QUFDVCxzREFBK0Q7QUFPL0QsbUVBQTZFO0FBQzdFLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFFNUUsY0FBYztBQUNkLHFDQUFvQztBQUVwQyw4REFBZ0U7QUFHaEUsb0JBQW9CO0FBQ3BCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQ25FLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV2RCxXQUFXO0FBQ1gsdURBQXFEO0FBQ3JELCtEQUE2RDtBQUM3RCxtR0FBOEc7QUFROUc7SUF1Q0Usd0JBQ1UsZUFBZ0MsRUFDaEMsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLEtBQTRCO1FBR3BDOzs7OztZQUtJO1FBWEksb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsVUFBSyxHQUFMLEtBQUssQ0FBdUI7UUFWdEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxpREFBaUQsQ0FBQztRQUNsRSx3QkFBbUIsR0FBRywyRUFBMkUsQ0FBQztRQWdCaEcsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNiO1lBRUQsUUFBUSxFQUFFO2dCQUNSLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQztJQXZERCxzQkFBWSx1Q0FBVzthQUF2QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLHFDQUFTO2FBQXJCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQVksd0NBQVk7YUFBeEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSwwQ0FBYzthQUExQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBMkNELGlDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtREFBc0IsRUFBRSxDQUFDO0lBRTVELENBQUM7SUFDRCxzQkFBSSxnREFBb0I7YUFBeEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsMENBQWlCLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUlELHNDQUFhLEdBQWI7UUFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUM5QixNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCw4QkFBSyxHQUFMO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF5RUk7SUFPSiw4QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFeEIsSUFBSSxLQUFLLFNBQUEsQ0FBQztZQUNWLEtBQUssR0FBRztnQkFDTixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSztnQkFDbkMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUs7YUFDOUIsQ0FBQztZQUVGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUUsT0FBTyxDQUFDLEtBQUssSUFBRyxLQUFLLENBQUMsUUFBUSxJQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxpQ0FBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZELHVDQUFhLENBQUMsU0FBUyxDQUNyQixTQUFTLEVBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUN6QixDQUFDO1lBQ0osQ0FBQztRQUdILENBQUM7SUFDSCxDQUFDO0lBRU8scUNBQVksR0FBcEI7UUFFRSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDeEIsRUFBRSxDQUFDLENBQ0QsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUM5RCxDQUFDLENBQUMsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNqQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRTtZQUNuRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFuT29CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7MkRBQUM7SUFDbkM7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWlCLGlCQUFVOzBEQUFDO0lBQ3hCO1FBQTVCLGdCQUFTLENBQUMsZ0JBQWdCLENBQUM7a0NBQW9CLGlCQUFVOzZEQUFDO0lBQ25DO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFlLGlCQUFVO3dEQUFDO0lBQ3RCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFrQixpQkFBVTsyREFBQztJQUw1QyxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQXlDMkIsa0NBQWU7WUFDbkIsMEJBQVc7WUFDTix5QkFBZ0I7WUFDM0IsYUFBSztPQTNDWCxjQUFjLENBcU8xQjtJQUFELHFCQUFDO0NBQUEsQUFyT0QsSUFxT0M7QUFyT1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8vIFJvdXRlclxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuLy9VaVxyXG5cclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuXHJcbi8vUmVkdXggJiBSeEpTXHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuLy4uLy4uL3NoYXJlZC9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBBY3Rpb24gZnJvbSBcIi4vLi4vLi4vc2hhcmVkL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuLy9QbGF0Zm9ybSAmIEhlbHBlcnNcclxubGV0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxubGV0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XHJcblxyXG4vLyBTZXJ2aWNlc1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRlU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdmFsaWRhdGUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgc2V0Qm9vbGVhbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJsb2dpbi1hdXRoXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCIuL2xvZ2luLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICBAVmlld0NoaWxkKFwiZW1haWxMYXlvdXRcIikgZW1haWxMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInBhc3N3b3JkTGF5b3V0XCIpIHBhc3N3b3JkTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlbWFpbFRleHRcIikgZW1haWxUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZFRleHRcIikgcGFzc3dvcmRUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuXHJcbiAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICBwcml2YXRlIGdldCBlbWFpbExheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWFpbExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgZW1haWxUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWFpbFRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IHBhc3N3b3JkVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmRUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBwYXNzd29yZExheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyogcHVibGljIG9uQmFja0J1dHRvblRhcChhcmdzKSB7XHJcbiAgICAgaWYgKHRoaXMuc2hvd1Bhc3N3b3JkU3RlcCkge1xyXG4gICAgICAgdGhpcy5mYWRlSW5FbWFpbGxheW91dCgpO1xyXG4gICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgIH1cclxuICAgfSovXHJcbiAgaW5wdXQ6IGFueTtcclxuICBzcGlubmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICBzaG93UGFzc3dvcmRTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd0VtYWlsU3RlcDogYm9vbGVhbiA9IHRydWU7XHJcbiAgSU5WQUxJRF9FTUFJTCA9IFwiUydpbCB2b3VzIHBsYcOudCBlbnRyZXIgdW5lIGFkcmVzc2UgbWFpbCB2YWxpZGUhXCI7XHJcbiAgSU5WQUxJRF9MT0dJTl9DUkVEUyA9IFwiTm91cyBuZSBwb3V2b25zIHBhcyB0cm91dmVyIHZvdHJlIGNvbXB0ZSBvdSB2b3RyZSBjb21wdGUgbidlc3QgcGFzIGFjdGl2w6lcIjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmFsaWRhdGVTZXJ2aWNlOiBWYWxpZGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPlxyXG4gICkge1xyXG5cclxuICAgIC8qIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKFxyXG4gICAgICAgICBhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LFxyXG4gICAgICAgICB0aGlzLm9uQmFja0J1dHRvblRhcC5iaW5kKHRoaXMpXHJcbiAgICAgICApO1xyXG4gICAgIH0qL1xyXG5cclxuXHJcbiAgICB0aGlzLmlucHV0ID0ge1xyXG4gICAgICBlbWFpbDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgcGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG5cclxuICB9XHJcbiAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICB9XHJcblxyXG4gIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHZhbGlkYXRlRW1haWwoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtYWlsKHRoaXMuaW5wdXQuZW1haWwudmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG4gIGZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGVFbWFpbCgpKSB7XHJcbiAgICAgIHRoaXMucGFzc3dvcmRUZXh0LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiBcclxuICBcclxuICAgZmFkZUluRW1haWxsYXlvdXQoKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRcclxuICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgIHRoaXMuZW1haWxUZXh0LmZvY3VzKCk7XHJcbiAgICAgICB9KVxyXG4gICB9XHJcbiBcclxuICAgZmFkZU91dEVtYWlsbGF5b3V0KCkge1xyXG4gICAgIHJldHVybiB0aGlzLmVtYWlsTGF5b3V0XHJcbiAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgIH0pXHJcbiAgICAgICAudGhlbigoKSA9PiB7XHJcbiBcclxuICAgICAgIH0pO1xyXG4gICB9XHJcbiBcclxuICAgZmFkZUluUGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMucGFzc3dvcmRMYXlvdXRcclxuICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0xMDAgfSxcclxuICAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgfSlcclxuICAgfVxyXG4gXHJcbiAgIGZhZGVPdXRQYXNzd29yZGxheW91dCgpIHtcclxuICAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFxyXG4gICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICB9KVxyXG4gICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gXHJcbiAgICAgICB9KTtcclxuICAgfVxyXG4gIG5leHRMb2dpbigpIHtcclxuICAgICBjb25zb2xlLmxvZyh0aGlzLnZhbGlkYXRlRW1haWwoKSk7XHJcbiAgICAgaWYgKCF0aGlzLnNob3dQYXNzd29yZFN0ZXApIHtcclxuICAgICAgIGlmICh0aGlzLnZhbGlkYXRlRW1haWwoKSkge1xyXG4gICAgICAgICB0aGlzLnNob3dFbWFpbFN0ZXAgPSBmYWxzZTtcclxuICAgICAgICAgdGhpcy5mYWRlT3V0RW1haWxsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIHRoaXMuZmFkZUluUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuIFxyXG4gICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkU3RlcCA9IHRydWU7XHJcbiAgICAgICAgICAgdGhpcy5wYXNzd29yZFRleHQuZm9jdXMoKTtcclxuICAgICAgICAgICB7XHJcbiBcclxuICAgICAgICAgICAgIC8vdGhpcy5sb2dpbigpXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZGlhbG9ncy5hbGVydCh0aGlzLklOVkFMSURfRU1BSUwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICB9KVxyXG4gICAgICAgfVxyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICBpZiAodGhpcy5mb3JtVmFsaWRhdGUoKSkge1xyXG4gICAgICAgICB0aGlzLmxvZ2luKClcclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogRm9ybSBpbnZhbGlkJyk7XHJcbiAgICAgICB9XHJcbiAgICAgfVxyXG4gXHJcbiAgIH0qL1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNob3dMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgaWYgKHRoaXMuZm9ybVZhbGlkYXRlKCkpIHtcclxuICAgIFxyXG4gICAgICBsZXQgY3JlZHM7XHJcbiAgICAgIGNyZWRzID0ge1xyXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLFxyXG4gICAgICAgIGVtYWlsOiB0aGlzLmlucHV0LmVtYWlsLnZhbHVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgYWNjb3VudCA9IHRoaXMuYXV0aFNlcnZpY2UubG9naW4oY3JlZHMpO1xyXG4gICAgICBpZiAoY3JlZHMuZW1haWw9PWFjY291bnQuZW1haWwmJiBjcmVkcy5wYXNzd29yZD09YWNjb3VudC5wYXNzd29yZCkge1xyXG4gICAgICAgIHNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS1jb25uZWN0ZWRcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uSGlkZUxvYWRpbmdBY3Rpb24oKSk7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXHJcbiAgICAgICAgICBcIkVycmV1ciFcIixcclxuICAgICAgICAgIHRoaXMuSU5WQUxJRF9MT0dJTl9DUkVEU1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtVmFsaWRhdGUoKSB7XHJcblxyXG4gICAgbGV0IGZvcm1Jc1ZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtSXNWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvbG9naW4oKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiYXV0aFwiLCBcInJlZ2lzdGVyXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlXCJcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==