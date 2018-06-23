import * as localForage from 'localforage'
import { syncProjectData, getProjectData } from './projects'
import { syncPlanData, getPlanData } from './plans'

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

export function updateSyncStatus(isSynced) {
  return {
    type: 'UPDATE_SYNC_STATUS',
    isSynced,
  }
}

export function updateSaveStatus(isSaved) {
  return {
    type: 'UPDATE_SAVE_STATUS', isSaved
  }
}

export function saveError(saveError) {
  return {
    type: 'SAVE_ERROR', saveError
  }
}

export function syncError(syncError) {
  return {
    type: 'SYNC_ERROR', syncError
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
          dispatch(syncPlanData())
          console.log('logging in for the first time')
        })
      } else if (user.uid !== lastUser.uid) {
        localForage.clear().then(() => {
          localForage.setItem('cimsUser', user).then(savedUser => {
            dispatch(userLoggedIn(savedUser))
            dispatch(getProjectData())
            dispatch(getPlanData())
            console.log('switching to a new user')
          })
        }).catch((err) => {
            console.log(err);
        });
      } else {
        dispatch(userLoggedIn(user))
        dispatch(syncProjectData())
        dispatch(syncPlanData())
        console.log('logging in a previously logged in user')
      }
    }).catch(err => {
      console.log('ERROR', err)
    })
  }
}

// Reducer

const initialState = {
  editingProject: null,
  editingPlan: null,
  isLoggedIn: false,
  isSynced: false,
  isSaved: false,
  user: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_PROJECT': {
      return {
        ...state,
        editingProject: action.id,
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

    case 'USER_LOGGED_OUT': {
      return initialState
    }

    case 'UPDATE_SYNC_STATUS': {
      return {
        ...state,
        isSynced: action.isSynced,
      }
    }

    case 'UPDATE_SAVE_STATUS': {
      return {
        ...state,
        isSaved: action.isSaved,
      }
    }

    case 'SYNC_ERROR': {
      return {
        ...state,
        syncError: action.syncError,
      }
    }

    case 'SAVE_ERROR': {
      return {
        ...state,
        saveError: action.saveError,
      }
    }

    default: {
      return state
    }
  }
}
