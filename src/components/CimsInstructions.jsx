import React from 'react'
import Grid from 'material-ui/Grid';

const styles = {
  container: {
    background: '#F0F2EF',
    borderRadius: '4px'
  },
  header: {
    background: '#e2e8df',
    padding: '1rem'
  },
  body: {
    padding: '1rem',
    background: '#F0F2EF',
  }
}

const CimsInstructions = (props) => (
  <Grid item xs={12} md={4}>
    <aside style={styles.container} className="cims-instructions">
      <div style={styles.header}><strong>CIMS Instructions</strong></div>
      <div style={styles.body}>
        {props.children}
      </div>
    </aside>
  </Grid>
)

export default CimsInstructions
