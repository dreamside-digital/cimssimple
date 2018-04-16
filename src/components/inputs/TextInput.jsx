import React from 'react'

const styles = {
  width: '100%',
  border: '1px solid #932F6D',
  padding: '0.5rem',
  fontSize: '1.2rem'
}

const TextInput = props => {
  const onChange = e => props.handleChange(e.target.value)

  return <input type="text" onChange={onChange} value={props.value || ''} style={styles} />
}

export default TextInput
