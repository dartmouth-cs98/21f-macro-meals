import { ActionTypes } from '../actions/spoonacularActions';

const initialState = {
  all: [],
  individ: [],
  problem: '',
};

const RecipeReducer = (state = initialState, recipe) => {
  switch (recipe.type) {
    case ActionTypes.FETCH_RECIPES:
      return {
        all: recipe.payload.data,
      };
    case ActionTypes.FETCH_RECIPE_INFO:
      return {
        ...state,
        individ: recipe.payload.data,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        problem: recipe.payload.problem,
      };
    default:
      return state;
  }
};

export default RecipeReducer;
