import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import { map, compact } from 'lodash'

import { connect } from 'react-redux'
import {
  createLocalProject,
  getProjectData,
  deleteLocalProject,
} from '../redux/modules/projects'

import { editProject } from '../redux/modules/user'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'

import BasicTable from '../components/inputs/BasicTable'
import AuthButton from '../components/AuthButton'
import Label from '../components/Label'
import SyncStatus from '../components/SyncStatus'

const styles = {
  container: {
    padding: '1rem',
    marginBottom: '2rem'
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
    flexWrap: 'wrap'
  }
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProjectData()
  }

  render() {
    const projectTableData = map(
      this.props.projects,
      (projectData, projectId) => {
        if (!!projectId) {
          const name = projectData ? projectData.initiativeName : 'Unnamed project'
          return { id: projectId, name }
        }
      }
    )

    return (
      <div>
        <Grid container justify="flex-end" style={styles.container}>
          <Grid item>
          <AuthButton />
          </Grid>
        </Grid>
        <Grid container justify="center" style={styles.container}>
          <Grid item xs={12} md={8}>
            <header style={styles.header}>
              <h1 style={styles.title}>CIMSsimple</h1>
              <p>Planning, Docketing, and Evaluation Tool</p>
            </header>
            <h2>Purpose & Context</h2>
            <p>
              This tool is intended to provide legal workers with a simple,
              user-friendly template for planning, documenting, and evaluating
              their CD-CO work. It also serves as a roadmap for documenting CD-CO
              work in CIMS. The fields on the form correspond to the fields in
              CIMS Initiatives, and the content entered into some parts of this
              form can be cut & pasted right into CIMS. This will enable legal
              workers to plan, docket, and evaluate projects, and transfer the
              necessary information into CIMS at a later time.
            </p>
            <div style={styles.tableHeader}><Label>Your Projects</Label><SyncStatus /></div>
            {!!projectTableData.length && (
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
                          <Button
                            component={Link}
                            to={`/form?id=${row.id}`}
                            color="primary"
                            variant="raised"
                          >
                            Edit
                          </Button>
                          <Button
                            component={Link}
                            to={`/print?id=${row.id}`}
                          >
                            Print View
                          </Button>
                          <Button
                            onClick={() => this.props.deleteProject(row.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
            <Grid container>
              <Grid item>
                <Button
                  onClick={this.props.createProject}
                  color="primary"
                >
                  Start a new project
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
