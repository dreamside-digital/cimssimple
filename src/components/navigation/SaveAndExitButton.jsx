import React from 'react'
import { connect } from 'react-redux'
import { navigateTo } from 'gatsby-link'
import Button from 'material-ui/Button'

import { saveProjectData } from '../../redux/modules/projects'
import { savePlanData } from '../../redux/modules/plans'

const SaveAndExitButton = props => {
  const clickHandler = () => {
    if (props.user.editingProject) {
      props.saveProjectData()
    }

    if (props.user.editingPlan) {
      props.savePlanningToolData()
    }

    navigateTo('/')
  }

  return (
    <Button
      onClick={clickHandler}
      color="default"
    >
      Exit
    </Button>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProject: (id) => {
      dispatch(editProject(id))
    },
    editPlan: (id) => {
      dispatch(editPlan(id))
    },
    saveProjectData: () => {
      dispatch(saveProjectData())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveAndExitButton)
