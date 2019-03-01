import { createStore } from 'redux'
import { EMPTY_ACCOUNT } from './actions'

export const accountReducer = (state, { reducer = (state) => state }) => {
    return reducer(state)
}

const store = createStore(accountReducer, { account: EMPTY_ACCOUNT, errorMessage: '' })

export default store
