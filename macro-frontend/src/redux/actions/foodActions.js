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
