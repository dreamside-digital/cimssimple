import React from 'react'
import { connect } from 'react-redux'
import Chip from 'material-ui/Chip';

const styles = {
  saved: {
    backgroundColor: '#e2e8df'
  },
  error: {
    backgroundColor: '#ead4e2'
  }
}

const SaveStatus = (props) => {
  console.log('save status props', props)
  const activeForm = props.user.editingProject ? 'form' : 'planningTool';

  if (props.saveError) {
    return <Chip label='Unable to save, please refresh and try again.' style={styles.error} />
  }

  if ((props.user.editingProject && props.isFormSaved) || (props.user.editingPlan && props.isPlanningToolSaved)) {
    return <Chip label="Saved locally" style={styles.saved} />
  }

  return <Chip label='Editing...' style={styles.error} />

}

const mapStateToProps = (state) => {
  return {
    isFormSaved: state.form.isSaved,
    isPlanningToolSaved: state.planningTool.isSaved,
    saveError: state.form.saveError,
    user: state.user
  }
}

export default connect(mapStateToProps, null)(SaveStatus)
