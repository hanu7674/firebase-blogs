import {
  GOOGLE_RECAPTCHA_FAILURE,
  GOOGLE_RECAPTCHA_REQUEST,
  GOOGLE_RECAPTCHA_SUCCESS,
  RESET_GOOGLE_RECAPTCHA_TOKEN,
} from "../redux/ActionTypes";
const INITIAL_STATE = {
  error: null,
  token: null,
  verified: false,
};
function recaptchaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOOGLE_RECAPTCHA_REQUEST:
      return {
        error: null,
        token: null,
        verified: false,
      };
    case GOOGLE_RECAPTCHA_SUCCESS:
      return {
        ...state,
        token: action.payload,
        verified: true,
      };
    case GOOGLE_RECAPTCHA_FAILURE:
      return {
        error: action.payload,
        token: null,
        verified: false,
      };
    case RESET_GOOGLE_RECAPTCHA_TOKEN:
      return {
        error: null,
        token: null,
        verified: false,
      };
    default: {
      return state;
    }
  }
}

export default recaptchaReducer;
