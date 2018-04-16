import React from 'react'

const styles = {
  color: '#0C7489',
  marginTop: '1rem',
  marginBottom: '1rem'
}

const HelpText = (props) => (
  <div {...props} style={styles}>{props.children}</div>
)

export default HelpText
