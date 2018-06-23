import * as localForage from 'localforage'
import uuidv4 from 'uuid/v4'
import firebase from '../../config/firebase'
import { map } from 'lodash'
import { updateSyncStatus, updateSaveStatus, saveError, syncError } from './user';

const emptyPlan = {
  projectTitle: 'Unnamed project',
}

// Actions

export function createPlan(newPlan) {
  const planId = uuidv4()
  return {
    type: 'CREATE_PLAN',
    newPlan,
  }
}

export function updatePlanData(planData) {
  return {
    type: 'UPDATE_PLAN_DATA',
    planData,
  }
}

export function populatePlanData(planData) {
  return {
    type: 'POPULATE_PLAN_DATA',
    planData,
  }
}

export function deletePlan(id) {
  return {
    type: 'DELETE_PLAN',
    id,
  }
}

export function createLocalPlan() {
  return (dispatch, getState) => {
    dispatch(updateSyncStatus(false));
    dispatch(updateSaveStatus(false))
    const state = getState()
    const planState = state.plans
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const planId = uuidv4()
    const newPlan = {
      [planId]: emptyPlan,
    }
    const plans = { ...planState, ...newPlan }

    localForage
      .setItem('plans', plans)
      .then(val => {
        dispatch(createPlan(val))
        dispatch(updateSaveStatus(true))
      })
      .catch(err => {
        console.log('ERROR', err)
        dispatch(updateSaveStatus(false))
        dispatch(saveError(err))
      })

    if (isLoggedIn) {
      const db = firebase.database();
      const ref = db.ref(`users/${user.uid}/plans`);
      ref.update(plans).then(() => {
        dispatch(updateSyncStatus(true));
      }).catch(err => {
        dispatch(updateSyncStatus(false));
        dispatch(syncError(err))
      })
    }
  }
}

export function getPlanData() {
  return (dispatch, getState) => {
    const state = getState()
    const isLoggedIn = state.user.isLoggedIn
    const user = state.user.user

    if (isLoggedIn && !!user.plans) {
      dispatch(populatePlanData(user.plans))
      dispatch(updateSyncStatus(true))
    } else {
      localForage
        .getItem('plans')
        .then(data => {
          console.log('data', data)
          dispatch(populatePlanData(data))
        })
        .catch(err => {
          console.log('ERROR', err)
        })
    }
  }
}

export function savePlanData () {
  return (dispatch, getState) => {
    dispatch(updateSaveStatus(false))
    dispatch(updateSyncStatus(false))

    const state = getState();
    const planningTool = state.planningTool;
    const planId = state.user.editingPlan;
    const updatedPlans = {
      ...state.plans,
      [planId]: planningTool
    }

    localForage.setItem('plans', updatedPlans).then((dataObj) => {
      dispatch(updatePlanData(updatedPlans))
      dispatch(updateSaveStatus(true))
    }).catch(err => {
      console.log('ERROR', err)
      dispatch(saveError(err))
    })
  };
}

export function syncPlanData() {
  return (dispatch, getState) => {
    const state = getState()
    const user = state.user.user

    if (!state.user.isLoggedIn) {
      dispatch(updateSyncStatus(false));
      return null;
    }

    const db = firebase.database()
    const ref = db.ref(`users/${user.uid}/plans`)

    ref
      .once('value')
      .then(snapshot => {
        const onlinePlans = snapshot.val()
        localForage
          .getItem('plans')
          .then(localPlans => {
            const syncedPlans = { ...onlinePlans, ...localPlans }

            ref.update(syncedPlans).then(val => {
              console.log('SYNCED PLANS WITH FIREBASE!!')
              dispatch(updateSyncStatus(true))
            }).catch(err => {
              console.log('FIREBASE ERROR', err)
              dispatch(updateSyncStatus(false))
              dispatch(syncError(err))
            })

            localForage
              .setItem('plans', syncedPlans)
              .then(data => {
                dispatch(populatePlanData(data))
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

export function deleteLocalPlan(id) {
  return (dispatch, getState) => {
    dispatch(updateSyncStatus(false));
    dispatch(updateSaveStatus(false));
    const state = getState()
    const user = state.user.user
    const isLoggedIn = state.user.isLoggedIn
    const planState = state.plans


    let updatedPlans = {
      ...planState,
    }
    delete updatedPlans[id]

    localForage
      .setItem('plans', updatedPlans)
      .then(plans => {
        dispatch(populatePlanData(plans))
        dispatch(updateSaveStatus(true))
      })
      .catch(err => {
        console.log('ERROR', err)
        dispatch(updateSaveStatus(false))
        dispatch(saveError(err))
      })

    if (isLoggedIn) {
      const db = firebase.database()
      const ref = db.ref(`users/${user.uid}/plans/${id}`)

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
    case 'CREATE_PLAN': {
      return {
        ...state,
        ...action.newPlan,
      }
    }

    case 'DELETE_PLAN': {
      return {
        ...state,
        [action.id]: null,
      }
    }

    case 'UPDATE_PLAN_DATA': {
      return {
        ...state,
        ...action.planData,
      }
    }

    case 'POPULATE_PLAN_DATA': {
      return {
        ...action.planData,
      }
    }

    default: {
      return state
    }
  }
}
