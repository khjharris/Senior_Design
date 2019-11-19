import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import {Provider} from 'react-redux';
// import {Store, persistor} from './App/ReduxStore/index';
// import {PersistGate} from 'redux-persist/integration/react';
import HttpsRedirect from 'react-https-redirect';

import './index.css';
import App from './App';
import AppProviders from './App/Authentication/app-providers'

import * as serviceWorker from './serviceWorker';

// load stylesheet


render((
  <HttpsRedirect>
  <BrowserRouter>
    {/* <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}> */}
        <AppProviders>
          <App/>
        </AppProviders>
      {/* </PersistGate>
    </Provider> */}

  </BrowserRouter>
  </HttpsRedirect>
), document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
