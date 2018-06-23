import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { saveLocalFormData, getLocalFormData, startEditing } from '../redux/modules/form';
import { editProject } from '../redux/modules/user';
import { createLocalProject } from '../redux/modules/projects';
import uuidv4 from 'uuid/v4'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Step1 from '../containers/step-1'
import Step2 from '../containers/step-2'
import Step3 from '../containers/step-3'
import Step4 from '../containers/step-4'
import Navigation from '../components/navigation/Navigation'


const styles = {
  flex: {
    flex: 1
  }
}

class TabbedForm extends React.Component {
  state = {
    value: 0,
  }

  componentDidMount() {
    const queryString = this.props.location.search
    const params = new URLSearchParams(queryString)
    const projectId = params.get('id');
    const startingTab = !!params.get('step') ? (parseInt(params.get('step')) - 1) : 0;
    if (!projectId) {
      return this.createProjectAndStartEditing()
    }
    this.props.saveLocalFormData('currentTab', startingTab, projectId)
    this.props.editProject(projectId);
    this.props.getLocalFormData(projectId);
  }

  createProjectAndStartEditing() {
    const projectId = uuidv4();
    this.props.createProject({ projectId })
    this.props.editProject(projectId)
    navigateTo(`/form?id=${projectId}`)
  }

  scrollToTop = () => {
    window.scrollTo({ top: 0 })
  }

  handleChange = (event, value) => {
    this.props.saveLocalFormData('currentTab', value, this.props.projectId)
    this.scrollToTop()
  }

  nextTab = () => {
    const currentTab = this.state.value
    const next = currentTab + 1;
    const value = next > 3 ? 0 : next;

    this.props.saveLocalFormData('currentTab', value, this.props.projectId)
    this.scrollToTop()
  }

  previousTab = () => {
    const currentTab = this.state.value
    const prev = currentTab - 1;
    const value = prev < 0 ? 0 : prev;

    this.props.saveLocalFormData('currentTab', value, this.props.projectId)
    this.scrollToTop()
  }

  render() {
    const { classes } = this.props
    const { value } = this.state
    const currentTab = this.props.formData.currentTab ? parseInt(this.props.formData.currentTab) : 0

    return (
      <div>
        <Navigation initiativeName={this.props.formData['initiativeName']} />
        <AppBar position="static">
          <Tabs value={currentTab} onChange={this.handleChange} centered>
            <Tab label="Step 1" />
            <Tab label="Step 2" />
            <Tab label="Step 3" />
            <Tab label="Step 4" />
          </Tabs>
        </AppBar>
        {currentTab === 0 && (
          <Step1
            startEditing={this.props.startEditing}
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            projectId={this.props.projectId}
            />
        )}
        {currentTab === 1 && (
          <Step2
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            startEditing={this.props.startEditing}
            projectId={this.props.projectId}
          />
        )}
        {currentTab === 2 && (
          <Step3
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            startEditing={this.props.startEditing}
            projectId={this.props.projectId}
          />
        )}
        {currentTab === 3 && (
          <Step4
            formData={this.props.formData}
            saveLocalFormData={this.props.saveLocalFormData}
            startEditing={this.props.startEditing}
            projectId={this.props.projectId}
          />
        )}

        <Grid container justify="space-between">
          <Grid item>
            {
              this.state.value > 0 &&
            <Button color="primary" variant="raised" onClick={this.previousTab}>Back</Button>
            }
            {
              this.state.value === 0 &&
              <Button color="primary" variant="raised" component={Link} to={'/'}>Home</Button>
            }
          </Grid>
          <Grid item>
            {
              this.state.value === 3 &&
              <Button color="secondary" variant="raised" component={Link} to={'/'}>All done!</Button>
            }
            {
              this.state.value < 3 &&
            <Button color="secondary" variant="raised" onClick={this.nextTab}>Next</Button>
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formData: state.form,
    projectId: state.user.editingProject
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startEditing: () => {
      dispatch(startEditing())
    },
    saveLocalFormData: (fieldId, value, projectId) => {
      dispatch(saveLocalFormData(fieldId, value, projectId))
    },
    getLocalFormData: id => {
      dispatch(getLocalFormData(id))
    },
    editProject: (id) => {
      dispatch(editProject(id))
    },
    createProject: (opts) => {
      dispatch(createLocalProject(opts))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabbedForm)
