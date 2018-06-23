import React from 'react';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

import SaveStatus from './SaveStatus'
import SyncStatus from './SyncStatus'
import AuthButton from './AuthButton'
import SyncFormButton from './SyncFormButton'
import SaveAndExitButton from './SaveAndExitButton'

class MenuDropdown extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          aria-owns={this.state.anchorEl ? 'main-menu' : null}
          aria-haspopup="true"
          aria-controls="navigation"
          onClick={this.handleMenu}
        >
          Menu
        </Button>
        <Menu
          id="main-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            <SyncFormButton />
          </MenuItem>

          <MenuItem>
            <SaveAndExitButton />
          </MenuItem>

          <MenuItem>
            <AuthButton />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MenuDropdown;
