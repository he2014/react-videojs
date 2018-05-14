/**
 *  全局配置
 */
let baseUrl;
const websocketConfig = {
    socketUrl: 'ws://TRANS-176352860.eu-central-1.elb.amazonaws.com:8004',
    LIVETYPE: 1, //1 LIve  2 caht
    CHATTYPE: 2
}

const imgUrl = "//www.7nujoom.com/resource/";
if (process.env.NODE_EVN === "development") {
    baseUrl = "http://www.7nujoom.com/";
} else {
    baseUrl = "http://www.7nujoom.com/";
}
export default { imgUrl, baseUrl, websocketConfig }