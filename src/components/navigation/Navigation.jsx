import React from 'react'
import Link from 'gatsby-link'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid';

import SaveStatus from './SaveStatus'
import SyncStatus from './SyncStatus'
import AuthButton from './AuthButton'
import SyncFormButton from './SyncFormButton'
import DropdownMenu from './DropdownMenu'

const styles = {
  initiativeName: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }
}

const Navigation = props => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Grid container spacing={0}>
          <Grid item hidden={{ smDown: true }} xs={12}>
            <Grid container justify='space-between' spacing={0}>
              <Grid item xs={4} style={styles.initiativeName}>
                {`Now editing: ${props.initiativeName}`}
              </Grid>
              <Grid item>
                <SaveStatus />
                <SyncStatus />
              </Grid>
              <Grid item>
                <SyncFormButton />
                <Button component={Link} to={'/'}>
                  Save & Exit
                </Button>
                <AuthButton />
              </Grid>
            </Grid>
          </Grid>
          <Grid item hidden={{ mdUp: true }} xs={12}>
            <Grid container justify='space-between' alignItems='center' spacing={0}>
              <Grid item>
                <SaveStatus />
                <SyncStatus />
              </Grid>
              <Grid item>
                <DropdownMenu {...props} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
