import React from 'react'
import Grid from 'material-ui/Grid';

const styles = {
  paddingBottom: '2rem',
}

const Question = (props) => (
  <Grid container spacing={16} style={styles}>
    {props.children}
  </Grid>
)

export default Question
