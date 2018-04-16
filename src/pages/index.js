import React from 'react'
import Link from 'gatsby-link'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styles = {
  header: {
    marginTop: '4rem',
    marginBottom: '4rem',
    textAlign: 'center'
  },
  title: {
    color: '#932F6D',
  }
}

const IndexPage = () => (
  <Grid container justify="center">
    <Grid item xs={12} md={8}>
      <header style={styles.header}>
        <h1 style={styles.title}>CIMSsimple</h1>
        <p>Planning, Docketing, and Evaluation Tool</p>
      </header>
      <h2>Purpose & Context</h2>
      <p>This tool is intended to provide legal workers with a simple, user-friendly template for planning, documenting, and evaluating their CD-CO work. It also serves as a roadmap for documenting CD-CO work in CIMS. The fields on the form correspond to the fields in CIMS Initiatives, and the content entered into some parts of this form can be cut & pasted right into CIMS. This will enable legal workers to plan, docket, and evaluate projects, and transfer the necessary information into CIMS at a later time.</p>
      <Grid container justify="center">
        <Grid item>
          <Button component={Link} to='/step-1' color="primary" variant="raised">Start a new project</Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

export default IndexPage
