const defaultState = {
    list: [],
    loading : null,
    error : null,
}
export const postReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_POSTS': {
            return {
                list : [],
                loading : true,
                error : null,
            }
        }
        case 'FETCH_POSTS_SUCCESS': {
            return {
                list : action.posts,
                loading : false,
                error : null,
            }
        }
        case 'FETCH_POSTS_FAILED' : {
            return {
                list : [],
                loading : false,
                erorr : action.message
            }
        }
        default:
            return state
    }
};

