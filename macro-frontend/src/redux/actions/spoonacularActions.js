import axios from 'axios';

// api calls to Spoonacular
const ROOT_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = '20acf5749c5d4842aec113b639c77e60';

// keys for action types
export const ActionTypes = {
  FETCH_RECIPES: 'FETCH_RECIPES',
  FETCH_RECIPE_INFO: 'FETCH_RECIPE_INFO',
  FETCH_INGREDIENTS: 'FETCH_INGREDIENTS',
  FETCH_INSTRUCTIONS: 'FETCH_INSTRUCTIONS',
  ERROR: 'ERROR',
};

// makes calls to Spoonacular, returns recipe
export function fetchRecipe(food) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/findByIngredients?ingredients=${food}&number=3&apiKey=${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RECIPES, payload: { data: response.data } });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR, payload: { problem: `couldn't retrive recipe: ${error.message}` } });
    });
  };
}

// returns the recipe information and summary
export function fetchRecipeInfo(mealId) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${mealId}/summary?apiKey=${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RECIPE_INFO, payload: { data: response.data } });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR, payload: { problem: `couldn't retrieve recipe information: ${error.meessage}` } });
    });
  };
}

// returns the full ingredient list
export function fetchIngredients(recipeId) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${recipeId}/information?apiKey=${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_INGREDIENTS, payload: { data: response.data } });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR, payload: { problem: `couldn't retrieve recipe information: ${error.messagee}` } });
    });
  };
}

// returns the full instructions
export function fetchRecipeInstructions(recipeId) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${recipeId}/analyzedInstructions?apiKey=${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_INSTRUCTIONS, payload: { data: response.data } });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR, payload: { problem: `couldn't retrieve recipe instructions: ${error.message}` } });
    });
  };
}
