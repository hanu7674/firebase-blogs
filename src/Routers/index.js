import React, { useCallback } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationsSystem, {
  wyboTheme,
  dismissNotification,
  FadeTransition,
} from "reapop";
import { setUpNotifications } from "reapop";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "../components/Blogs";
import Detail from "../components/Blogs/Detail";
import AddEditBlog from "../components/Blogs/AddEditBlog";
import * as ROUTES from "./routes";
import Contact from "../components/Contact";
import SignUpPage from "../components/SignUp";
import SignInPage from "../components/SignIn";
import ForgetEmail from "../components/ForgetEmail/ForgetEmail";
import PasswordForgetPage from "../components/PasswordForget";
import AccountPage from "../components/Account";
import AdminPage from "../components/Admin";
import Auth2 from "../components/SignIn/auth2";
import BlogNav from "../components/Navigation/BlogNav";
import TagBlog from "../components/Blogs/TagBlog";
import CategoryBlog from "../components/Blogs/CategoryBlog";
import Profile from "../components/Blogs/profile";
import ConnectWithMeBlogs from "../components/Blogs/Connect";
import BlogFooter from "../components/Blogs/Footer";
import BlogsRoute from "../components/Blogs/Blogs";
import { useEffect } from "react";
import ReviewBlog from "../components/Blogs/ReviewBlog";
import Notification from "../components/Blogs/Notification/Notification";
import Notifications from "../components/Blogs/Notification/Notifications";
import Templates from "../Templates";
import NewTemplate from "../Templates/NewTemplate";
import ViewTemplate from "../Templates/ViewTemplate";
import EditTemplate from "../Templates/EditTemplate";
import { addVisitor, removeVisitor } from "../redux/ActionCreators";
setUpNotifications({
  defaultProps: {
    title: "Blogs - For building connections",
    position: "top-right",
    dismissible: true,
    dismissAfter: 5000,
    showDismissButton: true,
  },
});
export const BlogRouter = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }
  useEffect(() => {
    dispatch(addVisitor());
  }, []);
  return (
    <div style={{position: "absolute", width: "100%"}}>
      <ScrollToTop />
      <BlogNav />
      <ToastContainer position="bottom-right" />
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={wyboTheme}
        smallScreenBreakpoint
        components={{ Transition: FadeTransition }}
      />
      <div className="pt-5">
        <Routes>
          <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
          <Route path={ROUTES.LOGIN} element={<SignInPage />} />
          <Route path={ROUTES.FORGET_EMAIL} element={<ForgetEmail />} />
          <Route
            path={ROUTES.PASSWORD_FORGET}
            element={<PasswordForgetPage />}
          />
          {/* <Route path={ROUTES.HOME} element={<HomePage />} /> */}
          {/* <Route path={ROUTES.ACCOUNT} element={<AccountPage />} /> */}
          <Route path={ROUTES.ADMIN} element={<AdminPage />} />
          <Route path={ROUTES.LANDING} element={<Blogs />} />
          <Route path={ROUTES.SEARCH} element={<Blogs />} />
          <Route path={ROUTES.BLOGS} element={<BlogsRoute />} />
          <Route path={ROUTES.BLOG_DETAIL} element={<Detail />} />
          <Route path={ROUTES.REVIEW_BLOG} element={<ReviewBlog />} />
          <Route path={ROUTES.POST_BLOG} element={<AddEditBlog />} />
          <Route path={ROUTES.EDIT_BLOG} element={<AddEditBlog />} />
          <Route path={ROUTES.TAGS} element={<TagBlog />} />
          <Route path={ROUTES.CATEGORY} element={<CategoryBlog />} />
          <Route path={ROUTES.NOTIFICATION} element={<Notification />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
          <Route path={ROUTES.TEMPLATES} element={<Templates />} />
          <Route path={ROUTES.VIEW_TEMPLATE} element={<ViewTemplate />} />
          <Route path={ROUTES.EDIT_TEMPLATE} element={<EditTemplate />} />
          <Route path={ROUTES.NEW_TEMPLATE} element={<NewTemplate />} />
          
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
          <Route path={ROUTES.AUTH2} element={<Auth2 />} />
          <Route path={ROUTES.PROFILE} element ={<Profile/>} />
          <Route path={ROUTES.CONNECT_WITH_ME} element={<ConnectWithMeBlogs />} />
        </Routes>
      </div>
      <BlogFooter/>
    </div>
  );
};
