import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

// Redux & RxJS
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/last";
import "rxjs/add/operator/distinctUntilChanged";
import { of } from "rxjs/observable/of";
import { map } from "rxjs/operator/map";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import * as appActions from "../actions/app.actions";

//Ui
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
var Toast = require("nativescript-toast");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

//Configs & Helper
var loader = new LoadingIndicator();
var options = {
  message: "Chargement...",
  progress: 0,
  android: {
    indeterminate: true,
    cancelable: true,
    cancelListener: function (dialog) {
      console.log("Loading cancelled");
    },
    max: 100,
    progressNumberFormat: "%1d/%2d",
    progressPercentFormat: 0.53,
    progressStyle: 0,
    secondaryProgress: 1
  },
  ios: {
    margin: 10,
    dimBackground: true,
    color: "#4B9ED6", // color of indicator and labels
    // background box around indicator
    // hideBezel will override this if true
    backgroundColor: "yellow",
    hideBezel: true // default false, can hide the surrounding bezel
  }
};

//import * as moment from "moment";

@Injectable()
export class AppEffects {
  private lastErrorDate: Date = new Date();
  private isShow = false;
  CHECK_YOUR_INTERNET_CONNEXION = "Check your internet connexion";

  @Effect({ dispatch: false })
  showLoading$: Observable<Action> = this.actions$
    .ofType(appActions.SHOW_LOADING)
    .do((action: any) => {
      if (!this.isShow) {
        this.isShow = true;
        loader.show(options);
      }
    });

  @Effect({ dispatch: false })
  hideLoading$: Observable<Action> = this.actions$
    .ofType(appActions.HIDE_LOADING || "LOAD_FAILED")
    .do((action: any) => {
      setTimeout(() => {
        if (this.isShow) {
          this.isShow = false;
          loader.hide();
        }
      });
    });

  @Effect({ dispatch: false })
  showToast$: Observable<Action> = this.actions$
    .ofType(appActions.SHOW_TOAST)
    .do((action: any) => {
      Toast.makeText(action.payload).show();
    });

  @Effect({ dispatch: false })
  showError$: Observable<Action> = this.actions$
    .ofType(appActions.SHOW_ERROR)
    .do((action: any) => {
      TNSFancyAlert.showError("Erreur", action.payload);
    });

  @Effect({ dispatch: false })
  showNoInternetConnexion$: Observable<Action> = this.actions$
    .ofType(appActions.NO_INTERNET)
    .debounceTime(1000)
    .map(val => val)
    .distinctUntilChanged()
    .do((action: any) => {
      TNSFancyAlert.showError("Erreur", this.CHECK_YOUR_INTERNET_CONNEXION);
    });

  constructor(private actions$: Actions) { }
}
