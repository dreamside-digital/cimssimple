import React from 'react'
import Grid from 'material-ui/Grid';

const styles = {
  background: '#F0F2EF',
  padding: '1rem',
  borderRadius: '4px'
}

const CimsInstructions = (props) => (
  <Grid item xs={12} md={4}>
    <aside style={styles} className="cims-instructions">{props.children}</aside>
  </Grid>
)

export default CimsInstructions
