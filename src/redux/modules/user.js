import * as localForage from "localforage";

// Actions

export function editProject (id) {
  console.log(id)
  return {
    type: 'EDIT_PROJECT', id
  };
}


// Reducer

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_PROJECT': {
      return {
        ...state,
        editing: action.id
      };
    }

    default: {
      return state;
    }
  }
};
