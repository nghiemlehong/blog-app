const defaultState = {
    error: null,
    user: { name: 'Tài khoản', email: '', avatar: '' }
}

export const userReduser = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return {
                error: null,
                user: { name: 'Tài khoản', email: '', avatar: '' }
            }
        case 'FETCH_USER_SUCCESS':
            return {
                error: null,
                user: action.user
            }
        case 'FETCH_USER_FAILED':
            return {
                error: action.message,
                user: { name: 'Tài khoản', email: '', avatar: '' }
            }
        default:
            return state
    }
}