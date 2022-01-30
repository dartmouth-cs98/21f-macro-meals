import axios from 'axios';

// api calls to Spoonacular
const ROOT_URL = "https://api.spoonacular.com/recipes/complexSearch?&query=";
const API_KEY = "20acf5749c5d4842aec113b639c77e60";

// keys for action types
export const ActionTypes = {
    FETCH_RECIPES: 'FETCH_RECIPES',
    ERROR: 'ERROR',
}

// makes calls to Spoonacular, returns recipe
export function fetchRecipe(foodType, food){
    return (dispatch) => {
        axios.get(`${ROOT_URL}${foodType}&includeIngredients${food}&apiKey=${API_KEY}`).then((response) => {
            dispatch({ type: ActionTypes.FETCH_RECIPES, payload: {data: response.data}});
        }).catch((error) => {
            dispatch({ type: ActionTypes.ERROR, payload: { problem: `couldn't retrive recipe: ${error.message}`}})
        });
    };
} 