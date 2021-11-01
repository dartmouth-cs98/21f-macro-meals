import { ADD_FOOD, REMOVE_FOOD } from '../actions/foodActions';

const initialState = {
  foodList: [],
};
const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOOD:
      return {
        ...state,
        foodList: state.foodList.concat({
          id: action.payload.id,
          name: action.payload.name,
          calories: action.payload.calories,
          protein: action.payload.protein,
          carb: action.payload.carb,
          fat: action.payload.fat,
        }),
      };
    case REMOVE_FOOD:
      return {
        ...state,
        foodList: state.foodList.filter((food) => food.id !== action.payload),
      };
    default:
      return state;
  }
};
export default foodReducer;
