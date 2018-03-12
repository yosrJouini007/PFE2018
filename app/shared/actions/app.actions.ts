import { Action } from "@ngrx/store";

export const LOAD = "[App] Load";
export const ADD = "[App] ADD";
export const SET_USER = "[App] SET_USER";
export const RESET_USER = "[App] RESET USER";
export const SHOW_ERROR = "[App] Show Error action";
export const FIRE_ACTION = "[App] Fire action";
export const SHOW_LOADING = "[App] Show Loading action";
export const HIDE_LOADING = "[App] Hide Loading action";
export const SET_CONNEXION = "[App] Set Connexion action";
export const NO_INTERNET = "[App] No Connexion action";
export const SHOW_TOAST = "[App] Show Toast action";
export const SELECT = "[App] Select";
export const LOAD_START = "[App] Load";
export const LOAD_ERROR = "[App] Load Error";
export const LOAD_COMPLETE = "[App] Load";
export const STARTED = "[App] Started";

export class FireAction implements Action {
  readonly type = FIRE_ACTION;
  constructor(public payload) {}
}
export class ShowLoadingAction implements Action {
  readonly type = SHOW_LOADING;
}

export class HideLoadingAction implements Action {
  readonly type = HIDE_LOADING;
}
export class SetConnexionAction implements Action {
  readonly type = SET_CONNEXION;
  constructor(public payload) {}
}

export class SetUserAction implements Action {
  readonly type = SET_USER;
  constructor(public payload) {}
}
export class SetStartAction implements Action {
  readonly type = STARTED;
}

export class NoInternetAction implements Action {
  readonly type = NO_INTERNET;
  constructor(public payload) {}
}

export class ShowToastAction implements Action {
  readonly type = SHOW_TOAST;
  constructor(public payload) {}
}

export class ShowErrorAction implements Action {
  readonly type = SHOW_ERROR;
  constructor(public payload) {}
}

export class RestUserAction implements Action {
  readonly type = RESET_USER;
}
export type All = FireAction | SetUserAction | SetStartAction;
