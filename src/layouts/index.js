import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
import cyan from 'material-ui/colors/cyan';

import './index.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#13505B',
      main: '#13505B',
      dark: '#13505B',
      contrastText: '#fff',
    },
    secondary: {
      light: '#932F6D',
      main: '#932F6D',
      dark: '#932F6D',
      contrastText: '#fff',
    },
    error: pink
  },
  typography: {
    fontFamily: "\"Open Sans\", \"Helvetica\", \"Arial\", sans-serif"
  }
});

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'CIMS simple form generator' },
        { name: 'keywords', content: 'CIMS' },
      ]}
    />
    <div>
      <MuiThemeProvider theme={theme}>
        {children()}
      </MuiThemeProvider>
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
