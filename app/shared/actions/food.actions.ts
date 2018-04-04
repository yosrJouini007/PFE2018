import { Action } from "@ngrx/store";

export const LOAD = "[FOOD] Load";
export const ADD = "[FOOD ADD";
export const FIRE_LOAD = "[FOOD] Fire load";
export const SELECT = "[FOOD] Select";
export const LOAD_START = "[FOOD] Load";
export const LOAD_ERROR = "[FOOD] Load Error";
export const LOAD_COMPLETE = "[FOOD] Load";

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload) { }
}

export class AddAction implements Action {
  readonly type = ADD;
  constructor(public payload) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;
  constructor(public payload) { }
}

export class FireLoadAction implements Action {
  readonly type = FIRE_LOAD;
  constructor(public payload) {

  }
}

export class LoadCompleteAction implements Action {
  readonly type = LOAD_COMPLETE;
  constructor(public payload) { }
}

export type All =
  | LoadAction
  | FireLoadAction
  | SelectAction
  | LoadCompleteAction;
