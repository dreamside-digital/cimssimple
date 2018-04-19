import React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button';
import Link from 'gatsby-link';
import firebase from '../config/firebase';
import { userLoggedIn, userLoggedOut } from '../redux/modules/user'
import { syncProjectData } from '../redux/modules/projects'

class AuthButton extends React.Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const ref = firebase
          .app()
          .database()
          .ref(`users/${user.uid}`);
        ref.once("value").then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.props.userLoggedIn(userData);
            this.props.syncProjectData()
          } else {
            const newUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            };
            ref.set(newUser);
            this.props.userLoggedIn(newUser);
          }
        });
      } else {
        this.props.userLoggedOut();
      }
    });
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Button component={Link} to={'/logout'}>Log Out</Button>
    } else {
      return <Button component={Link} to={'/login'} variant="raised" color="secondary">Log In</Button>
    }
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: user => {
      dispatch(userLoggedIn(user));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
    syncProjectData: () => {
      dispatch(syncProjectData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton)
