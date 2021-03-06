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
          id: action.payload._id,
          key: action.payload._id,
          customName: action.payload.customName,
          mealTime: action.payload.mealTime,
          mood: action.payload.mood,
          imageUrl: action.payload.imageUrl,
          classification: action.payload.classification,
          calories: action.payload.calories,
          protein: action.payload.protein,
          carb: action.payload.carb,
          fat: action.payload.fat,
          confidence: action.payload.confidence,
          classificationTwo: action.payload.classificationTwo,
          caloriesTwo: action.payload.caloriesTwo,
          proteinTwo: action.payload.proteinTwo,
          carbTwo: action.payload.carbTwo,
          fatTwo: action.payload.fatTwo,
          confidenceTwo: action.payload.confidenceTwo,
          classificationThree: action.payload.classificationThree,
          caloriesThree: action.payload.caloriesThree,
          proteinThree: action.payload.proteinThree,
          carbThree: action.payload.carbThree,
          fatThree: action.payload.fatThree,
          confidenceThree: action.payload.confidenceThree,
          publicFood: action.payload.publicFood,
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
