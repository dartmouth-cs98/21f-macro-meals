import axios from 'axios';

// api calls to Spoonacular
const ROOT_URL = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
const API_KEY = '20acf5749c5d4842aec113b639c77e60';

// keys for action types
export const ActionTypes = {
  FETCH_RECIPES: 'FETCH_RECIPES',
  ERROR: 'ERROR',
};

// makes calls to Spoonacular, returns recipe
export function fetchRecipe(food) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}${food}&number=3&apiKey=${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RECIPES, payload: { data: response.data } });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR, payload: { problem: `couldn't retrive recipe: ${error.message}` } });
    });
  };
}
