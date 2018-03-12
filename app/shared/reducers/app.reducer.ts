import { createSelector } from "reselect";
import * as appActions from "../actions/app.actions";

export interface State {
  user: any;
  lastAction: string;
  connexion: string;
  started: boolean;
}
export const initialState: State = {
  user: {},
  lastAction: "",
  connexion: "none",
  started: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_FAILED":
       console.log(JSON.stringify(action.payload));
      return newState(state , {});
    case appActions.FIRE_ACTION:
      return newState(state, {
        lastAction: action.payload
      });
    case appActions.STARTED:
      return newState(state, {
        started: true
      });
    case appActions.SET_CONNEXION:
      return newState(state, {
        connexion: action.payload
      });
    case appActions.SET_USER:
      return newState(state, {
        user: action.payload
      });
    case appActions.RESET_USER:
      return newState(state, {
        user: {}
      });

    default:
      return state;
  }
}

export const getLastAction = (state: State) => state.lastAction;
export const getCurrentUser = (state: State) => state.user;
export const getConnexionState = (state: State) => state.connexion;
export const getStartedState = (state: State) => state.started;

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};
