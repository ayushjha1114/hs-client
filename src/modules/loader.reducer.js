import { IS_LOADING } from '../constants/actionsConstants';

const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}