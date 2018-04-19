import * as localForage from 'localforage'
import uuidv4 from 'uuid/v4'
import firebase from '../../config/firebase'
import { map } from 'lodash'
import { syncStatus } from './user';

const emptyProject = {
  initiativeName: 'Unnamed project',
}

// Actions

export function createProject(newProject) {
  const projectId = uuidv4()
  return {
    type: 'CREATE_PROJECT',
    newProject,
  }
}

export function populateProjectData(projectData) {
  return {
    type: 'POPULATE_PROJECT_DATA',
    projectData,
  }
}

export function deleteProject(id) {
  return {
    type: 'DELETE_PROJECT',
    id,
  }
}

export function createLocalProject() {
  return (dispatch, getState) => {
    dispatch(syncStatus(false));
    const state = getState()
    const projectState = state.projects
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const db = firebase.database();
    const ref = db.ref(`users/${user.uid}/projects`);
    const projectId = uuidv4()
    const newProject = {
      [projectId]: emptyProject,
    }
    const projects = { ...projectState, ...newProject }

    localForage
      .setItem('projects', projects)
      .then(val => {
        dispatch(createProject(val))
      })
      .catch(err => {
        console.log('ERROR', err)
      })

    if (isLoggedIn) {
      ref.update(projects).then(() => {
        dispatch(syncStatus(true));
      }).catch(err => {
        dispatch(syncStatus(false));
      })
    }
  }
}

export function getProjectData() {
  return (dispatch, getState) => {
    const state = getState()
    const isLoggedIn = state.user.isLoggedIn
    const user = state.user.user

    if (isLoggedIn && !!user.projects) {
      dispatch(populateProjectData(user.projects))
    } else {
      localForage
        .getItem('projects')
        .then(data => {
          dispatch(populateProjectData(data))
        })
        .catch(err => {
          console.log('ERROR', err)
        })
    }
  }
}

export function syncProjectData() {
  return (dispatch, getState) => {
    const state = getState()
    const user = state.user.user

    const db = firebase.database()
    const ref = db.ref(`users/${user.uid}/projects`)

    ref
      .once('value')
      .then(snapshot => {
        const onlineProjects = snapshot.val()
        localForage
          .getItem('projects')
          .then(localProjects => {
            const syncedProjects = { ...onlineProjects, ...localProjects }

            ref.update(syncedProjects).then(val => {
              console.log('SYNCED WITH FIREBASE!!')
              dispatch(syncStatus(true))
            }).catch(err => {
              console.log('FIREBASE ERROR', err)
              dispatch(syncStatus(false))
            })

            localForage
              .setItem('projects', syncedProjects)
              .then(data => {
                dispatch(populateProjectData(data))
              })
              .catch(err => {
                console.log('LOCALFORAGE ERROR', err)
              })
          })
          .catch(err => {
            console.log('LOCALFORAGE ERROR', err)
          })
      })
      .catch(err => {
        console.log('FIREBASE ERROR', err)
        dispatch(syncStatus(false))
      })
  }
}

export function deleteLocalProject(id) {
  return (dispatch, getState) => {
    dispatch(syncStatus(false));
    const state = getState()
    const user = state.user.user
    const isLoggedIn = state.user.isLoggedIn
    const projectState = state.projects

    const db = firebase.database()
    const ref = db.ref(`users/${user.uid}/projects/${id}`)

    let updatedProjects = {
      ...projectState,
    }
    delete updatedProjects[id]

    localForage
      .setItem('projects', updatedProjects)
      .then(projects => {
        dispatch(populateProjectData(projects))
      })
      .catch(err => {
        console.log('ERROR', err)
      })

    if (isLoggedIn) {
      ref.remove().then(() => {
        dispatch(syncStatus(true));
      }).catch(err => {
        console.log('firebase error', err)
        dispatch(syncStatus(false));
      })
    }
  }
}

// Reducer

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT': {
      return {
        ...state,
        ...action.newProject,
      }
    }

    case 'DELETE_PROJECT': {
      return {
        ...state,
        [action.id]: null,
      }
    }

    case 'POPULATE_PROJECT_DATA': {
      return {
        ...action.projectData,
      }
    }

    default: {
      return state
    }
  }
}
