import React from 'react'
import ReactSelect from 'react-select'

import Select from 'material-ui/Select'
import Checkbox from 'material-ui/Checkbox'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'

import TextInputWithButton from './TextInputWithButton'
import Label from '../Label'

const styles = {
  width: '100%',
  marginBottom: '1rem',
}

const AnticipatedOutcomesSelector = props => {
  const onChange = input => {
    const newInput = input.target ? input.target.value : input
    if (typeof(newInput) === "string") {
      return props.handleChange(props.value.concat(newInput)) // custom user input
    }
    return props.handleChange(newInput) // dropdown selection
  }

  const handleDeleteItem = index => () => {
    let itemList = [...props.value]
    itemList.splice(index, 1)

    props.handleChange(itemList);
  }

  return (
    <div>
      <List subheader={<li />}>
        {props.value.map((item, index) => (
          <ListItem key={`outcome-${item}`}>
            <ListItemText primary={`${item}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={handleDeleteItem(index)}>
                &times;
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Label small>Select from the list</Label>

      <Select
        multiple
        value={props.value}
        onChange={onChange}
        input={<Input />}
        renderValue={selected => selected.join(', ')}
        style={styles}
      >
        <MenuItem disabled>Increased Ability</MenuItem>

        {props.options.ability.map(option => {
          return (
            <MenuItem key={option} value={option}>
              <Checkbox checked={props.value.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          )
        })}

        <MenuItem disabled>Increased Knowledge</MenuItem>

        {props.options.knowledge.map(option => {
          return (
            <MenuItem key={option} value={option}>
              <Checkbox checked={props.value.indexOf(option) > -1}  />
              <ListItemText primary={option} />
            </MenuItem>
          )
        })}

        <MenuItem disabled>Long Term Outcomes</MenuItem>

        {props.options.longterm.map(option => {
          return (
            <MenuItem key={option} value={option}>
              <Checkbox checked={props.value.indexOf(option) > -1}  />
              <ListItemText primary={option} />
            </MenuItem>
          )
        })}
      </Select>

      <Label small>Add your own</Label>
      <TextInputWithButton
        id="anticipatedOutcomes"
        handleChange={onChange}
        submitLabel={'Add'}
      />
    </div>
  )
}

export default AnticipatedOutcomesSelector
