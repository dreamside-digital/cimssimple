import React from 'react'
import uuidv4 from 'uuid/v4';
import { map } from 'lodash';

import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import TextInputWithButton from './TextInputWithButton'


const TextInputToList = (props) => {

  const handleAddItem = text => {
    const uuid = uuidv4();
    const itemList = {
      ...props.list,
      [uuid]: text
    }
    props.handleUpdateList(itemList)
  }

  const handleDeleteItem = uuid => {
    return () => {
      const itemList = { ...props.list }
      delete itemList[uuid];
      props.handleUpdateList(itemList);
    }
  }

  return(
    <div>
      <List subheader={<li />}>
        {map(props.list, ((item, uuid) => (
          <ListItem key={`goals-${uuid}`}>
            <ListItemText primary={`${item}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={handleDeleteItem(uuid)}>
                &times;
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )))}
      </List>
      <TextInputWithButton
        id="goalsObjectives"
        handleChange={handleAddItem}
        submitLabel={'Add'}
      />
    </div>
  )
}

export default TextInputToList
