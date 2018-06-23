import * as localForage from 'localforage'
import uuidv4 from 'uuid/v4'
import firebase from '../../config/firebase'
import { map } from 'lodash'
import { updateSyncStatus, updateSaveStatus, saveError, syncError } from './user';

const emptyProject = {
  initiativeName: 'Unnamed project',
}

// Actions

export function createProject(newProject) {
  return {
    type: 'CREATE_PROJECT',
    newProject,
  }
}

export function updateProjectData(projectData) {
  return {
    type: 'UPDATE_PROJECT_DATA',
    projectData,
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

export function createLocalProject(projectId=uuidv4()) {
  return (dispatch, getState) => {
    dispatch(updateSyncStatus(false));
    dispatch(updateSaveStatus(false))
    const state = getState()
    const projectState = state.projects
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const newProject = {
      [projectId]: emptyProject,
    }
    const projects = { ...projectState, ...newProject }
    localForage
      .setItem('projects', projects)
      .then(val => {
        dispatch(createProject(val))
        dispatch(updateSaveStatus(true))
      })
      .catch(err => {
        console.log('ERROR', err)
        dispatch(saveError(err))
      })

    if (isLoggedIn) {
      const db = firebase.database();
      const ref = db.ref(`users/${user.uid}/projects`);
      ref.update(projects).then(() => {
        dispatch(updateSyncStatus(true));
      }).catch(err => {
        dispatch(updateSyncStatus(false));
        dispatch(syncError(err))
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
      dispatch(updateSyncStatus(true))
    } else {
      localForage
        .getItem('projects')
        .then(data => {
          dispatch(populateProjectData(data))
          dispatch(updateSaveStatus(true))
        })
        .catch(err => {
          console.log('ERROR', err)
          dispatch(saveError(err))
        })
    }
  }
}

export function saveProjectData () {
  return (dispatch, getState) => {
    dispatch(updateSaveStatus(false))
    dispatch(updateSyncStatus(false))

    const state = getState();
    const form = state.form;
    const projectId = state.user.editingProject
    const updatedProjects = {
      ...state.projects,
      [projectId]: form
    }

    localForage.setItem('projects', updatedProjects).then((dataObj) => {
      dispatch(updateProjectData(updatedProjects))
      dispatch(updateSaveStatus(true))
    }).catch(err => {
      console.log('ERROR', err)
      dispatch(saveError(err))
    })
  };
}

export function syncProjectData() {
  return (dispatch, getState) => {
    const state = getState()
    const user = state.user.user

    if (!state.user.isLoggedIn) {
      dispatch(updateSyncStatus(false));
      return null;
    }

    const db = firebase.database()
    const ref = db.ref(`users/${user.uid}/projects`)

    ref
      .once('value')
      .then(snapshot => {
        const onlineProjects = snapshot.val()
        console.log("onlineProjects", onlineProjects)
        localForage
          .getItem('projects')
          .then(localProjects => {
            const syncedProjects = { ...onlineProjects, ...localProjects }

            ref.update(syncedProjects).then(val => {
              console.log('SYNCED WITH FIREBASE!!')
              dispatch(updateSyncStatus(true))
            }).catch(err => {
              console.log('FIREBASE ERROR', err)
              dispatch(updateSyncStatus(false))
            })

            localForage
              .setItem('projects', syncedProjects)
              .then(data => {
                dispatch(populateProjectData(data))
                dispatch(updateSaveStatus(true))
              })
              .catch(err => {
                console.log('LOCALFORAGE ERROR', err)
                dispatch(updateSaveStatus(false))
                dispatch(saveError(err))
              })
          })
          .catch(err => {
            console.log('LOCALFORAGE ERROR', err)
            dispatch(saveError(err))
          })
      })
      .catch(err => {
        console.log('FIREBASE ERROR', err)
        dispatch(updateSyncStatus(false))
        dispatch(syncError(err))
      })
  }
}

export function deleteLocalProject(id) {
  return (dispatch, getState) => {
    dispatch(updateSyncStatus(false));
    dispatch(updateSaveStatus(false));
    const state = getState()
    const user = state.user.user
    const isLoggedIn = state.user.isLoggedIn
    const projectState = state.projects


    let updatedProjects = {
      ...projectState,
    }
    delete updatedProjects[id]

    localForage
      .setItem('projects', updatedProjects)
      .then(projects => {
        dispatch(populateProjectData(projects))
        dispatch(updateSaveStatus(true))
      })
      .catch(err => {
        console.log('ERROR', err)
        dispatch(updateSaveStatus(false))
        dispatch(saveError(err))
      })

    if (isLoggedIn) {
      const db = firebase.database()
      const ref = db.ref(`users/${user.uid}/projects/${id}`)

      ref.remove().then(() => {
        dispatch(updateSyncStatus(true));
      }).catch(err => {
        console.log('firebase error', err)
        dispatch(updateSyncStatus(false));
        dispatch(syncError(err))
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

    case 'UPDATE_PROJECT_DATA': {
      return {
        ...state,
        ...action.projectData,
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
