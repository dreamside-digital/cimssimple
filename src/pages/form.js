import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { saveLocalFormData, getLocalFormData } from '../redux/modules/form';
import { editProject } from '../redux/modules/user';

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


const styles = {
  flex: {
    flex: 1
  }
}

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

  nextTab = () => {
    const currentTab = this.state.value
    const next = currentTab + 1;
    const value = next > 3 ? 0 : next;

    this.setState({ value });
  }

  previousTab = () => {
    const currentTab = this.state.value
    const prev = currentTab - 1;
    const value = prev < 0 ? 0 : prev;

    this.setState({ value });
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <span style={styles.flex}>
              {`Now editing: ${this.props.formData['initiativeName']}`}
            </span>
            <Button component={Link} to={'/'}>Exit form</Button>
          </Toolbar>
        </AppBar>
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
