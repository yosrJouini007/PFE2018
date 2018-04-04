import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

// Router
import { RouterExtensions } from "nativescript-angular/router";

//Ui

import * as dialogs from "ui/dialogs";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { StackLayout } from "ui/layouts/stack-layout";
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";

//Redux & RxJS
import { Store } from "@ngrx/store";
import * as fromRoot from "./../../shared/reducers";
import * as appAction from "./../../shared/actions/app.actions";
import { Observable } from "tns-core-modules/data/observable";

//Platform & Helpers
let appSettings = require("tns-core-modules/application-settings");
var application = require("application");
let frameModule = require("tns-core-modules/ui/frame");

// Services
import { AuthService } from "../shared/auth.service";
import { ValidateService } from "../shared/validate.service";
import { getString, setString, setBoolean } from "tns-core-modules/application-settings/application-settings";

@Component({
  selector: "login-auth",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
  @ViewChild("emailLayout") emailLayoutRef: ElementRef;
  @ViewChild("passwordLayout") passwordLayoutRef: ElementRef;
  @ViewChild("emailText") emailTextRef: ElementRef;
  @ViewChild("passwordText") passwordTextRef: ElementRef;


  private _sideDrawerTransition: DrawerTransitionBase;

  private get emailLayout(): StackLayout {
    return this.emailLayoutRef.nativeElement;
  }

  private get emailText(): TextField {
    return this.emailTextRef.nativeElement;
  }

  private get passwordText(): TextField {
    return this.passwordTextRef.nativeElement;
  }

  private get passwordLayout(): StackLayout {
    return this.passwordLayoutRef.nativeElement;
  }

  /* public onBackButtonTap(args) {
     if (this.showPasswordStep) {
       this.fadeInEmaillayout();
       args.cancel = true;
     }
   }*/
  input: any;
  spinner: boolean = false;
  password: string;
  showPasswordStep: boolean = false;
  showEmailStep: boolean = true;
  INVALID_EMAIL = "S'il vous plaît entrer une adresse mail valide!";
  INVALID_LOGIN_CREDS = "Nous ne pouvons pas trouver votre compte ou votre compte n'est pas activé";
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private routerExtensions: RouterExtensions,
    private store: Store<fromRoot.State>
  ) {

    /* if (application.android) {
       application.android.on(
         application.AndroidApplication.activityBackPressedEvent,
         this.onBackButtonTap.bind(this)
       );
     }*/


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

  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();

  }
  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }



  validateEmail(): boolean {
    let Valide = true;
    if (this.validateService.isEmail(this.input.email.value)) {
      this.input.email.error = false;
    } else {
      this.input.email.error = true;
      Valide = false;
    }
    return Valide;
  }
  focus() {
    if (this.validateEmail()) {
      this.passwordText.focus();
    }
  }

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






  login() {
    this.store.dispatch(new appAction.ShowLoadingAction());
    if (this.formValidate()) {
    
      let creds;
      creds = {
        password: this.input.password.value,
        email: this.input.email.value
      };

      let account = this.authService.login(creds);
      if (creds.email==account.email&& creds.password==account.password) {
        setBoolean("authenticated", true);
        this.routerExtensions.navigate(["/home-connected"], { clearHistory: true });
        this.store.dispatch(new appAction.HideLoadingAction());
      }
      else {
        this.store.dispatch(new appAction.HideLoadingAction());
        TNSFancyAlert.showError(
          "Erreur!",
          this.INVALID_LOGIN_CREDS
        );
      }


    }
  }

  private formValidate() {

    let formIsValide = true;
    if (
      !this.validateService.isEmpty(this.input.password.value) &&
      this.validateService.minLength(this.input.password.value, 2) &&
      this.validateService.maxLength(this.input.password.value, 25)
    ) {
      this.input.password.error = false;
    } else {
      this.input.password.error = true;
      formIsValide = false;
    }

    return formIsValide;
  }

  navigateTologin() {
    this.routerExtensions.navigate(["auth", "register"], {
      transition: {
        name: "slide"
      }
    });
  }
}
