import * as localForage from "localforage";
import uuidv4 from 'uuid/v4';

const emptyProject = {
  initiativeName: 'Unnamed project'
}

// Actions

export function createProject (newProject) {
  const projectId = uuidv4()
  return {
    type: 'CREATE_PROJECT', newProject
  };
}

export function populateProjectData(projectData) {
  return {
    type: 'POPULATE_PROJECT_DATA', projectData
  }
}

export function deleteProject(id) {
  return {
    type: 'DELETE_PROJECT', id
  }
}

export function createLocalProject () {
  return (dispatch, getState) => {
    const projectState = getState().projects;
    const projectId = uuidv4();
    const newProject = {
      [projectId]: emptyProject
    }
    const projects = {...projectState, ...newProject};

    localForage.setItem('projects', projects).then((val) => {
      dispatch(createProject(val));
      dispatch(editProject(projectId));
    }).catch(err => {
      console.log('ERROR', err)
    })
  };
}

export function getProjectData () {
  return (dispatch) => {
    localForage.getItem('projects').then((data) => {
      dispatch(populateProjectData(data));
    }).catch(err => {
      console.log('ERROR', err)
    })
  };
}

export function deleteLocalProject (id) {
  return (dispatch, getState) => {
    const projectState = getState().projects;
    let updatedProjects = {
      ...projectState
    }
    delete updatedProjects[id]

    localForage.setItem('projects', updatedProjects).then((projects) => {
      dispatch(populateProjectData(projects));
    }).catch(err => {
      console.log('ERROR', err)
    })
  };
}
// Reducer

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT': {
      return {
        ...state,
        ...action.newProject
      };
    }

    case 'DELETE_PROJECT': {
      return {
        ...state,
        [action.id]: null
      };
    }

    case 'POPULATE_PROJECT_DATA': {
      return {
        ...action.projectData
      };
    }

    default: {
      return state;
    }
  }
};
