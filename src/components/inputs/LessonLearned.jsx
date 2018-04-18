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

const LessonLearned = props => {

  const onChange = (field) => (e) => {
    const newValue = { ...props.value, [field]: e.target.value }
    props.handleChange(newValue);
  };

  return (
    <Paper style={styles.paper}>
      <Label>Goal / Objective</Label>
      <TextField
        type="text"
        onChange={onChange('goal')}
        value={props.value.goal || ''}
        style={styles.input}
      />

      <Label small>How has this project contributed to this goal / objective?</Label>
      <TextField
        type="text"
        onChange={onChange('contributed')}
        value={props.value.contributed || ''}
        style={styles.input}
      />

      <Label small>What have you learned?</Label>
      <TextField
        type="text"
        onChange={onChange('learned')}
        value={props.value.learned || ''}
        style={styles.input}
      />

      <Label small>Were there any unanticipated outcomes?</Label>
      <TextField
        type="text"
        onChange={onChange('unanticipated')}
        value={props.value.unanticipated || ''}
        style={styles.input}
      />

      <Label small>What comes next?</Label>
      <TextField
        type="text"
        onChange={onChange('next')}
        value={props.value.next || ''}
        style={styles.input}
      />

      <div style={styles.buttonDiv}>
        <Button onClick={props.handleDelete}>Delete</Button>
      </div>
    </Paper>
  )
}

export default LessonLearned
