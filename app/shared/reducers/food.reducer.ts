import { createSelector } from "reselect";
import * as foodActions from "../actions/food.actions";

export interface State {
  foodSelected: String;
  foods;
}
export const initialState: State = {
  foodSelected: "",
  foods: []
};

export function reducer(state = initialState, action: foodActions.All) {
  console.log(action.type);
  switch (action.type) {
    case foodActions.LOAD:
      let foods = action.payload.map(food => {
        return food;
      });
      return newState(state, {
        foods: foods
      });

    case foodActions.FIRE_LOAD:
      return state;

    case foodActions.SELECT:
      let currentFood;
      state.foods.map(Food => {
        if (Food.name == action.payload) {
          currentFood = Food;
        }
      });
      
      return newState(state, {
        foodSelected: currentFood
      });

    case foodActions.LOAD_COMPLETE:
      break;
    default:
      return state;
  }
}

export const getFoods = (state: State) => state.foods;
export const getSelectedFood = (state: State) => state.foodSelected;

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};
