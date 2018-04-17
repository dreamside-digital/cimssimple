import React from 'react'
import TextField from 'material-ui/TextField'

const styles = {
  width: '100%',
  fontSize: '1.2rem'
}

const TextInput = props => {
  const onChange = e => props.handleChange(e.target.value)

  return <TextField type="text" onChange={onChange} value={props.value || ''} style={styles} />
}

export default TextInput