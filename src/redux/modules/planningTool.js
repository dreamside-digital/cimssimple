import * as localForage from "localforage";
import firebase from '../../config/firebase';
import { syncStatus } from './user';

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

export function startEditingPlan() {
  return dispatch => {
    dispatch(syncStatus(false))
    dispatch(updateSaveStatus(false))
  }
}

export function saveLocalPlanData (id, data, planId) {
  return (dispatch, getState) => {
    dispatch(updateSaveStatus(false))

    const state = getState();
    const planningTool = {...state.planningTool, [id]: data};
    const updatedPlans = {
      ...state.plans,
      [planId]: planningTool
    }

    localForage.setItem('plans', updatedPlans).then((dataObj) => {
      dispatch(updatePlanningToolData(planningTool));
    }).catch(err => {
      console.log('ERROR', err)
      dispatch(saveError(err))
    })
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
  projectTitle: 'Unnamed project'
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLANNING_TOOL_DATA': {
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
