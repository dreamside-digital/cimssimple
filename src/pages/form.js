import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { updateForm, getLocalFormData, startEditing, saveAndExit, clearForm } from '../redux/modules/form';
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
import PageContainer from '../components/PageContainer'


const styles = {
  flex: {
    flex: 1
  }
}

class TabbedForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
    this.props.clearForm();
  }

  componentDidMount() {
    const queryString = this.props.location.search
    const params = new URLSearchParams(queryString)
    const startingTab = params.get('step') ? (parseInt(params.get('step')) - 1) : 0
    const projectId = params.get('id');
    if (!projectId) {
      return this.createProjectAndStartEditing()
    }
    this.props.getLocalFormData(projectId);
    this.props.editProject(projectId);
    this.setState({ value: startingTab })
  }

  componentWillUnmount() {
    this.props.updateForm('currentTab', this.state.value, this.props.projectId)
    this.props.saveAndExit()
  }

  createProjectAndStartEditing() {
    const projectId = uuidv4();
    this.props.createProject(projectId)
    this.props.editProject(projectId)
    navigateTo(`/form?id=${projectId}`)
  }

  scrollToTop = () => {
    window.scrollTo({ top: 0 })
  }

  handleChange = (event, value) => {
    this.props.updateForm('currentTab', value, this.props.projectId)
    this.setState({ value })
    this.scrollToTop()
  }

  nextTab = () => {
    const currentTab = this.state.value
    const next = currentTab + 1;
    const value = next > 3 ? 0 : next;

    this.props.updateForm('currentTab', value, this.props.projectId)
    this.setState({ value })
    this.scrollToTop()
  }

  previousTab = () => {
    const currentTab = this.state.value
    const prev = currentTab - 1;
    const value = prev < 0 ? 0 : prev;

    this.props.updateForm('currentTab', value, this.props.projectId)
    this.setState({ value })
    this.scrollToTop()
  }

  render() {
    const { classes } = this.props
    const { value } = this.state
    console.log('this.props.formData', this.props.formData)
    console.log('this.props.user', this.props.user)
    console.log('this.props.projectId', this.props.projectId)

    return (
      <div>
        <Navigation initiativeName={this.props.formData['initiativeName']} />
        <PageContainer>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} centered>
              <Tab label="Step 1" />
              <Tab label="Step 2" />
              <Tab label="Step 3" />
              <Tab label="Step 4" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <Step1
              startEditing={this.props.startEditing}
              formData={this.props.formData}
              updateForm={this.props.updateForm}
              projectId={this.props.projectId}
              />
          )}
          {value === 1 && (
            <Step2
              formData={this.props.formData}
              updateForm={this.props.updateForm}
              startEditing={this.props.startEditing}
              projectId={this.props.projectId}
            />
          )}
          {value === 2 && (
            <Step3
              formData={this.props.formData}
              updateForm={this.props.updateForm}
              startEditing={this.props.startEditing}
              projectId={this.props.projectId}
            />
          )}
          {value === 3 && (
            <Step4
              formData={this.props.formData}
              updateForm={this.props.updateForm}
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
        </PageContainer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formData: state.form,
    projectId: state.user.editingProject,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startEditing: () => {
      dispatch(startEditing())
    },
    updateForm: (fieldId, value, projectId) => {
      dispatch(updateForm(fieldId, value, projectId))
    },
    getLocalFormData: id => {
      dispatch(getLocalFormData(id))
    },
    editProject: (id) => {
      dispatch(editProject(id))
    },
    createProject: (projectId) => {
      dispatch(createLocalProject(projectId))
    },
    saveAndExit: () => {
      dispatch(saveAndExit())
    },
    clearForm: () => {
      dispatch(clearForm())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabbedForm)
