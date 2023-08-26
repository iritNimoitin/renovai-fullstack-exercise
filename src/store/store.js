
import selectionReducer from './reducers/selectionReducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    selection: selectionReducer
  })
const store = configureStore({reducer});

export default store;