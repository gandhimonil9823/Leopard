import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import './styles/app.global.css';
import App from './App';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
import { selectDate, selectType, setDateRange } from './actions/index';
import { loadCustomersFromServer } from './reducers/customers';
import BaseRoute from './components/common/BaseRoute';

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);
const store = createStore(rootReducer, applyMiddleware(thunk));

const wrapApp = AppComponent => (
  <Provider store={store}>
    <HashRouter>
      <BaseRoute App={AppComponent} />
    </HashRouter>
  </Provider>
);

// load and set initial data:

store.dispatch(selectType('place'));
store.dispatch(setDateRange()); // default
store.dispatch(selectDate()); // default
store.dispatch(loadCustomersFromServer());

window.storeDebug = store;

ReactDOM.render(wrapApp(App), rootEl);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    ReactDOM.render(wrapApp(NextApp), rootEl);
  });
}
