import * as localForage from 'localforage'

// Actions

export function editProject(id) {
  console.log(id)
  return {
    type: 'EDIT_PROJECT',
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

// Reducer

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_PROJECT': {
      return {
        ...state,
        editing: action.id,
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
