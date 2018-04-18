import React from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Label from '../Label'

const styles = {
  paper: {
    padding: '1rem'
  },
  input: {
    width: '100%',
    marginBottom: '1rem'
  },
  buttonDiv: {
    textAlign: 'right'
  },
  disabled: {
    fontStyle: 'italic',
    textTransform: 'uppercase',
  }
}

const InitiativeOutcome = props => {

  const onChange = (field) => (event) => {
    const newValue = { ...props.value, [field]: event.target.value }
    props.handleChange(newValue);
  }

  return (
    <Paper style={styles.paper}>
      <Label small>Anticipated Outcome:</Label>
      <TextField
        type="text"
        onChange={onChange('anticipatedOutcome')}
        value={props.value.anticipatedOutcome || ''}
        style={styles.input}
      />
      <Label small>Actual Outcome:</Label>
      <TextField
        multiline
        rowsMax=""
        type="text"
        onChange={onChange('actualOutcome')}
        value={props.value.actualOutcome || ''}
        style={styles.input}
      />
      {
        props.value.allowDelete &&
        <div style={styles.buttonDiv}>
          <Button onClick={props.handleDelete}>Delete</Button>
        </div>
      }
      {
        !props.value.allowDelete &&
        <div style={styles.buttonDiv}>
          <small style={styles.disabled}>Imported from Step 2</small>
        </div>
      }
    </Paper>
  )
}

export default InitiativeOutcome
