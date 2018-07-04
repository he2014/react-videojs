import * as chat from "./action-type"

let defaultstate = {
    rmn: '', //名字
    rds: '',// 描述
    rpp: '',//海报,
    iscreatechat: false,
    iseditchat: false,
    pathtype: false,
}

export const chatDate = (state = defaultstate, action = {}) => {
    switch (action.type) {
        case chat.CHATDETAIL:
            return { ...state, ...action.value };
        case chat.SAVEIMG:
            return Object.assign({}, state, { rpp: action.path, pathtype: action.istype });
        case chat.CREATESHOE:
            return { ...state, ...action.bool };
        case chat.EDITSHOW:
            return { ...state, ...action.bool };
        default:
            return state;

    }

}