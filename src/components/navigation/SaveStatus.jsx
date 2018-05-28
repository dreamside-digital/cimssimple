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
  if (props.saveError) {
    return <Chip label='Unable to save, please refresh and try again.' style={styles.error} />
  }
  return <Chip label="Saved locally" style={styles.saved} />
}

const mapStateToProps = (state) => {
  return {
    isSaved: state.form.isSaved,
    saveError: state.form.saveError
  }
}

export default connect(mapStateToProps, null)(SaveStatus)
