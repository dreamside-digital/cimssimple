import * as localForage from "localforage";

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

export function saveLocalFormData (id, data, projectId) {
  return (dispatch, getState) => {
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
        ...action.dataObj
      };
    }

    case 'POPULATE_PAGE_DATA': {
      return {
        ...state,
        ...action.data
      }
    }

    default: {
      return state;
    }
  }
};
