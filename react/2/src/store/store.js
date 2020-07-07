import { createStore } from 'redux'

function user(state = { }, action) {
    switch (action.type) {
        case 'setUser':
            return action.filter;
            break;
        default:
            return state;
            break;
    }
}
export const store = createStore(user);
