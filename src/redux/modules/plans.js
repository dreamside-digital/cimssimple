import * as localForage from 'localforage'
import uuidv4 from 'uuid/v4'
import firebase from '../../config/firebase'
import { map } from 'lodash'
import { syncStatus } from './user';

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
    dispatch(syncStatus(false));
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
      })
      .catch(err => {
        console.log('ERROR', err)
      })

    if (isLoggedIn) {
      const db = firebase.database();
      const ref = db.ref(`users/${user.uid}/plans`);
      ref.update(plans).then(() => {
        dispatch(syncStatus(true));
      }).catch(err => {
        dispatch(syncStatus(false));
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
      dispatch(syncStatus(true))
    } else {
      localForage
        .getItem('plans')
        .then(data => {
          dispatch(populatePlanData(data))
        })
        .catch(err => {
          console.log('ERROR', err)
        })
    }
  }
}

export function syncPlanData() {
  return (dispatch, getState) => {
    const state = getState()
    const user = state.user.user

    if (!state.user.isLoggedIn) {
      dispatch(syncStatus(false));
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
              dispatch(syncStatus(true))
            }).catch(err => {
              console.log('FIREBASE ERROR', err)
              dispatch(syncStatus(false))
            })

            localForage
              .setItem('plans', syncedPlans)
              .then(data => {
                dispatch(populatePlanData(data))
              })
              .catch(err => {
                console.log('LOCALFORAGE ERROR', err)
              })
          })
          .catch(err => {
            console.log('LOCALFORAGE ERROR', err)
          })
      })
      .catch(err => {
        console.log('FIREBASE ERROR', err)
        dispatch(syncStatus(false))
      })
  }
}

export function deleteLocalPlan(id) {
  return (dispatch, getState) => {
    dispatch(syncStatus(false));
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
      })
      .catch(err => {
        console.log('ERROR', err)
      })

    if (isLoggedIn) {
      const db = firebase.database()
      const ref = db.ref(`users/${user.uid}/plans/${id}`)

      ref.remove().then(() => {
        dispatch(syncStatus(true));
      }).catch(err => {
        console.log('firebase error', err)
        dispatch(syncStatus(false));
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
