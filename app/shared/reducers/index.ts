import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer
  } from "@ngrx/store";
  import { storeFreeze } from "ngrx-store-freeze";
  import * as fromApp from "./app.reducer";
  
  export interface State {
    app: fromApp.State;
  }
  
  export const reducers: ActionReducerMap<State> = {
    app: fromApp.reducer
  };
  
  export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: any): State {
      return reducer(state, action);
    };
  }
  
  export const getAppState = createFeatureSelector<fromApp.State>("app");
 
  
  export const getUser = createSelector(getAppState, fromApp.getCurrentUser);
  export const getConnexionState = createSelector(
    getAppState,
    fromApp.getConnexionState
  );
  export const getStartedState = createSelector(
    getAppState,
    fromApp.getStartedState
  );
  export const getLastAction = createSelector(getAppState, fromApp.getLastAction);

  