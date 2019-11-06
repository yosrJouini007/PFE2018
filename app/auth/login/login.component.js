"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Router
var router_1 = require("nativescript-angular/router");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
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
                application_settings_1.setBoolean("authenticated", false);
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
    LoginComponent.prototype.backToHome = function () {
        this.routerExtensions.navigate(["/home"], {
            clearHistory: true,
        });
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBRXpFLFNBQVM7QUFDVCxzREFBK0Q7QUFPL0QsbUVBQTZFO0FBQzdFLGNBQWM7QUFDZCxxQ0FBb0M7QUFFcEMsOERBQWdFO0FBR2hFLG9CQUFvQjtBQUNwQixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztBQUNuRSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFFdkQsV0FBVztBQUNYLHVEQUFxRDtBQUNyRCwrREFBNkQ7QUFDN0QsbUdBQThHO0FBUTlHO0lBbUNFLHdCQUNVLGVBQWdDLEVBQ2hDLFdBQXdCLEVBQ3hCLGdCQUFrQyxFQUNsQyxLQUE0QjtRQUdwQzs7Ozs7WUFLSTtRQVhJLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBVnRDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsaURBQWlELENBQUM7UUFDbEUsd0JBQW1CLEdBQUcsMkVBQTJFLENBQUM7UUFnQmhHLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUVELFFBQVEsRUFBRTtnQkFDUixLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNiO1NBQ0YsQ0FBQztJQUNKLENB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Q1AsQ0FBQztJQWhPMkI7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWlCLGlCQUFVOzBEQUFDO0lBQ3hCO1FBQTVCLGdCQUFTLENBQUMsZ0JBQWdCLENBQUM7a0NBQW9CLGlCQUFVOzZEQUFDO0lBQ25DO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFlLGlCQUFVO3dEQUFDO0lBQ3RCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFrQixpQkFBVTsyREFBQztJQUo1QyxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQXFDMkIsa0NBQWU7WUFDbkIsMEJBQVc7WUFDTix5QkFBZ0I7WUFDM0IsYUFBSztPQXZDWCxjQUFjLENBa08xQjtJQUFELHFCQUFDO0NBQUEsQUFsT0QsSUFrT0M7QUFsT1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8vIFJvdXRlclxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuLy9VaVxyXG5cclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG4vL1JlZHV4ICYgUnhKU1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBmcm9tUm9vdCBmcm9tIFwiLi8uLi8uLi9zaGFyZWQvcmVkdWNlcnNcIjtcclxuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuLy4uLy4uL3NoYXJlZC9hY3Rpb25zL2FwcC5hY3Rpb25zXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuXHJcbi8vUGxhdGZvcm0gJiBIZWxwZXJzXHJcbmxldCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmxldCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCIpO1xyXG5cclxuLy8gU2VydmljZXNcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2F1dGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0ZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3ZhbGlkYXRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIHNldEJvb2xlYW4gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibG9naW4tYXV0aFwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9sb2dpbi5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi9sb2dpbi5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQFZpZXdDaGlsZChcImVtYWlsTGF5b3V0XCIpIGVtYWlsTGF5b3V0UmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZExheW91dFwiKSBwYXNzd29yZExheW91dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZW1haWxUZXh0XCIpIGVtYWlsVGV4dFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicGFzc3dvcmRUZXh0XCIpIHBhc3N3b3JkVGV4dFJlZjogRWxlbWVudFJlZjtcclxuXHJcbiAgcHJpdmF0ZSBnZXQgZW1haWxMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IGVtYWlsVGV4dCgpOiBUZXh0RmllbGQge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1haWxUZXh0UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBwYXNzd29yZFRleHQoKTogVGV4dEZpZWxkIHtcclxuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkVGV4dFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgcGFzc3dvcmRMYXlvdXQoKTogU3RhY2tMYXlvdXQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmRMYXlvdXRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qIHB1YmxpYyBvbkJhY2tCdXR0b25UYXAoYXJncykge1xyXG4gICAgIGlmICh0aGlzLnNob3dQYXNzd29yZFN0ZXApIHtcclxuICAgICAgIHRoaXMuZmFkZUluRW1haWxsYXlvdXQoKTtcclxuICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICB9XHJcbiAgIH0qL1xyXG4gIGlucHV0OiBhbnk7XHJcbiAgc3Bpbm5lcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgc2hvd1Bhc3N3b3JkU3RlcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dFbWFpbFN0ZXA6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIElOVkFMSURfRU1BSUwgPSBcIlMnaWwgdm91cyBwbGHDrnQgZW50cmVyIHVuZSBhZHJlc3NlIG1haWwgdmFsaWRlIVwiO1xyXG4gIElOVkFMSURfTE9HSU5fQ1JFRFMgPSBcIk5vdXMgbmUgcG91dm9ucyBwYXMgdHJvdXZlciB2b3RyZSBjb21wdGUgb3Ugdm90cmUgY29tcHRlIG4nZXN0IHBhcyBhY3RpdsOpXCI7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlU2VydmljZTogVmFsaWRhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxmcm9tUm9vdC5TdGF0ZT5cclxuICApIHtcclxuXHJcbiAgICAvKiBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihcclxuICAgICAgICAgYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCxcclxuICAgICAgICAgdGhpcy5vbkJhY2tCdXR0b25UYXAuYmluZCh0aGlzKVxyXG4gICAgICAgKTtcclxuICAgICB9Ki9cclxuXHJcblxyXG4gICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgZW1haWw6IHtcclxuICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICBlcnJvcjogZmFsc2VcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHBhc3N3b3JkOiB7XHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICBcclxuXHJcbiAgfVxyXG4gXHJcblxyXG5cclxuXHJcblxyXG4gIHZhbGlkYXRlRW1haWwoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgVmFsaWRlID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnZhbGlkYXRlU2VydmljZS5pc0VtYWlsKHRoaXMuaW5wdXQuZW1haWwudmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuZW1haWwuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYWxpZGU7XHJcbiAgfVxyXG4gIGZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGVFbWFpbCgpKSB7XHJcbiAgICAgIHRoaXMucGFzc3dvcmRUZXh0LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiBcclxuICBcclxuICAgZmFkZUluRW1haWxsYXlvdXQoKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMuZW1haWxMYXlvdXRcclxuICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgIHRoaXMuZW1haWxUZXh0LmZvY3VzKCk7XHJcbiAgICAgICB9KVxyXG4gICB9XHJcbiBcclxuICAgZmFkZU91dEVtYWlsbGF5b3V0KCkge1xyXG4gICAgIHJldHVybiB0aGlzLmVtYWlsTGF5b3V0XHJcbiAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjAwIH0sXHJcbiAgICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgIH0pXHJcbiAgICAgICAudGhlbigoKSA9PiB7XHJcbiBcclxuICAgICAgIH0pO1xyXG4gICB9XHJcbiBcclxuICAgZmFkZUluUGFzc3dvcmRsYXlvdXQoKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMucGFzc3dvcmRMYXlvdXRcclxuICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0xMDAgfSxcclxuICAgICAgICAgZHVyYXRpb246IDE1MCxcclxuICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgfSlcclxuICAgfVxyXG4gXHJcbiAgIGZhZGVPdXRQYXNzd29yZGxheW91dCgpIHtcclxuICAgICByZXR1cm4gdGhpcy5wYXNzd29yZExheW91dFxyXG4gICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTIwMCB9LFxyXG4gICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICB9KVxyXG4gICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gXHJcbiAgICAgICB9KTtcclxuICAgfVxyXG4gIG5leHRMb2dpbigpIHtcclxuICAgICBjb25zb2xlLmxvZyh0aGlzLnZhbGlkYXRlRW1haWwoKSk7XHJcbiAgICAgaWYgKCF0aGlzLnNob3dQYXNzd29yZFN0ZXApIHtcclxuICAgICAgIGlmICh0aGlzLnZhbGlkYXRlRW1haWwoKSkge1xyXG4gICAgICAgICB0aGlzLnNob3dFbWFpbFN0ZXAgPSBmYWxzZTtcclxuICAgICAgICAgdGhpcy5mYWRlT3V0RW1haWxsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIHRoaXMuZmFkZUluUGFzc3dvcmRsYXlvdXQoKS50aGVuKCgpID0+IHtcclxuIFxyXG4gICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkU3RlcCA9IHRydWU7XHJcbiAgICAgICAgICAgdGhpcy5wYXNzd29yZFRleHQuZm9jdXMoKTtcclxuICAgICAgICAgICB7XHJcbiBcclxuICAgICAgICAgICAgIC8vdGhpcy5sb2dpbigpXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZGlhbG9ncy5hbGVydCh0aGlzLklOVkFMSURfRU1BSUwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICB9KVxyXG4gICAgICAgfVxyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICBpZiAodGhpcy5mb3JtVmFsaWRhdGUoKSkge1xyXG4gICAgICAgICB0aGlzLmxvZ2luKClcclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogRm9ybSBpbnZhbGlkJyk7XHJcbiAgICAgICB9XHJcbiAgICAgfVxyXG4gXHJcbiAgIH0qL1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNob3dMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgaWYgKHRoaXMuZm9ybVZhbGlkYXRlKCkpIHtcclxuICAgIFxyXG4gICAgICBsZXQgY3JlZHM7XHJcbiAgICAgIGNyZWRzID0ge1xyXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlLFxyXG4gICAgICAgIGVtYWlsOiB0aGlzLmlucHV0LmVtYWlsLnZhbHVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgYWNjb3VudCA9IHRoaXMuYXV0aFNlcnZpY2UubG9naW4oY3JlZHMpO1xyXG4gICAgICBpZiAoY3JlZHMuZW1haWw9PWFjY291bnQuZW1haWwmJiBjcmVkcy5wYXNzd29yZD09YWNjb3VudC5wYXNzd29yZCkge1xyXG4gICAgICAgIHNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS1jb25uZWN0ZWRcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IGFwcEFjdGlvbi5IaWRlTG9hZGluZ0FjdGlvbigpKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBzZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLkhpZGVMb2FkaW5nQWN0aW9uKCkpO1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFxyXG4gICAgICAgICAgXCJFcnJldXIhXCIsXHJcbiAgICAgICAgICB0aGlzLklOVkFMSURfTE9HSU5fQ1JFRFNcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybVZhbGlkYXRlKCkge1xyXG5cclxuICAgIGxldCBmb3JtSXNWYWxpZGUgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy52YWxpZGF0ZVNlcnZpY2UuaXNFbXB0eSh0aGlzLmlucHV0LnBhc3N3b3JkLnZhbHVlKSAmJlxyXG4gICAgICB0aGlzLnZhbGlkYXRlU2VydmljZS5taW5MZW5ndGgodGhpcy5pbnB1dC5wYXNzd29yZC52YWx1ZSwgMikgJiZcclxuICAgICAgdGhpcy52YWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoKHRoaXMuaW5wdXQucGFzc3dvcmQudmFsdWUsIDI1KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGFzc3dvcmQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICBmb3JtSXNWYWxpZGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybUlzVmFsaWRlO1xyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUb2xvZ2luKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImF1dGhcIiwgXCJyZWdpc3RlclwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZVwiXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgYmFja1RvSG9tZSgpIHtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwge1xyXG4gICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcclxuICAgIH0pO1xyXG59XHJcbn1cclxuIl19