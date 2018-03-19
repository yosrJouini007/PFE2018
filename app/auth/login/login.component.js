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
        var _this = this;
        this.store.dispatch(new appAction.ShowLoadingAction());
        if (this.formValidate()) {
            this.spinner = true;
            var creds = void 0;
            creds = {
                password: this.input.password.value,
                email: this.input.email.value
            };
            this.authService.login(creds).subscribe(function (user) {
                _this.store.dispatch(new appAction.HideLoadingAction());
                _this.spinner = false;
                _this.store.dispatch(new appAction.FireAction("login"));
                _this.routerExtensions.navigate(["home"], {
                    clearHistory: true,
                    transition: {
                        name: "slide"
                    }
                });
                console.log(JSON.stringify(user));
            }, function (error) {
                _this.spinner = false;
                _this.store.dispatch(new appAction.HideLoadingAction());
                nativescript_fancyalert_1.TNSFancyAlert.showError("Erreur!", _this.INVALID_LOGIN_CREDS);
                console.log(JSON.stringify(error));
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBRXpFLFNBQVM7QUFDVCxzREFBK0Q7QUFPL0QsbUVBQTZFO0FBQzdFLHlFQUEwRjtBQUMxRiw4REFBNEU7QUFFNUUsY0FBYztBQUNkLHFDQUFvQztBQUVwQyw4REFBZ0U7QUFHaEUsb0JBQW9CO0FBQ3BCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQ25FLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV2RCxXQUFXO0FBQ1gsdURBQXFEO0FBQ3JELCtEQUE2RDtBQVM3RDtJQXVDRSx3QkFDVSxlQUFnQyxFQUNoQyxXQUF3QixFQUN4QixnQkFBa0MsRUFDbEMsS0FBNEI7UUFHckM7Ozs7O1lBS0k7UUFYSyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQVZ0QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixrQkFBYSxHQUFHLGlEQUFpRCxDQUFDO1FBQ2xFLHdCQUFtQixHQUFHLDJFQUEyRSxDQUFDO1FBZ0JoRyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFFRCxRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtTQUNG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LENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDbkQsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxPQUFPO2FBQ2Q7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBMU9vQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzJEQUFDO0lBQ25DO1FBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDO2tDQUFpQixpQkFBVTswREFBQztJQUN4QjtRQUE1QixnQkFBUyxDQUFDLGdCQUFnQixDQUFDO2tDQUFvQixpQkFBVTs2REFBQztJQUNuQztRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBZSxpQkFBVTt3REFBQztJQUN0QjtRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBa0IsaUJBQVU7MkRBQUM7SUFMNUMsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDckMsQ0FBQzt5Q0F5QzJCLGtDQUFlO1lBQ25CLDBCQUFXO1lBQ04seUJBQWdCO1lBQzNCLGFBQUs7T0EzQ1gsY0FBYyxDQTRPMUI7SUFBRCxxQkFBQztDQUFBLEFBNU9ELElBNE9DO0FBNU9ZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG4vLyBSb3V0ZXJcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbi8vVWlcclxuXHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZC90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQsIFROU0ZhbmN5QWxlcnRCdXR0b24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcblxyXG4vL1JlZHV4ICYgUnhKU1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBmcm9tUm9vdCBmcm9tIFwiLi8uLi8uLi9zaGFyZWQvcmVkdWNlcnNcIjtcclxuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uLy4uL3NoYXJlZC9hY3Rpb25zL2FwcC5hY3Rpb25zXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuXHJcbi8vUGxhdGZvcm0gJiBIZWxwZXJzXHJcbmxldCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmxldCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCIpO1xyXG5cclxuLy8gU2VydmljZXNcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2F1dGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3ZhbGlkYXRlLnNlcnZpY2VcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJsb2dpbi1hdXRoXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCIuL2xvZ2luLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICBAVmlld0NoaWxkKFwiZW1haWxMYXlvdXRcIikgZW1haWxMYXlvdXRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInBhc3N3b3JkTGF5b3V0XCIpIHBhc3N3b3JkTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlbWFpbFRleHRcIikgZW1haWxUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZFRleHRcIikgcGFzc3dvcmRUZXh0UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuXHJcbiAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICBwcml2YXRlIGdldCBlbWFpbExheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWFpbExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgZW1haWxUZXh0KCk6IFRleHRGaWVsZCB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWFpbFRleHRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IHBhc3N3b3JkVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmRUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBwYXNzd29yZExheW91dCgpOiBTdGFja0xheW91dCB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAvKiBwdWJsaWMgb25CYWNrQnV0dG9uVGFwKGFyZ3MpIHtcclxuICAgIGlmICh0aGlzLnNob3dQYXNzd29yZFN0ZXApIHtcclxuICAgICAgdGhpcy5mYWRlSW5FbWFpbGxheW91dCgpO1xyXG4gICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSovXHJcbiAgaW5wdXQ6IGFueTtcclxuICBzcGlubmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICBzaG93UGFzc3dvcmRTdGVwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd0VtYWlsU3RlcDogYm9vbGVhbiA9IHRydWU7XHJcbiAgSU5WQUxJRF9FTUFJTCA9IFwiUydpbCB2b3VzIHBsYcOudCBlbnRyZXIgdW5lIGFkcmVzc2UgbWFpbCB2YWxpZGUhXCI7XHJcbiAgSU5WQUxJRF9MT0dJTl9DUkVEUyA9IFwiTm91cyBuZSBwb3V2b25zIHBhcyB0cm91dmVyIHZvdHJlIGNvbXB0ZSBvdSB2b3RyZSBjb21wdGUgbidlc3QgcGFzIGFjdGl2w6lcIjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmFsaWRhdGVTZXJ2aWNlOiBWYWxpZGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGZyb21Sb290LlN0YXRlPlxyXG4gICkge1xyXG5cclxuICAgLyogaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcclxuICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihcclxuICAgICAgICBhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LFxyXG4gICAgICAgIHRoaXMub25CYWNrQnV0dG9uVGFwLmJpbmQodGhpcylcclxuICAgICAgKTtcclxuICAgIH0qL1xyXG5cclxuXHJcbiAgICB0aGlzLmlucHV0ID0ge1xyXG4gICAgICBlbWFpbDoge1xyXG4gICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGVycm9yOiBmYWxzZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgcGFzc3dvcmQ6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG5cclxuICB9XHJcbiAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICB9XHJcblxyXG4gIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHZhbGlkYXRlRW1haWwoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtYWlsKHRoaXMuaW5wdXQuZW1haWwudmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG4gIGZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGVFbWFpbCgpKSB7XHJcbiAgICAgIHRoaXMucGFzc3dvcmRUZXh0LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiBcclxuICBcclxuICAgZmFkZUluRW1haWxsYXlvdXQoKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRcclxuICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgIHRoaXMuZW1haWxUZXh0LmZvY3VzKCk7XHJcbiAgICAgICB9KVxyXG4gICB9XHJcbiBcclxuICAgZmFkZU91dEVtYWlsbGF5b3V0KCkge1xyXG4gICAgIHJldHVybiB0aGlzLmVtYWlsTGF5b3V0XHJcbiAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgIH0pXHJcbiAgICAgICAudGhlbigoKSA9PiB7XHJcbiBcclxuICAgICAgIH0pO1xyXG4gICB9XHJcbiBcclxuICAgZmFkZUluUGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMucGFzc3dvcmRMYXlvdXRcclxuICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0xMDAgfSxcclxuICAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgfSlcclxuICAgfVxyXG4gXHJcbiAgIGZhZGVPdXRQYXNzd29yZGxheW91dCgpIHtcclxuICAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFxyXG4gICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICB9KVxyXG4gICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gXHJcbiAgICAgICB9KTtcclxuICAgfVxyXG4gIG5leHRMb2dpbigpIHtcclxuICAgICBjb25zb2xlLmxvZyh0aGlzLnZhbGlkYXRlRW1haWwoKSk7XHJcbiAgICAgaWYgKCF0aGlzLnNob3dQYXNzd29yZFN0ZXApIHtcclxuICAgICAgIGlmICh0aGlzLnZhbGlkYXRlRW1haWwoKSkge1xyXG4gICAgICAgICB0aGlzLnNob3dFbWFpbFN0ZXAgPSBmYWxzZTtcclxuICAgICAgICAgdGhpcy5mYWRlT3V0RW1haWxsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIHRoaXMuZmFkZUluUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuIFxyXG4gICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkU3RlcCA9IHRydWU7XHJcbiAgICAgICAgICAgdGhpcy5wYXNzd29yZFRleHQuZm9jdXMoKTtcclxuICAgICAgICAgICB7XHJcbiBcclxuICAgICAgICAgICAgIC8vdGhpcy5sb2dpbigpXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZGlhbG9ncy5hbGVydCh0aGlzLklOVkFMSURfRU1BSUwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICB9KVxyXG4gICAgICAgfVxyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICBpZiAodGhpcy5mb3JtVmFsaWRhdGUoKSkge1xyXG4gICAgICAgICB0aGlzLmxvZ2luKClcclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogRm9ybSBpbnZhbGlkJyk7XHJcbiAgICAgICB9XHJcbiAgICAgfVxyXG4gXHJcbiAgIH0qL1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNob3dMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgaWYgKHRoaXMuZm9ybVZhbGlkYXRlKCkpIHtcclxuICAgICAgdGhpcy5zcGlubmVyID0gdHJ1ZTtcclxuICAgICAgbGV0IGNyZWRzO1xyXG4gICAgICBjcmVkcyA9IHtcclxuICAgICAgICBwYXNzd29yZDogdGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSxcclxuICAgICAgICBlbWFpbDogdGhpcy5pbnB1dC5lbWFpbC52YWx1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbihjcmVkcykuc3Vic2NyaWJlKFxyXG4gICAgICAgIHVzZXIgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAgICAgdGhpcy5zcGlubmVyID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uRmlyZUFjdGlvbihcImxvZ2luXCIpKTtcclxuICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJob21lXCJdLCB7XHJcbiAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgIHRoaXMuc3Bpbm5lciA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXHJcbiAgICAgICAgICAgIFwiRXJyZXVyIVwiLFxyXG4gICAgICAgICAgICB0aGlzLklOVkFMSURfTE9HSU5fQ1JFRFNcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBmb3JtVmFsaWRhdGUoKSB7XHJcblxyXG4gICAgbGV0IGZvcm1Jc1ZhbGlkZSA9IHRydWU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtcHR5KHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUpICYmXHJcbiAgICAgIHRoaXMudmFsaWRhdGVTZXJ2aWNlLm1pbkxlbmd0aCh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLCAyKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5tYXhMZW5ndGgodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSwgMjUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC5lcnJvciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbnB1dC5wYXNzd29yZC5lcnJvciA9IHRydWU7XHJcbiAgICAgIGZvcm1Jc1ZhbGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtSXNWYWxpZGU7XHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvbG9naW4oKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiYXV0aFwiLCBcInJlZ2lzdGVyXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlXCJcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==