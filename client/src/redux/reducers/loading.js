const defaultState = false

export const loadingReducer = (state = defaultState, action)=>{
    switch (action.type) {
        case 'HANDLE':{
            return !state
        }
    
        default:
        return state
    }
}