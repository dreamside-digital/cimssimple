import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

import Navigation from '../components/navigation/Navigation'
import FlexTable from '../components/inputs/FlexTable'

const tableStructure = [
  {
    header: '1. Goals and Objectives',
    description: 'What goals and objectives is the clinic working on this year through its CD-CO work? Which of these goals does this project promote?',
    fieldName: 'goalsAndObjectives',
  },
  {
    header: '2. Activities and Initiatives of the "Parent" Initiative',
    description: '(Major project)',
    fieldName: 'parentInitiatives',
  },
  {
    header: '3. Child Initiatives',
    description: '(Sub-projects within a major project)',
    fieldName: 'childInitiatives',
  },
  {
    header: '4. Outcomes',
    description: 'What aims do you have for the process, for participants and the community, and for the results?',
    fieldName: 'outcomes',
  },
  {
    header: '5. Long-term impacts',
    description: 'What long-term impacts/campaigns is the clinic’s CD-CO work contributing to?',
    fieldName: 'impacts',
  },
  {
    header: '6. Indicators and Measures',
    description: 'What information will help you to track progress and results? Where can you obtain that information? In what format?',
    fieldName: 'indicators',
  },
]

const initialTableData = {
  indicators: ['HINT: How and when will the clinic gather community feedback on these initiatives?', 'HINT: How will we measure the outcomes?'],
  impacts: [''],
  outcomes: [''],
  childInitiatives: [''],
  parentInitiatives: [''],
  goalsAndObjectives: ['Promote access to justice in our community', 'Confront legislative and policy decisions that regulate the lives of low-income people', 'Nurture community empowerment'],
}

class PlanningTool extends React.Component {
  componentDidMount() {
    const queryString = this.props.location.search
    const params = new URLSearchParams(queryString)
    const projectId = params.get('id')
  }

  saveTable = (fields) => {
    console.log(fields)
  }

  render() {
    return (
      <div>
        <Navigation />
        <FlexTable
          id="planning-tool"
          handleSave={this.saveTable}
          tableStructure={tableStructure}
          tableData={initialTableData}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanningTool)
