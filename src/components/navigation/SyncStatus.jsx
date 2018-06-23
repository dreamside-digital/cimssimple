import React from 'react'
import { connect } from 'react-redux'
import Chip from 'material-ui/Chip';

const styles = {
  saved: {
    marginLeft: '1rem',
    backgroundColor: '#e2e8df'
  },
  error: {
    marginLeft: '1rem',
    backgroundColor: '#ead4e2'
  }
}

const SyncStatus = (props) => {
  if (!props.isLoggedIn) {
    return <Chip label='Log in to sync' style={styles.error} />
  }
  if (!props.isSynced) {
    return <Chip label='Not synced' style={styles.error} />
  }
  return <Chip label="Synced online" style={styles.saved} />
}

const mapStateToProps = (state) => {
  return {
    isSynced: state.user.isSynced,
    isLoggedIn: state.user.isLoggedIn,
  }
}

export default connect(mapStateToProps, null)(SyncStatus)
