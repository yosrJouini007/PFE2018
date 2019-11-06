import { Component, OnInit, ViewChild, NgZone, ElementRef } from "@angular/core";

//Ui
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import * as dialogs from "ui/dialogs";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
let frameModule = require("tns-core-modules/ui/frame");

import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";

//Redux & RxJS
import { Store } from "@ngrx/store";
import * as fromRoot from "./../../shared/reducers";
import * as appAction from "./../../shared/actions/app.actions";
import { Observable } from "tns-core-modules/data/observable";

//Services
import { ValidateService } from "../shared/validate.service";
import { AuthService } from "../shared/auth.service";

//Platform
import {
  getBoolean,
  setBoolean,
  getString,
  setString,
  remove
} from "application-settings";

//Router
import { RouterExtensions } from "nativescript-angular/router";


@Component({
  selector: "profile-auth",
  moduleId: module.id,
  templateUrl: "./profile.component.html",
 styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

  creds: any;
  profileData: any;
  @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
  private _sideDrawerTransition: DrawerTransitionBase;
  input: any;
  mode: string = "phone";
  _phone: string;
  private currentUser: any;
  UPDATE_SUCCESS = "Mise à jour effectuée avec succès.";
  UPDATE_SUCCESS_PASSWORD = "Votre mot de passe a été mis à jour.";
  INVALID_CURRENT_PASSWORD = "Votre mot de passe actuel est invalide.";
  @ViewChild("newpassword") newpasswordRef: ElementRef;
  @ViewChild("confirmnewpassword") confirmnewpasswordRef: ElementRef;
  @ViewChild("firstName") firstNameRef: ElementRef;
  @ViewChild("lastName") lastNameRef: ElementRef;
  @ViewChild("size") sizeRef: ElementRef;
  @ViewChild("weight") weightRef: ElementRef;
  private get firstNameEl(): TextField {
    return this.firstNameRef.nativeElement;
  }
  private get lastNameEl(): TextField {
    return this.lastNameRef.nativeElement;
  }
  private get sizeEl(): TextField {
    return this.sizeRef.nativeElement;
  }
  private get weightEl(): TextField {
    return this.weightRef.nativeElement;
  }
  private get newpasswordEl(): TextField {
    return this.newpasswordRef.nativeElement;
  }
  private get confirmnewpasswordEl(): TextField {
    return this.confirmnewpasswordRef.nativeElement;
  }
  constructor(
    private validateService: ValidateService,
    private routerExtensions: RouterExtensions,
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private zone: NgZone
  ) {

   // this._phone = getString("phoneNumber", null);
   this.profileData=JSON.parse(getString("profile", "{}"));
   this.creds=JSON.parse(getString("account", "{}"));
    this.input = {
      email: {
        value:this.creds.email,
        error: false
      },
      password: {
        value: this.creds.password,
        error: false
      },
      newpassword: {
        value: "",
        error: false
      },
      confirmpassword: {
        value: "",
        error: false
      },
      firstname: {
        value: this.profileData.name,
        error: false
      },
      lastname: {
        value: this.profileData.lastname,
        error: false
      },
      size: {
        value: this.profileData.size,
        error: false
      },
      weight: {
        value: this.profileData.weight,
        error: false
      },
  
    };
  }

  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.store.select(fromRoot.getUser).subscribe((user: any) => {
      this.currentUser = user;
      this.input.lastname.value = this.currentUser.name;
      this.input.firstname.value = this.currentUser.lastname;
    })
  }

  navigateTologin() {
    this.routerExtensions.navigate(["auth", "login"], {
      transition: {
        name: "slide"
      }
    });
  }
  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  updatePassword() {
    if (!this.passwordFormValide())
      return false;
    this.store.dispatch(new appAction.ShowLoadingAction());

    this.authService.changePassword(this.input.password.value, this.input.newpassword.value).subscribe(() => {
      this.store.dispatch(new appAction.HideLoadingAction());
    }, error => {
      this.store.dispatch(new appAction.HideLoadingAction());
      // legacy mode
      let invalidPassword = JSON.stringify(error).indexOf("Invalid current password") !== -1;
      if (invalidPassword) {
        TNSFancyAlert.showError(
          "Erreur!",
          this.INVALID_CURRENT_PASSWORD
        );
      } else {
        TNSFancyAlert.showSuccess(
          "Success!",
          this.UPDATE_SUCCESS_PASSWORD
        );
      }
      this.input.password.value = "";
      this.input.password.error = false;
      this.input.newpassword.value = "";
      this.input.newpassword.error = false;
      this.input.confirmpassword.value = "";
      this.input.confirmpassword.error = false;
    })
  }

  onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

  updateProfile() {
    console.log(this.formValidate());
    if (this.formValidate()) {
      let creds;
      
        creds = {
          email: this.input.email.value,
          password: this.input.password.value
        };
     
        
      

      this.store.dispatch(new appAction.ShowLoadingAction());
      setString("account", JSON.stringify(creds));
      let guestProfile: any;
      guestProfile = {
        name: this.input.firstname.value,
        lastname: this.input.lastname.value,
        weight: this.input.weight.value,
        size: this.input.size.value,
      };
     
        guestProfile.email = this.input.email.value;
      this.authService
        .updateGuestProfile(guestProfile, this.currentUser.id)
        .subscribe(account => {
          this.store.dispatch(new appAction.HideLoadingAction());
          let _account = JSON.stringify(account);
          TNSFancyAlert.showSuccess(
            "Success!",
            this.UPDATE_SUCCESS
          );
        }, error => {
          this.store.dispatch(new appAction.HideLoadingAction());
          console.log(JSON.stringify(error))
        });

    }
  }
  private passwordFormValide() {
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
    if (
      !this.validateService.isEmpty(this.input.newpassword.value) &&
      this.validateService.minLength(this.input.newpassword.value, 2) &&
      this.validateService.maxLength(this.input.newpassword.value, 25)
    ) {
      this.input.newpassword.error = false;
    } else {
      this.input.newpassword.error = true;
      formIsValide = false;
    }
    if (
      !this.validateService.isEmpty(this.input.confirmpassword.value) &&
      this.validateService.minLength(this.input.confirmpassword.value, 2) &&
      this.validateService.maxLength(this.input.confirmpassword.value, 25) &&
      this.input.confirmpassword.value == this.input.newpassword.value
    ) {
      this.input.confirmpassword.error = false;
    } else {
      this.input.confirmpassword.error = true;
      formIsValide = false;
    }
    return formIsValide;
  }
  private formValidate() {
    let formIsValide = true;
      if (this.validateService.isEmail(this.input.email.value)) {
        this.input.email.error = false;
      } else {
        this.input.email.error = true;
      }
    
    if (
      !this.validateService.isEmpty(this.input.firstname.value) &&
      this.validateService.minLength(this.input.firstname.value, 2) &&
      this.validateService.maxLength(this.input.firstname.value, 25)
    ) {
      this.input.firstname.error = false;
    } else {
      this.input.firstname.error = true;
      formIsValide = false;
    }
    if (
      !this.validateService.isEmpty(this.input.lastname.value) &&
      this.validateService.minLength(this.input.lastname.value, 2) &&
      this.validateService.maxLength(this.input.lastname.value, 25)
    ) {
      this.input.lastname.error = false;
    } else {
      this.input.lastname.error = true;
      formIsValide = false;
    }
    if (!this.validateService.isEmpty(this.input.size.value))
    {
      this.input.size.error = false;
    } else {
      this.input.size.error = true;
      formIsValide = false;
    }
    if (!this.validateService.isEmpty(this.input.weight.value))
    {
      this.input.weight.error = false;
    } else {
      this.input.weight.error = true;
      formIsValide = false;
    }
    return formIsValide;
  }
  public backToProfil() {
    this.routerExtensions.navigate(["/profil"], {
       // clearHistory: true,
    });
}
  nextInput(input) {
    switch (input) {
      case 'newpassword':
        this.newpasswordEl.focus();
        break;
      case 'confirmnewpassword':
        this.confirmnewpasswordEl.focus();
        break;
      case 'firstName':
        this.firstNameEl.focus();
        break;
      case 'lastName':
        this.lastNameEl.focus();
        break;
        case 'size':
        this.sizeEl.focus();
        break;
        case 'weight':
        this.weightEl.focus();
        break;
    }
  }
}
