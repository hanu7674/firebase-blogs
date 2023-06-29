import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/configureStore';
import App from './App';
import  { FirebaseContext } from './firebase';
import { auth, firestoreDb } from './firebase/firebase';
import {NotificationsProvider} from 'reapop';
// eslint-disable-next-line no-unused-vars
import aos from './components/Admin/aos';
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import {
  ReCaptchaProvider
} from 'react-recaptcha-x';
import { recaptcha_v2_siteKey, recaptcha_v3_siteKey } from './components/constants/constants';
const store = configureStore();
const engine = new Styletron();
window.scroll({
  top: 2500, 
  left: 0, 
  behavior: 'smooth'
});

// Scroll certain amounts from current position 
window.scrollBy({ 
  top: 100, // could be negative value
  left: 0, 
  behavior: 'smooth' 
});
const renderApp = () =>
  render(  
  <Provider store={store}>
    <FirebaseContext.Provider value={ [auth, firestoreDb]}>
    <NotificationsProvider>
    <ReCaptchaProvider
        siteKeyV2={recaptcha_v2_siteKey}
        siteKeyV3={recaptcha_v3_siteKey}
        // hideV3Badge
      >
        <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
    </StyletronProvider>
      </ReCaptchaProvider>
      </NotificationsProvider>
    </FirebaseContext.Provider>
  </Provider>
  ,
  document.getElementById('root')
)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('/', renderApp)
}
renderApp()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
