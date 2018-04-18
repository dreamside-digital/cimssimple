import React from 'react'
import { find, compact } from 'lodash'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import InitiativeOutcome from './InitiativeOutcome'

class InitiativeOutcomesSection extends React.Component {
  componentDidMount() {
    this.insertAnticipatedOutcomes()
  }

  insertAnticipatedOutcomes = () => {
    const emptyAnticipatedOutcomes = this.props.anticipatedOutcomes.map(outcome => {
      const exists = find(this.props.initiativeOutcomes, ['anticipatedOutcome', outcome])
      if (!exists) {
        return { anticipatedOutcome: outcome, actualOutcome: '', allowDelete: false }
      }
    })

    const updatedOutcomes = [...this.props.initiativeOutcomes].concat(compact(emptyAnticipatedOutcomes))

    this.props.handleChange(updatedOutcomes)
  }

  onChange = (index) => (newData) => {
    const outcomeArray = [...this.props.initiativeOutcomes];
    outcomeArray.splice(index, 1, newData)

    this.props.handleChange(outcomeArray)
  };


  onDelete = (index) => () => {
    const outcomeArray = [...this.props.initiativeOutcomes];
    outcomeArray.splice(index, 1)

    this.props.handleChange(outcomeArray)
  };


  createNewOutcome = () => {
    const emptyOutcome = { anticipatedOutcome: '', actualOutcome: '', allowDelete: true };
    const oldOutcomeData = this.props.initiativeOutcomes ? this.props.initiativeOutcomes : [];
    const newOutcomeData = oldOutcomeData.concat(emptyOutcome);

    this.props.handleChange(newOutcomeData)
  }

  render() {
    return (
      <Grid container spacing={16}>
        {
          this.props.initiativeOutcomes.map((outcome, index) => {
            return(
              <Grid item xs={12} key={`outcome-${index}`}>
                <InitiativeOutcome value={outcome} handleChange={this.onChange(index)} handleDelete={this.onDelete(index)} />
              </Grid>
            )
          })
        }
        <Button onClick={this.createNewOutcome}>Add Outcome</Button>
      </Grid>
    )

  }

}

export default InitiativeOutcomesSection
