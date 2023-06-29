import {
  CREATE_NEW_USER_FAILURE,
  CREATE_NEW_USER_REQUEST,
  CREATE_NEW_USER_SUCCESS,
  GET_USER_METADATA_FAILURE,
  GET_USER_METADATA_REQUEST,
  GET_USER_METADATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_REQUEST,
  CLEAR_USER_DATA_REQUEST,
  CLEAR_USER_DATA_SUCCESS,
  CLEAR_USER_DATA_FAILURE,
  SEND_FORGOT_EMAIL_FAILURE,
  SEND_FORGOT_EMAIL_SUCCESS,
  SEND_FORGOT_EMAIL_REQUEST,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USER_DATA_BY_USERNAME_FAILURE, GET_USER_DATA_BY_USERNAME_REQUEST,GET_USER_DATA_BY_USERNAME_SUCCESS,
  UPDATE_USER_DATA_FAILURE, UPDATE_USER_DATA_REQUEST, UPDATE_USER_DATA_SUCCESS,
  EDUCATION_FAILURE,
  EDUCATION_REQUEST,
  EDUCATION_SUCCESS,
  EXPERIENCE_REQUEST,
  EXPERIENCE_SUCCESS,
  EXPERIENCE_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  SUBMIT_GET_IN_TOUCH_FAILURE,
  SUBMIT_GET_IN_TOUCH_SUCCESS,
  SUBMIT_GET_IN_TOUCH_REQUEST,
  SUBMIT_SUBSCRIBE_FAILURE,
  SUBMIT_SUBSCRIBE_REQUEST,
  SUBMIT_SUBSCRIBE_SUCCESS,
  PROFILE_IMAGE_CHANGE,
  FILE_UPLOAD_PROGRESS,
  FILE_UPLOAD_SUCCESS
} from "../redux/ActionTypes";

const INITIAL_STATE = {
  loading: false,
  userMetaData: {
    email: "",
    photoURL: null,
  },
  user: {
    email: null,
    username: null,
  },
  isUsernameValid: false,
  profile: null,
  uploadPercentage: 0,
  fileUrl: null,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROFILE_IMAGE_CHANGE: 
      return{
        ...state,
        uploadPercentage: action.payload.progress,
        profile: {...state.profile, photoURL: action.payload}
      }
      case FILE_UPLOAD_SUCCESS:
      return{
        ...state,
        fileUrl: action.payload
      }
      case FILE_UPLOAD_PROGRESS: 
      return{
        ...state,
        uploadPercentage: action.payload,
      }
    case SUBMIT_GET_IN_TOUCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_GET_IN_TOUCH_SUCCESS:
      return {
        ...state,
        loading: false,
        contactUs: action.payload
      };
    case SUBMIT_GET_IN_TOUCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case SUBMIT_SUBSCRIBE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        loading: false,
        subscribe: action.payload
      };
    case SUBMIT_SUBSCRIBE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEND_FORGOT_EMAIL_REQUEST:
      return {
        loading: true,
        userMetaData: {
          email: "",
          photoURL: null,
        },
        user: null,
        isUsernameValid: false,
      };
    case SEND_FORGOT_EMAIL_SUCCESS:
      return {
        loading: true,
        userMetaData: {
          email: "",
          photoURL: null,
        },
        user: action.payload,
        isUsernameValid: true,
        error: null,
      };
    case SEND_FORGOT_EMAIL_FAILURE:
      return {
        loading: true,
        userMetaData: {
          email: "",
          photoURL: null,
        },
        isUsernameValid: false,
        user: null,
        error: action.payload,
      };
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        users: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case GET_USERS_FAILURE:
      return {
        users: null,
        error: action.payload,
      };
    case GET_USER_METADATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_METADATA_SUCCESS:
      return {
        ...state,
        loading: false,
        userMetaData: action.payload,
      };
    case GET_USER_METADATA_FAILURE:
      return {
        loading: false,
        isSet: false,
        userMetaData: {
          email: "",
          photoURL: null,
        },
        error: action.payload,
      };
    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case GET_USER_DATA_FAILURE:
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
        user: {},
      };
    case CLEAR_USER_DATA_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload,
        userMetaData: {
          email: null,
          photoURL: null,
        },
      };
    case UPDATE_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UPDATE_USER_DATA_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
      userMetaData: {
        email: null,
        photoURL: null,
      },
    };
    case EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
        education: null,
      };
    case EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isEducationSuccess: true,
        education: action.payload
      };
    case EDUCATION_FAILURE:
      return {
        ...state,
        isEducationSuccess: false,
        loading: false,
        education: null,
        error: action.payload,
      };
    case EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        experience: null,
      };
    case EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        isExperienceSuccess: true,
        experience: action.payload
      };
    case EXPERIENCE_FAILURE:
      return {
        ...state,
        isExperienceSuccess: false,
        loading: false,
        experience: null,
        error: action.payload,
      };
    case PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isProfileUpdateSuccess: true,
        user: action.payload,
      };
    case PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        isProfileUpdateSuccess: false,
        loading: false,
        error: action.payload,
      };

    case CREATE_NEW_USER_REQUEST:
      return {
        ...state,
        isSet: false,
        loading: true,
      };
    case CREATE_NEW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSet: true, 
      };
    case CREATE_NEW_USER_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
      case GET_USER_DATA_BY_USERNAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_DATA_BY_USERNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case GET_USER_DATA_BY_USERNAME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      default:
      return state;
  }
}

export default userReducer;
