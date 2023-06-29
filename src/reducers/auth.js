import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SENT_EMAIL_VERIFICATION_FAILURE,
  SENT_EMAIL_VERIFICATION_SUCCESS,
  SENT_EMAIL_VERIFICATION_REQUEST,
  SEND_PASSWORD_RESET_EMAIL_FAILURE,
  SEND_PASSWORD_RESET_EMAIL_REQUEST,
  SEND_PASSWORD_RESET_EMAIL_SUCCESS,
  CLEAR_USER_DATA_REQUEST,
  CLEAR_USER_DATA_SUCCESS,
  CLEAR_USER_DATA_FAILURE,
  PASSWORD_VERIFY_FAILURE,
  PASSWORD_VERIFY_REQUEST,
  PASSWORD_VERIFY_SUCCESS,
  ACCOUNT_LINKING_FAILURE,
  ACCOUNT_LINKING_REQUEST,
  ACCOUNT_LINKING_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  OTP_FAILURE,
  OTP_REQUEST,
  OTP_SUCCESS,
  VERIFY_RECAPTCHA_FAILURE,
  VERIFY_RECAPTCHA_REQUEST,
  VERIFY_RECAPTCHA_SUCCESS,
  MULTIFACTOR_AUTH_FAILURE,
  MULTIFACTOR_AUTH_OPTIONS_FAILURE,
  MULTIFACTOR_AUTH_OPTIONS_REQUEST,
  MULTIFACTOR_AUTH_REQUEST,
  MULTIFACTOR_AUTH_OPTIONS_SUCCESS,
  MULTIFACTOR_AUTH_SUCCESS,
  MFA_AUTH_FAILURE,
  MFA_AUTH_REQUEST,
  MFA_AUTH_SUCCESS,
  GET_CURRENT_USER_DATA_REQUEST,
  GET_CURRENT_USER_DATA_SUCCESS,
  GET_CURRENT_USER_DATA_FAILURE,
  OTP_RESET,
  FETCH_SIGN_METHODS
} from "../redux/ActionTypes";
const INITIAL_STATE = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  loading: false,
  user: null,
  isEmailVerificationSent: false,
  isResetPasswordEmailSent: false,
  error: null,
  isPasswordVerifiedError:{
    code: '',
    message: ''
  },
  isLinkedError:{
    code: '',
    message: ''
  },
  isChangePasswordError:{
    code: '',
    message: ''
  },
  reCaptchaObject:'',
  reCaptcha:'',
  isReCaptchaError:{
    code: '',
    message: ''
  },
  mfaReCaptchaObject:'',
  mfaReCaptcha:'',
  isMFAReCaptchaError:{
    code: '',
    message: ''
  },
  isOtpError:{
    code: '',
    message: ''
  },
  otpObject: null,
  multifactors: {
    loading: false,
    obj: null,
    error: {
      code: '',
      message: ''
    }
  },
  signinMethods: null
};
function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case FETCH_SIGN_METHODS:
        return {
          ...state,
          signinMethods: action.payload
        }
      case VERIFY_RECAPTCHA_REQUEST:
      return {
        ...state,
        reCaptcha: true,
      }
      case VERIFY_RECAPTCHA_SUCCESS:
      return{
        ...state,
        reCaptcha: false,
        reCaptchaObject: action.payload,
      }
      case VERIFY_RECAPTCHA_FAILURE:
      return{
        ...state,
        reCaptcha: false,
        isReCaptchaError: action.payload
      }
      case MFA_AUTH_REQUEST:
      return {
        ...state,
        mfaReCaptcha: true,
      }
      case MFA_AUTH_SUCCESS:
      return{
        ...state,
        mfaReCaptcha: false,
        mfaReCaptchaObject: action.payload,
      }
      case MFA_AUTH_FAILURE:
      return{
        ...state,
        mfaReCaptcha: false,
        isMFAReCaptchaError: action.payload
      }
      case OTP_REQUEST:
      return {
        ...state,
        otpObject:null,
        sendingOtp: true,
        isOtpError:{
          code: '',
          message: ''
        },
      }
      case OTP_SUCCESS:
      return{
        ...state,
        sendingOtp: false,
        otpObject: action.payload,
        isOtpError:{
          code: '',
          message: ''
        },
      }
      case OTP_RESET: 
        return {
          ...state,
          otpObject:null,
        sendingOtp: false,
        isOtpError:{
          code: '',
          message: ''
        },
          loading: false,
          isPasswordVerifying: false,
          isPasswordVerified: false,
          isPasswordVerifiedError:{
            code: '',
            message: ''
          },
          signinMethods: null,
        isLinked: false,
          isLinkedError:{
            code: '',
            message: ''
          },
        }
      case OTP_FAILURE:
      return{
        ...state,
        otpObject: null,
        sendingOtp: false,
        isOtpError: action.payload
      }
      case MULTIFACTOR_AUTH_OPTIONS_REQUEST:
      return {
        ...state,
        multifactors: {
          loading: true,
          obj: null,
          error: null
        },
      }
      case MULTIFACTOR_AUTH_OPTIONS_SUCCESS:
      return{
        ...state,
        multifactors: {
          loading: false,
          obj: action.payload,
          error: null
        }
      }
      case MULTIFACTOR_AUTH_OPTIONS_FAILURE:
      return{
        ...state,
        multifactors: {
          loading: false,
          obj: null,
          error: action.payload
        }
      }
      case MULTIFACTOR_AUTH_REQUEST:
      return {
        ...state,
        otpObject:null,
        sendingOtp: true,
        isOtpError:{
          code: '',
          message: ''
        },
      }
      case MULTIFACTOR_AUTH_SUCCESS:
      return{
        ...state,
        sendingOtp: false,
        otpObject: action.payload,
        isOtpError:{
          code: '',
          message: ''
        },
      }
      case MULTIFACTOR_AUTH_FAILURE:
      return{
        ...state,
        sendingOtp: false,
        isOtpError: action.payload
      }
      case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,

        loading: true,
        isPasswordChanged: false,
      }
      case CHANGE_PASSWORD_SUCCESS:
      return{
        ...state,
        loading: false,
        isPasswordChanged: true,
      }
      case CHANGE_PASSWORD_FAILURE:
      return{
        ...state,

        loading: false,
        isPasswordChanged: false,
        isChangePasswordError: action.payload
      }
      case SEND_PASSWORD_RESET_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        isResetPasswordEmailSent: false
      }
      case SEND_PASSWORD_RESET_EMAIL_SUCCESS:
      return{
        ...state,
        loading: false,
        isResetPasswordEmailSent: true
      }
      case SEND_PASSWORD_RESET_EMAIL_FAILURE:
      return{
        ...state,
        loading: false,
        isResetPasswordEmailSent: false,
        error: action.payload
      }
      case SENT_EMAIL_VERIFICATION_REQUEST:
        return{
          ...state,
          isEmailVerificationSent: false,
          loading: true,
        }
      case SENT_EMAIL_VERIFICATION_SUCCESS:
        return{
        ...state,
        isEmailVerificationSent: true,
        loading: false

      }
      case SENT_EMAIL_VERIFICATION_FAILURE:
        return{
          ...state,
          isEmailVerificationSent: false,
          loading: false,
          error: action.payload,
        }
      case SET_CURRENT_USER:
      return {
        ...state,
          isAuthenticated: true,
          loading: false,
          currentUser: action.payload,
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        user: null,
        currentUser: null,
        loading: false

      };
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          isLoggingIn: true,
          loginError: false
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggingIn: false,
          isAuthenticated: true,
          loading: false
        };
      case LOGIN_FAILURE:

        return {
          ...state,
          isLoggingIn: false,
          isAuthenticated: false,
          loginError: action.payload,
          loading: false
        };
        case PASSWORD_VERIFY_REQUEST:
        return {
          ...state,
          loading: true,
          isPasswordVerifying: true,
        };
      case PASSWORD_VERIFY_SUCCESS:
        return {
          ...state,
          isPasswordVerifying: false,
          isPasswordVerified: true,
          loading: false,
        };
      case PASSWORD_VERIFY_FAILURE:

        return {
          ...state,
          loading: false,
          isPasswordVerifying: false,
          isPasswordVerified: false,
          isPasswordVerifiedError: action.payload
        };
      case LOGOUT_REQUEST:
        return {
          ...state,
          loading: true,
          isLoggingOut: true,
          logoutError: false
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isLoggingOut: false,
          isAuthenticated: false,
          user: null,
          currentUser: null,
          loading: false,
        };
      case LOGOUT_FAILURE:
        return {
          ...state,
          isLoggingOut: false,
          logoutError: true,
          loading: false,
        };
      case VERIFY_REQUEST:
        return {
          ...state,
          loading: true,
          isVerifying: true,
          verifyingError: false
        };
      case VERIFY_SUCCESS:
        return {
          ...state,
          isVerifying: false,
          loading: false,
        };
        case GET_CURRENT_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CURRENT_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case GET_CURRENT_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userMetaData: {
          email: null,
          photoURL: null,
        },
      };
    case CLEAR_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
      };
    case CLEAR_USER_DATA_FAILURE:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
      case ACCOUNT_LINKING_REQUEST:
      return {
        ...state,
        loading: true,
        isLinked: false,
      };
    case ACCOUNT_LINKING_SUCCESS:
      return {
        ...state,
        loading: false,
        isLinked: true,
      };
    case ACCOUNT_LINKING_FAILURE:
      return{
        ...state,
        loading: false,
        isLinked: false,
        isLinkedError: action.payload
      }

      default:
        return state;
    }
};

export default authReducer;