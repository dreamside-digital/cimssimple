import React from 'react'
import { connect } from 'react-redux'
import { navigateTo } from 'gatsby-link'
import Button from 'material-ui/Button'

import { clearForm } from '../../redux/modules/form'

const SaveAndExitButton = props => {
  const clickHandler = () => {
    props.clearForm
    navigateTo('/')
  }
  return (
    <Button
      onClick={clickHandler}
      variant="raised"
      color="secondary"
    >
      Save & Exit
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
    clearForm: () => {
      dispatch(clearForm())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveAndExitButton)
