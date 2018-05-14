import Server from "./server"

class API extends Server {
    async getHots() {//直播列表
        try {
            let result = await this.axiosGet("get", "service/room/v3", { prv: "" });
            if (result && result instanceof Object && result.code === 0) return result.dataInfo;
            else this.resultCode(result.code);
        } catch (error) {
            throw error;
        }
    }
    async getLiveVideo(roomid) {// 主播信息
        try {
            let result = await this.axiosGet("get", "service/room/v3/info/h5/" + roomid);
            if (result && result instanceof Object && result.code === 0) return result.dataInfo;
            else this.resultCode(result.code);
        } catch (error) {
            throw error;
        }
    }
    async getFace() {// 表情
        try {
            let result = await this.axiosGet("get", "data/static/v4/?face");
            if (result && result instanceof Object && result.code === 0) return result.dataInfo;
            else this.resultCode(result.code);
        } catch (error) {
            throw error;
        }
    }
    async getGift() {//礼物
        try {
            let result = await this.axiosGet("get", "data/mobile/v3/?gift&requestType=1");
            if (result && result instanceof Object && result.code === 0) return result.dataInfo;
            else this.resultCode(result.code);
        } catch (error) {
            throw error;
        }
    }
    async getBadge() {// 徽章
        try {
            let result = await this.axiosGet("get", "data/static/v4/?badge");
            if (result && result instanceof Object && result.code === 0) return result.dataInfo;
            else this.resultCode(result.code);
        } catch (error) {
            throw error;
        }
    }

    resultCode(code) {
        console.log(code);
    }
}


export default new API();