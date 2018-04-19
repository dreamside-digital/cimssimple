import * as localForage from "localforage";
import firebase from '../../config/firebase';
import { syncStatus } from './user';

// Actions

function updateFormData (dataObj) {
  return {
    type: 'UPDATE_FORM_DATA', dataObj
  };
}

function updatePageData (data) {
  return {
    type: 'POPULATE_PAGE_DATA', data
  }
}

function updateSaveStatus(isSaved) {
  return {
    type: 'UPDATE_SAVE_STATUS', isSaved
  }
}

function saveError(error) {
  return {
    type: 'SAVE_ERROR', error
  }
}

export function startEditing() {
  return dispatch => {
    dispatch(syncStatus(false))
    dispatch(updateSaveStatus(false))
  }
}

export function saveLocalFormData (id, data, projectId) {
  return (dispatch, getState) => {
    dispatch(updateSaveStatus(false))

    const state = getState();
    const form = {...state.form, [id]: data};
    const updatedProjects = {
      ...state.projects,
      [projectId]: form
    }

    localForage.setItem('projects', updatedProjects).then((dataObj) => {
      dispatch(updateFormData(form));
    }).catch(err => {
      console.log('ERROR', err)
      dispatch(saveError(err))
    })
  };
}

export function getLocalFormData (editingProjectId) {
  return (dispatch, getState) => {
    localForage.getItem('projects').then((data) => {
      dispatch(updatePageData(data[editingProjectId]));
    }).catch(err => {
      console.log('ERROR', err)
    })
  };
}

// Reducer

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_DATA': {
      return {
        ...state,
        ...action.dataObj,
        isSaved: true,
        saveError: false
      };
    }

    case 'POPULATE_PAGE_DATA': {
      return {
        ...state,
        ...action.data
      }
    }

    case 'UPDATE_SAVE_STATUS': {
      return {
        ...state,
        isSaved: action.isSaved,
        saveError: false
      }
    }

    case 'SAVE_ERROR': {
      return {
        ...state,
        saveError: action.error
      }
    }

    default: {
      return state;
    }
  }
};
