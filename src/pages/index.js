import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import { map, compact } from 'lodash'

import { connect } from 'react-redux'
import {
  createLocalProject,
  getProjectData,
  deleteLocalProject,
} from '../redux/modules/projects'
import {
  createLocalPlan,
  getPlanData,
  deleteLocalPlan,
} from '../redux/modules/plans'

import { editProject, editPlan } from '../redux/modules/user'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'
import Toolbar from 'material-ui/Toolbar'
import BasicTable from '../components/inputs/BasicTable'
import AuthButton from '../components/navigation/AuthButton'
import Label from '../components/Label'
import SyncStatus from '../components/navigation/SyncStatus'

const styles = {
  container: {
    marginBottom: '2rem',
  },
  paper: {
    overflowX: 'auto',
    width: '100%',
    marginBottom: '1rem',
  },
  header: {
    marginBottom: '4rem',
    textAlign: 'center',
  },
  title: {
    color: '#932F6D',
  },
  tableHeader: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginRight: '0.4rem',
    fontSize: '0.8rem'
  },
  actionContainer: {
    whiteSpace: 'nowrap',
  },
  startButton: {
    marginBottom: '1rem'
  },
  toolbar: {
    justifyContent: 'flex-end'
  }
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getProjectData()
    this.props.getPlanData()
  }

  render() {
    const projectTableData = map(
      this.props.projects,
      (projectData, projectId) => {
        if (!!projectId && projectId !== 'undefined') {
          const name = projectData
            ? projectData.initiativeName
            : 'Unnamed project';
            console.log('project name', name)
          const currentTab =
            (projectData && projectData.currentTab > -1)
              ? parseInt(projectData.currentTab)
              : null
          return { id: projectId, name, currentTab }
        }
      }
    )

    const planTableData = map(
      this.props.plans,
      (planData, planId) => {
        if (!!planId && planId !== 'undefined') {
          const projectTitle = planData
            ? planData.projectTitle
            : 'Unnamed project';

          return { id: planId, projectTitle }
        }
      }
    )

    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <SyncStatus />
          <AuthButton />
        </Toolbar>
        <Grid container justify="center">
          <Grid item xs={11} md={8} style={styles.container}>
            <header style={styles.header}>
              <h1 style={styles.title}>CIMSsimple</h1>
              <p>Planning, Docketing, and Evaluation Tool</p>
            </header>
            <p>Welcome to CIMSsimple. To start using this tool simply click on <strong>Start a New Project</strong> or <strong>Start a New Project Plan</strong> below.</p>
            <p>You do not need to log in or create a profile to get started - your projects will be saved automatically on your device. However this is only temporary storage (it will be deleted when you clear your browser cache) and is intended to let you use the tool offline.</p>
            <p>To save your projects permanently and access your projects on multiple devices, choose <strong>Log In</strong> and create an account using your email address. Your projects will then be automatically synced online. You can still use the tool offline and sync your changes when you have an internet connection.</p>
            <h2>Purpose & Context</h2>
            <p>
              This tool is intended to provide legal workers with a simple,
              user-friendly template for planning, documenting, and evaluating
              their CD-CO work. It also serves as a roadmap for documenting
              CD-CO work in CIMS. The fields on the form correspond to the
              fields in CIMS Initiatives, and the content entered into some
              parts of this form can be cut & pasted right into CIMS. This will
              enable legal workers to plan, docket, and evaluate projects, and
              transfer the necessary information into CIMS at a later time.
            </p>
            <div style={styles.tableHeader}>
              <Label>Your Projects</Label>
            </div>
            <Grid container style={styles.startButton}>
              <Grid item>
                <Button onClick={this.props.createProject} color="primary" variant="raised">
                  Start a new project
                </Button>
              </Grid>
            </Grid>
            {!!projectTableData.length && (
              <Paper style={styles.paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project Name</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {compact(projectTableData).map((row, index) => {
                      return (
                        <TableRow key={`row-${row.id}`}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            <div style={styles.actionContainer}>
                              <Button
                                component={Link}
                                to={`/form?id=${row.id}&step=1`}
                                color="primary"
                                variant="raised"
                                style={styles.button}
                              >
                                Edit
                              </Button>
                              {(row.currentTab > 0) && (
                                <Button
                                  component={Link}
                                  to={`/form?id=${row.id}&step=${row.currentTab + 1}`}
                                  color="secondary"
                                  variant="raised"
                                  style={styles.button}
                                >
                                  {`Back to Step ${row.currentTab + 1}`}
                                </Button>
                              )}
                              <Link to={`/print?id=${row.id}`} style={styles.button}>
                                Print View
                              </Link>
                              <Link
                                to={'#'}
                                onClick={() => this.props.deleteProject(row.id)}
                              >
                                Delete
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Grid>

          <Grid item xs={11} md={8} style={styles.container}>
            <div style={styles.tableHeader}>
              <Label>Your Project Plans</Label>
            </div>
            <Grid container>
              <Grid item style={styles.startButton}>
                <Button onClick={this.props.createPlan} color="primary" variant="raised">
                  Start a new project plan
                </Button>
              </Grid>
            </Grid>
            {!!planTableData.length && (
              <Paper style={styles.paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project Name</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {compact(planTableData).map((row, index) => {
                      return (
                        <TableRow key={`row-${row.id}`}>
                          <TableCell>{row.projectTitle}</TableCell>
                          <TableCell>
                            <div style={styles.actionContainer}>
                              <Button
                                component={Link}
                                to={`/planning-tool?id=${row.id}`}
                                color="primary"
                                variant="raised"
                                style={styles.button}
                              >
                                Edit
                              </Button>
                              <Link
                                to={'#'}
                                onClick={() => this.props.deletePlan(row.id)}
                              >
                                Delete
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    plans: state.plans,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: () => {
      dispatch(createLocalProject())
    },
    deleteProject: id => {
      dispatch(deleteLocalProject(id))
    },
    getProjectData: () => {
      dispatch(getProjectData())
    },
    editProject: id => {
      dispatch(editProject(id))
    },
    createPlan: () => {
      dispatch(createLocalPlan())
    },
    deletePlan: id => {
      dispatch(deleteLocalPlan(id))
    },
    getPlanData: () => {
      dispatch(getPlanData())
    },
    editPlan: id => {
      dispatch(editPlan(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
