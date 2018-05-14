import React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'

import { syncProjectData } from '../redux/modules/projects'

const SyncFormButton = props => {
  return (
    <Button
      onClick={props.syncProjectData}
      variant="raised"
      color="secondary"
      disabled={!props.isLoggedIn || props.synced}
    >
      Sync form
    </Button>
  )
}

const mapStateToProps = state => {
  return {
    synced: state.user.synced,
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    syncProjectData: () => {
      dispatch(syncProjectData())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SyncFormButton)
