import * as chat from "./action-type"

//
export const saveChat = (value) => {
    return {
        type: chat.CHATDETAIL,
        value
    }
}

export const saveImg = (path, istype) => {
    return {
        type: chat.SAVEIMG,
        path,
        istype
    }
}

export const createshow = (bool) => {
    return {
        type: chat.CREATESHOE,
        bool
    }
}
export const editshow = (bool) => {
    return {
        type: chat.EDITSHOW,
        bool
    }
}