import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { saveLocalFormData, getLocalFormData } from '../redux/modules/form';
import { editProject } from '../redux/modules/user';

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'

import Step1 from '../containers/step-1'
import Step2 from '../containers/step-2'
import Step3 from '../containers/step-3'
import Step4 from '../containers/step-4'


class SimpleTabs extends React.Component {
  state = {
    value: 0,
  }

  componentDidMount() {
    const queryString = this.props.location.search
    const params = new URLSearchParams(queryString)
    const projectId = params.get('id');
    this.props.editProject(projectId)
    this.props.getLocalFormData(projectId)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Step 1" />
            <Tab label="Step 2" />
            <Tab label="Step 3" />
            <Tab label="Step 4" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <Step1
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
            />
        )}
        {value === 1 && (
          <Step2
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
          />
        )}
        {value === 2 && (
          <Step3
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
          />
        )}
        {value === 3 && (
          <Step4
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formData: state.form,
    projectId: state.user.editing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveLocalFormData: (fieldId, value, projectId) => {
      dispatch(saveLocalFormData(fieldId, value, projectId))
    },
    getLocalFormData: id => {
      dispatch(getLocalFormData(id))
    },
    editProject: (id) => {
      dispatch(editProject(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTabs)
