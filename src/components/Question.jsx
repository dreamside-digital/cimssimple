import React from 'react'
import Grid from 'material-ui/Grid';

const styles = {
  container: {
    paddingBottom: '4rem',
  }
}

const Question = (props) => (
  <Grid container spacing={16} style={styles.container}>
    {props.children}
  </Grid>
)

export default Question
