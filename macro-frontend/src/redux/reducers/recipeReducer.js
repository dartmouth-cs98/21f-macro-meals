import { ActionTypes } from '../actions/spoonacularActions';

const initialState = {
  all: [],
  problem: '',
};

const RecipeReducer = (state = initialState, recipe) => {
  switch (recipe.type) {
    case ActionTypes.FETCH_POST:
      return {
        all: recipe.payload.data,
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
