import {combineReducers} from 'redux'
import {postReducer} from './post'
import {loadingReducer} from './loading'
export const rootReducer = combineReducers({
    posts :  postReducer,
    loading : loadingReducer,
})