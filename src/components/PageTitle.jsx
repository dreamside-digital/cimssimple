import React from 'react'

const styles = {
  color: '#13505B',
  marginTop: '2rem',
  marginBottom: '3rem',
}

const PageTitle = (props) => (
  <h1 style={styles}>{props.children}</h1>
)

export default PageTitle
