import { createSelector } from "reselect";
import * as stepActions from "../actions/steps.actions";
import { setString } from "tns-core-modules/application-settings/application-settings";

export interface State {
    stepSelected: String;
    steps;
}
export const initialState: State = {
    stepSelected: "",
    steps: []
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case stepActions.LOAD:
            return newState(state, {
                steps: action.payload
            });

        case stepActions.ADD:
            state.steps.push(action.payload);
            return newState(state, {
                steps: state.steps
            });
        case stepActions.SELECT:
            console.log("stepActions.SELECT stepActions.SELECT stepActions.SELECT")
            setString("current_step", JSON.stringify(action.payload));
            return newState(state, {
                stepSelected: action.payload
            });
        case stepActions.CLEAR_CURRENT:
            setString("current_step", "");
            return newState(state, {
                stepSelected: ""
            });

        case stepActions.LOAD_COMPLETE:
            break;
        default:
            return state;
    }
}

export const getSteps = (state: State) => state.steps;
export const getSelectedStep = (state: State) => state.stepSelected;

const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};
