/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#932F6D',
      main: '#932F6D',
      dark: '#932F6D',
      contrastText: '#fff',
    },
    secondary: {
      light: '#13505B',
      main: '#13505B',
      dark: '#13505B',
      contrastText: '#fff',
    },
    error: pink
  },
  typography: {
    fontFamily: "\"Open Sans\", \"Helvetica\", \"Arial\", sans-serif"
  }
});


import createStore from './src/redux/store'

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const store = createStore()

  const ConnectedBody = () => (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          {bodyComponent}
        </MuiThemeProvider>
      </Provider>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody/>))
}