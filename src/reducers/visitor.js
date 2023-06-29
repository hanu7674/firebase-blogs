import { GET_VISITORS_COUNT_FAILURE, GET_VISITORS_COUNT_REQUEST, GET_VISITORS_COUNT_SUCCESS ,
    ADD_USER_COUNT_FAILURE, ADD_USER_COUNT_REQUEST, ADD_USER_COUNT_SUCCESS, REMOVE_USER_COUNT_FAILURE, REMOVE_USER_COUNT_REQUEST, REMOVE_USER_COUNT_SUCCESS} from "../redux/ActionTypes";
const INITIAL_STATE = {
    count: 0,
    error: null,
    loading: false,
    Userscount: 0,
}
function visitorReducer(state = INITIAL_STATE , action){

    switch(action.type){
        case GET_VISITORS_COUNT_REQUEST:
        return {
            ...state,
            error: null,
            loading: true,
            }
        case GET_VISITORS_COUNT_SUCCESS:
        return {
            ...state,
            count: action.payload,
            error: null,
            loading: false,
        }
        case GET_VISITORS_COUNT_FAILURE:
        return {
            ...state,
            error: action.payload,
            loading: false,
            }       
            case ADD_USER_COUNT_REQUEST:
                return {
                    ...state,
                    error: null,
                    loading: true,
                };
            case ADD_USER_COUNT_SUCCESS:
                return {
                    ...state,
                    Userscount: state.count + 1,
                    error: null,
                    loading: false,
                };
            case ADD_USER_COUNT_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                };
            case REMOVE_USER_COUNT_REQUEST:
                return {
                    ...state,
                    error: null,
                    loading: true,
                };
            case REMOVE_USER_COUNT_SUCCESS:
                return {
                    ...state,
                    Userscount: state.count - 1,
                    error: null,
                    loading: false,
                };
            case REMOVE_USER_COUNT_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                }; 
        default: {
            return state
        }
    }
}

export default visitorReducer;