import { combineReducers } from 'redux';
import pageReducer from './pageReducer'
import selectionReducer from './selectionReducer'

export default combineReducers({
    page: pageReducer,
    selection: selectionReducer
})