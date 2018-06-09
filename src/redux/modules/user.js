import * as localForage from 'localforage'
import { syncProjectData, getProjectData } from './projects'

// Actions

export function editProject(id) {
  return {
    type: 'EDIT_PROJECT',
    id,
  }
}

export function editPlan(id) {
  return {
    type: 'EDIT_PLAN',
    id,
  }
}

export function syncStatus(synced) {
  return {
    type: 'SYNC_STATUS',
    synced,
  }
}

export function userLoggedIn(user = null) {
  return { type: 'USER_LOGGED_IN', user }
}

export function userLoggedOut() {
  return { type: 'USER_LOGGED_OUT' }
}

export function newLogin(user = null) {
  return dispatch => {
    localForage.getItem('cimsUser').then((lastUser) => {
      if (!lastUser) {
        localForage.setItem('cimsUser', user).then(savedUser => {
          dispatch(userLoggedIn(savedUser))
          dispatch(syncProjectData())
          console.log('logging in for the first time')
        })
      } else if (user.uid !== lastUser.uid) {
        localForage.clear().then(() => {
          localForage.setItem('cimsUser', user).then(savedUser => {
            dispatch(userLoggedIn(savedUser))
            dispatch(getProjectData())
            console.log('switching to a new user')
          })
        }).catch((err) => {
            console.log(err);
        });
      } else {
        dispatch(userLoggedIn(user))
        dispatch(syncProjectData())
        console.log('logging in a previously logged in user')
      }
    }).catch(err => {
      console.log('ERROR', err)
    })
  }
}

// Reducer

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_PROJECT': {
      return {
        ...state,
        editing: action.id,
      }
    }

    case 'EDIT_PLAN': {
      return {
        ...state,
        editingPlan: action.id,
      }
    }

    case 'USER_LOGGED_IN': {
      return { ...state, isLoggedIn: true, user: action.user }
    }

    case 'USER_LOGGED_OUT':{
      return { ...state, isLoggedIn: false, user: null }
    }

    case 'SYNC_STATUS': {
      return {
        ...state,
        synced: action.synced,
      }
    }

    default: {
      return state
    }
  }
}
