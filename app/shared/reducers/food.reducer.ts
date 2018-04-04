import { createSelector } from "reselect";
import * as foodActions from "../actions/food.actions";
import { foodDescription} from './food-interface';
//import { InitialState } from "@ngrx/store/src/models";

export interface State {
  foodSelected: String;
  foods:foodDescription[];
}
export const initialState: State = {
  foodSelected: "",
  foods: [ {  id: 1,
    name: 'Baguette',
    energie: 265,
    glucides: 59,
    proteines: 8,
    lipides: 1,
  },
  {  id: 3,
    name: 'Petit pain',
    energie: 271,
    glucides: 46.07,
    proteines: 8.57,
    lipides: 6.4,
  },
  {  id: 4,
    name: 'Pain aux céréales',
    energie: 265,
    glucides: 43.34,
    proteines: 13.36,
    lipides: 4.23,
  },
  {  id: 5,
    name: 'Pain Complet',
    energie: 296,
    glucides: 0.6,
    proteines: 9,
    lipides: 1.8,
  },
  {  id: 6,
    name: 'pain au son',
    energie: 227,
    glucides: 44.5,
    proteines: 9.5,
    lipides: 1.2,
  },
  {  id: 7,
    name: 'Chocolat Tris',
    energie: 534,
    glucides: 55.6,
    proteines: 8.9,
    lipides: 32.8,
  },
 ]
};

export function reducer(state = initialState, action: foodActions.All) {
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
      if(state)
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

export const getFoods = (state: State) => state.foods; //state
export const getSelectedFood = (state: State) => state.foodSelected;

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};
