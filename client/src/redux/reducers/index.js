import { combineReducers } from 'redux'
import { postReducer } from './post'
import { loadingReducer } from './loading'
import { userReduser } from './user'
import { valueTab } from './valueTab'
export const rootReducer = combineReducers({
    posts: postReducer,
    loading: loadingReducer,
    user: userReduser,
    valueTab : valueTab,
})