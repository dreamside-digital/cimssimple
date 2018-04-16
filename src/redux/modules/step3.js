// Actions

function saveProjectTitle (value) {
  return {
    type: 'PROJECT_TITLE', value,
  };
}


// Reducer

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'PROJECT_TITLE': {
      return {
        ...state,
        projectTitle: action.value
      };
    }

    default: {
      return state;
    }
  }
};
