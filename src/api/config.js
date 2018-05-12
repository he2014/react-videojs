/**
 *  全局配置
 */
let baseUrl;
let imgUrl = "//www.haahi.com/resource/";
if (process.env.NODE_EVN === "development") {
    baseUrl = "http://www.7nujoom.com/";
} else {
    baseUrl = "http://www.7nujoom.com/";
}
export default { imgUrl, baseUrl }