import Server from "./server"

class API extends Server {
    async getHots() {
        try {
            let result = await this.axiosGet("get", "service/room/v3", { prv: "" });
            if (result && result instanceof Object && result.code == 0) return result.dataInfo;
            else this.resultCode(result.code);
        } catch (error) {
            throw error;
        }
    }
    resultCode(cdoe) {
        console.log(code);
    }
}


export default new API;