import { LOADING } from "../redux/ActionTypes";
const INITIAL_STATE = {
    loading: false,
}
function loadingReducer(state = INITIAL_STATE , action){

    switch(action.type){
        case LOADING: 
            return {
               ...state,
                loading: action.payload,
            }
        default: {
            return state
        }
    }
}

export default loadingReducer;