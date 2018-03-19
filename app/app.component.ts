import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

// Redux & RxJS
import { Store } from "@ngrx/store";
import * as fromRoot from "./shared/reducers";
import * as appAction from "./shared/actions/app.actions";

//Platform & settings 
//import { API_URL } from "./shared/settings/settings.static";
import * as connectivity from "connectivity";
import { LoopBackConfig, LoopBackAuth } from "./shared/sdk";

import {
  getBoolean,
  setBoolean,
  setString,
  getString,
  clear,
  remove
} from "application-settings";

//Services
import { GuestsApi } from "./shared/sdk";


@Component({
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  private isFirstTime;
 // private API_URL = API_URL;
  constructor(
    private store: Store<fromRoot.State>,
    private router: RouterExtensions,
    private loopBackAuth: LoopBackAuth,
    private guestsApi: GuestsApi
  ) {
   // LoopBackConfig.setBaseURL(API_URL.replace("/api/", ""));
   /* LoopBackConfig.setApiVersion("api");
    connectivity.startMonitoring((connectionType: number) => {
      switch (connectionType) {
        case connectivity.connectionType.none:
          this.store.dispatch(new appAction.SetConnexionAction("NONE"));
          break;
        case connectivity.connectionType.wifi:
          this.store.dispatch(new appAction.SetConnexionAction("WIFI"));
          break;
        case connectivity.connectionType.mobile:
          this.store.dispatch(new appAction.SetConnexionAction("MOBILE"));
          break;
        default:
          break;
      }
    });*/
  }

  ngOnInit() {
    let user = this.loopBackAuth.getCurrentUserData();
    if (this.loopBackAuth.getCurrentUserData()) {
      this.loadProfile();
    }

    // Load current session after the OS or User kill the app
    /*
    let currentSessionSTR = getString("current_session", "");
    try {
      let currentSession = JSON.parse(currentSessionSTR);
      this.store.dispatch(
        new sessionAction.SelectAction(currentSession.startAt)
      );

      console.log(currentSession.startAt);
      this.store.dispatch(
        new stopWatchAction.StartAction({
          gym: {}
        })
      );
    } catch (e) {
      console.log("current session error");
      console.log(e);
    }
    */

    this.store.select(fromRoot.getLastAction).subscribe(action => {
      if (action == "logout") {
        this.router.navigate(["home"], {
          clearHistory: true,
          transition: {
            name: "slide"
          }
        });
        this.store.dispatch(new appAction.RestUserAction());
        remove("guest_profile");
        remove("phoneNumber");
      } else if (action == "login") {
        let user = this.loopBackAuth.getCurrentUserData();
        this.loadProfile();
      }
    });

    this.isFirstTime = getBoolean("isFirstTime", true);
    setBoolean("isFirstTime", false);

    //First load after the Install
    if (this.isFirstTime) {
      this.router.navigate(["/alimentation"], {
        clearHistory: true,
        transition: {
          name: "fade",
          duration: 200,
          curve: "linear"
        }
      });
    } else {
      // Load Gym page from the the second load
      this.router.navigate(["/alimentation"], {
        transition: {
          clearHistory: true,
          name: "fade",
          duration: 200,
          curve: "linear"
        }
      });
    }
  }

  loadProfile() {
    let _userId = this.loopBackAuth.getCurrentUserId();
    console.log("_userId");
    console.log(_userId);
    this.guestsApi
      .findOne({
        where: {
          userId: { eq: _userId }
        }
      })
      .subscribe(
        (profile: any) => {
          setString("guest_profile", JSON.stringify(profile));
          this.store.dispatch(new appAction.SetUserAction(profile));
         
        },
        error => {
          let profile = getString("guest_profile", "{}");
          try {
            let profileJSON = JSON.parse(profile);
            this.store.dispatch(new appAction.SetUserAction(profileJSON));
          } catch (e) {
            console.log('Error : ' + JSON.stringify(e));
          }
        }
      );
  }
}
