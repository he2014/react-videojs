import * as header from './action-type';

let defas = {
    headtypes: true
}
export const headersate = (state = defas, action = {}) => {
    switch (action.type) {
        case header.HEADERTYPE:
            return { ...state, ...action.value };
        default:
            return state;
    }
}