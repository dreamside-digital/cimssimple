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
      disabled={props.synced}
    >
      Sync form
    </Button>
  )
}

const mapStateToProps = state => {
  return {
    synced: state.user.synced,
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
