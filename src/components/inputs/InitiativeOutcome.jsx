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
  }
}

const InitiativeOutcome = props => {

  const onChangeAnticipatedOutcome = (e) => {
    const newValue = { ...props.value, anticipatedOutcome: e.target.value }
    props.handleChange(newValue);
  };

  const onChangeActualOutcome = (e) => {
    const newValue = { ...props.value, actualOutcome: e.target.value }
    props.handleChange(newValue);
  };

  return (
    <Paper style={styles.paper}>
      <Label small>Anticipated Outcome:</Label>
      <TextField
        type="text"
        onChange={onChangeAnticipatedOutcome}
        value={props.value.anticipatedOutcome || ''}
        style={styles.input}
      />
      <Label small>Actual Outcome:</Label>
      <TextField
        multiline
        rowsMax=""
        type="text"
        onChange={onChangeActualOutcome}
        value={props.value.actualOutcome || ''}
        style={styles.input}
      />
      <div style={styles.buttonDiv}>
        <Button onClick={props.handleDelete}>Delete</Button>
      </div>
    </Paper>
  )
}

export default InitiativeOutcome
