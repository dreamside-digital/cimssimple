import React from 'react'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import InitiativeOutcome from './InitiativeOutcome'

const InitiativeOutcomesSection = props => {
  const onChange = e => {
    console.log(e)
  }

  const createNewOutcome = () => {
    const emptyOutcome = { anticipatedOutcome: '', actualOutcome: '' };
    let newOutcomeData = props.initiativeOutcomes ? [props.initiativeOutcomes] : [];
    newOutcomeData.push(emptyOutcome);

    props.handleChange(newOutcomeData)
  }

  const anticipatedOutcomes = props.anticipatedOutcomes.map(outcome => {
    return { anticipatedOutcome: outcome, actualOutcome: ''}
  })

  const outcomesToEvaluate = props.initiativeOutcomes.concat(anticipatedOutcomes)

  return (
    <Grid container spacing={16}>
      {
        outcomesToEvaluate.map(outcome => {
          return(
            <Grid item xs={12}>
              <InitiativeOutcome value={outcome} handleChange={onChange} />
            </Grid>
          )
        })
      }
      <Button onClick={createNewOutcome}>Add Outcome</Button>
    </Grid>
  )
}

export default InitiativeOutcomesSection
