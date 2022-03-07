import { ActionTypes } from '../actions/spoonacularActions';

const initialState = {
  all: {},
  individ: [],
  problem: '',
};

const RecipeReducer = (state = initialState, recipe) => {
  const newAll = { ...state.all };
  switch (recipe.type) {
    case ActionTypes.FETCH_RECIPES:
      newAll[recipe.payload.cardID] = recipe.payload.data;
      return { all: newAll };
    case ActionTypes.FETCH_RECIPE_INFO:
      return {
        ...state,
        individ: recipe.payload.data,
      };
    case ActionTypes.FETCH_INGREDIENTS:
      return {
        ...state,
        ingredients: recipe.payload.data,
      };
    case ActionTypes.FETCH_INSTRUCTIONS:
      return {
        ...state,
        instructions: recipe.payload.data,
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
