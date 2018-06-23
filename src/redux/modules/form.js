import * as localForage from "localforage";
import { updateSaveStatus, updateSyncStatus, saveError } from './user';
import { saveProjectData } from './projects'

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

export function clearForm() {
  return {
    type: 'CLEAR_FORM'
  }
}

export function startEditing() {
  return dispatch => {
    dispatch(updateSyncStatus(false))
    dispatch(updateSaveStatus(false))
  }
}

export function updateForm (id, data, projectId) {
  return (dispatch, getState) => {

    const state = getState();
    const form = {...state.form, [id]: data};

    dispatch(updateFormData(form));
    dispatch(saveProjectData())
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
        ...action.dataObj
      };
    }

    case 'POPULATE_PAGE_DATA': {
      return {
        ...state,
        ...action.data
      }
    }

    case 'CLEAR_FORM': {
      return {}
    }

    default: {
      return state;
    }
  }
};
