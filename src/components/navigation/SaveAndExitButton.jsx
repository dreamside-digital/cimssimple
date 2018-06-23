import React from 'react'
import { connect } from 'react-redux'
import { navigateTo } from 'gatsby-link'
import Button from 'material-ui/Button'

import { clearForm } from '../../redux/modules/form'
import { clearPlanningTool } from '../../redux/modules/planningTool'
import { editPlan, editProject } from '../../redux/modules/user'

const SaveAndExitButton = props => {
  const clickHandler = () => {
    if (props.user.editingProject) {
      props.editProject(null)
      props.clearForm()
    }

    if (props.user.editingPlan) {
      props.editPlan(null)
      props.clearPlanningTool()
    }

    navigateTo('/')
  }

  return (
    <Button
      onClick={clickHandler}
      variant="raised"
      color="secondary"
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
    clearForm: () => {
      dispatch(clearForm())
    },
    clearPlanningTool: () => {
      dispatch(clearPlanningTool())
    },
    editProject: (id) => {
      dispatch(editProject(id))
    },
    editPlan: (id) => {
      dispatch(editPlan(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveAndExitButton)
