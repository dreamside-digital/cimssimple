import * as localForage from "localforage";
import firebase from '../../config/firebase';
import { updateSyncStatus, updateSaveStatus, saveError } from './user';
import { savePlanData } from './plans'

// Actions

function updatePlanningToolData (dataObj) {
  return {
    type: 'UPDATE_PLANNING_TOOL_DATA', dataObj
  };
}

function updatePageData (data) {
  return {
    type: 'POPULATE_PAGE_DATA', data
  }
}

export function clearPlanningTool() {
  return {
    type: 'CLEAR_PLANNING_TOOL'
  }
}

export function startEditingPlan() {
  return dispatch => {
    dispatch(updateSyncStatus(false))
    dispatch(updateSaveStatus(false))
  }
}


export function updatePlan (id, data, projectId) {
  return (dispatch, getState) => {

    const state = getState();
    const planningTool = {...state.planningTool, [id]: data};

    dispatch(updatePlanningToolData(planningTool));
    dispatch(savePlanData())
  };
}

export function getLocalPlanData (editingPlanId) {
  return (dispatch, getState) => {
    localForage.getItem('plans').then((data) => {
      dispatch(updatePageData(data[editingPlanId]));
    }).catch(err => {
      console.log('ERROR', err)
    })
  };
}

// Reducer

const initialState = {
  initialTableData: {
    indicators: [
      'HINT: How and when will the clinic gather community feedback on these initiatives?',
      'HINT: How will we measure the outcomes?',
    ],
    impacts: [''],
    outcomes: [''],
    childInitiatives: [''],
    parentInitiatives: [''],
    goalsAndObjectives: [
      'Promote access to justice in our community',
      'Confront legislative and policy decisions that regulate the lives of low-income people',
      'Nurture community empowerment',
    ],
  },
  projectTitle: 'Unnamed project',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLANNING_TOOL_DATA': {
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

    case 'CLEAR_PLANNING_TOOL': {
      return {}
    }

    default: {
      return state;
    }
  }
};
