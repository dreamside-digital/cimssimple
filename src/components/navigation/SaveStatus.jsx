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

  if (props.user.saveError) {
    return <Chip label='Unable to save, please refresh and try again.' style={styles.error} />
  }

  if (props.user.isSaved) {
    return <Chip label="Saved locally" style={styles.saved} />
  }

  return <Chip label='Editing...' />

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(SaveStatus)
