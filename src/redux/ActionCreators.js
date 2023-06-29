import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  // MESSAGE_SUCCESS,
  LOADING,
  MESSAGES_ERROR,
  CREATE_NEW_USER_REQUEST,
  CREATE_NEW_USER_SUCCESS,
  CREATE_NEW_USER_FAILURE,
  REDIRECT_FAILURE,
  REDIRECT_SUCCESS,
  REDIRECT_REQUEST,
  GET_USER_METADATA_REQUEST,
  GET_USER_METADATA_SUCCESS,
  GET_USER_METADATA_FAILURE,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_REQUEST,
  ERROR_CODE_ACCOUNT_EXISTS,
  ERROR_MSG_ACCOUNT_EXISTS,
  ERROR_CODE_ACCOUNT_ALREADY_EXISTS,
  ERROR_MSG_ACCOUNT_ALREADY_EXISTS,
  CLEAR_REDIRECT,
  CLEAR_USER_DATA_REQUEST,
  CLEAR_USER_DATA_SUCCESS,
  CLEAR_USER_DATA_FAILURE,
  SENT_EMAIL_VERIFICATION_FAILURE,
  SENT_EMAIL_VERIFICATION_SUCCESS,
  SENT_EMAIL_VERIFICATION_REQUEST,
  SEND_PASSWORD_RESET_EMAIL_FAILURE,
  SEND_PASSWORD_RESET_EMAIL_SUCCESS,
  SEND_PASSWORD_RESET_EMAIL_REQUEST,
  SEND_FORGOT_EMAIL_FAILURE,
  SEND_FORGOT_EMAIL_SUCCESS,
  SEND_FORGOT_EMAIL_REQUEST,
  RESET_GOOGLE_RECAPTCHA_TOKEN,
  GOOGLE_RECAPTCHA_FAILURE,
  GOOGLE_RECAPTCHA_REQUEST,
  GOOGLE_RECAPTCHA_SUCCESS,
  ERROR_CODE_TOO_MANY_ATTEMPTS,
  ERROR_CODE_WRONG_PASSWORD,
  ERROR_MSG_TOO_MANY_ATTEMPTS,
  ERROR_MSG_WRONG_PASSWORD,
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_DATA_BY_USERNAME_FAILURE,
  GET_USER_DATA_BY_USERNAME_REQUEST,
  GET_USER_DATA_BY_USERNAME_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  PASSWORD_VERIFY_REQUEST,
  PASSWORD_VERIFY_SUCCESS,
  PASSWORD_VERIFY_FAILURE,
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
  MULTIFACTOR_AUTH_OPTIONS_SUCCESS,
  MULTIFACTOR_AUTH_REQUEST,
  MULTIFACTOR_AUTH_SUCCESS,
  MFA_AUTH_FAILURE,
  MFA_AUTH_REQUEST,
  MFA_AUTH_SUCCESS,
  EDUCATION_FAILURE,
  EDUCATION_REQUEST,
  EDUCATION_SUCCESS,
  EXPERIENCE_FAILURE,
  EXPERIENCE_REQUEST,
  EXPERIENCE_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  NOTIFICAIONS_REQUEST,
  NOTIFICAIONS_SUCCESS,
  NOTIFICAIONS_FAILURE,
  NOTIFICAION_BY_ID_FAILURE,
  NOTIFICAION_BY_ID_SUCCESS,
  NOTIFICAION_BY_ID_REQUEST,
  SUBMIT_GET_IN_TOUCH_REQUEST,
  SUBMIT_GET_IN_TOUCH_SUCCESS,
  SUBMIT_GET_IN_TOUCH_FAILURE,
  SUBMIT_SUBSCRIBE_REQUEST,
  SUBMIT_SUBSCRIBE_SUCCESS,
  SUBMIT_SUBSCRIBE_FAILURE,
  TRENDING_BLOGS_REQUEST,
  TRENDING_BLOGS_FAILURE,
  TRENDING_BLOGS_SUCCESS,
  APPEND_BLOGS,
  BLOGS_LIMIT_SET,
  GET_TOTAL_BLOGS_REQUEST,
  GET_TOTAL_BLOGS_FAILURE,
  GET_TOTAL_BLOGS_SUCCESS,
  GET_BLOGS_REQUEST,
  GET_BLOGS_FAILURE,
  GET_BLOGS_SUCCESS,
  HIDE_MORE_BUTTON,
  SEARCH_BLOGS_REQUEST,
  SEARCH_BLOGS_FAILURE,
  SEARCH_BLOGS_SUCCESS,
  GET_BLOG_DETAILS_REQUEST,
  GET_BLOG_DETAILS_FAILURE,
  GET_BLOG_DETAILS_SUCCESS,
  ADD_BLOG_REQUEST,
  ADD_BLOG_FAILURE,
  ADD_BLOG_SUCCESS,
  EDIT_BLOG_REQUEST,
  EDIT_BLOG_FAILURE,
  EDIT_BLOG_SUCCESS,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_FAILURE,
  DELETE_BLOG_SUCCESS,
  ADD_DELETED_BLOG_REQUEST,
  ADD_DELETED_BLOG_FAILURE,
  ADD_DELETED_BLOG_SUCCESS,
  ADD_LIKE,
  ADD_COMMENT,
  REMOVE_LIKE,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  SET_COMMENTS,
  SET_RELATED_BLOGS,
  SET_RECENT_BLOGS,
  FILE_UPLOAD_PROGRESS,
  PROFILE_IMAGE_CHANGE,
  GET_CURRENT_USER_DATA_REQUEST,
  GET_CURRENT_USER_DATA_FAILURE,
  GET_CURRENT_USER_DATA_SUCCESS,
  SET_TAGS_REQUEST,
  SET_TAGS_SUCCESS,
  SET_TAGS_FAILURE,
  SET_CATEGORIES_REQUEST,
  SET_CATEGORIES_SUCCESS,
  SET_CATEGORIES_FAILURE,
  SET_BLOG_AUTHOR,
  OTP_RESET,
  FETCH_SIGN_METHODS,
  GET_SENT_TO_REVIEW_TOTAL_BLOGS_REQUEST,
  GET_SENT_TO_REVIEW_TOTAL_BLOGS_FAILURE,
  GET_SENT_TO_REVIEW_TOTAL_BLOGS_SUCCESS,
  GET_TEMPLATES_REQUEST,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_FAILURE,
  ADD_TEMPLATE_REQUEST,
  ADD_TEMPLATE_SUCCESS,
  ADD_TEMPLATE_FAILURE,
  EDIT_TEMPLATE_REQUEST,
  EDIT_TEMPLATE_SUCCESS,
  EDIT_TEMPLATE_FAILURE,
  DELETE_TEMPLATE_REQUEST,
  DELETE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_FAILURE,
  FILE_UPLOAD_SUCCESS,
  GET_TEMPLATE_REQUEST,
  GET_TEMPLATE_SUCCESS,
  GET_TEMPLATE_FAILURE,
  GET_VISITORS_COUNT_REQUEST,
  GET_VISITORS_COUNT_SUCCESS,
  GET_VISITORS_COUNT_FAILURE,
  ADD_USER_COUNT_FAILURE, ADD_USER_COUNT_REQUEST, ADD_USER_COUNT_SUCCESS, REMOVE_USER_COUNT_FAILURE, REMOVE_USER_COUNT_REQUEST, REMOVE_USER_COUNT_SUCCESS
} from "./ActionTypes";
import { auth, db, firestoreDb, storage, analytics } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  linkWithCredential,
  linkWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  getMultiFactorResolver,
  PhoneMultiFactorGenerator,
  PhoneAuthProvider,
  GithubAuthProvider,
  getAuth,
  fetchSignInMethodsForEmail,
  unlink
} from "firebase/auth";
import {
  getDocs,
  getDoc,
  updateDoc,
  collection,
  doc,
  writeBatch,
  query,
  where,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  orderBy,
  addDoc,
  limit,
  startAfter,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { ref, set, orderByChild, get, push, runTransaction, TransactionResult, onValue, update, increment, } from "firebase/database";
import {
  ref as Storageref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { notify, dismissNotification } from "reapop";
import * as ROUTES from "../components/constants/routes";
import Chance from 'chance';
import { toast } from "react-toastify";
import { setUserId } from "firebase/analytics";
 
const chance = new Chance();
const visitorCountRef = () => ref(db, 'visitorCount');
const realtimeUsersCount = () => collection(firestoreDb, 'userCount');
// create a new write batch
const batch = writeBatch(firestoreDb);

// API
// get a reference to the 'users' collection
export const usersRef = () => collection(firestoreDb, "/users");
export const userRef = (id) => doc(firestoreDb, `/users/${id}`);
const usernameRef = (id) => doc(firestoreDb, `/usernames/${id}`);
const usermetadata = (email) =>
  doc(firestoreDb, `/metadata/userdata/users/${email}`);
export const usernames = () => collection(firestoreDb, "/usernames");
export const imageUploadPath = (uid, fileName) =>
  Storageref(storage, `images/profile/${uid}/${fileName}`);
export const getAllNotifications = () =>
  collection(firestoreDb, `notifications`);
export const notificationById = (id) =>
  doc(firestoreDb, `/notifications/${id}`);

export const userDataUploadPath = (uid, filename) =>
  Storageref(storage, `files/${uid}/${filename}`);
export const userFileBrowser = (uid, filename) =>
  Storageref(storage, `files/${uid}/${filename}`);

export const contactUs = () => collection(firestoreDb, "/contact-form");
export const subscribeMe = () => collection(firestoreDb, "/subscribe");

// blogs

export const blogCollection = () => collection(firestoreDb, "/blogs");
export const blogCollectionToReview = (id) => doc(firestoreDb, `/review/${id}`);
export const blogDoc = (id) => doc(firestoreDb, `/blogs/${id}`);
export const blogReviewDoc = (id) => doc(firestoreDb, `/review/${id}`);
export const headerImageRef = (url) => Storageref(storage, `${url}`);
export const deletedBlogRef = () => collection(firestoreDb, "/deletedBlogs");
export const commentsRef = (id) =>
  collection(firestoreDb, `/blogs/${id}/comments`);
export const commentsDocRef = (id, commentId) =>
  doc(firestoreDb, `/blogs/${id}/comments/${commentId}`);
export const replyCommentsRef = (postId, commentId) =>
  doc(firestoreDb, `/blogs/${postId}/comments/${commentId}`);
export const replyCommentsRefDoc = (postId, replyId) =>
  doc(firestoreDb, `/blogs/${postId}/comments/${replyId}`);
export const replyCommentsRefCol = (postId, replyId, replyParent) =>
  collection(
    firestoreDb,
    `/blogs/${postId}/comments/${replyParent}/${replyId}`
  );

export const notifications = (uid) => collection(firestoreDb, `notifications`);
export const addnotificationDoc = (id) => doc(firestoreDb, `notifications/${id}`);


//Templates


export const templatesColRef = () => collection(firestoreDb, '/templates');
export const templateDocRef = (id) => doc(firestoreDb, `/templates/${id}`);
export const templateFiles = (id,filename) =>
  Storageref(storage, `files/templates/${id}/${filename}`);


//Analytics

// if(auth?.currentUser?.uid){
//   setUserId(analytics,auth.currentUser.uid)
// }
// else{
//   const uid = chance.guid();
//   setUserId(analytics, uid)
// }
// export const analyticsRef = () => {
//   return analytics;
// };
///Constants of current user

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};
export const clearCurrentUser = () => ({
  type: CLEAR_CURRENT_USER,
});
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logoutFailure = (error) => {
  return { type: LOGOUT_FAILURE, payload: error };
};
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};
const messagesRequest = () => {
  return {
    type: MESSAGES_REQUEST,
  };
};
const messagesSuccess = (messages) => {
  return {
    type: MESSAGES_SUCCESS,
    payload: messages,
  };
};
const messagesError = (error) => {
  return {
    type: MESSAGES_ERROR,
    payload: error,
  };
};
// const messageRequest = () => {
//   return {
//     type: MESSAGES_REQUEST,
//   };
// };
// const messageSuccess = (message) => {
//   return {
//     type: MESSAGE_SUCCESS,
//     payload: message,
//   };
// };
export const loading = (action) => {
  return {
    type: LOADING,
    payload: action,
  };
};
const createNewUserRequest = (action) => {
  return {
    type: CREATE_NEW_USER_REQUEST,
    payload: action,
  };
};
const createNewUserSuccess = (action) => {
  return {
    type: CREATE_NEW_USER_SUCCESS,
    payload: action,
  };
};
const createNewUserFailure = (action) => {
  return {
    type: CREATE_NEW_USER_FAILURE,
    payload: action,
  };
};
export const redirectRequest = () => {
  return { type: REDIRECT_REQUEST };
};
export const redirectSuccess = (link) => {
  return {
    type: REDIRECT_SUCCESS,
    payload: link,
  };
};
export const redirectFailure = (link) => {
  return {
    type: REDIRECT_FAILURE,
    payload: link,
  };
};
export const redirectReset = () => {
  return {
    type: CLEAR_REDIRECT,
  };
};
export const getUserMetaDataRequest = () => {
  return {
    type: GET_USER_METADATA_REQUEST,
  };
};
export const getUserMetaDataSuccess = (data) => {
  return {
    type: GET_USER_METADATA_SUCCESS,
    payload: data,
  };
};
export const getUserMetaDataFailure = (error) => {
  return {
    type: GET_USER_METADATA_FAILURE,
    payload: error,
  };
};
export const getCurrentUserDataRequest = () => {
  return {
    type: GET_CURRENT_USER_DATA_REQUEST,
  };
};
export const getCurrentUserDataSuccess = (data) => {
  return {
    type: GET_CURRENT_USER_DATA_SUCCESS,
    payload: data,
  };
};
export const getCurrentUserDataFailure = (error) => {
  return {
    type: GET_CURRENT_USER_DATA_FAILURE,
    payload: error,
  };
};
export const getUserDataRequest = () => {
  return {
    type: GET_USER_DATA_REQUEST,
  };
};
export const getUserDataSuccess = (data) => {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: data,
  };
};
export const getUserDataFailure = (error) => {
  return {
    type: GET_USER_DATA_FAILURE,
    payload: error,
  };
};
export const updateUserDataRequest = () => {
  return {
    type: UPDATE_USER_DATA_REQUEST,
  };
};
export const updateUserDataSuccess = (data) => {
  return {
    type: UPDATE_USER_DATA_SUCCESS,
    payload: data,
  };
};
export const updateUserDataFailure = (error) => {
  return {
    type: UPDATE_USER_DATA_FAILURE,
    payload: error,
  };
};
export const clearUserDataRequest = () => {
  return {
    type: CLEAR_USER_DATA_REQUEST,
  };
};
export const clearUserDataSuccess = () => {
  return {
    type: CLEAR_USER_DATA_SUCCESS,
  };
};
export const clearUserDataFailure = (error) => {
  return {
    type: CLEAR_USER_DATA_FAILURE,
    payload: error,
  };
};

export const sendEmailVerificationRequest = () => {
  return {
    type: SENT_EMAIL_VERIFICATION_REQUEST,
  };
};
export const sendEmailVerificationSuccess = () => {
  return {
    type: SENT_EMAIL_VERIFICATION_SUCCESS,
  };
};
export const sendEmailVerificationFailure = (error) => {
  return {
    type: SENT_EMAIL_VERIFICATION_FAILURE,
    payload: error,
  };
};
export const sendPasswordResetEmailRequest = () => {
  return {
    type: SEND_PASSWORD_RESET_EMAIL_REQUEST,
  };
};
export const sendPasswordResetEmailSuccess = () => {
  return {
    type: SEND_PASSWORD_RESET_EMAIL_SUCCESS,
  };
};
export const sendPasswordResetEmailFailure = (error) => {
  return {
    type: SEND_PASSWORD_RESET_EMAIL_FAILURE,
    payload: error,
  };
};
export const sendForgotEmailRequest = () => {
  return {
    type: SEND_FORGOT_EMAIL_REQUEST,
  };
};
export const sendForgotEmailSuccess = (data) => {
  return {
    type: SEND_FORGOT_EMAIL_SUCCESS,
    payload: data,
  };
};
export const sendForgotEmailFailure = (error) => {
  return {
    type: SEND_FORGOT_EMAIL_FAILURE,
    payload: error,
  };
};

export const recaptchaTokenRequest = () => {
  return {
    type: GOOGLE_RECAPTCHA_REQUEST,
  };
};
export const recaptchaTokenSuccess = (data) => {
  return {
    type: GOOGLE_RECAPTCHA_SUCCESS,
    payload: data,
  };
};
export const recaptchaTokenFailure = (error) => {
  return {
    type: GOOGLE_RECAPTCHA_FAILURE,
    payload: error,
  };
};
export const recaptchaTokenReset = () => {
  return {
    type: RESET_GOOGLE_RECAPTCHA_TOKEN,
  };
};

export const getUsersDataRequest = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};
export const getUsersDataSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: data,
  };
};
export const getUsersDataFailure = (error) => {
  return {
    type: GET_USERS_FAILURE,
    payload: error,
  };
};
export const getUserDataByUsernameRequest = () => {
  return {
    type: GET_USER_DATA_BY_USERNAME_REQUEST,
  };
};
export const getUserDataByUsernameSuccess = (data) => {
  return {
    type: GET_USER_DATA_BY_USERNAME_SUCCESS,
    payload: data,
  };
};
export const getUserDataByUsernameFailure = (error) => {
  return {
    type: GET_USER_DATA_BY_USERNAME_FAILURE,
    payload: error,
  };
};
export const passwordVerifyRequest = () => {
  return {
    type: PASSWORD_VERIFY_REQUEST,
  };
};
export const passwordVerifySuccess = (data) => {
  return {
    type: PASSWORD_VERIFY_SUCCESS,
    payload: data,
  };
};
export const passwordVerifyFailure = (error) => {
  return {
    type: PASSWORD_VERIFY_FAILURE,
    payload: error,
  };
};
export const accountLinkingRequest = () => {
  return {
    type: ACCOUNT_LINKING_REQUEST,
  };
};
export const accountLinkingSuccess = (data) => {
  return {
    type: ACCOUNT_LINKING_SUCCESS,
    payload: data,
  };
};
export const accountLinkingFailure = (error) => {
  return {
    type: ACCOUNT_LINKING_FAILURE,
    payload: error,
  };
};
export const changePasswordRequest = () => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
  };
};
export const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
};
export const changePasswordFailure = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: error,
  };
};
export const OTPRequest = () => {
  return {
    type: OTP_REQUEST,
  };
};
export const OTPSuccess = (info, phone) => {
  return {
    type: OTP_SUCCESS,
    payload: { info, phone },
  };
};
export const OTPFailure = (error) => {
  return {
    type: OTP_FAILURE,
    payload: error,
  };
};
export const OTPReset = () => {
  return {
    type: OTP_RESET,
  };
};
export const VerifyRecaptchaRequest = () => {
  return {
    type: VERIFY_RECAPTCHA_REQUEST,
  };
};
export const VerifyRecaptchaSuccess = (info) => {
  return {
    type: VERIFY_RECAPTCHA_SUCCESS,
    payload: info,
  };
};
export const VerifyRecaptchaFailure = (error) => {
  return {
    type: VERIFY_RECAPTCHA_FAILURE,
    payload: error,
  };
};
export const getMultiFactorOptionsRequest = () => {
  return {
    type: MULTIFACTOR_AUTH_OPTIONS_REQUEST,
  };
};
export const getMultiFactorOptionsSuccess = (info) => {
  return {
    type: MULTIFACTOR_AUTH_OPTIONS_SUCCESS,
    payload: info,
  };
};
export const getMultiFactorOptionsFailure = (error) => {
  return {
    type: MULTIFACTOR_AUTH_OPTIONS_FAILURE,
    payload: error,
  };
};
export const getMultiFactorRequest = () => {
  return {
    type: MULTIFACTOR_AUTH_REQUEST,
  };
};
export const getMultiFactorSuccess = (info) => {
  return {
    type: MULTIFACTOR_AUTH_SUCCESS,
    payload: info,
  };
};
export const getMultiFactorFailure = (error) => {
  return {
    type: MULTIFACTOR_AUTH_FAILURE,
    payload: error,
  };
};
export const getMFAAuthRequest = () => {
  return {
    type: MFA_AUTH_REQUEST,
  };
};
export const getMFAAuthSuccess = (info) => {
  return {
    type: MFA_AUTH_SUCCESS,
    payload: info,
  };
};
export const getMFAAuthFailure = (error) => {
  return {
    type: MFA_AUTH_FAILURE,
    payload: error,
  };
};

export const storeSignInMethods = (signinMethods) => {
  return{
    type: FETCH_SIGN_METHODS,
    payload: signinMethods
  }
}
export const educationRequest = () => {
  return {
    type: EDUCATION_REQUEST,
  };
};
export const educationSuccess = (info) => {
  return {
    type: EDUCATION_SUCCESS,
    payload: info,
  };
};
export const educationFailure = (error) => {
  return {
    type: EDUCATION_FAILURE,
    payload: error,
  };
};
export const experienceRequest = () => {
  return {
    type: EXPERIENCE_REQUEST,
  };
};
export const experienceSuccess = (info) => {
  return {
    type: EXPERIENCE_SUCCESS,
    payload: info,
  };
};
export const experienceFailure = (error) => {
  return {
    type: EXPERIENCE_FAILURE,
    payload: error,
  };
};
export const profileUpdateRequest = () => {
  return {
    type: PROFILE_UPDATE_REQUEST,
  };
};
export const profileUpdateSuccess = (info) => {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    payload: info,
  };
};
export const profileUpdateFailure = (error) => {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: error,
  };
};

export const notificationsFetchRequest = () => {
  return {
    type: NOTIFICAIONS_REQUEST,
  };
};
export const notificationsFetchSuccess = (info) => {
  return {
    type: NOTIFICAIONS_SUCCESS,
    payload: info,
  };
};
export const notificationsFetchFailure = (error) => {
  return {
    type: NOTIFICAIONS_FAILURE,
    payload: error,
  };
};
export const notificationsFetchByIdRequest = () => {
  return {
    type: NOTIFICAION_BY_ID_REQUEST,
  };
};
export const notificationsFetchByIdSuccess = (info) => {
  return {
    type: NOTIFICAION_BY_ID_SUCCESS,
    payload: info,
  };
};
export const notificationsFetchByIdFailure = (error) => {
  return {
    type: NOTIFICAION_BY_ID_FAILURE,
    payload: error,
  };
};

// GET IN TOUCH

export const submitGetInTouchRequest = () => {
  return {
    type: SUBMIT_GET_IN_TOUCH_REQUEST,
  };
};
export const submitGetInTouchSuccess = (info) => {
  return {
    type: SUBMIT_GET_IN_TOUCH_SUCCESS,
    payload: info,
  };
};
export const submitGetInTouchFailure = (error) => {
  return {
    type: SUBMIT_GET_IN_TOUCH_FAILURE,
    payload: error,
  };
};
// Subscribe form
export const submitSubscribeRequest = () => {
  return {
    type: SUBMIT_SUBSCRIBE_REQUEST,
  };
};
export const submitSubscribeSuccess = (info) => {
  return {
    type: SUBMIT_SUBSCRIBE_SUCCESS,
    payload: info,
  };
};
export const submitSubscribeFailure = (error) => {
  return {
    type: SUBMIT_SUBSCRIBE_FAILURE,
    payload: error,
  };
};

export const trendingBlogsRequest = () => {
  return {
    type: TRENDING_BLOGS_REQUEST,
  };
};
export const trendingBlogsFailure = (error) => {
  return {
    type: TRENDING_BLOGS_FAILURE,
    payload: error,
  };
};
export const trendingBlogsSuccess = (info) => {
  return {
    type: TRENDING_BLOGS_SUCCESS,
    payload: info,
  };
};
export const totalBlogsRequest = () => {
  return {
    type: GET_TOTAL_BLOGS_REQUEST,
  };
};
export const totalBlogsFailure = (error) => {
  return {
    type: GET_TOTAL_BLOGS_FAILURE,
    payload: error,
  };
};
export const totalBlogsSuccess = (list, tags, count) => {
  return {
    type: GET_TOTAL_BLOGS_SUCCESS,
    payload: { list, tags, count },
  };
};
export const totalSentToReviewBlogsRequest = () => {
  return {
    type: GET_SENT_TO_REVIEW_TOTAL_BLOGS_REQUEST,
  };
};
export const totalSentToReviewBlogsFailure = (error) => {
  return {
    type: GET_SENT_TO_REVIEW_TOTAL_BLOGS_FAILURE,
    payload: error,
  };
};
export const totalSentToReviewBlogsSuccess = (list, tags, count) => {
  return {
    type: GET_SENT_TO_REVIEW_TOTAL_BLOGS_SUCCESS,
    payload: { list, tags, count },
  };
};
export const blogsRequest = () => {
  return {
    type: GET_BLOGS_REQUEST,
  };
};
export const blogsFailure = (error) => {
  return {
    type: GET_BLOGS_FAILURE,
    payload: error,
  };
};
export const blogsSuccess = (blogs) => {
  return {
    type: GET_BLOGS_SUCCESS,
    payload: blogs,
  };
};
export const searchblogsRequest = () => {
  return {
    type: SEARCH_BLOGS_REQUEST,
  };
};
export const searchblogsFailure = (error) => {
  return {
    type: SEARCH_BLOGS_FAILURE,
    payload: error,
  };
};
export const searchblogsSuccess = (blogs) => {
  return {
    type: SEARCH_BLOGS_SUCCESS,
    payload: blogs,
  };
};
export const addBlogs = (blogs) => {
  return {
    type: APPEND_BLOGS,
    payload: blogs,
  };
};
export const blogsLimitSet = (blogslimit) => {
  return {
    type: BLOGS_LIMIT_SET,
    payload: blogslimit,
  };
};
export const hideMoreButton = (message) => {
  return {
    type: HIDE_MORE_BUTTON,
    payload: message,
  };
};

export const getBlogDetailsRequest = () => {
  return {
    type: GET_BLOG_DETAILS_REQUEST,
  };
};
export const getBlogDetailsFailure = (error) => {
  return {
    type: GET_BLOG_DETAILS_FAILURE,
    payload: error,
  };
};
export const getBlogDetailsSuccess = (blog) => {
  return {
    type: GET_BLOG_DETAILS_SUCCESS,
    payload: blog,
  };
};
export const addBlogRequest = () => {
  return {
    type: ADD_BLOG_REQUEST,
  };
};
export const addBlogFailure = (error) => {
  return {
    type: ADD_BLOG_FAILURE,
    payload: error,
  };
};
export const addBlogSuccess = (blog) => {
  return {
    type: ADD_BLOG_SUCCESS,
    payload: blog,
  };
};
export const editBlogRequest = () => {
  return {
    type: EDIT_BLOG_REQUEST,
  };
};
export const editBlogFailure = (error) => {
  return {
    type: EDIT_BLOG_FAILURE,
    payload: error,
  };
};
export const editBlogSuccess = (blog) => {
  return {
    type: EDIT_BLOG_SUCCESS,
    payload: blog,
  };
};
export const deleteBlogRequest = () => {
  return {
    type: DELETE_BLOG_REQUEST,
  };
};
export const deleteBlogFailure = (error) => {
  return {
    type: DELETE_BLOG_FAILURE,
    payload: error,
  };
};
export const deleteBlogSuccess = (blog) => {
  return {
    type: DELETE_BLOG_SUCCESS,
    payload: blog,
  };
};
export const addDeleteBlogRequest = () => {
  return {
    type: ADD_DELETED_BLOG_REQUEST,
  };
};
export const addDeleteBlogFailure = (error) => {
  return {
    type: ADD_DELETED_BLOG_FAILURE,
    payload: error,
  };
};
export const addDeleteBlogSuccess = (blog) => {
  return {
    type: ADD_DELETED_BLOG_SUCCESS,
    payload: blog,
  };
};
export const addLike = (blog) => {
  return {
    type: ADD_LIKE,
    payload: blog,
  };
};
export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  };
};
export const removeLike = (blog) => {
  return {
    type: REMOVE_LIKE,
    payload: blog,
  };
};
export const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    payload: comment,
  };
};
export const editComment = () => {
  return {
    type: EDIT_COMMENT,
  };
};
export const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    payload: comments,
  };
};
export const setTagsRequest = () => {
  return {
    type: SET_TAGS_REQUEST,
  };
};
export const setTagsSuccess = (tags) => {
  return {
    type: SET_TAGS_SUCCESS,
    payload: tags,
  };
};
export const setTagsFailure = (error) => {
  return {
    type: SET_TAGS_FAILURE,
    payload: error,
  };
};
export const setCategoriesRequest = () => {
  return {
    type: SET_CATEGORIES_REQUEST,
  };
};
export const setCategoriesSuccess = (categories) => {
  return {
    type: SET_CATEGORIES_SUCCESS,
    payload: categories,
  };
};
export const setCategoriesFailure = (error) => {
  return {
    type: SET_CATEGORIES_FAILURE,
    payload: error,
  };
};
export const setRelatedBlogs = (blogs) => {
  return {
    type: SET_RELATED_BLOGS,
    payload: blogs,
  };
};
export const setRecentBlogs = (blogs) => {
  return {
    type: SET_RECENT_BLOGS,
    payload: blogs,
  };
};

export const handleUploadProgress = (progress) => {
  return {
    type: FILE_UPLOAD_PROGRESS,
    payload: progress,
  };
};

export const handleProfileImageChange = (url) => {
  return {
    type: PROFILE_IMAGE_CHANGE,
    payload: url,
  };
};
export const getBlogAuthor = (user) => {
  return{
    type: SET_BLOG_AUTHOR,
    payload: user
  }
}

export const getTemplatesRequest = () => {
  return {
    type: GET_TEMPLATES_REQUEST,
  }
}
export const getTemplatesSuccess = (templates) => {
  return {
    type: GET_TEMPLATES_SUCCESS,
    payload: templates
  }
}
export const getTemplatesFailure = (error) => {
  return {
    type: GET_TEMPLATES_FAILURE,
    payload: error
  }
}
export const getTemplateRequest = () => {
  return {
    type: GET_TEMPLATE_REQUEST,
  }
}
export const getTemplateSuccess = (template) => {
  return {
    type: GET_TEMPLATE_SUCCESS,
    payload: template
  }
}
export const getTemplateFailure = (error) => {
  return {
    type: GET_TEMPLATE_FAILURE,
    payload: error
  }
}
export const addTemplatesRequest = () => {
  return {
    type: ADD_TEMPLATE_REQUEST,
  }
}
export const addTemplatesSuccess = (template) => {
  return {
    type: ADD_TEMPLATE_SUCCESS,
    payload: template
  }
}
export const addTemplatesFailure = (error) => {
  return {
    type: ADD_TEMPLATE_FAILURE,
    payload: error
  }
}
export const editTemplatesRequest = () => {
  return {
    type: EDIT_TEMPLATE_REQUEST,
  }
}
export const editTemplatesSuccess = (template) => {
  return {
    type: EDIT_TEMPLATE_SUCCESS,
    payload: template
  }
}
export const editTemplatesFailure = (error) => {
  return {
    type: EDIT_TEMPLATE_FAILURE,
    payload: error
  }
}
export const deleteTemplatesRequest = () => {
  return {
    type: DELETE_TEMPLATE_REQUEST,
  }
}
export const deleteTemplatesSuccess = (template) => {
  return {
    type: DELETE_TEMPLATE_SUCCESS,
    payload: template
  }
}
export const deleteTemplatesFailure = (error) => {
  return {
    type: DELETE_TEMPLATE_FAILURE,
    payload: error
  }
}

export const fileUploadSuccess = (file) =>{
  return { 
    type: FILE_UPLOAD_SUCCESS,
    payload: file
  }
}
export const getVisitorsCountRequest = () => {
  return {
    type: GET_VISITORS_COUNT_REQUEST,
  }
}
export const getVisitorsCountSuccess = (count) => {
  return {
    type: GET_VISITORS_COUNT_SUCCESS,
    payload: count 
  }
}
export const getVisitorsCountFailure = (error) => {
  return {
    type: GET_VISITORS_COUNT_FAILURE,
    payload: error
  }
}

// Add user count request action creator
export const addUserCountRequest = () => ({
  type: ADD_USER_COUNT_REQUEST,
});

// Add user count success action creator
export const addUserCountSuccess = () => ({
  type: ADD_USER_COUNT_SUCCESS,
});

// Add user count failure action creator
export const addUserCountFailure = (error) => ({
  type: ADD_USER_COUNT_FAILURE,
  payload: error,
});

// Remove user count request action creator
export const removeUserCountRequest = () => ({
  type: REMOVE_USER_COUNT_REQUEST,
});

// Remove user count success action creator
export const removeUserCountSuccess = () => ({
  type: REMOVE_USER_COUNT_SUCCESS,
});

// Remove user count failure action creator
export const removeUserCountFailure = (error) => ({
  type: REMOVE_USER_COUNT_FAILURE,
  payload: error,
});
//Actions

//Blogs
export const getRelatedBlogs = (blog) => {
  return (dispatch) => {
    const relatedBlogsQuery = query(blogCollection(),where("deleted", "==", false) ,where("tags", "array-contains-any", blog?.tags, limit(3)));
    getDocs(relatedBlogsQuery)
      .then((relatedBlogSnapshot) => {
        dispatch(
          setRelatedBlogs(
            relatedBlogSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        );
      })
      .catch((error) => {
        dispatch(notify({ status: "error", message: error.message }));
      });
  };
};

export const getRecentBlogs = () => {
  return (dispatch) => {
    const blogRef = collection(firestoreDb, "blogs");
    const recentBlogs = query(blogRef, where("deleted", "==", false), orderBy("timestamp", "desc"), limit(5));
    getDocs(recentBlogs)
      .then((docSnapshot) => {
        dispatch(
          setRecentBlogs(
            docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      })
      .catch((error) => {
        dispatch(notify({ status: "error", message: error.message }));
      });
  };
};

export const getTrendingBlogs = () => {
  return (dispatch) => {
    dispatch(trendingBlogsRequest());
    const trendQuery = query(blogCollection(),where("trending", "==", "yes"),where("deleted", "==", false),limit(50));
    let trendBlogs = [];
    getDocs(trendQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          trendBlogs.push({ id: doc.id, ...doc.data() });
        });
        dispatch(trendingBlogsSuccess(trendBlogs));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(trendingBlogsFailure(error));
      });
  };
};
export const searchBlogs = (searchQuery) => {
  return (dispatch) => {
    dispatch(searchblogsRequest());
    const searchTitleQuery = query(blogCollection(),where("deleted", "==", false),where("title", ">=", searchQuery));
    const searchUserQuery = query(blogCollection(),where("deleted", "==", false),where("postedBy.displayName", ">=", searchQuery));
    const searchTagQuery = query(blogCollection(),where("deleted", "==", false),where("tags", "array-contains", searchQuery));

    const searchTitleBlogsPromise = getDocs(searchTitleQuery)
      .then((titleSnapshot) => {
        const searchTitleBlogs = [];
        titleSnapshot.forEach((doc) => {
          searchTitleBlogs.push({ id: doc.id, ...doc.data() });
        });
        return searchTitleBlogs;
      })
      .catch((error) => {
        dispatch(notify({ status: "error", message: error.message }));
        return [];
      });
      const searchUserBlogsPromise = getDocs(searchUserQuery)
      .then((userSnapshot) => {
        const searchUserBlogs = [];
        userSnapshot.forEach((doc) => {
          searchUserBlogs.push({ id: doc.id, ...doc.data() });
        });
        return searchUserBlogs;
      })
      .catch((error) => {
        dispatch(notify({ status: "error", message: error.message }));
        return [];
      });

    const searchTagBlogsPromise = getDocs(searchTagQuery)
      .then((tagSnapshot) => {
        const searchTagBlogs = [];
        tagSnapshot.forEach((doc) => {
          searchTagBlogs.push({ id: doc.id, ...doc.data() });
        });
        return searchTagBlogs;
      })
      .catch((error) => {
        dispatch(notify({ status: "error", message: error.message }));
        return [];
      });

    Promise.all([searchTitleBlogsPromise, searchTagBlogsPromise, searchUserBlogsPromise])
      .then(([searchTitleBlogs, searchTagBlogs, searchUserBlogs]) => {
        // console.log("title: ",searchTitleBlogs,"Tags:", searchTagBlogs,"Users:", searchUserBlogs);
        const combinedSearchBlogs = searchTitleBlogs.concat(searchTagBlogs, searchUserBlogs);
        if (combinedSearchBlogs.length > 0) {
          dispatch(searchblogsSuccess(combinedSearchBlogs));
        } else {
          dispatch(searchblogsFailure("No blogs found"));
        }
      });
  };
};

export const getTotalBlogs = () => {
  let unsubscribe;
  return (dispatch) => {
    dispatch(totalBlogsRequest());
    const ref = collection(firestoreDb, "blogs");
    const q = query(ref, where("deleted", "==", false));
    unsubscribe = onSnapshot(q, (snapshot) => {
      let list = [];
      let tags = [];
      let count = 0;
      snapshot.docs.forEach((doc) => {
        tags.push(...doc.get("tags"));
        list.push({ id: doc.id, ...doc.data() });
      });
      count = snapshot.size;
      dispatch(totalBlogsSuccess(list, tags, count));
    }, (error) => {
      dispatch(totalBlogsFailure(error));
      dispatch(notify({ message: `${error?.message}`, status: "warning" }));
    });
    return () => unsubscribe();
  };
};

export const getBlogs = () => {
  return dispatch => {
    const q = query(blogCollection(), where("deleted", "==", false),orderBy("timestamp", "desc"),limit(10));
    dispatch(blogsRequest());
    getDocs(q)
      .then((snapshot) => {
        const blogs = [];
        snapshot.docs.forEach((doc) => {
          blogs.push({ id: doc.id, ...doc.data() });
        });
        dispatch(blogsSuccess(blogs));
          dispatch(blogsLimitSet(snapshot.docs[snapshot.docs.length - 1]));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(blogsFailure(error));
      });
  };
};

export const fetchMoreBlogs = () => {
  return (dispatch, getState) => {
    const limits = getState()?.blogs.limit;
    const blogRef = collection(firestoreDb, "blogs");
    const nextFour = query( blogRef,where("deleted", "==", false),orderBy("timestamp"),startAfter(limits),limit(10));
    getDocs(nextFour)
      .then((docSnapshot) => {
        const blogs = [];
        const isCollectionEmpty = docSnapshot.size === 0;
        if (!isCollectionEmpty) {
          docSnapshot.docs.forEach((doc) => {
            blogs.push({ id: doc.id, ...doc.data() });
          });
          dispatch(addBlogs(blogs));
          dispatch(
            blogsLimitSet(docSnapshot.docs[docSnapshot.docs.length - 1])
          );
        } else {
          dispatch(hideMoreButton(true));
          dispatch(
            notify({ message: "No more blogs to display", status: "warning" })
          );
        }
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
      });
  };
};

export const getBlogAuthorDetails = (uid) =>{
  return dispatch =>{
    getDoc(userRef(uid))
      .then((info) => {
        if(info.exists()){
          const data = info.data();
          const keysToRemove = ['accessToken','createdAt',
        'creationTime',
      'emailVerified',
    'lastLoginAt',
  'lastUpdatedBy',
  'lastSignInTime',
  'permissions',
  'roles',
          'providerData'];
          Object.keys(data).forEach(key => {
            if (keysToRemove.includes(key)) {
              delete data[key];
            }
          });
          dispatch(getBlogAuthor(data));
        }
      })
      .catch((error) => {
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
      });
  }
}
export const getBlogDetails = (id) => {
  return (dispatch) => {
    dispatch(getBlogDetailsRequest());
    getDoc(blogDoc(id))
      .then((blog) => {
        const blogDetails = blog?.data();
        if(auth.currentUser?.uid){
          dispatch(getBlogAuthorDetails(blogDetails?.postedBy?.uid));

        }
        dispatch(getBlogDetailsSuccess(blogDetails));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(getBlogDetailsFailure(error));
      });
  };
};
export const getReviewBlogDetails = (id) => {
  return (dispatch) => {
    dispatch(getBlogDetailsRequest());
    getDoc(blogReviewDoc(id))
      .then((blog) => {
        const blogDetails = blog?.data();
        dispatch(getBlogAuthorDetails(blogDetails?.postedBy?.uid));
        dispatch(getBlogDetailsSuccess(blogDetails));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(getBlogDetailsFailure(error));
      });
  };
};
export const addBlog = (blog) => {
  return (dispatch, getState) => {
    const blogDetails = {
      ...blog,
      id: chance.guid(),
      deleted: false,
      timestamp: serverTimestamp(),
      postedBy: {
        firstName: getState().authState?.user?.firstName,
        lastName: getState().authState?.user?.lastName,
        email: getState().authState?.user?.email,
        photoURL: getState().authState?.user?.photoURL,
        uid: getState().authState?.user?.id,
        phone: getState().authState?.user?.phoneNumber,
        timestamp: serverTimestamp(),
      },
    };
    dispatch(addBlogRequest());
    setDoc(blogDoc(blogDetails?.id), blogDetails)
      .then((data) => { 
        dispatch(
          notify({ message: "Blog posted successfully", status: "success" })
        );
        dispatch(addBlogSuccess(data.id));
        dispatch(redirectRequest());
        dispatch(redirectSuccess({ location: `/blog/view/${data.id}` }));
        dispatch(redirectReset());
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(addBlogFailure(error));
      });
  };
};
export const addFakeBlogs = (blogs) =>{
  return dispatch =>{
    const batch = writeBatch(firestoreDb);
    blogs?.forEach((blog) => {
      batch.set(blogDoc(blog?.id), blog)
    })
    batch.commit().then(()=>{
      dispatch(notify({status: "success", message: "Fake data added successfully."}))
    })
  }
}
export const removeFakeBlogs = () =>{
  return (dispatch, getState) =>{
    const blogs = getState().blogs.totalBlogs?.list
    const batch = writeBatch(firestoreDb);
    blogs?.forEach((blog) => {
      if(blog?.isFake){
        batch.delete(blogDoc(blog?.id))
      }
    })
    batch.commit().then(()=>{
      dispatch(notify({status: "success", message: "Fake data deleted successfully."}))
    })
  }
}
// export const 
export const appendNotification = (notification) =>{
  return dispatch =>{
      setDoc(addnotificationDoc(notification?.id), notification)
      .catch((error) =>{
        dispatch(notify({ message: `${error?.message}`, status: "error" }));
      })
  } 
}
export const sentBlogToReview = (blog) => {
  return (dispatch, getState) => {
    const id = chance.guid();
    const blogDetails = {
      ...blog,
      id: id,
      deleted: false,
      timestamp: serverTimestamp(),
      postedBy: {
        firstName: getState().authState?.user?.firstName,
        lastName: getState().authState?.user?.lastName,
        email: getState().authState?.user?.email,
        photoURL: getState().authState?.user?.photoURL,
        uid: getState().authState?.user?.id,
        phone: getState().authState?.user?.phoneNumber,
        timestamps: serverTimestamp(),
      },
    };
    const notification = {
      users: [],
      id: id,
      read: false,
      toAll: false,
      toAllAdmins: true,
      title: `A new blog posted by ${getState().authState?.user?.firstName + ' ' + getState().authState?.user?.lastName}.`,
        type: null,
        blogId: blogDetails?.id,
        shortDescription: `A new blog posted by ${getState().authState?.user?.firstName + ' ' + getState().authState?.user?.lastName}.`,
        Description: null,
        timestamp: serverTimestamp(),
        postedBy: {
          firstName: getState().authState?.user?.firstName,
        lastName: getState().authState?.user?.lastName,
          email: getState().authState?.user?.email,
          photoURL: getState().authState?.user?.photoURL,
          uid: getState().authState?.user?.id,
          phone: getState().authState?.user?.phoneNumber,
          timestamps: serverTimestamp(),
        },
    }
    dispatch(addBlogRequest());
    setDoc(blogReviewDoc(blogDetails?.id), blogDetails)
      .then((data) => {
        dispatch(appendNotification(notification));
        dispatch(
          notify({ message: "Blog was sent to review", status: "success" })
        );
        dispatch(addBlogSuccess(data));
        dispatch(redirectRequest());
        dispatch(redirectSuccess({ location: `/blogs/post/new-blog` }));
        dispatch(redirectReset());
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(addBlogFailure(error));
      });
  };
};
export const approveBlog = (blog) =>{
  return (dispatch, getState) =>{
    batch.set(blogDoc(blog?.id), { 
      ...blog,
      timestamp: serverTimestamp(),
        approvedBy: {
          firstName: getState().authState?.user?.firstName,
          lastName: getState().authState?.user?.lastName,
          email: getState().authState?.user?.email,
          photoURL: getState().authState?.user?.photoURL,
          uid: getState().authState?.user?.id,
          phone: getState().authState?.user?.phoneNumber,
          timestamps: serverTimestamp(),
        },
    });
    batch.update(blogReviewDoc(blog?.id), {
      deleted: true
    });
    batch.update(notificationById(blog?.id), {
      read: true
    }); 
    batch.set(notificationById(chance.guid()), {
      shortDescription: `Congratulations, Your blog was approved!.`,
      title: `Your blog has been approved!.`,
      users: [blog?.postedBy?.uid],
      toAll: false,
      deleted: false,
      toAllAdmins: false,
      timestamp: serverTimestamp(),
      approvedBy: {
          firstName: getState().authState?.user?.firstName,
          lastName: getState().authState?.user?.lastName,
          email: getState().authState?.user?.email,
          photoURL: getState().authState?.user?.photoURL,
          uid: getState().authState?.user?.id,
          phone: getState().authState?.user?.phoneNumber,
          timestamps: serverTimestamp(),
        },
    });
    batch.commit().then(() =>{
      dispatch(notify({message: "Blog has been approved!.", status: "success"}));
    })
    .catch((error) =>{
      dispatch(notify({ message: `${error?.message}`, status: "error" }));
    })
  }
}
export const getSentBlogsToReview = () =>{
    let unsubscribe;
    return (dispatch) => {
      dispatch(totalSentToReviewBlogsRequest());
      const ref = collection(firestoreDb, "review");
      const q = query(ref, where("deleted", "==", false));
      unsubscribe = onSnapshot(q, (snapshot) => {
        let list = [];
        let tags = [];
        let count = 0;
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        count = snapshot.size;
        dispatch(totalSentToReviewBlogsSuccess(list, tags, count));
      }, (error) => {
        dispatch(totalSentToReviewBlogsFailure(error));
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
      });
      return () => unsubscribe();
    };
  };
export const editBlog = (id, blog) => {
  return (dispatch, getState) => {
    const blogDetails = {
      ...blog,
      lastUpdatedBy: {
        firstName: getState().authState?.user?.firstName, 
        lastName: getState().authState?.user?.lastName,
        email: getState().authState?.user?.email,
        photoURL: getState().authState?.user?.photoURL,
        uid: getState().authState?.user?.id,
        phone: getState().authState?.user?.phoneNumber,
        timestamps: serverTimestamp(),
      },
    };
    dispatch(editBlogRequest());
    updateDoc(blogDoc(id), blogDetails)
      .then((data) => {
        dispatch(
          notify({
            message: `Blog updated successfully ${id}`,
            status: "success",
          })
        );
        dispatch(editBlogSuccess(data));
        dispatch(redirectRequest());
        dispatch(
          redirectSuccess({ location: `/blog/view/${id}`, state: data?.id })
        );
        dispatch(redirectReset());
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(editBlogFailure(error));
      });
  };
};
export const deleteBlog = (id) => {
  return (dispatch, getState) => {
    dispatch(deleteBlogRequest());
    updateDoc(blogDoc(id), { deleted: true })
      .then(() => {
        dispatch(deleteBlogSuccess(id));

        dispatch(
          notify({
            message: "Blog was deleted successfully.",
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(deleteBlogFailure(error));
      });
    dispatch(getTrendingBlogs());
    dispatch(getTotalBlogs());
    dispatch(getBlogs());
  };
};
export const handleLike = (id) => {
  return (dispatch, getState) => {
    getDoc(blogDoc(id)).then((doc) => {
      const blog = doc.data();
      if (blog) {
        const likes = blog?.likes;
        const filter = likes?.filter(
          (like) => like.uid === auth?.currentUser?.uid
        );
        if (filter?.length === 0) {
          updateDoc(blogDoc(id), {
            likes: arrayUnion({
              firstName: getState().authState?.user?.firstName, 
              lastName: getState().authState?.user?.lastName,
              email: getState().authState?.user?.email,
              photoURL: getState().authState?.user?.photoURL,
              uid: getState().authState?.user?.id,
              phone: getState().authState?.user?.phoneNumber,
              // timestamps: serverTimestamp()
            }),
          })
            .then(() => {
              getDoc(blogDoc(id)).then((doc) => {
                dispatch(addLike(doc.data()));
                dispatch(
                  notify({ message: "You liked this post", status: "success" })
                );
              });
            })
            .catch((error) => {
              dispatch(
                notify({ message: `${error?.message}`, status: "warning" })
              );
            });
        } else {
          updateDoc(blogDoc(id), {
            likes: arrayRemove({
              firstName: getState().authState?.user?.firstName, 
              lastName: getState().authState?.user?.lastName,
              email: getState().authState?.user?.email,
              photoURL: getState().authState?.user?.photoURL,
              uid: getState().authState?.user?.id,
              phone: getState().authState?.user?.phoneNumber,
              // timestamps: serverTimestamp()
            }),
          })
            .then(() => {
              getDoc(blogDoc(id)).then((doc) => {
                dispatch(removeLike(doc.data()));
                dispatch(
                  notify({
                    message: "You unliked this post",
                    status: "success",
                  })
                );
              });
            })
            .catch((error) => {
              dispatch(
                notify({ message: `${error?.message}`, status: "warning" })
              );
            });
        }
      }
    });
  };
};
export const setBlogComments = (postId) => {
  return (dispatch) => {
    getDocs(commentsRef(postId))
      .then((querySnapshot) => {
        const commentsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          comId: doc.id,
        }));
        dispatch(setComments(commentsData));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
      });
  };
};
export const handleAddComment = (postId, data) => {
  return (dispatch) => {
    const commentData = {
      userId: data.userId,
      avatarUrl: data.avatarUrl,
      userProfile: data.userProfile,
      fullName: data.fullName,
      replies: [],
      text: data.text,
      comId: data.comId,
      timestamps: serverTimestamp(),
    };
    setDoc(commentsDocRef(postId, data?.comId), commentData).then(() => {
      dispatch(addComment(data));
      dispatch(
        notify({ message: "Comment posted successfully", status: "success" })
      );
    });
  };
};
export const handleEditComment = (postId, data) => {
  return (dispatch, getState) => {
    const { comId, parentOfEditedCommentId } = data;
    const newCommentData = { text: data.text };
    const comments = getState().blogs.comments;
    if (parentOfEditedCommentId === undefined) {
      const comDocRef = doc(firestoreDb, `blogs/${postId}/comments`, comId);
      getDoc(comDocRef)
        .then((comDoc) => {
          if (comDoc.exists()) {
            updateDoc(comDocRef, newCommentData);
            const updatedComments = comments.map((com) => {
              if (com.comId === comId) {
                return { ...com, text: data.text };
              } else {
                return com;
              }
            });
            dispatch(setComments(updatedComments));
            dispatch(
              notify({
                message: "Edited comment posted successfully.",
                status: "success",
              })
            );
          }
        })
        .catch((error) => {
          dispatch(notify({ status: "error", message: error.message }));
        });
    } else {
      const parentDocRef = doc(
        firestoreDb,
        `blogs/${postId}/comments`,
        parentOfEditedCommentId
      );
      getDoc(parentDocRef)
        .then((parentDoc) => {
          if (parentDoc.exists()) {
            const parentData = parentDoc.data();
            const updatedReplies = parentData.replies.map((reply) => {
              if (reply.comId === comId) {
                return { ...reply, newCommentData };
              } else {
                return reply;
              }
            });
            updateDoc(parentDocRef, { replies: updatedReplies });
            dispatch(
              notify({
                message: "Edited comment posted successfully.",
                status: "success",
              })
            );
          }
        })
        .catch((error) => {
          dispatch(notify({ status: "error", message: error.message }));
        });
    }
  };
};
export const handleDeleteComment = (postId, data) => {
  return (dispatch, getState) => {
    const { comIdToDelete, parentOfDeleteId } = data;
    const comments = getState().blogs.comments;
    if (parentOfDeleteId === undefined) {
      const comDocRef = doc(
        firestoreDb,
        `blogs/${postId}/comments`,
        comIdToDelete
      );
      getDoc(comDocRef)
        .then((comDoc) => {
          if (comDoc.exists()) {
            deleteDoc(comDocRef)
              .then(() => {
                dispatch(
                  notify({
                    message: "Comment deleted successfully",
                    status: "success",
                  })
                );
                const updatedComments = comments.filter(
                  (com) => com.comId !== comIdToDelete
                );
                dispatch(setComments(updatedComments));
              })
              .catch((error) => {
                dispatch(notify({ status: "error", message: error.message }));
              });
          }
        })
        .catch((error) => {
          dispatch(notify({ status: "error", message: error.message }));
        });
    } else {
      const parentDocRef = doc(
        firestoreDb,
        `blogs/${postId}/comments`,
        parentOfDeleteId
      );
      getDoc(parentDocRef)
        .then((parentDoc) => {
          if (parentDoc.exists()) {
            const parentData = parentDoc.data();
            const updatedReplies = parentData.replies.filter(
              (replyId) => replyId?.comId !== comIdToDelete
            );
            updateDoc(parentDocRef, { replies: updatedReplies })
              .then(() => {
                dispatch(
                  notify({
                    message: "Comment deleted successfully",
                    status: "success",
                  })
                );
              })
              .catch((error) => {
                dispatch(notify({ status: "error", message: error.message }));
              });
          }
        })
        .catch((error) => {
          dispatch(notify({ status: "error", message: error.message }));
        });
    }
  };
};
export const handleReplyComment = (postId, data) => {
  return (dispatch) => {
    const replyData = {
      repliedToCommentId: data.repliedToCommentId,
      userId: data.userId,
      avatarUrl: data.avatarUrl,
      userProfile: data.userProfile,
      fullName: data.fullName,
      replies: [],
      text: data.text,
      comId: data.comId,
      timestamps: serverTimestamp(),
    };
    updateDoc(
      doc(
        firestoreDb,
        `blogs/${postId}/comments/${
          data.parentOfRepliedCommentId === undefined
            ? data?.repliedToCommentId
            : data.parentOfRepliedCommentId
        }`
      ),
      "replies",
      arrayUnion(replyData)
    )
      .then(() => {
        dispatch(
          notify({
            message: "Reply to the Comment posted successfully",
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(notify({ status: "error", message: error.message }));
      });
  };
};
export const updateBloggerProfile = (profile, userId, username) => { 
  return (dispatch, getState) => {
    profile.lastUpdatedBy = {
      firstName: getState().authState?.user?.firstName,
        lastName: getState().authState?.user?.lastName,
      email: getState().authState?.user?.email,
      photoURL: getState().authState?.user?.photoURL,
      uid: getState().authState?.user?.id,
      phone: getState().authState?.user?.phoneNumber,
      timestamps: serverTimestamp(),
    };
    const user = getState().authState.user;
    if(user?.roles["ADMIN"]) {
      if(profile?.admin){
        profile.roles.ADMIN = "ADMIN";
      }
      else {
        delete profile?.roles.ADMIN;
      }
      if(profile?.publisher){
        profile.roles.PUBLISHER = "PUBLISHER";
      }
      else {
        delete profile?.roles.PUBLISHER;
      }
  }
  delete profile?.admin;
  delete profile?.publisher;

    dispatch(profileUpdateRequest());
    updateDoc(userRef(userId), profile)
      .then(() => {
        if (profile?.username !== username) {
          updateDoc(usernameRef(userId), {
            username: profile?.username?.toLowerCase(),
            lastUpdatedBy: profile?.lastUpdatedBy,
          })
            .then(() => {
              dispatch(profileUpdateSuccess(profile));
              dispatch(redirectRequest());
              dispatch(redirectSuccess(`/user/profile/${profile?.id}`));
              dispatch(redirectReset());
            })  
            .catch(() => {
              dispatch(
                notify({ message: `Profile update failed.`, status: "error" })
              );
            });
        }
        else{
          dispatch(getUserDataByUsername(profile?.username));
          dispatch(profileUpdateSuccess(profile));
        }
        dispatch(
          notify({
            message: `Profile updated successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error));
        dispatch(
          notify({ message: `Profile update failed.`, status: "error" })
        );
      });
  };
};
export const updateBloggerProfileImage = (profile, userId) => {
  return (dispatch, getState) => {
    profile.lastUpdatedBy =  {
      displayName: getState().authState?.user?.displayName,
      email: getState().authState?.user?.email,
      photoURL: getState().authState?.user?.photoURL,
      uid: getState().authState?.user?.id,
      phone: getState().authState?.user?.phoneNumber,
      timestamps: serverTimestamp(),
    };
    dispatch(profileUpdateRequest());
    updateDoc(userRef(userId), profile)
      .then(() => {
        dispatch(getUserDataByUsername(profile?.username));
        dispatch(profileUpdateSuccess(profile));
        dispatch(
          notify({
            message: `Profile Image updated successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error));
        dispatch(
          notify({ message: `Profile Image update failed.`, status: "error" })
        );
      });
  };
};
export const getTags = (tag) => {
  return (dispatch) => {
    const tagBlogQuery = query( blogCollection(),where("tags", "array-contains", tag), where('deleted', "==", false) );
    let tagBlogs = [];
    dispatch(setTagsRequest())
    getDocs(tagBlogQuery)
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          tagBlogs.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setTagsSuccess(tagBlogs));
      })
      .catch((error) => {
        dispatch(setTagsFailure(error));
        dispatch(notify({ status: "error", message: error.message }));
      });
  };
};
export const getCategories = (category) => {
  return (dispatch) => {
    const categoryBlogQuery = query(blogCollection(), where("category", "==", category), where('deleted', "==", false));
    dispatch(setCategoriesRequest());
    getDocs(categoryBlogQuery)
      .then((docSnapshot) => {
        let categoryBlogs = [];
        docSnapshot.forEach((doc) => {
          categoryBlogs.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setCategoriesSuccess(categoryBlogs));
      })
      .catch((error) => {
        dispatch(setCategoriesFailure(error));
        dispatch(notify({ status: "error", message: error.message }));
      });
  };
};
//visitors count 


export const getVisitorsCount = () => {
  return dispatch => {
    dispatch(getVisitorsCountRequest());
    onValue(visitorCountRef(), (snapshot) =>{
      const count = snapshot.val();
      dispatch(getVisitorsCountSuccess(count?.visitorCount))
    },
    (error) => {
      dispatch(getVisitorsCountFailure(error));
      dispatch(notify({ status: "error", message: error.message }));
    })
  }
}
export const addVisitor = () => {
  return dispatch => {
    update(visitorCountRef(),{visitorCount : increment(1)})
    .then(() => { 
      dispatch({type: "VISITOR_ADDED", action: {message: "Visitor added!."}})
    })
    .catch(error => {
      dispatch({ type: "VISITOR_ADDING_ERROR", error: error.message });
    });
  }
}
export const getRealtimeUsersCount = () =>{ 

  return dispatch => {
    
  }
}

// subscribe form
export const submitSubscribe = (email) => {
  return (dispatch) => {
    dispatch(submitSubscribeRequest());
    addDoc(subscribeMe(), email)
      .then((data) => {
        dispatch(
          notify({
            message: "Your are subscribed to hanumanth's blogs successfully!",
            status: "success",
          })
        );
        dispatch(submitSubscribeSuccess(email));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(submitSubscribeFailure(error));
      });
  };
};
// Get in touch forms
export const submitGetInTouchForm = (formData) => {
  return (dispatch) => {
    dispatch(submitGetInTouchRequest());
    addDoc(contactUs(), formData)
      .then((data) => {
        dispatch(
          notify({
            message: "Your request sent successfully!",
            status: "success",
          })
        );
        dispatch(submitGetInTouchSuccess(formData));
        dispatch(redirectRequest());
        dispatch(
          redirectSuccess({
            location: "/connect-with-me/thank-you",
            state: formData,
          })
        );
        dispatch(redirectReset());
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(submitGetInTouchFailure(error));
      });
  };
};
// Templates
 export const getTemplates = () => {
  return (dispatch, getState) => {
    const authUser = getState()?.authState?.user?.id;
    const q = query(templatesColRef(),
     where("deleted", "==", false),
     where("postedBy.uid", "==", authUser),
     orderBy("timestamp", "desc")
     ); 
    dispatch(getTemplatesRequest());
    getDocs(q)
      .then((snapshot) => {
        const templates = [];
        snapshot.docs.forEach((doc) => {
          templates.push({ id: doc.id, ...doc.data() });
        });
        dispatch(getTemplatesSuccess(templates));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(getTemplatesFailure(error));
      });
  };
};
export const getTemplatesforAdmin = () => {
  return (dispatch) => {
    const q = query(templatesColRef(),
     where("deleted", "==", false),
     orderBy("timestamp", "desc")
     ); 
    dispatch(getTemplatesRequest());
    getDocs(q)
      .then((snapshot) => {
        const templates = [];
        snapshot.docs.forEach((doc) => {
          templates.push({ id: doc.id, ...doc.data() });
        });
        dispatch(getTemplatesSuccess(templates));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
        dispatch(getTemplatesFailure(error));
      });
  };
};
export const deleteTemplate = (templateId) => {
  return (dispatch) => {
    dispatch(deleteTemplatesRequest());

    // Delete the template document from Firestore
    updateDoc(templateDocRef(templateId), { deleted: true })
      .then(() => {
        dispatch(deleteTemplatesSuccess(templateId));
        dispatch(notify({ message: "Template deleted successfully", status: "success" }));
      })
      .catch((error) => {
        dispatch(deleteTemplatesFailure(error));
        dispatch(notify({ message: `${error?.message}`, status: "warning" }));
      });
  };
};

export const addTemplate = (template) => {
  return (dispatch, getState) => {
    const templateDetails = {
      ...template,
      id: chance.guid(),
      deleted: false,
      timestamp: serverTimestamp(),
      postedBy: {
        firstName: getState().authState?.user?.firstName,
        lastName: getState().authState?.user?.lastName,
        email: getState().authState?.user?.email,
        photoURL: getState().authState?.user?.photoURL,
        uid: getState().authState?.user?.id,
        phone: getState().authState?.user?.phoneNumber,
        timestamp: serverTimestamp(),
      },
    }
    dispatch(addTemplatesRequest());
    setDoc(templateDocRef(templateDetails?.id), templateDetails)
    .then((template) =>{
    dispatch(
          notify({ message: "Template saved successfully", status: "success" })
        );
        dispatch(addTemplatesSuccess(templateDetails));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "danger" }));
        dispatch(addTemplatesFailure(error));
      });
  }
}
export const getTemplate = (templateId) => {
  return (dispatch) => {
    dispatch(getTemplateRequest());
    getDoc(templateDocRef(templateId))
    .then((template) =>{
        dispatch(getTemplateSuccess(template.data()));
      })
      .catch((error) => {
        dispatch(notify({ message: `${error?.message}`, status: "danger" }));
        dispatch(getTemplateFailure(error));
      });
  }
}
export const editTemplate = (template) => {
  return (dispatch, getState) =>{ 
    const templateDetails = {
      ...template,
      lastUpdatedBy: {
        firstName: getState().authState?.user?.firstName,
        lastName: getState().authState?.user?.lastName,
        email: getState().authState?.user?.email,
        photoURL: getState().authState?.user?.photoURL,
        uid: getState().authState?.user?.id,
        phone: getState().authState?.user?.phoneNumber,
        timestamp: serverTimestamp(),
      },
    }
    dispatch(editTemplatesRequest());
    updateDoc(templateDocRef(template?.id), templateDetails)
    .then(() =>{
      dispatch(
            notify({ message: "Template Updated successfully", status: "success" })
          );
          dispatch(editTemplatesSuccess(templateDetails));
        })
        .catch((error) => {
          dispatch(notify({ message: `${error?.message}`, status: "danger" }));
          dispatch(editTemplatesFailure(error));
        });
  }
}
export const templateFileUpload = (file) => {
  return dispatch =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    var imageFullPath = templateFiles(file?.name);
    const uploadprogress = uploadBytesResumable(imageFullPath, file);

    uploadprogress.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        dispatch(handleUploadProgress(progress));
      },
      (error) => {
        dispatch(notify({ status: "error", message: error.message }));
      },
      () => {
        getDownloadURL(uploadprogress.snapshot.ref)
          .then((url) => {
            dispatch(fileUploadSuccess(url));
            toast.success(`${file?.name} was uploaded.`)
          })
          .catch((error) => {
            dispatch(notify({ status: "error", message: error.message }));
          });
      }
    );
  }
}
// get logged in User data
export const changeProfileImage = (file, userId, username) => {
  return (dispatch) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    var imageFullPath = imageUploadPath(userId, file.name);
    const uploadprogress = uploadBytesResumable(imageFullPath, file);

    uploadprogress.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        dispatch(handleUploadProgress(progress));
      },
      (error) => {
        dispatch(notify({ status: "error", message: error.message }));
      },
      () => {
        getDownloadURL(uploadprogress.snapshot.ref)
          .then((url) => {
            const profile = {
              photoURL: url,
              username: username,
            };
            updateBloggerProfileImage(profile, userId);
            dispatch(handleProfileImageChange(url));
          })
          .catch((error) => {
            dispatch(notify({ status: "error", message: error.message }));
          });
      }
    );
  };
};
export const getUserMetaData = (email) => {
  return (dispatch) => {
    dispatch(getUserMetaDataRequest());
    getDoc(usermetadata(email))
      .then((info) => {
        if (info.exists()) {
          dispatch(getUserMetaDataSuccess(info.data()));
        } else {
          dispatch(getUserMetaDataFailure("User Not found!"));
          dispatch(
            notify({
              id: "error",
              message: `${email} - Not found!. \n Please sign up before login.`,
              status: "error",
            })
          );
        }
      })
      .catch((error) => {
        dispatch(getUserMetaDataFailure(error));
      });
  };
};
export const getCurrentUserData = (userId) => {
  return (dispatch) => {
    dispatch(getCurrentUserDataRequest());
    getDoc(userRef(userId))
      .then((info) => {
        dispatch(getCurrentUserDataSuccess(info.data()));
      })
      .catch((error) => {
        dispatch(getCurrentUserDataFailure(error));
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
      });
  };
};
export const getUserData = (userId) => {
  return (dispatch) => {
    dispatch(getUserDataRequest());
    getDoc(userRef(userId))
      .then((info) => {
        dispatch(getUserDataSuccess(info.data()));
      })
      .catch((error) => {
        dispatch(getUserDataFailure(error));

        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
      });
  };
};
export const getUsersData = () => {
  let unsubscribe;
  return (dispatch) => {
    unsubscribe = onSnapshot(
      usersRef(),
      (data) => {
        const users = [];
        data.forEach((user) => {
          users.push(user.data());
        });
        dispatch(getUsersDataSuccess(users));
      },
      (error) => {
        dispatch(getUsersDataFailure(error));

        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
      }
    );
    return () => unsubscribe();
  };
};
export const getUserDataByUsername = (username) => {
  return (dispatch) => {
    if (username === "") {
      dispatch(
        notify({
          id: "error",
          message: "Username is required!",
          status: "error",
        })
      );
    } else {
      const q = query(usersRef(), where("username", "==", username));
      getDocs(q)
        .then((data) => {
          if (!data.empty) {
            data.forEach((docs) => {
              if (docs.data().username === username) {
                dispatch(getUserDataByUsernameSuccess(docs.data()));
              } else {
                dispatch(getUserDataByUsernameFailure("User Not found!"));
                dispatch(
                  notify({
                    id: "error",
                    message: `${username} - Not found!. \n Please check again.`,
                    status: "error",
                  })
                );
              }
            });
          } else {
            dispatch(getUserDataByUsernameFailure("User Not found!"));
            dispatch(
              notify({
                id: "error",
                message: `${username} - Not found!. \n Please check again.`,
                status: "error",
              })
            );
          }
        })
        .catch((error) => {
          dispatch(getUserDataByUsernameFailure(error));
        });
    }
  };
};

export const getUserMetaDataByUsername = (username) => {
  return (dispatch) => {
    dispatch(sendForgotEmailRequest());
    if (username === "") {
      dispatch(
        notify({
          id: "error",
          message: "Username is required!",
          status: "error",
        })
      );
    } else {
      const q = query(usernames(), where("username", "==", username));
      getDocs(q)
        .then((data) => {
          if (!data.empty) {
            data.forEach((docs) => {
              if (docs.data().username === username) {
                dispatch(sendForgotEmailSuccess(docs.data()));
              } else {
                dispatch(sendForgotEmailFailure("User Not found!"));
                dispatch(
                  notify({
                    id: "error",
                    message: `${username} - Not found!. \n Please check again.`,
                    status: "error",
                  })
                );
              }
            });
          } else {
            dispatch(sendForgotEmailFailure("User Not found!"));
            dispatch(
              notify({
                id: "error",
                message: `${username} - Not found!. \n Please check again.`,
                status: "error",
              })
            );
          }
        })
        .catch((error) => {
          dispatch(getUserMetaDataFailure(error));
        });
    }
  };
};
export const createUserDataonOAuth = (data) => {
  return (dispatch, getState) => {
    let userId = data.user.uid;
    let user = data.user;
    const batch = writeBatch(firestoreDb);
    const userData = {
      email: user.email,
          id: user.uid,
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ").slice(0, -1).join(" "),
          photoURL: user.photoURL,
          providerData: user.providerData,
          username: user.uid,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          accessToken: user.accessToken,
          createdAt: user.metadata.createdAt,
          creationTime: user.metadata.creationTime,
          lastLoginAt: user.metadata.lastLoginAt,
          lastSignInTime: user.metadata.lastSignInTime,
          roles: {},
          permissions: {},
    }
    dispatch(createNewUserRequest());
    dispatch(
      notify({
        id: "loading",
        message: "logging in...",
        status: "loading",
        dismissAfter: 100000,
      })
    );
    getDoc(userRef(userId)).then((info) => {
      if (info.exists()) {
        dispatch(
          notify({
            message: "User already exists!.",
            status: "success",
            dismissAfter: 5000,
          })
        );
      } else {
        batch.set(userRef(userId), userData);
        batch.set(usernameRef(userId), {
          username: userId,
          email: user.email,
          id: user?.uid,
          photoURL: user?.photoURL,
          displayName: user?.displayName,
          
        });
        batch.set(usermetadata(user.email), {
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          fullName: user.displayName,
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ").slice(0, -1).join(" "),
          username: user.uid,
        });
        batch
          .commit()
          .then(() => {
            dispatch(createNewUserSuccess(userData));
            dispatch(getCurrentUserDataSuccess(userData));
            dispatch(
              notify({
                message: "User created successfully!.",
                status: "success",
              })
            );
            dismissNotification("loading");
          })
          .catch((error) => {
            dispatch(createNewUserFailure(error));
            dispatch(
              notify({ id: "error", message: error.message, status: "error" })
            );
          });
        }
        }).catch((error) =>{
          dispatch(loginFailure(error));
              dispatch(
                notify({ id: "error", message: error.message, status: "error" })
              );
              dispatch(dismissNotification("loading"));
        })
        };
};
export const createUserDataonSignup = (data, formInfo) => {
  return (dispatch, getState) => {
    let userId = data.user.uid;
    let user = data.user;
    const userData = {
      email: user.email,
          id: user.uid,
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ").slice(0, -1).join(" "),
          photoURL: user.photoURL,
          providerData: user.providerData,
          username: user.uid,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          accessToken: user.accessToken,
          createdAt: user.metadata.createdAt,
          creationTime: user.metadata.creationTime,
          lastLoginAt: user.metadata.lastLoginAt,
          lastSignInTime: user.metadata.lastSignInTime,
          roles: {},
          permissions: {},
    }
    const batch = writeBatch(firestoreDb);
    dispatch(createNewUserRequest());
    dispatch(
      notify({
        id: "loading",
        message: "logging in...",
        status: "loading",
        dismissAfter: 100000,
      })
    );
    getDoc(userRef(userId)).then((info) => {
      if (info.exists()) {
        dispatch(
          notify({
            message: "User already exists!.",
            status: "success",
            dismissAfter: 5000,
          })
        );
      } else {
        batch.set(userRef(userId), userData);
        batch.set(usernameRef(userId), {
          username: userId,
          email: user.email,
          photoURL: user?.photoURL,
          id: user?.uid,
          displayName: user?.displayName,
          });
        batch.set(usermetadata(user.email), {
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          fullName: user.displayName,
          firstName: formInfo.firstName,
          lastName: formInfo.lastName,
        });
        batch
          .commit()
          .then(() => {
            dispatch(createNewUserSuccess(userData));
            dispatch(getCurrentUserDataSuccess(userData));
            dispatch(
              notify({
                message: "User created successfully!.",
                status: "success",
              })
            );
            dismissNotification("loading");
          })
          .catch((error) => {
            dispatch(createNewUserFailure(error));
            dispatch(
              notify({ id: "error", message: error.message, status: "error" })
            );
          });
      }
    }).catch((error) =>{
      dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
          dispatch(dismissNotification("loading"));
    })
  };
};
export const getMultiFactorOptions = (error) => {
  return (dispatch) => {
    dispatch(getMultiFactorOptionsRequest());
    const resolver = getMultiFactorResolver(auth, error);
    if (resolver.hints.length > 0) {
      dispatch(getMultiFactorOptionsSuccess(resolver));
    } else {
      dispatch(
        getMultiFactorOptionsFailure({
          code: "ERROR",
          message:
            "There is no multifactor options associated with this account.",
        })
      );
    }
  };
};
export const confirmMFAAuth = (code, credential, resolver) => {
  return (dispatch) => {
    const cred = PhoneAuthProvider.credential(credential.verificationId, code);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    resolver
      .resolveSignIn(multiFactorAssertion)
      .then(function (userCredential) {
        // userCredential will also contain the user, additionalUserInfo, optional
        // credential (null for email/password) associated with the first factor sign-in.
        // For example, if the user signed in with Google as a first factor,
        // userCredential.additionalUserInfo will contain data related to Google
        // provider that the user signed in with.
        // - user.credential contains the Google OAuth credential.
        // - user.credential.accessToken contains the Google OAuth access token.
        // - user.credential.idToken contains the Google OAuth ID token.
      });
  };
};
export const phoneOTPGenerator = (selectedAuth, session, confirmObj) => {
  return (dispatch) => {
    dispatch(OTPRequest());
    const phoneInfoOptions = {
      multiFactorHint: selectedAuth,
      session: session,
    };
    const phoneAuthProvider = new PhoneAuthProvider(auth);
    const verifyCode = phoneAuthProvider.verifyPhoneNumber(
      phoneInfoOptions,
      confirmObj
    );
    verifyCode
      .then(function (verificationId) {
        dispatch(OTPSuccess(verificationId));
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-multi-factor-session") {
          dispatch(
            OTPFailure({
              message: "Unsupported MFA Authentication.",
            })
          );
        }
        console.log(error);
      });
  };
};
export const mfaAuth = () => {
  return (dispatch) => {
    dispatch(getMFAAuthRequest());
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container-id",
      undefined,
      auth
    );
    appVerifier.render();
    if (appVerifier) {
      dispatch(getMFAAuthSuccess(appVerifier));
    } else {
      dispatch(
        getMFAAuthFailure({ message: "Some error occured! Please try again." })
      );
    }
  };
  // if (type.factorId ===
  //     PhoneMultiFactorGenerator.FACTOR_ID) {
  //     // const phoneInfoOptions = {
  //     //     multiFactorHint: type,
  //     //     session: session
  //     // };
  //     // const phoneAuthProvider = new PhoneAuthProvider(auth);
  //     // const verifyCode = phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions,recaptcha)
  //     // verifyCode.then((res)=>{
  //     //   console.log(res);
  //     // })
  //     console.log("phone selected");
  //   }
  //   else{

  //   }
};
export const addEducation = (education, userId, username) => {
  return (dispatch, getState) => {
    education.lastUpdatedBy = {
      displayName: getState().authState?.user?.displayName,
      email: getState().authState?.user?.email,
      photoURL: getState().authState?.user?.photoURL,
      uid: getState().authState?.user?.id,
      phone: getState().authState?.user?.phoneNumber,
      timestamps: serverTimestamp(),
    };
    dispatch(educationRequest());
    updateDoc(userRef(userId), {
      education: arrayUnion(education),
    })
      .then(() => {
        dispatch(educationSuccess(education));
        dispatch(getUserDataByUsername(username));
        dispatch(
          notify({
            message: `Education ${education?.schoolName} added successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(educationFailure(error));
        dispatch(
          notify({
            message: `Education ${education?.schoolName} could not be added.`,
            status: "error",
          })
        );
      });
  };
};
export const editEducation = (education, userId, username) => {
  return (dispatch, getState) => {
    education.lastUpdatedBy = {
      displayName: getState().authState?.user?.displayName,
      email: getState().authState?.user?.email,
      photoURL: getState().authState?.user?.photoURL,
      uid: getState().authState?.user?.id,
      phone: getState().authState?.user?.phoneNumber,
      timestamps: serverTimestamp(),
    };
    dispatch(educationRequest());
    const userState = getState().userState;

    const updatedEducations = userState?.profile?.education?.map((item) => {
      if (item.id === education?.id) {
        console.log(item);
        return { ...item, ...education };
      }
      return item;
    });
    console.log(updatedEducations);
    updateDoc(userRef(userId), {
      education: updatedEducations,
    })
      .then(() => {
        dispatch(educationSuccess(education));
        dispatch(getUserDataByUsername(username));
        dispatch(
          notify({
            message: `Education ${education?.schoolName} updated successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(educationFailure(error));
        dispatch(
          notify({
            message: `Education ${education?.schoolName} update failed.`,
            status: "error",
          })
        );
      });
  };
};
export const deleteEducation = (education, userId, username) => {
  return (dispatch, getState) => {
    dispatch(educationRequest());
    updateDoc(userRef(userId), {
      education: arrayRemove(education),
    })
      .then(() => {
        dispatch(educationSuccess(education));
        dispatch(getUserDataByUsername(username));
        dispatch(
          notify({
            message: `Education ${education?.schoolName} deleted successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(educationFailure(error));
        dispatch(
          notify({
            message: `Education ${education?.schoolName} delete failed.`,
            status: "error",
          })
        );
      });
  };
};
export const addExperience = (experience, userId, username) => {
  return (dispatch, getState) => {
    experience.addedBy = {
      displayName: getState().authState?.user?.displayName,
      email: getState().authState?.user?.email,
      photoURL: getState().authState?.user?.photoURL,
      uid: getState().authState?.user?.id,
      phone: getState().authState?.user?.phoneNumber,
      timestamps: serverTimestamp(),
    };
    dispatch(experienceRequest());
    updateDoc(userRef(userId), {
      experience: arrayUnion(experience),
    })
      .then(() => {
        dispatch(experienceSuccess(experience));
        dispatch(getUserDataByUsername(username));
        dispatch(
          notify({
            message: `Experience ${experience?.companyName} added successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(educationFailure(error));
        dispatch(
          notify({
            message: `Experience ${experience?.companyName} could not be added.`,
            status: "error",
          })
        );
      });
  };
};
export const editExperience = (experience, userId, username) => {
  return (dispatch, getState) => {
    experience.lastUpdatedBy = {
      displayName: getState().authState?.user?.displayName,
      email: getState().authState?.user?.email,
      photoURL: getState().authState?.user?.photoURL,
      uid: getState().authState?.user?.id,
      phone: getState().authState?.user?.phoneNumber,
      timestamps: serverTimestamp(),
    };
    dispatch(experienceRequest());
    const userState = getState().userState;
    // console.log(experience, userId, username, educations);

    const updatedExperiences = userState?.profile?.experience?.map((item) => {
      if (item.id === experience?.id) {
        return { ...item, ...experience };
      }
      return item;
    });
    updateDoc(userRef(userId), {
      experience: updatedExperiences,
    })
      .then(() => {
        dispatch(experienceSuccess(experience));
        dispatch(getUserDataByUsername(username));
        dispatch(
          notify({
            message: `Experience ${experience?.companyName} updated successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(experienceFailure(error));
        dispatch(
          notify({
            message: `Experience ${experience?.companyName} update failed.`,
            status: "error",
          })
        );
      });
  };
};
export const deleteExperience = (experience, userId, username) => {
  return (dispatch, getState) => {
    dispatch(experienceRequest());
    updateDoc(userRef(userId), {
      experience: arrayRemove(experience),
    })
      .then(() => {
        dispatch(experienceSuccess(experience));
        dispatch(getUserDataByUsername(username));
        dispatch(
          notify({
            message: `Experience with ${experience?.companyName} deleted successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(experienceFailure(error));
        dispatch(
          notify({
            message: `Experience with ${experience?.companyName} delete failed.`,
            status: "error",
          })
        );
      });
  };
};
export const updateProfile = (profile, userId, username) => {
  return (dispatch, getState) => {
    profile.lastUpdatedBy = {
      displayName: getState().authState?.user?.displayName,
      email: getState().authState?.user?.email,
      photoURL: getState().authState?.user?.photoURL,
      uid: getState().authState?.user?.id,
      phone: getState().authState?.user?.phoneNumber,
      timestamps: serverTimestamp(),
    };
    dispatch(profileUpdateRequest());
    updateDoc(userRef(userId), profile)
      .then(() => {
        if (profile?.username !== username) {
          updateDoc(usernameRef(userId), {
            username: profile?.username?.toLowerCase(),
            lastUpdatedBy: profile?.lastUpdatedBy,
          })
            .then(() => {
              dispatch(profileUpdateSuccess(profile));
              dispatch(redirectRequest());
              dispatch(redirectSuccess(`/profile/${profile?.username}`));
              dispatch(redirectReset());
            })
            .catch(() => {
              dispatch(
                notify({ message: `Profile update failed.`, status: "error" })
              );
            });
        }
        dispatch(getUserDataByUsername(profile?.username));
        dispatch(profileUpdateSuccess(profile));
        dispatch(
          notify({
            message: `Profile updated successfully.`,
            status: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error));
        dispatch(
          notify({ message: `Profile update failed.`, status: "error" })
        );
      });
  };
};
export const getNotificaions = () => {
  return (dispatch, getState) => {
  const role = getState().authState?.user?.roles?.["ADMIN"];

        dispatch(notificationsFetchRequest());
    const getAllQuery = query(getAllNotifications(),where("deleted", "==", false),where("toAll", "==", true), orderBy('timestamp', 'asc'), limit(5));
    const getAllAdminsQuery = query(getAllNotifications(),where("deleted", "==", false),where("toAllAdmins", "==", (role === 'ADMIN')), orderBy('timestamp', 'asc'), limit(5));
    const getAllUserQuery = query(getAllNotifications(),where("deleted", "==", false),where("users", "array-contains", [getState().authState?.user?.user?.uid ? getState().authState?.user?.user?.uid : getState().authState?.user?.id]), orderBy('timestamp', 'asc'), limit(5));

    
    const unsubscribeCallbacks = [];
    const getAllNotificationsData = [];

    const getAllUnsubscribe = onSnapshot(getAllQuery, (titleSnapshot) => {
      titleSnapshot.forEach((doc) => {
        getAllNotificationsData.push({ id: doc.id, ...doc.data() });
      });
      // dispatch(notificationsFetchSuccess(getAllNotificationsData, "getAll"));

    }, (error) => {
      dispatch(notificationsFetchFailure(error));
      dispatch(notify({ status: "error", message: error.message }));
    });

    const getAllAdminsUnsubscribe = onSnapshot(getAllAdminsQuery, (userSnapshot) => {
      userSnapshot.forEach((doc) => {
        getAllNotificationsData.push({ id: doc.id, ...doc.data() });
      });
      // dispatch(notificationsFetchSuccess(getAllAdminNotifications, "getAllAdmins"));

    }, (error) => {
      dispatch(notificationsFetchFailure(error));
      dispatch(notify({ status: "error", message: error.message }));
    });

    const getAllUsersUnsubscribe = onSnapshot(getAllUserQuery, (tagSnapshot) => {
      tagSnapshot.forEach((doc) => {
        getAllNotificationsData.push({ id: doc.id, ...doc.data() });
      });
      // dispatch(notificationsFetchSuccess(getAllUserNotifications, "getAllUser"));

    }, (error) => {
      dispatch(notificationsFetchFailure(error));
      dispatch(notify({ status: "error", message: error.message }));
    });
    
    dispatch(notificationsFetchSuccess(getAllNotificationsData));
    unsubscribeCallbacks.push(getAllUnsubscribe);
    unsubscribeCallbacks.push(getAllAdminsUnsubscribe);
    unsubscribeCallbacks.push(getAllUsersUnsubscribe);
    return unsubscribeCallbacks;
  };
};

export const getNotificationById = (id) => {
  return (dispatch) => {
    dispatch(notificationsFetchByIdRequest());
    getDoc(notificationById(id))
      .then((data) => {
        if (data.exists() && !data.data()?.deleted) {
          dispatch(notificationsFetchByIdSuccess(data.data()));
        } else {
          dispatch(
            notificationsFetchByIdFailure({
              message: "Notification not found",
              code: "Not-found",
            })
          );
        }
      })
      .catch((error) => {
        dispatch(notificationsFetchByIdFailure(error));
      });
  };
};
export const updateNotificationById = (id, notification) => {
  return (dispatch, getState) => {
    notification.lastUpdatedBy = {
      displayName: getState().authState?.user?.displayName,
      email: getState().authState?.user?.email,
      photoURL: getState().authState?.user?.photoURL,
      uid: getState().authState?.user?.id,
      phone: getState().authState?.user?.phoneNumber,
      timestamps: serverTimestamp(),
    };
    dispatch(notificationsFetchByIdRequest());
    updateDoc(notificationById(id), notification)
      .then(() => {
        dispatch(notificationsFetchByIdSuccess());
        dispatch(getNotificaions());
      })
      .catch((error) => {
        dispatch(notificationsFetchByIdFailure(error));
      });
  };
};
export const login = (email, password, pathname) => {
  return (dispatch) => {
    dispatch(loginRequest());
    dispatch(
      notify({ id: "loading", message: "logging in...", status: "loading" })
    );
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch(loginSuccess(user));
        dispatch(getCurrentUserData(user.user.uid));
        dispatch(getUserMetaData(user.user.email));
        dispatch(redirectRequest());
        dispatch(redirectSuccess(pathname));
        dispatch(dismissNotification("loading"));
        dispatch(
          notify("Welcome to the Hanumanth's blogs webapp", "success", {
            position: "bottom-center",
            showDismissButton: false,
          })
        );
        dispatch(redirectReset());
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/multi-factor-auth-required") {
          const resolver = getMultiFactorResolver(auth, error);
          console.log(resolver.hints);
          // if (resolver.hints[selectedIndex].factorId ===
          //   PhoneMultiFactorGenerator.FACTOR_ID) {
          //   const phoneInfoOptions = {
          //       multiFactorHint: resolver.hints[selectedIndex],
          //       session: resolver.session
          //   };
          //   const phoneAuthProvider = new PhoneAuthProvider(auth);
          // }
          // else{

          // }
        } else if (errorCode === ERROR_CODE_WRONG_PASSWORD) {
          dispatch(
            notify({
              id: "error",
              message: ERROR_MSG_WRONG_PASSWORD,
              status: "error",
            })
          );
          dispatch(dismissNotification("loading"));
          dispatch(loginFailure(error));
        } else if (errorCode === ERROR_CODE_TOO_MANY_ATTEMPTS) {
          dispatch(
            notify({
              id: "error",
              message: ERROR_MSG_TOO_MANY_ATTEMPTS,
              status: "error",
            })
          );
          dispatch(dismissNotification("loading"));
          dispatch(loginFailure(error));
        } else {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
          dispatch(dismissNotification("loading"));
        }
      });
  };
};
export const OAuthLogin = (provider, pathname) => {
  return (dispatch) => {
    dispatch(loginRequest());
    dispatch(
      notify({ id: "loading", message: "logging in...", status: "loading" })
    );
    if (provider === "google") {
      const authProvider = new GoogleAuthProvider();
      signInWithPopup(auth, authProvider)
        .then((user) => {
          // dispatch(createUserDataonOAuth(user));
          getDoc(userRef(user.user.uid))
          .then((userData) => {
            if(userData.exists()){
              dispatch(setCurrentUser(user));
              dispatch(getCurrentUserData(user.user.uid));
              dispatch(loginSuccess(user));
              dispatch(redirectRequest());
              dispatch(redirectSuccess(pathname));
              dispatch(dismissNotification("loading"));
              dispatch(
                notify(`Welcome Back ${user.user.displayName}`, "success", {
                  position: "bottom-center",
                  showDismissButton: false,
                })
              );
              dispatch(redirectReset());
            }
            else{
             dispatch(createUserDataonOAuth(user));
             dispatch(setCurrentUser(user));
            
          dispatch(loginSuccess(user));
          dispatch(redirectRequest());
          dispatch(redirectSuccess(pathname));
          dispatch(dismissNotification("loading"));
          dispatch(
            notify(`Welcome Back ${user.user.displayName}`, "success", {
              position: "bottom-center",
              showDismissButton: false,
            })
          );
          dispatch(redirectReset());
            }
          })
          .catch((error) => {
            dispatch(loginFailure(error));
            dispatch(
              notify({ id: "error", message: error.message, status: "error" })
            );
          });          
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode === "auth/multi-factor-auth-required") {
            dispatch(getMultiFactorOptions(error));
            dispatch(redirectRequest());
            dispatch(redirectSuccess(ROUTES.AUTH2));
            setTimeout(() => {
              dispatch(redirectReset());
            }, 1000);
          } else if (errorCode === ERROR_CODE_WRONG_PASSWORD) {
            dispatch(
              notify({
                id: "error",
                message: ERROR_MSG_WRONG_PASSWORD,
                status: "error",
              })
            );
            dispatch(dismissNotification("loading"));
            dispatch(loginFailure(error));
          } else if (errorCode === ERROR_CODE_TOO_MANY_ATTEMPTS) {
            dispatch(
              notify({
                id: "error",
                message: ERROR_MSG_TOO_MANY_ATTEMPTS,
                status: "error",
              })
            );
            dispatch(dismissNotification("loading"));
            dispatch(loginFailure(error));
          } else {
            dispatch(loginFailure(error));
            dispatch(
              notify({ id: "error", message: error.message, status: "error" })
            );
            dispatch(dismissNotification("loading"));
          }
        });
    } else if (provider === "facebook") {
      const authProvider = new FacebookAuthProvider();
      signInWithPopup(auth, authProvider)
      .then((user) => {
        getDoc(userRef(user.user.uid))
        .then((userData) => {
          if(userData.exists()){
            dispatch(setCurrentUser(user));
            
            dispatch(loginSuccess(user));
            dispatch(redirectRequest());
            dispatch(redirectSuccess(pathname));
            dispatch(dismissNotification("loading"));
            dispatch(
              notify(`Welcome Back ${user.user.displayName}`, "success", {
                position: "bottom-center",
                showDismissButton: false,
              })
            );
            dispatch(redirectReset());
          }
          else{
           dispatch(createUserDataonOAuth(user));
           dispatch(setCurrentUser(user));
          
        dispatch(loginSuccess(user));
        dispatch(redirectRequest());
        dispatch(redirectSuccess(pathname));
        dispatch(dismissNotification("loading"));
        dispatch(
          notify(`Welcome Back ${user.user.displayName}`, "success", {
            position: "bottom-center",
            showDismissButton: false,
          })
        );
        dispatch(redirectReset());
          }
        })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });        
      })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
    } else if (provider === "twitter") {
      const authProvider = new TwitterAuthProvider();
      signInWithPopup(auth, authProvider)
      .then((user) => {
        // dispatch(createUserDataonOAuth(user));
        getDoc(userRef(user.user.uid))
        .then((userData) => {
          if(userData.exists()){
            dispatch(setCurrentUser(user));
            
            dispatch(loginSuccess(user));
            dispatch(redirectRequest());
            dispatch(redirectSuccess(pathname));
            dispatch(dismissNotification("loading"));
            dispatch(
              notify(`Welcome Back ${user.user.displayName}`, "success", {
                position: "bottom-center",
                showDismissButton: false,
              })
            );
            dispatch(redirectReset());
          }
          else{
           dispatch(createUserDataonOAuth(user));
           dispatch(setCurrentUser(user));
          
        dispatch(loginSuccess(user));
        dispatch(redirectRequest());
        dispatch(redirectSuccess(pathname));
        dispatch(dismissNotification("loading"));
        dispatch(
          notify(`Welcome Back ${user.user.displayName}`, "success", {
            position: "bottom-center",
            showDismissButton: false,
          })
        );
        dispatch(redirectReset());
          }
        })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
      })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
    } else if (provider === "github") {
      const authProvider = new GithubAuthProvider();
      signInWithPopup(auth, authProvider)
        .then((user) => {
          // dispatch(createUserDataonOAuth(user));
          dispatch(setCurrentUser(user));
          
          dispatch(loginSuccess(user));
          dispatch(redirectRequest());
          dispatch(redirectSuccess(pathname));
          dispatch(dismissNotification("loading"));
          dispatch(
            notify(`Welcome Back ${user.user.displayName}`, "success", {
              position: "bottom-center",
              showDismissButton: false,
            })
          );
          dispatch(redirectReset());
        })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
    }  else {
      dispatch(dismissNotification('loading'))
      dispatch(loginFailure("Please provide valid Oauth-type"));
      dispatch(
        notify({
          id: "error",
          message: "Please provide valid Oauth-type",
          status: "error",
        })
      );
    }
  };
};
export const fetchSignInMethods = (email) => {
  return dispatch => {
    fetchSignInMethodsForEmail(auth, email)
    .then((signinMethods ) =>{
      dispatch(storeSignInMethods(signinMethods))
    })
    .catch((error) =>{
      notify({ id: "error", message: error.message, status: "error" })
    })
  }
}
export const linkWithGoogle = () => {
  return (dispatch) => {
    dispatch(accountLinkingRequest());
    const authProvider = new GoogleAuthProvider();
    linkWithPopup(auth.currentUser, authProvider)
      .then((result) => {
        dispatch(accountLinkingSuccess(result));
      dispatch(notify({message: "Google account was successfully linked to your account", status: "success"}))
      })
      .catch((error) => {
        let errorMessage = '';
        if (error.code === "auth/credential-already-in-use") {
          errorMessage = "Your Google  account was already linked with another account";
        } else if (error.code === "auth/requires-recent-login") {
          errorMessage = "Please login again and then try again!";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Wrong Password and then try again!";
        } else {
          errorMessage = error ? error.message : "";
        }
        dispatch(notify({ message: `${errorMessage}`, status: "warning" }));
        dispatch(accountLinkingFailure(error));
      });
  };
};
export const linkWithGithub = () => {
  return (dispatch) => {
    dispatch(accountLinkingRequest());
    const authProvider = new GithubAuthProvider();
    linkWithPopup(auth.currentUser, authProvider)
      .then((result) => {
        dispatch(accountLinkingSuccess(result));
      dispatch(notify({message: "Github account was successfully linked to your account", status: "success"}))

      })
      .catch((error) => {
        let errorMessage = '';
        if (error.code === "auth/credential-already-in-use") {
          errorMessage = "Your Github  account was already linked with another account";
        } else if (error.code === "auth/requires-recent-login") {
          errorMessage = "Please login again and then try again!";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Wrong Password and then try again!";
        } else {
          errorMessage = error ? error.message : "";
        }
        dispatch(notify({ message: `${errorMessage}`, status: "warning" }));
        dispatch(accountLinkingFailure(error));
      });
  };
};
export const linkWithEmail = (email, password) => {
  return (dispatch) => {
    dispatch(accountLinkingRequest());
    const credential = EmailAuthProvider.credential(email, password);
    linkWithCredential(auth.currentUser, credential)
      .then((result) => {
        dispatch(accountLinkingSuccess(result));
      dispatch(notify({message: "Email account was successfully linked to your account", status: "success"}))

      })
      .catch((error) => {
        let errorMessage = '';
        if (error.code === "auth/credential-already-in-use") {
          errorMessage = "Your Email was already linked with another account";
        } else if (error.code === "auth/requires-recent-login") {
          errorMessage = "Please login again and then try again!";
          dispatch(notify({ message: `${errorMessage}`, status: "error" }));
          dispatch(logOut());
          setTimeout(() => {
            dispatch(notify({ message: `Please wait, signing out ...`, status: "warning" }));
          },1000)
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Wrong Password and then try again!";
        } else {
          errorMessage = error ? error.message : "";
        }
        dispatch(notify({ message: `${errorMessage}`, status: "warning" }));
        dispatch(accountLinkingFailure(error));
      });
  };
};
export const unlinkProvider = (provider) =>{
  return (dispatch, getState) =>{
    const signinMethods = getState().authState.signinMethods;
    if(signinMethods?.length > 1) {
      unlink(auth.currentUser, provider)
    .then(() => {
      dispatch(notify({message: "Account was successfully unlinked.", status: "success"}))
    })
    .catch((error) => {
      dispatch(notify({ message: `${error?.message}`, status: "danger" }));
    })
    }
    else{
      dispatch(notify({ message: `Atleast your account has to be connected with any of those Accounts. \n unlink was not processed, because your account doesn't linked with any other account.`, status: "warning" }));

    }
    
  }
}
export const recaptchaVerifier = () => {
  return (dispatch) => {
    dispatch(VerifyRecaptchaRequest());
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    appVerifier.render();
    if (appVerifier) {
      dispatch(VerifyRecaptchaSuccess(appVerifier));
    } else {
      dispatch(
        VerifyRecaptchaFailure({
          message: "Some error occured! Please try again.",
        })
      );
    }
  };
};
export const linkWithPhoneOtpGenerator = (phone, appVerifier) => {
  return (dispatch) => {
    dispatch(OTPRequest());
    linkWithPhoneNumber(auth.currentUser, phone, appVerifier)
      .then((info) => {
        dispatch(OTPSuccess(info, phone));
        // dispatch(notify({ message: `A 6 digit One Time Passcode (OTP) has been sent to ${phone} .`, status: "success" }));
      })
      .catch((error) => {
        dispatch(OTPFailure(error));
        // dispatch(notify({ message: `${error?.message}`, status: "warning" }));

      });
    // signInWithPhoneNumber(auth, phone,appVerifier).then((info) =>{
    //   dispatch(OTPSuccess(info, phone))
    // })
    // .catch((error) =>{
    //   dispatch(OTPFailure(error))
    // })
    //   linkWithPhoneNumber(user, phone,appVerifier).then((info) =>{
    //     dispatch(OTPSuccess(info, phone))
    //   })
    //   .catch((error) =>{
    //     dispatch(OTPFailure(error))
    // })
  };
};
export const linkWithPhoneCredential = (otp, credential) => {
  return (dispatch) => {
    // const vId = credential.info.verificationId;
    // const credentials = new PhoneAuthProvider.credential(
    //   vId,
    //   otp
    // );
    //   const user = auth.currentUser;
    //   linkWithCredential(user,credentials)
    //     .then((info)=>{
    //     console.log(info);
    //   })
    //   .catch((error)=>{
    //   dispatch(OTPFailure(error))
    //     console.log(error);
    //   })
    console.log(otp);
    credential.info.confirm(otp).then((info) => {
        console.log(info);
      })
      .catch((error) => {
        dispatch(OTPFailure(error));
      });
  };
};
export const OAuthSignup = (provider, path) => {
  return (dispatch) => {
    dispatch(loginRequest());
    dispatch(
      notify({ id: "loading", message: "signing up...", status: "loading" })
    );
    if (provider === "google") {
      const authProvider = new GoogleAuthProvider();
      signInWithPopup(auth, authProvider)
        .then((user) => {
          console.log(user);
          dispatch(createUserDataonOAuth(user));
          dispatch(setCurrentUser(user));
          
          dispatch(loginSuccess(user));
          dispatch(redirectRequest());
          dispatch(redirectSuccess(path));
          dispatch(dismissNotification("loading"));
          dispatch(
            notify(`Welcome Back ${user.user.displayName}`, "success", {
              position: "bottom-center",
              showDismissButton: false,
            })
          );
          dispatch(redirectReset());
        })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
    } else if (provider === "facebook") {
      const authProvider = new FacebookAuthProvider();
      signInWithPopup(auth, authProvider)
        .then((user) => {
          dispatch(createUserDataonOAuth(user));
          dispatch(setCurrentUser(user));
          
          dispatch(loginSuccess(user));
          dispatch(redirectRequest());
          dispatch(redirectSuccess(path));
          dispatch(dismissNotification("loading"));
          dispatch(
            notify(`Welcome Back ${user.user.displayName}`, "success", {
              position: "bottom-center",
              showDismissButton: false,
            })
          );
          dispatch(redirectReset());
        })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
    } else if (provider === "twitter") {
      const authProvider = new TwitterAuthProvider();
      signInWithPopup(auth, authProvider)
        .then((user) => {
          dispatch(createUserDataonOAuth(user));
          dispatch(setCurrentUser(user));
          
          dispatch(loginSuccess(user));
          dispatch(redirectRequest());
          dispatch(redirectSuccess(path));
          dispatch(dismissNotification("loading"));
          dispatch(
            notify(`Welcome Back ${user.user.displayName}`, "success", {
              position: "bottom-center",
              showDismissButton: false,
            })
          );
          dispatch(redirectReset());
        })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
    } else if (provider === "github") {
      const authProvider = new GithubAuthProvider();
      signInWithPopup(auth, authProvider)
        .then((user) => {
          dispatch(createUserDataonOAuth(user));
          dispatch(setCurrentUser(user));
          
          dispatch(loginSuccess(user));
          dispatch(redirectRequest());
          dispatch(redirectSuccess(path));
          dispatch(dismissNotification("loading"));
          dispatch(
            notify(`Welcome Back ${user.user.displayName}`, "success", {
              position: "bottom-center",
              showDismissButton: false,
            })
          );
          dispatch(redirectReset());
        })
        .catch((error) => {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
    } else {
      dispatch(loginFailure("Please provide valid Oauth-type"));
      dispatch(
        notify({
          id: "error",
          message: "Please provide valid Oauth-type",
          status: "error",
        })
      );
    }
  };
};
export const onAuthUserListener = (next, fallback) =>
  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      getDoc(userRef(authUser.uid)).then((snapshot) => {
        const dbUser = snapshot.data();
        if (!dbUser.roles) {
          dbUser.roles = {};
        }

        authUser = {
          uid: authUser.uid,
          email: authUser.email,
          ...dbUser,
        };
        next(authUser);
      });
    } else {
      fallback();
    }
  });
export const signup = (data, path) => {
  return (dispatch) => {
    console.log(data);
    dispatch(
      notify({ id: "loading", message: "signing up...", status: "loading" })
    );

    createNewUserRequest(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        dispatch(createUserDataonSignup(user, data));
        dispatch(setCurrentUser(user));
        dispatch(getCurrentUserData(user.user.uid));
        dispatch(loginSuccess(user));
        dispatch(redirectRequest());
        setTimeout(() => {
        dispatch(redirectSuccess(path));
        dispatch(createNewUserSuccess(user));
          dispatch(dismissNotification("loading"));
          dispatch(
            notify(`Welcome ${data.firstName} to the Hanumanth's blog webapp`, "success", {
              position: "bottom-center",
              showDismissButton: false,
            })
          );
          dispatch(redirectReset());
        },5000)
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          dispatch(loginFailure(error));
          dispatch(createNewUserFailure(ERROR_MSG_ACCOUNT_EXISTS));
          dispatch(
            notify({
              id: "error",
              message: ERROR_MSG_ACCOUNT_EXISTS,
              status: "error",
            })
          );
          dispatch(
            notify({
              id: "loading",
              message: "Taking you to the login page...",
              status: "loading",
            })
          );

          dispatch(redirectRequest());
          dispatch(redirectSuccess(ROUTES.LOGIN));
          dispatch(redirectReset());
          dispatch(dismissNotification("loading"));
        } else if (error.code === ERROR_CODE_ACCOUNT_ALREADY_EXISTS) {
          dispatch(loginFailure(error));
          dispatch(createNewUserFailure(ERROR_MSG_ACCOUNT_ALREADY_EXISTS));
          dispatch(
            notify({
              id: "error",
              message: ERROR_MSG_ACCOUNT_ALREADY_EXISTS,
              status: "error",
            })
          );
          dispatch(
            notify({
              id: "loading",
              message: "Taking you to the login page...",
              status: "loading",
            })
          );

          dispatch(redirectRequest());
          dispatch(redirectSuccess(ROUTES.LOGIN));
          dispatch(redirectReset());
          dispatch(dismissNotification("loading"));
        } else {
          dispatch(createNewUserFailure(error));
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        }
      });
  };
};
export const doSendEmailVerification = (user) => {
  return (dispatch) => {
    dispatch(sendEmailVerificationRequest());
    dispatch(
      notify({
        id: "loading",
        message: "sending email verification...",
        status: "loading",
      })
    );
    sendEmailVerification(user)
      .then(() => {
        dispatch(sendEmailVerificationSuccess());
        dispatch(
          notify({ message: "email verification sent.", status: "success" })
        );
        dispatch(dismissNotification("loading"));
      })
      .catch((error) => {
        dispatch(sendEmailVerificationFailure(error));
        dispatch(notify({ message: error.message, status: "error" }));
        dispatch(dismissNotification("loading"));
      });
  };
};
export const doResetPassword = (email) => {
  return (dispatch) => {
    dispatch(sendPasswordResetEmailRequest());
    dispatch(
      notify({
        id: "loading",
        message: "sending Password Reset Email!",
        status: "loading",
      })
    );

    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch(sendPasswordResetEmailSuccess());
        dispatch(
          notify({
            message: "Password Reset Email Sent Successfully.",
            status: "success",
          })
        );
        dispatch(dismissNotification("loading"));
      })
      .catch((error) => {
        dispatch(sendPasswordResetEmailFailure(error));
        dispatch(notify({ message: error.message, status: "error" }));
        dispatch(dismissNotification("loading"));
      });
  };
};
export const logOut = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    signOut(auth)
      .then(() => {
        dispatch(logoutSuccess());
        dispatch(clearUserDataRequest());
        dispatch(
          notify({ message: "successfully logged out", status: "success" })
        );
        dispatch(clearCurrentUser());
        dispatch(redirectRequest());
        dispatch(redirectSuccess(ROUTES.LOGIN));
        dispatch(redirectReset());
        dispatch(clearUserDataSuccess());
      })
      .catch((error) => {
        dispatch(loginFailure(error));
        dispatch(clearUserDataFailure(error));
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
      });
  };
};
export const removeUser = (user) => {
  return dispatch =>{
    getAuth().deleteUser(user?.id).then(() =>{
      dispatch(notify({message: `${user?.email} was deleted`, status: "success"}))
    })
    .catch((error)=>{
      dispatch(notify({message: `Error deleting user ${user?.email}:`, status: "error"}))
    })
  }
}
export const verifyAuth = () => {
  return (dispatch) => {
    dispatch(
      notify({
        id: "loading",
        message: "verifying status...",
        status: "loading",
      })
    );
    dispatch(verifyRequest());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginSuccess(user));
        dispatch(verifySuccess());
        dispatch(dismissNotification("loading"));
        dispatch(
          notify("Welcome back to the Hanumanth's blogs webapp", "success", {
            position: "bottom-center",
            showDismissButton: false,
          })
        );
      } else {
        dispatch(loginFailure("User not loggedIn!"));
        dispatch(
          notify({
            id: "error",
            message: "Please login once again",
            status: "error",
          })
        );
      }
    });
  };
};
export const reAuthenticateWithCredential = (user, email, password) => {
  return (dispatch) => {
    dispatch(passwordVerifyRequest());
    const creds = EmailAuthProvider.credential(email, password);
    reauthenticateWithCredential(user, creds)
      .then((success) => {
        dispatch(passwordVerifySuccess(success.user));
      })
      .catch((error) => {
        dispatch(passwordVerifyFailure(error));
      });
  };
};
export const changePassword = (user, password) => {
  return (dispatch) => {
    dispatch(changePasswordRequest());
    updatePassword(user, password)
      .then(() => {
        dispatch(changePasswordSuccess());
      })
      .catch((error) => {
        dispatch(changePasswordFailure(error));
      });
  };
};
export const messages = () => {
  return (dispatch) => {
    dispatch(messagesRequest);
    get(query(ref(db, "messages"), orderByChild("createdAt")))
      .then((snapshot) => {
        dispatch(messagesSuccess(snapshot.val()));
      })
      .catch((error) => {
        dispatch(messagesError(error));
      });
  };
};
export const createMessage = (text, authUser) => {
  return (dispatch) => {
    dispatch(messagesRequest);
    set(
      push(ref(db, "messages/" + authUser.uid), {
        text: text,
        userId: authUser.uid,
        createdAt: new Date(),
      })
    )
      .then((res) => {
        dispatch(messagesSuccess(res.val()));
      })
      .catch((error) => {
        dispatch(messagesError(error));
      });
  };
};
