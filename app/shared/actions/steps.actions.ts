import { Action } from '@ngrx/store';

export const LOAD = '[Steps] Load';
export const ADD = '[Steps] ADD';
export const START_STEPS = '[Steps] Start Steps';
export const CLEAR_CURRENT = '[Steps] Clear Steps';
export const STOP_STEPS = '[Steps] Stop Steps';
export const FIRE_LOAD = '[Steps] Fire load';
export const SELECT = '[Steps] Select';
export const LOAD_START = '[Steps] Load';
export const LOAD_ERROR = '[Steps] Load Error';
export const LOAD_COMPLETE = '[Steps] Load';

export class LoadAction implements Action {
    readonly type = LOAD;
    constructor(public payload) {
    }
}

export class AddAction implements Action {
    readonly type = ADD;
    constructor(public payload) {
    }
}

export class SelectAction implements Action {
    readonly type = SELECT;
    constructor(public payload) {
    }
}

export class FireLoadAction implements Action {
    readonly type = FIRE_LOAD;
    constructor(public payload) {

    }
}

export class ClearCurrentStepsAction implements Action {
    readonly type = CLEAR_CURRENT;
    constructor(public payload) {

    }
}


export class LoadCompleteAction implements Action {
    readonly type = LOAD_COMPLETE;
    constructor(public payload) {

    }
}

export class StartStepsAction implements Action {
    readonly type = START_STEPS;
    constructor(public payload) {

    }
}

export class StopStepsAction implements Action {
    readonly type = STOP_STEPS;
    constructor(public payload) {

    }
}


export type All
    = LoadAction
    | FireLoadAction
    | StopStepsAction
    | SelectAction
    | StartStepsAction
    | LoadCompleteAction;