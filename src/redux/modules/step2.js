import * as localForage from "localforage";

// Actions

function updateFormData (id, data) {
  return {
    type: 'UPDATE_FORM_DATA', id, data
  };
}

function updatePageData (data) {
  return {
    type: 'UPDATE_PAGE_DATA', data
  }
}

export function saveLocalFormData (id, data) {
  return (dispatch, getState) => {
    const step2State = getState().step2;
    const step2 = {...step2State, [id]: data};

    localForage.setItem('step2', step2).then((val) => {
      dispatch(updateFormData(id, data));
    }).catch(err => {
      console.log('ERROR', err)
    })
  };
}

export function getLocalFormData () {
  return (dispatch) => {
    localForage.getItem('step2').then((data) => {
      dispatch(updatePageData(data));
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
        [action.id]: action.data
      };
    }

    case 'UPDATE_PAGE_DATA': {
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
