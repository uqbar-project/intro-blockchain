export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const PUT = 'PUT'
export const WITHDRAW = 'WITHDRAW'

export const EMPTY_ACCOUNT = {
    address: '',
    username: '',
    password: '',
    balance: 0,
}

export function syncAccount(account) {
    return {
        type: LOGIN,
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
