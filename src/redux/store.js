import { createStore as reduxCreateStore } from "redux"
import { applyMiddleware } from "redux"
import appReducers  from '../redux/reducers';
import thunk from 'redux-thunk';

const initialState = {}

const createStore = () => reduxCreateStore(appReducers, initialState, applyMiddleware(thunk))

export default createStore;