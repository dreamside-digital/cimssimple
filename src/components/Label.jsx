import React from 'react'

let styles = {
  color: '#932F6D'
}

const Label = (props) => {
  if (props.small) {
    styles = { ...styles, fontSize: '1rem' }
  }

  return <h3 style={styles}>{props.children}</h3>
}

export default Label
