import { createStore } from 'redux'

function user(state = { }, action) {
    switch (action.type) {
        case 'setUser':
            return action.filter;
        default:
            return state;
    }
}
export const store = createStore(user);
