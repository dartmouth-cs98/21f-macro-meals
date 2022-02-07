import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import userReducer from './userReducer';
import RecipeReducer from './recipeReducer';

export default combineReducers({
  food: foodReducer,
  user: userReducer,
  recipe: RecipeReducer,
});
