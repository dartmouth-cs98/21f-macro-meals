import {ActionTypes} from '../actions/spoonacularActions';
const initialState = {
    all: [],
    problem: '',
};

const RecipeReducer = (state = initialState, post) => {
    switch (post.type) {
        case ActionTypes.FETCH_POST:
            return {
                all: post.payload.data,
            };
        case ActionTypes.ERROR:
            return {
                ...state,
                problem: post.payload.problem,
            };
        default:
            return state;
    }
};

export default RecipeReducer;