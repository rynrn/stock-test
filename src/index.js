import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';
import { Provider } from 'react-redux';
import { createHistory } from 'history';

import configureStore from './configureStore';

import Home from './containers/Home';
import Stock from './containers/Stock';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
      <Route path="/stock/:stockId" component={Stock}/>
    </Router>
  </Provider>,
  document.querySelector('#root')
);
