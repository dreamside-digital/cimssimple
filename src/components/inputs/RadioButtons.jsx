import React from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

const styles = {
  width: '100%',
  border: '1px solid #932F6D',
}

const RadioButtons = props => {
  const onChange = event => {
    props.handleChange(event.target.value)
  }

  return (
    <RadioGroup
      aria-label={props.label}
      name={props.label}
      value={props.value}
      onChange={onChange}
    >
    {
      props.options.map(option => {
        return <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
      })
    }
    </RadioGroup>
  )
}

export default RadioButtons
