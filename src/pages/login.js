import React from 'react'
import firebase from "../config/firebase";
import { navigateTo } from 'gatsby-link';
import { connect } from "react-redux";
import { FirebaseAuth } from 'react-firebaseui';
import {
  userLoggedIn,
  userLoggedOut,
} from "../redux/modules/user";

const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => {false}
  },
  credentialHelper: 'NONE',
  callbacks: {
      signInSuccess: () => navigateTo('/')
    }
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column'
  }
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('logged in1', user)
      if (user) {
        const ref = firebase
          .app()
          .database()
          .ref(`users/${user.uid}`);
        ref.once("value").then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.props.userLoggedIn(userData);
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


  render () {
    return (
      <div className="container full-screen" style={styles.container}>
          <h1>Sign up / Sign in</h1>
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
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
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(
  LoginPage
);
