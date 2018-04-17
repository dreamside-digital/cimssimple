import React from 'react'
import ReactSelect from 'react-select'

import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';

import 'react-select/dist/react-select.css'

const styles = {
  width: '100%',
  fontSize: '1.2rem',
}

const MultiSelect = props => {
  const onChange = event => {
    props.handleChange(event.target.value)
  }

  return (
    <Select
      multiple
      value={props.selected}
      onChange={onChange}
      input={<Input />}
      renderValue={selected => selected.join(', ')}
      style={styles}
    >
      {props.options.map(option => {
        return (
          <MenuItem key={option} value={option}>
            <Checkbox checked={props.selected.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default MultiSelect
