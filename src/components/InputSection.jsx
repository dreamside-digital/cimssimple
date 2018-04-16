import React from 'react'
import Grid from 'material-ui/Grid';

const styles = {
  flex: '1 1 auto'
}

const InputSection = (props) => (
  <Grid item xs={12} md={8}>
    <article {...props} className="input-area" style={styles}>{props.children}</article>
  </Grid>
)

export default InputSection
