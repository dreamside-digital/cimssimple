import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updatePlan, getLocalPlanData } from '../redux/modules/planningTool';
import { editPlan, updateSaveStatus } from '../redux/modules/user';

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import { withStyles } from "material-ui/styles";

import Navigation from '../components/navigation/Navigation'
import FlexTable from '../components/inputs/FlexTable'
import InputSection from '../components/InputSection'
import Label from '../components/Label'
import TextInput from '../components/inputs/TextInput'
import Question from '../components/Question'
import PageContainer from '../components/PageContainer'

const styles = {
  contentContainer: {
    padding: '1rem'
  },
  titleInput: {
    marginTop: '1rem',
    marginBottom: '2rem',
  }
}

const tableStructure = [
  {
    header: '1. Goals and Objectives',
    description:
      'What goals and objectives is the clinic working on this year through its CD-CO work? Which of these goals does this project promote?',
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
    description:
      'What aims do you have for the process, for participants and the community, and for the results?',
    fieldName: 'outcomes',
  },
  {
    header: '5. Long-term impacts',
    description:
      'What long-term impacts/campaigns is the clinic’s CD-CO work contributing to?',
    fieldName: 'impacts',
  },
  {
    header: '6. Indicators and Measures',
    description:
      'What information will help you to track progress and results? Where can you obtain that information? In what format?',
    fieldName: 'indicators',
  },
]

const initialTableData = {
    indicators: [
      'HINT: How and when will the clinic gather community feedback on these initiatives?',
      'HINT: How will we measure the outcomes?',
    ],
    impacts: [''],
    outcomes: [''],
    childInitiatives: [''],
    parentInitiatives: [''],
    goalsAndObjectives: [
      'Promote access to justice in our community',
      'Confront legislative and policy decisions that regulate the lives of low-income people',
      'Nurture community empowerment',
    ],
  }

class PlanningTool extends React.Component {
  componentDidMount() {
    const queryString = this.props.location.search
    const params = new URLSearchParams(queryString)
    const planId = params.get('id')
    this.props.editPlan(planId);
    this.props.getLocalPlanData(planId);
  }

  saveTable = fields => {
    this.props.updatePlan('tableData', fields, this.props.planId)
  }

  saveTitle = title => {
    this.props.updatePlan('projectTitle', title, this.props.planId)
  }

  render() {
    const tableData = (this.props.planData && this.props.planData.tableData) ? this.props.planData.tableData : initialTableData

    return (
      <div>
        <Navigation initiativeName={this.props.planData.projectTitle} />
        <PageContainer>
          <div className={this.props.classes.contentContainer}>
            <div className={this.props.classes.titleInput}>
              <InputSection>
                <Label htmlFor="projectTitle" small>Project title</Label>
                <TextInput
                  id="projectTitle"
                  handleChange={this.saveTitle}
                  value={this.props.planData.projectTitle}
                  onChange={() => this.props.updateSaveStatus(false)}
                />
              </InputSection>
            </div>
            <FlexTable
              id="planning-tool"
              handleSave={this.saveTable}
              tableStructure={tableStructure}
              tableData={tableData}
              onChange={() => this.props.updateSaveStatus(false)}
            />
          </div>
        </PageContainer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    planData: state.planningTool,
    planId: state.user.editingPlan
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePlan: (fieldId, value, planId) => {
      dispatch(updatePlan(fieldId, value, planId))
    },
    getLocalPlanData: id => {
      dispatch(getLocalPlanData(id))
    },
    editPlan: (id) => {
      dispatch(editPlan(id))
    },
    updateSaveStatus: (status) => {
      dispatch(updateSaveStatus(status))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlanningTool))
