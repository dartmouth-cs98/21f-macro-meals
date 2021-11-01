export const ADD_FOOD = 'ADD_FOOD';
export const REMOVE_FOOD = 'REMOVE_FOOD';
export const addFood = (food) => ({
  type: ADD_FOOD,
  payload: food,
});
export const removeFood = (id) => ({
  type: REMOVE_FOOD,
  payload: id,
});
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
