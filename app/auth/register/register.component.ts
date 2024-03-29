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
import { ListPicker } from "ui/list-picker";
let genreList = ["Homme", "Femme"];
let activityList = ["Actif", "Moins actif", "Inactif", "Extra actif"];

@Component({
  selector: "register-auth",
  moduleId: module.id,
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("firstNameText") firstNameTextRef: ElementRef;
  @ViewChild("emailText") emailTextRef: ElementRef;
  @ViewChild("sizeText") sizeTextRef: ElementRef;
  @ViewChild("weightText") weightTextRef: ElementRef;
  @ViewChild("ageText") ageTextRef: ElementRef;
  @ViewChild("lastNameText") lastNameTextRef: ElementRef;
  @ViewChild("passwordText") passwordTextRef: ElementRef;
  @ViewChild("passwordConfirmText") passwordConfirmTextRef: ElementRef;
  @ViewChild("firstNameLayout") firstNameLayoutRef: ElementRef;
  @ViewChild("lastNameLayout") lastNameLayoutRef: ElementRef;
  @ViewChild("passwordLayout") passwordLayoutRef: ElementRef;
  @ViewChild("confirmPasswordLayout") confirmPasswordLayoutRef: ElementRef;
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
  private get ageText(): TextField {
    return this.ageTextRef.nativeElement;
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


  EXIST_PHONE_NUMBER = "Adresse mail existe";
  USE_AN_OTHER_EMAIL = "Utiliser une autre adresse mail";
  input: any;
  public genre: Array<string>;
  public sexe: string;
  public activity: Array<string>;
  public pickedActivity: string;
  activityRate: number;
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
      age: {
        value: "",
        error: false
      },
      type: {
        value: "",
      },

    };
    this.genre = [];

    for (let i = 0; i < genreList.length; i++) {
      this.genre.push(genreList[i]);
    }
    this.activity = [];

    for (let i = 0; i < activityList.length; i++) {
      this.activity.push(activityList[i]);
    }

  }



  ngOnInit(): void {
    
    this.fadeInEmaillayout();
    //this.nextRegister();

  }
  public selectedIndexChangedSexe(args) {
    let picker = <ListPicker>args.object;
    console.log("picker selection: " + picker.selectedIndex);

    this.sexe = this.genre[picker.selectedIndex];
  }
  public selectedIndexChangedActivity(args) {
    let picker = <ListPicker>args.object;
    console.log("picker selection: " + picker.selectedIndex);

    this.pickedActivity = this.activity[picker.selectedIndex];
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
    if (this.validateSize()) {
      this.weightText.focus();
    }
  }
  focusAge() {
    if (this.validateWeight()) {
      this.ageText.focus();
    }
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
    /*  else if (!this.showTextStep) {
        if (this.validateConfirmPassword()) {
          this.register();
          this.fadeOutConfirmPasswordlayout().then(() => {
          });
          this.fadeInTextlayout().then(() => {
            this.showTextStep = true;
          })
        }
      }*/
    else if (!this.showProfileStep) {
      if (this.validateConfirmPassword()) {
        //this.register();
        this.fadeOutConfirmPasswordlayout().then(() => {
        });
        this.fadeInProfilelayout().then(() => {
          this.showProfileStep = true;
        })
      }
    }
    else if (!this.showTypeStep) {
      if (this.validateProfile()) {

        this.fadeOutProfilelayout().then(() => {
        });
        this.fadeInTypelayout().then(() => {
          this.showTypeStep = true;
        })
        //this.register();
      }
      else {
        TNSFancyAlert.showError("Erreur", "Veuillez remplir tous les champs")

      }
    }
    else if (!this.showWelcome) {
      //  this.register();
      this.fadeOutTypelayout().then(() => {
      });
      this.fadeInWelcomelayout().then(() => {
        this.showWelcome = true;
      })
    }
  }

  navigateToWelcome() {
    this.routerExtensions.navigate(["/home-connected"], {
      queryParams: {
        newaccount: true
      }
    });
  }

  navigateToIntro() {
    this.routerExtensions.navigate(["/intro"], {
      queryParams: {
        newaccount: true
      }
    });
  }
  /*  displayShowWelcome() {
      this.fadeOutTypelayout().then(() => {
      });
      this.fadeInWelcomelayout().then(() => {
        this.showWelcome = true;
      })
    }*/

  register() {

    if (this.formValidate()) {
      let creds;

      creds = {
        email: this.input.email.value,
        password: this.input.password.value
      };
      console.log(JSON.stringify(creds));
      this.authService.register(creds)
      this.store.dispatch(new appAction.ShowLoadingAction());


      let profile: any;
      profile = {
        name: this.input.firstname.value,
        lastname: this.input.lastname.value,
        weight: this.input.weight.value,
        age: this.input.age.value,
        size: this.input.size.value,
        type: this.input.type.value,
        sexe: this.sexe,
        activity: this.pickedActivity,
        // userId: String(profile.id),
        // email: this.input.email.value,
      };
      profile.email = this.input.email.value;

      this.store.dispatch(new appAction.SetUserAction(profile));
      this.authService.createGuestProfile(profile);
      setBoolean("authenticated", true);
      this.countGoals();
      // this.displayShowTextStep()
      this.store.dispatch(new appAction.FireAction("login"));
      TNSFancyAlert.showSuccess("Success", "Inscription effectué");
      this.navigateToIntro();
      this.store.dispatch(new appAction.HideLoadingAction());
    }
    else {
      this.store.dispatch(new appAction.HideLoadingAction());
      TNSFancyAlert.showError("Erreur", "Email existe")
    }

  }
  countGoals() {
    let bmr;
    switch (this.pickedActivity) {
      case "Actif": this.activityRate = 1.55;
      case "Inactif": this.activityRate = 1.2;
      case "Moins actif": this.activityRate = 1.375;
      case "Extra actif": this.activityRate = 1.725;
    }
    if (this.sexe == "Homme") { // 66.47+ (13.75 x W) + (5.0 x H) - (6.75 x A)
      bmr = 66.47 + (13.75 * this.input.weight.value) + (5.0 * this.input.size.value) - (6.75 * this.input.age.value)
    }
    else {//665.09 + (9.56 x W) + (1.84 x H) - (4.67 x A)
      bmr =665.09+(9.56*this.input.weight.value)+(1.84 * this.input.size.value)-(4.67 * this.input.age.value)
    }
    let goals;
    goals={
      goalToConsume:bmr*this.activityRate,
      goalToBurn:1000,
    }
    setString("goalsData", JSON.stringify(goals));
  }

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
  validateSize() {
    let Valide = true;
    if (!this.validateService.isEmpty(this.input.size.value) && this.validateService.isNumber(this.input.size.value)) {

      this.input.size.error = false;
    } else {
      this.input.size.error = true;
      Valide = false;
    }
    return Valide;
  }
  validateWeight() {
    let Valide = true;
    if (!this.validateService.isEmpty(this.input.weight.value) && this.validateService.isNumber(this.input.weight.value)) {

      this.input.weight.error = false;
    } else {
      this.input.weight.error = true;
      Valide = false;
    }
    return Valide;
  }
  validateAge() {
    let Valide = true;
    if (!this.validateService.isEmpty(this.input.age.value) && this.validateService.isAge(this.input.age.value)) {

      this.input.age.error = false;
    } else {
      this.input.age.error = true;
      Valide = false;
    }
    return Valide;
  }
  validateProfile() {
    let formIsValide = true;
    if (!this.validateSize() && !this.validateAge() && !this.validateWeight()
    ) {
      formIsValide = false;
    }
    return formIsValide;
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
  public backToHome() {
    this.routerExtensions.navigate(["/home"], {
        clearHistory: true,
    });
}


}
