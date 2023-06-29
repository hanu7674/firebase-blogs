import {GET_TEMPLATES_REQUEST,
    GET_TEMPLATES_SUCCESS,
    GET_TEMPLATES_FAILURE,
    GET_TEMPLATE_REQUEST,
    GET_TEMPLATE_SUCCESS,
    GET_TEMPLATE_FAILURE,
    ADD_TEMPLATE_REQUEST,
    ADD_TEMPLATE_SUCCESS,
    ADD_TEMPLATE_FAILURE,
    EDIT_TEMPLATE_REQUEST,
    EDIT_TEMPLATE_SUCCESS,
    EDIT_TEMPLATE_FAILURE,
    DELETE_TEMPLATE_REQUEST,
    DELETE_TEMPLATE_SUCCESS,
    DELETE_TEMPLATE_FAILURE, 
    } from "../redux/ActionTypes"

const init = {
    loading: true,
    templates: [],
    template: [],
    templateError: null,
    error: null,
    isAdding: null,
    isEditing: null,
    isDeleting: null,
    addingerror: null,
    editingerror: null,
    deletingerror: null,
    addSuccess: false,
}


const templatesReducer = (state = init, action) => {
    switch (action.type) {
      case GET_TEMPLATES_REQUEST:
        return {
        ...state,
          isLoading: true,
        };
      case GET_TEMPLATES_SUCCESS:
        return {
            ...state,
            loading: false,
            templates: action.payload
        };
      case GET_TEMPLATES_FAILURE:
        return {
            ...state,
            loading: false,
            templates: [],
          error: action.payload,
        };
        case GET_TEMPLATE_REQUEST:
        return {
        ...state,
          isLoading: true,
        };
      case GET_TEMPLATE_SUCCESS:
        return {
            ...state,
            loading: false,
            template: action.payload
        };
      case GET_TEMPLATE_FAILURE:
        return {
            ...state,
            loading: false,
            template: [],
            templateError: action.payload,
        };
      case ADD_TEMPLATE_REQUEST:
        return {
            ...state,
          isAdding: true,
    addSuccess: false,

        };
      case ADD_TEMPLATE_SUCCESS:
        return {...state, 
            addSuccess: true,
            templates: action.payload
          };
      case ADD_TEMPLATE_FAILURE:
        return {
            ...state,
          addingerror: action.payload,
          addSuccess: false,
        };
      case EDIT_TEMPLATE_REQUEST:
        return {
            ...state,
          isEditing: true,
          template: null
        };
      case EDIT_TEMPLATE_SUCCESS:
        return {
            ...state,
            template: action.payload,
        };
      case EDIT_TEMPLATE_FAILURE:
        return {
            ...state,
            template: null,
          editingerror: action.payload,
        };
      case DELETE_TEMPLATE_REQUEST:
        return {
            ...state,
            isDeleting: true,
        };
      case DELETE_TEMPLATE_SUCCESS:
      const filteredTemplates = state.templates.filter(
        (template) => template.id !== action.payload
      );
      return {
        ...state,
        isDeleting: false,
        templates: filteredTemplates,
      };
      case DELETE_TEMPLATE_FAILURE:
        return {
            ...state,
          deletingerror: action.payload,
        };
      default:
        return state;
    }
  };
  
export default templatesReducer;