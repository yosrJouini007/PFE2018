import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";

//Router
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

//Ui
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
import { ScrollView } from "tns-core-modules/ui/scroll-view/scroll-view";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
let frameModule = require("tns-core-modules/ui/frame");
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import * as dialogs from "ui/dialogs";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";


//Redux & RxJs
import { Store } from "@ngrx/store";
import * as fromRoot from "./../../shared/reducers";
import * as appAction from "./../../shared/actions/app.actions";
import { Observable } from "tns-core-modules/data/observable";

//Platform 
import {
  getBoolean,
  setBoolean,
  getString,
  setString,
  remove,
  clear
} from "application-settings";
import Application = require("application");
import { screen } from "platform";

//Services
import { AuthService } from "../shared/auth.service";
import { ValidateService } from "../shared/validate.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Component({
  selector: "register-auth",
  moduleId: module.id,
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
  @ViewChild("firstNameText") firstNameTextRef: ElementRef;
  @ViewChild("emailText") emailTextRef: ElementRef;
  @ViewChild("sizeText") sizeTextRef: ElementRef;
  @ViewChild("weightText") weightTextRef: ElementRef;
  @ViewChild("lastNameText") lastNameTextRef: ElementRef;
  @ViewChild("passwordText") passwordTextRef: ElementRef;
  @ViewChild("passwordConfirmText") passwordConfirmTextRef: ElementRef;
  @ViewChild("firstNameLayout") firstNameLayoutRef: ElementRef;
  @ViewChild("lastNameLayout") lastNameLayoutRef: ElementRef;
  @ViewChild("passwordLayout") passwordLayoutRef: ElementRef;
  @ViewChild("confirmPasswordLayout") confirmPasswordLayoutRef: ElementRef;
  @ViewChild("textLayout") textLayoutRef: ElementRef;
  @ViewChild("welcomeLayout") welcomeLayoutRef: ElementRef;
  @ViewChild("emailLayout") emailLayoutRef: ElementRef;
  @ViewChild("profileLayout") profileLayoutRef: ElementRef;
  @ViewChild("typeLayout") typeLayoutRef: ElementRef;

  private get passwordLayout(): StackLayout {
    return this.passwordLayoutRef.nativeElement;
  }
  private get firstNameText(): TextField {
    return this.firstNameTextRef.nativeElement;
  }
  private get emailText(): TextField {
    return this.emailTextRef.nativeElement;
  }
  private get sizeText(): TextField {
    return this.sizeTextRef.nativeElement;
  }
  private get weightText(): TextField {
    return this.weightTextRef.nativeElement;
  }
  private get lastNameText(): TextField {
    return this.lastNameTextRef.nativeElement;
  }
  private get passwordText(): TextField {
    return this.passwordTextRef.nativeElement;
  }
  private get passwordConfirmText(): TextField {
    return this.passwordConfirmTextRef.nativeElement;
  }
  private get confirmPasswordLayout(): StackLayout {
    return this.confirmPasswordLayoutRef.nativeElement;
  }
  private get firstNameLayout(): StackLayout {
    return this.firstNameLayoutRef.nativeElement;
  }
  private get lastNameLayout(): StackLayout {
    return this.lastNameLayoutRef.nativeElement;
  }
  private get textLayout(): StackLayout {
    return this.textLayoutRef.nativeElement;
  }
  private get welcomeLayout(): AbsoluteLayout {
    return this.welcomeLayoutRef.nativeElement;
  }
  private get emailLayout(): StackLayout {
    return this.emailLayoutRef.nativeElement;
  }
  private get profileLayout(): StackLayout {
    return this.profileLayoutRef.nativeElement;
  }
  private get typeLayout(): StackLayout {
    return this.typeLayoutRef.nativeElement;
  }
  private get screenWidth(): number {
    return screen.mainScreen.widthDIPs;
  }
  private get screenHeight(): number {
    return screen.mainScreen.heightDIPs;
  }

  private _sideDrawerTransition: DrawerTransitionBase;


  EXIST_PHONE_NUMBER = "Adresse mail existe";
  USE_AN_OTHER_EMAIL = "Utiliser une autre adresse mail";
  textRegister = {
    condition: `Summo interpretaris mei te, pri an autem ornatus menandri. Per natum dicta petentium ne, tota euripidis concludaturque vim eu. Cu dicunt adipisci sed, duo agam ornatus ancillae in. Sea ad utinam delicatissimi, nobis offendit mea ea, an doming maluisset eloquentiam mei.

Mea eripuit aliquando sententiae ne, est harum ignota qualisque cu. Has ea intellegam inciderint, ei eius paulo rationibus vel. Minim euripidis disputationi id vix. Ei vim dicit aeterno dissentias, eum te viderer tractatos, magna aliquid torquatos ut nam.

Eam modo tacimates ea. Eros aeterno iuvaret has no, vituperata reprimique id eos. Cu cum labore vocibus. Falli detraxit eu sea, an erat solet ullamcorper per. Ius ut summo iusto, duo no postea ponderum lobortis, ut nemore honestatis cum. Ea cum natum iusto expetenda, an case ornatus pri, an est postea admodum. Ex etiam ceteros cotidieque eam, appetere iracundia ex mei, vocent labores denique eam cu.

Eripuit ornatus placerat an eum, nec no putent facilisi reprimique. In vim legendos periculis, eos solum commodo veritus ut, cu atqui error fuisset est. Nam vivendo eleifend no, duo homero honestatis ex. Te per admodum alienum, te has facer utamur. Ei vel quod nibh congue, his eu delicata constituto definitiones. Qui numquam ponderum necessitatibus te. Nostro dissentias efficiantur ut pro.
    `,
  };
  input: any;
  config: any;
  showEmailStep: boolean = true;
  showFirstNameStep: boolean = false;
  showProfileStep: boolean = false;
  showTypeStep: boolean = false;
  showLastNameStep: boolean = false;
  showPasswordStep: boolean = false;
  showConfirmPasswordStep: boolean = false;
  showTextStep: boolean = false;
  showWelcome: boolean = false;
  enableOne: boolean = true;
  enableTwo: boolean = true;
  enableL: boolean = true;
  enableG: boolean = true;
  public type = [];

  constructor(
    private validateService: ValidateService,
    private routerExtensions: RouterExtensions,
    private authService: AuthService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private store: Store<fromRoot.State>
  ) {
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



  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.fadeInEmaillayout();
    //this.nextRegister();

  }

  navigateTologin() {
    this.routerExtensions.navigate(["auth", "login"], {
      transition: {
        name: "slide"
      }
    });
  }

  public begin() {
    this.routerExtensions.navigate(["home-connected"]);
  }
  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

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

  fadeInFirstlayout() {

    return this.firstNameLayout
      .animate({
        translate: { x: 0, y: 0 },
        duration: 150,
        opacity: 1
      }).then(() => {
        this.firstNameText.focus();
      })
  }

  fadeOutFirstlayout() {
    return this.firstNameLayout
      .animate({
        translate: { x: 0, y: -200 },
        duration: 150,
        opacity: 0
      })
      .then(() => {

      });
  }

  fadeInLastlayout() {
    return this.lastNameLayout
      .animate({
        translate: { x: 0, y: 0 },
        duration: 150,
        opacity: 1
      }).then(() => {
        this.lastNameText.focus();
      })
  }

  fadeOutLastlayout() {
    return this.lastNameLayout
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
        translate: { x: 0, y: 0 },
        duration: 150,
        opacity: 1
      }).then(() => {
        this.passwordText.focus();
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
        this.passwordConfirmText.focus();
      });
  }

  fadeInConfirmPasswordlayout() {
    return this.confirmPasswordLayout
      .animate({
        translate: { x: 0, y: 0 },
        duration: 150,
        opacity: 1
      })
  }

  fadeOutConfirmPasswordlayout() {
    return this.confirmPasswordLayout
      .animate({
        translate: { x: 0, y: -200 },
        duration: 150,
        opacity: 0
      })
      .then(() => {

      });
  }

  fadeInTextlayout() {
    return this.textLayout
      .animate({
        translate: { x: 0, y: 0 },
        duration: 150,
        opacity: 1
      })
  }

  fadeOutTextlayout() {
    return this.textLayout
      .animate({
        translate: { x: 0, y: -200 },
        duration: 150,
        opacity: 0
      })
      .then(() => {
        this.sizeText.focus();

      });
  }



  fadeInTypelayout() {
    return this.typeLayout
      .animate({
        translate: { x: 0, y: 0 },
        duration: 150,
        opacity: 1
      })
  }

  fadeOutTypelayout() {
    return this.typeLayout
      .animate({
        translate: { x: 0, y: -200 },
        duration: 150,
        opacity: 0
      })
      .then(() => {

      });
  }


  fadeInProfilelayout() {
    return this.profileLayout
      .animate({
        translate: { x: 0, y: 0 },
        duration: 150,
        opacity: 1
      })
  }

  fadeOutProfilelayout() {
    return this.profileLayout
      .animate({
        translate: { x: 0, y: -200 },
        duration: 150,
        opacity: 0
      })
      .then(() => {

      });
  }

  fadeInWelcomelayout() {
    return this.welcomeLayout
      .animate({
        translate: { x: 0, y: 0 },
        duration: 150,
        opacity: 1
      })
  }
  focus() {
    this.weightText.focus();
  }
  pickOne() {
    this.enableOne = false;
    this.enableTwo = true;
    this.enableL = true;
    this.enableG = true
    this.input.type.value = "type 1"

  }
  pickTwo() {
    this.enableTwo = false;
    this.enableOne = true;
    this.enableL = true;
    this.enableG = true
    this.input.type.value = "type 2"

  }
  pickG() {
    this.enableG = false;
    this.enableTwo = true;
    this.enableL = true;
    this.enableOne = true
    this.input.type.value = "gestationnel"

  }
  pickL() {
    this.enableTwo = true;
    this.enableOne = true;
    this.enableG = true
    this.enableL = false;
    this.input.type.value = "lada"

  }
  nextRegister() {

    if (!this.showFirstNameStep) {
      if (this.validateEmail()) {
        this.showEmailStep = false;
        this.fadeOutEmaillayout().then(() => {
        });
        this.fadeInFirstlayout().then(() => {
          this.showFirstNameStep = true;
        })
      }
    }
    else if (!this.showLastNameStep) {
      if (this.validateFirst()) {
        this.fadeOutFirstlayout().then(() => {
        });
        this.fadeInLastlayout().then(() => {
          this.showLastNameStep = true;
        })
      }


    }
    else if (!this.showPasswordStep) {
      if (this.validateLast()) {
        this.fadeOutLastlayout().then(() => {
        });
        this.fadeInPasswordlayout().then(() => {
          this.showPasswordStep = true;
        })
      }
    }
    else if (!this.showConfirmPasswordStep) {
      if (this.validatePassword()) {
        this.fadeOutPasswordlayout().then(() => {
        });
        this.fadeInConfirmPasswordlayout().then(() => {
          this.showConfirmPasswordStep = true;
        })
      }
    }
    else if (!this.showTextStep) {
      if (this.validateConfirmPassword()) {
        this.register();
        this.fadeOutConfirmPasswordlayout().then(() => {
        });
        this.fadeInTextlayout().then(() => {
          this.showTextStep = true;
        })
      }
    }
    else if (!this.showProfileStep) {
      if (this.validateConfirmPassword()) {
        //this.register();
        this.fadeOutTextlayout().then(() => {
        });
        this.fadeInProfilelayout().then(() => {
          this.showProfileStep = true;
        })
      }
    }
    else if (!this.showTypeStep) {
      if (this.validateConfirmPassword()) {
        //this.register();
        this.fadeOutProfilelayout().then(() => {
        });
        this.fadeInTypelayout().then(() => {
          this.showTypeStep = true;
        })
      }
    }
    /* else if (!this.showWelcome) {
       this.fadeOutTextlayout().then(() => {
       });
       this.fadeInWelcomelayout().then(() => {
         this.showWelcome = true;
       })
     }*/
  }

  /*displayShowTextStep() {
    this.fadeOutConfirmPasswordlayout().then(() => {
      this.fadeInTextlayout().then(() => {
        this.showTextStep = true;
      })
    });

  }*/
  navigateToWelcome() {
    this.routerExtensions.navigate(["/welcome"], {
      /* queryParams: {
         newaccount: true
       }*/
    });
  }

  displayShowWelcome() {
    this.fadeOutTextlayout().then(() => {
    });
    this.fadeInWelcomelayout().then(() => {
      this.showWelcome = true;
    })
  }

  register() {

    if (this.formValidate()) {
      let creds;

      creds = {
        email: this.input.email.value,
        password: this.input.password.value
      };
      console.log(JSON.stringify(creds));

      this.store.dispatch(new appAction.ShowLoadingAction());
      this.authService.register(creds).subscribe(

        user => {
          let guestProfile: any;
          guestProfile = {
            name: this.input.firstname.value,
            lastname: this.input.lastname.value,
            userId: String(user.id),
            // email: this.input.email.value,
          };
          // guestProfile.email = this.input.email.value;
          console.log("user", user);
          console.log(JSON.stringify(user));
          this.authService
            .createGuestProfile(guestProfile)
            .subscribe(account => {
              setString("guest_profile", JSON.stringify(account));
              console.log(JSON.stringify(account));
              this.authService.login(creds).subscribe(success => {
                // this.displayShowTextStep()
                this.store.dispatch(new appAction.FireAction("login"));
                TNSFancyAlert.showSuccess("Success", "your register was successful");
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

      );
    }
  }


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


  validateEmail() {
    let Valide = true;
    if (this.validateService.isEmail(this.input.email.value)) {
      this.input.email.error = false;
    } else {
      this.input.email.error = true;
      Valide = false;
    }
    return Valide;
  }

  private validateFirst() {
    let Valide = true;
    if (
      !this.validateService.isEmpty(this.input.firstname.value) &&
      this.validateService.minLength(this.input.firstname.value, 2) &&
      this.validateService.maxLength(this.input.firstname.value, 25)
    ) {
      this.input.firstname.error = false;
    } else {
      this.input.firstname.error = true;
      Valide = false;
    }
    return Valide;
  }

  private validateLast() {
    let Valide = true;
    if (
      !this.validateService.isEmpty(this.input.lastname.value) &&
      this.validateService.minLength(this.input.lastname.value, 2) &&
      this.validateService.maxLength(this.input.lastname.value, 25)
    ) {
      this.input.lastname.error = false;
    } else {
      this.input.lastname.error = true;
      Valide = false;
    }
    return Valide;
  }

  private validatePassword() {
    let Valide = true;
    if (
      !this.validateService.isEmpty(this.input.password.value) &&
      this.validateService.minLength(this.input.password.value, 2) &&
      this.validateService.maxLength(this.input.password.value, 25)
    ) {
      this.input.password.error = false;
    } else {
      this.input.password.error = true;
      Valide = false;
    }
    return Valide;
  }

  private backtoPassword() {
    this.fadeInPasswordlayout().then(() => {
      this.showPasswordStep = true;
    })
    this.fadeOutConfirmPasswordlayout();
    this.showConfirmPasswordStep = false;

  }

  private validateConfirmPassword() {
    let Valide = true;
    if (
      !this.validateService.isEmpty(this.input.confirmpassword.value) &&
      this.validateService.minLength(this.input.confirmpassword.value, 2) &&
      this.validateService.maxLength(this.input.confirmpassword.value, 25) &&
      this.input.password.value == this.input.confirmpassword.value
    ) {
      this.input.confirmpassword.error = false;
    } else {
      this.input.confirmpassword.error = true;
      Valide = false;
    }
    return Valide;
  }

  private formValidate() {
    let formIsValide = true;
    if (!this.validateFirst() && !this.validateLast() && !this.validatePassword() && !this.validateEmail()
    ) {
      formIsValide = false;
    }
    return formIsValide;
  }


}
