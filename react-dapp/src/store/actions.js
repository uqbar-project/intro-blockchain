export const SYNC_ACCOUNT = 'SYNC_ACCOUNT'
export const LOGOUT = 'LOGOUT'

export const EMPTY_ACCOUNT = {
    address: '',
    username: '',
    password: '',
    balance: 0,
}

export function syncAccount(account) {
    return {
        type: SYNC_ACCOUNT,
        reducer: (state) => {
            return {
                ...state,
                account
            }
        }
    }
}

export function logout() {
    return {
        type: LOGOUT,
        reducer: (state) => {
            state.account = EMPTY_ACCOUNT
            state.errorMessage = ''
            return state
        }
    }
}
