/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'babel-polyfill';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import createStore from './src/redux/store';


exports.replaceRouterComponent = ({ history }) => {
  const store = createStore()

  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
        <Router history={history}>{children}</Router>
    </Provider>
  )

  return ConnectedRouterWrapper
}
