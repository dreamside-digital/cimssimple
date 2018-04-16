import React from 'react'

let styles = {
  color: '#932F6D',
  lineHeight: '1.4'
}

const Label = (props) => {
  if (props.small) {
     return <h4 style={styles}>{props.children}</h4>
  }

  return <h3 style={styles}>{props.children}</h3>
}

export default Label
