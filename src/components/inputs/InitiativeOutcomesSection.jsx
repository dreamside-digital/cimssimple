import React from 'react'
import { find, compact } from 'lodash'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import InitiativeOutcome from './InitiativeOutcome'

const InitiativeOutcomesSection = props => {
  const onChange = (index) => (newData) => {
    const outcomeArray = [...props.initiativeOutcomes];
    outcomeArray.splice(index, 1, newData)

    props.handleChange(outcomeArray)
  }

  const onDelete = (index) => () => {
    const outcomeArray = [...props.initiativeOutcomes];
    outcomeArray.splice(index, 1)

    props.handleChange(outcomeArray)
  }

  const createNewOutcome = () => {
    const emptyOutcome = { anticipatedOutcome: '', actualOutcome: '' };
    const oldOutcomeData = props.initiativeOutcomes ? props.initiativeOutcomes : [];
    const newOutcomeData = oldOutcomeData.concat(emptyOutcome);

    props.handleChange(newOutcomeData)
  }

  const emptyAnticipatedOutcomes = props.anticipatedOutcomes.map(outcome => {
    const exists = find(props.initiativeOutcomes, ['anticipatedOutcome', outcome])
    if (!exists) {
      return { anticipatedOutcome: outcome, actualOutcome: ''}
    }
  })

  const outcomesToEvaluate = props.initiativeOutcomes.concat(compact(emptyAnticipatedOutcomes))

  return (
    <Grid container spacing={16}>
      {
        outcomesToEvaluate.map((outcome, index) => {
          return(
            <Grid item xs={12} key={`outcome-${index}`}>
              <InitiativeOutcome value={outcome} handleChange={onChange(index)} handleDelete={onDelete(index)} />
            </Grid>
          )
        })
      }
      <Button onClick={createNewOutcome}>Add Outcome</Button>
    </Grid>
  )
}

export default InitiativeOutcomesSection
