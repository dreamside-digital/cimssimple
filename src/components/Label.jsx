import React from 'react'

const styles = {
  big: {
    color: '#932F6D',
    lineHeight: '1.4',
  },
  small: {
    color: '#932F6D',
    lineHeight: '1.4',
    marginBottom: '0.5rem'
  }
}

const Label = (props) => {
  if (props.small) {
     return <h4 style={styles.small}>{props.children}</h4>
  }

  return <h3 style={styles.big}>{props.children}</h3>
}

export default Label
