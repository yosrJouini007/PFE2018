import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer
  } from "@ngrx/store";
  import { storeFreeze } from "ngrx-store-freeze";
  import * as fromApp from "./app.reducer";
  import * as fromFood from "./food.reducer";
  
  export interface State {
    app: fromApp.State;
    food:fromFood.State;
    
  }
  
  export const reducers: ActionReducerMap<State> = {
    app: fromApp.reducer,
    food:fromFood.reducer
    
  };
  
  export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: any): State {
      return reducer(state, action);
    };
  }
  
  export const getAppState = createFeatureSelector<fromApp.State>("app");
  export const getFoodsState = createFeatureSelector<fromFood.State>("foods");

 
  
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
  export const getFoods = createSelector(getFoodsState, fromFood.getFoods);

  export const getSelectedFood = createSelector(
    getFoodsState,
    fromFood.getSelectedFood
  );


  