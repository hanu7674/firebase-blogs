import { ADD_BLOG_FAILURE, ADD_BLOG_REQUEST, ADD_BLOG_SUCCESS, ADD_COMMENT, ADD_LIKE, APPEND_BLOGS, BLOGS_LIMIT_SET, DELETE_BLOG_FAILURE, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, EDIT_BLOG_FAILURE, EDIT_BLOG_REQUEST, EDIT_BLOG_SUCCESS, GET_BLOGS_FAILURE, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS,  GET_BLOG_DETAILS_FAILURE,  GET_BLOG_DETAILS_REQUEST,  GET_BLOG_DETAILS_SUCCESS,  GET_CURRENT_USER_DATA_FAILURE,  GET_CURRENT_USER_DATA_SUCCESS,  GET_SENT_TO_REVIEW_TOTAL_BLOGS_FAILURE,  GET_SENT_TO_REVIEW_TOTAL_BLOGS_REQUEST,  GET_SENT_TO_REVIEW_TOTAL_BLOGS_SUCCESS,  GET_TOTAL_BLOGS_FAILURE,  GET_TOTAL_BLOGS_REQUEST,  GET_TOTAL_BLOGS_SUCCESS,  HIDE_MORE_BUTTON,  REMOVE_COMMENT,  REMOVE_LIKE,  SEARCH_BLOGS_FAILURE,  SEARCH_BLOGS_REQUEST,  SEARCH_BLOGS_SUCCESS,  SET_BLOG_AUTHOR,  SET_CATEGORIES,  SET_CATEGORIES_FAILURE,  SET_CATEGORIES_REQUEST,  SET_CATEGORIES_SUCCESS,  SET_COMMENTS,  SET_RECENT_BLOGS,  SET_RELATED_BLOGS,  SET_TAGS,  SET_TAGS_FAILURE,  SET_TAGS_REQUEST,  SET_TAGS_SUCCESS,  TRENDING_BLOGS_FAILURE, TRENDING_BLOGS_REQUEST, TRENDING_BLOGS_SUCCESS } from "../redux/ActionTypes";

const INITIAL_STATE = {
    loading: false,
    limit: '',
    trendingBlogs: [],
    trendingBlogsError: '',
    totalBlogs: [
        {list: [],
        tags: [], count: 0 }
    ],
    totalBlogsError:'',
    blogs: null,
    blogsError: '',
    hide_more_button: false,
    searchBlogs: [],
    blogDetails: [],
    blogDetailsError: null,
    blog: [], 
    blogError: null,
    editBlog: [],
    editBlogError: null,
    deletedBlog: [],
    deletedBlogError: null,
    addLike: null,
    addComment: null,
    removeLike: null,
    removeComment: null,
    comments: [],
    relatedBlogs: [],
    recentBlogs: [],
    categoryBlogs: [],
    tagBlogs: [],
    searchLoading: false,
    totalreviewedBlogs: [],
    totalreviewedBlogsError: null
}



const applySetBlogsLimit = (state, action) => ({
    ...state,
    limit: action.payload,
  });
function blogReducer(state = INITIAL_STATE, action) {
    switch (action.type){
            case SET_BLOG_AUTHOR:
                return{
                    ...state,
                    loading: false,
                    author: action.payload
                }
            case SET_TAGS_SUCCESS: 
                return {
                    ...state,
                    loading: false,
                    tagBlogs: action.payload
                }
                case SET_TAGS_REQUEST: 
                return {
                    ...state,
                    loading: true,
                    tagBlogs: []
                }
                case SET_TAGS_FAILURE: 
                return {
                    ...state,
                    loading: true,
                    tagBlogs: []
                }
            case SET_CATEGORIES_SUCCESS: 
                return {
                    ...state,
                    loading: false,
                    categoryBlogs: action.payload
                }
                case SET_CATEGORIES_REQUEST: 
                return {
                    ...state,
                    loading: true,
                    categoryBlogs: []                
                }
                case SET_CATEGORIES_FAILURE: 
                return {
                    ...state,
                    loading: false,
                    categoryBlogs: []                
                }
            case ADD_LIKE: 
            return {
                ...state,
                loading: false,
                blogDetails: action.payload
            }
            case ADD_COMMENT:
                return {
                    ...state,
                    loading: false,
                    comments: [...state.comments, action.payload]
            }
            case SET_COMMENTS:
                return {
                    ...state,
                    loading: false,
                    comments: action.payload,
                }
            case SET_RELATED_BLOGS: 
            return {
                ...state, 
                loading: false,
                relatedBlogs: action.payload
            }
            case SET_RECENT_BLOGS: 
                return {
                    ...state,
                    loading: false,
                    recentBlogs: action.payload
                }
            case REMOVE_LIKE:
                return{
                    ...state,
                    loading: false,

                    blogDetails: action.payload
            }
            case REMOVE_COMMENT: 
                return{
                    ...state,
                    loading: false,

                    removeComment: action.payload
            }
            case TRENDING_BLOGS_REQUEST:
            return {
                ...state,
                loading: true
            }
            case TRENDING_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                trendingBlogs: action.payload
            }
            case TRENDING_BLOGS_FAILURE:
            return {
                ...state,
                loading: false,
                trendingBlogsError: action.error
            }
            case GET_BLOGS_REQUEST:
            return {
                ...state,
                loading: true
            }
            case GET_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload
            }
            case GET_BLOGS_FAILURE:
            return {
                ...state,
                loading: false,
                blogsError: action.error
            }
            case ADD_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
            case ADD_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blog: action.payload
            }
            case ADD_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                blogError: action.error
            }
            case DELETE_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
            case DELETE_BLOG_SUCCESS:
            return {...state,loading: false
            }
            case DELETE_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                deletedBlogError: action.error
            }
            case EDIT_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
            case EDIT_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                editBlog: action.payload
            }
            case EDIT_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                editBlogError: action.error
            }
            case SEARCH_BLOGS_REQUEST:
            return {
                ...state,
                searchBlogs: [],
                searchLoading: true
            }
            case SEARCH_BLOGS_SUCCESS:
            return {
                ...state,
                searchLoading: false,
                searchBlogs: action.payload
            }
            case SEARCH_BLOGS_FAILURE:
            return {
                ...state,
                searchLoading: false,
                searchBlogs: [],
                searchblogsError: action.error
            }
            case GET_TOTAL_BLOGS_REQUEST:
            return {
                ...state,
                loading: true
            }
            case GET_TOTAL_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                totalBlogs: action.payload
            }
            case GET_TOTAL_BLOGS_FAILURE:
            return {
                ...state,
                loading: false,
                totalreviewedBlogsError: action.error
            }
            case GET_SENT_TO_REVIEW_TOTAL_BLOGS_REQUEST:
            return {
                ...state,
                loading: true
            }
            case GET_SENT_TO_REVIEW_TOTAL_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                totalreviewedBlogs: action.payload
            }
            case GET_SENT_TO_REVIEW_TOTAL_BLOGS_FAILURE:
            return {
                ...state,
                loading: false,
                totalBlogsError: action.error
            }
            case BLOGS_LIMIT_SET: {
                return applySetBlogsLimit(state, action);
              }
            case HIDE_MORE_BUTTON:{
                return{
                    ...state,
                    loading: false,
                    hide_more_button: action.payload
                }
            }
            case APPEND_BLOGS: 
            state = {...state,loading: false, blogs: [...state.blogs, ...action.payload] };
            return state;
            case GET_BLOG_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
            case GET_BLOG_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogDetails: action.payload
            }
            case GET_BLOG_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                blogDetailsError: action.error
            }
            default: 
            return{
                ...state
            }
    }
}

export default blogReducer;