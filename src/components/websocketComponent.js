import React, { Component } from "react"
import Communicator from "./websocket"
import http from "../api/api"
import "./socketCom.css"
import config from "../api/config"
import util from "../util/util"

const socket_messge_type = {
    chat: 300006,
    gift: 300008,
    unLive: 300004,
    breakLive: 300005,
    goingroom: 3000001,
    liveroom: 3000002,
    microsOn: 710005,
    microsOff: 710006,
    //onlygift:300057
    redPacket: 710001
}
class WebsocketCom extends Component {
    constructor(props) {
        super(props);
        this.socketMessage = this.socketMessage.bind(this);
        this.initSocket = this.initSocket.bind(this);
        this.renderBadge = this.renderBadge.bind(this);
        this.chatArray = [];
        this.timer = null;
    }
    state = {
        chatKey: 1,
        chatHtml: [],
        giftHtml: "",
        badge: [],
        gift: "",
        face: []

    }
    async initBadge() {//初始化徽章
        let badgeMap = await http.getBadge();
        console.log(badgeMap.badge)
        this.setState({
            badge: badgeMap.badge.d
        })

    }

    async initFace() {//初始化表情
        let faceItem = {};
        let faceMap = await http.getFace();
        faceMap.face.d.forEach((item, key) => {
            item['fs'].forEach((obj, index) => {
                faceItem[obj["c"]] = { pic: config.imgUrl + obj["p"] }
            })
        });
        this.setState({
            face: faceItem
        })


    }
    async initGift() { //初始化礼物
        let giftItem = {};
        let giftMap = await http.getGift();
        giftMap.gift.d.forEach((item) => {
            giftItem[item.id] = {
                pic: config.imgUrl + item["gp"]
            }
        })
        this.setState({
            gift: giftItem
        })
    }

    initSocket() {//初始化socket
        let timer = null;
        timer = setTimeout(() => {
            Communicator.init(this.props.ids, this.socketMessage, this.props.socketType); //1直播 2chat
        }, 10);

    }

    socketMessage(data) {//socket 回掉
        let that = this;
        let type = socket_messge_type;
        console.log(data)
        if (data)
            switch (data['mid']) {
                case type.chat:
                    that.speaking(data)
                    break;
                case type.gift:
                    //console.log(data)
                    break;
                case type.goingroom:
                    break;
                case type.liveroom:
                    break;
                case type.microsOn:
                    break;
                case type.microsOff:
                    break;
                case type.breakLive:
                case type.unLive:
                    break;
                case type.redPacket://红包
                    break;

            }

    }

    componentWillMount() {
        this.initBadge();
        this.initFace();
        this.initGift();
    }

    speaking(data) {
        let chatStr = util.replaceFace(this.state.face, data);
        this.chatArray.push({
            chat: chatStr,
            msg: data.info
        });
        if (this.chatArray.length > 50) {
            this.chatArray.splice(0, 1);
        }
        let chatList = this.chatArray.map((item, index) => {
            let badges = "";
            let vls = item.msg.vl;
            let vips = vls === 1 ? <img src={require("../assets/icon_vip.png")} /> : vls === 2 ? <img src={require("../assets/svipicon.png")} /> : "";
            let fans = item.msg.fl >= 1 ? <span className="fans">{item.msg.fl}</span> : "";
            let chatNameStyle = vls === 1 ? 'chatUserName vipUser' : vls === 2 ? 'chatUserName svipUser' : "chatUserName";
            if (item.msg.bdg) {
                badges = this.renderBadge(item.msg.bdg)
            }
            return <div className="chat-items" key={index}>
                <div className="chat-item">
                    <div className="user-chat">
                        <div className={chatNameStyle}>{item.msg.nn || "***"}</div>
                        <div className="chat-imgs">
                            {badges}
                            {fans}
                            {vips}
                        </div>
                    </div>
                    <div className="chat-speak" dangerouslySetInnerHTML={{ __html: item.chat }}></div>
                </div>
                <div className="chat-kong"></div>
            </div>
        })

        this.setState({
            chatHtml: chatList
        })

    }
    renderBadge(badge) {
        console.log(badge)
        // console.log(this.badge)
        return badge.map((item) => {
            if (this.state.badge[item]) {
                return <img className="badgeImg" src={config.imgUrl + this.state.badge[item].p} key={item} alt="" />
            }

        })

    }

    render() {
        return <div className="socketMain">
            <div className="socketGift">{this.state.giftHtml}</div>
            <div className="socketChat"><div id="socketChatScroll"> {this.state.chatHtml}</div></div>
        </div>
    }

    componentDidMount() {
        this.initSocket();
        this.timer = setInterval(() => {
            document.querySelector("#socketChatScroll").scrollIntoView(false)
        }, 2000)

    }

    componentWillUnmount() {
        clearInterval(this.timer)
        //关闭socket
        Communicator.closeWebSocket();
        Communicator.closeHeartBeatiing();
    }
}

export default WebsocketCom;