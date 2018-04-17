import React from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Label from '../Label'

const styles = {
  paper: {
    padding: '1rem'
  },
  input: {
    width: '100%',
    marginBottom: '1rem'
  }
}

const InitiativeOutcome = props => {
  const onChange = e => props.handleChange(e.target.value)

  return (
    <Paper style={styles.paper}>
      <Label small>Anticipated Outcome:</Label>
      <TextField
        type="text"
        onChange={onChange}
        value={props.value.anticipatedOutcome || ''}
        style={styles.input}
      />
      <Label small>Actual Outcome:</Label>
      <TextField
        multiline
        rowsMax=""
        type="text"
        onChange={onChange}
        value={props.value.actualOutcome || ''}
        style={styles.input}
      />
    </Paper>
  )
}

export default InitiativeOutcome
