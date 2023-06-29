import { createBrowserHistory } from '@remix-run/router';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { compose } from "recompose";
import { withAuthentication } from "../Session";
import { connect, } from "react-redux";
import { withParams } from "./Admin/hoc";
import "react-toastify/dist/ReactToastify.css";
import TopButton from './topButton/TopButton';
import { chosenTheme } from './Navigation/theme';
import { ParallaxProvider } from 'react-scroll-parallax';
import { BlogRouter } from '../Routers';

  
const Main = () =>{
  const browserHistory = createBrowserHistory();
    return(
        <React.Fragment>
            <Router history={browserHistory}>
<div>
<ParallaxProvider>
<React.StrictMode>
  <BlogRouter/>
</React.StrictMode>
</ParallaxProvider>
</div>
</Router>
    <TopButton theme={chosenTheme}/>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({
  loading: state.loading.loading,
});
export default compose(
  withAuthentication,
  connect(mapStateToProps),
  withParams
)(Main);