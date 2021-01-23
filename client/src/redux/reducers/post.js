const defaultState = []
export const postReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_ALL': {
            let newState = action.posts
            return newState
        }
        case 'ADD_POST' : {
            let newState = [...state, action.post]
            return newState
        }
        default:
            return state
    }
};

