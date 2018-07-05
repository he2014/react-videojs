
import * as header from './action-type'

export const changeHeader = (value) => {
    return {
        type: header.HEADERTYPE,
        value
    }
}