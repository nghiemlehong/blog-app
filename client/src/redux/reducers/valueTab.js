const defaultState = null

export const valueTab = (state = defaultState, action) => {
    switch (action.type) {
        case 'NO_TAB':
            return null
        case 'TAB_HOME':
            return 0
        case 'TAB_FAVORITES_LIST':
            return 1
        case 'TAB_YOUR_POSTS':
            return 2
        default:
            return state
    }
}