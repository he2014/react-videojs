
const util = {
    browserRedirect() {
        let sUserAgent = navigator.userAgent.toLowerCase();
        let bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
        let bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os";
        let bIsMidp = sUserAgent.match(/midp/i) === "midp";
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === "rv:1.2.3.4";
        let bIsUc = sUserAgent.match(/ucweb/i) === "ucweb";
        let bIsAndroid = sUserAgent.match(/android/i) === "android";
        let bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
        let bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return true;
        } else {
            return false;
        }
    },
    format() {
        if (arguments.length == 0) {
            return "";
        }
        let str = arguments[0];
        for (let i = 1, len = arguments.length; i < len; i++) {
            let re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    },
    trim(str) { //
        //  String.prototype.trim
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    replaceHtml(str) {//去特殊字符
        if (!str) {
            return null;
        }
        return this.trim(str).replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g"), "&gt;");
    },
    replaceFace(faceMap, message) {
        let chatface_str = "<img src={0} alt />";
        let str = this.replaceHtml(message.info.ms);
        for (let key in faceMap) {
            // //匹配表情
            if (key && faceMap[key]) {
                let reg = key.replace("[", "\\[").replace("]", "\\]");
                str = str.replace(new RegExp(reg, "g"), this.format(chatface_str, faceMap[key].pic));
            }
        }
        return str;
    }

}

export default util;