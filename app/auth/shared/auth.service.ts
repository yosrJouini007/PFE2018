import { Injectable } from "@angular/core";

//SDK & API
import {
  UserApi,
  LoopBackAuth,
  GuestsApi
} from "../../shared/sdk";

//Redux & RxJS
import { Store } from "@ngrx/store";
import * as fromRoot from "./../../shared/reducers";
import * as appAction from "./../../shared/actions/app.actions";

//Services
var fetchModule = require("fetch");
import { Http, Headers } from "@angular/http";
import { getString, setString, setBoolean } from "tns-core-modules/application-settings/application-settings";

@Injectable()
export class AuthService {
  constructor(
    private http: Http,
    private userApi: UserApi,
    private auth: LoopBackAuth,
    private guestsApi: GuestsApi,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getLastAction).subscribe(action => {
      if (action == "logout") {
        this.logout();
      }
    });
  }

  getUser() {
    return this.auth.getCurrentUserData();
  }

  getUserId() {
    return this.auth.getCurrentUserId();
  }

  login(credentials) {
    
   // return this.userApi.login(credentials);
   let userString =JSON.parse(getString("account", "{}"));
 try {
     
     return (userString);

   } catch (e) {
     return  {}
   }
    
  
 }
  

  logout() {
    return this.userApi.logout();
  }

  register(credentials) {
   //return this.userApi.create(credentials);
   setString("account", JSON.stringify(credentials));
   
  }
  changePassword(oldpassword, newpassword) {
    return this.userApi.changePassword(oldpassword, newpassword)
  }


  createGuestProfile(data: any) {
    //return this.guestsApi.create(data);
    setString("profile", JSON.stringify(data));
    setBoolean("authenticated", true);

  }

  updateGuestProfile(data: any, profile_id) {
    return this.guestsApi.patchAttributes(profile_id, data);
  }


  setGuestProfile(profile_id: string) {
    return this.userApi.updateByIdAccessTokens(
      this.auth.getCurrentUserId(),
      this.auth.getAccessTokenId(),
      {
        profile_id: profile_id
      }
    );
  }
  
}
