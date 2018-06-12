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
        this.renderGift = this.renderGift.bind(this);
        this.chatArray = [];
        this.timer = null;
        this.giftItem = {};


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
        // console.log(badgeMap.badge)
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

        let giftMap = await http.getGift();
        giftMap.gift.d.forEach((item) => {
            this.giftItem[item.id] = {
                pic: config.imgUrl + item["gp"]
            }
        })
        // this.setState({
        //     gift: giftItem
        // })
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
        // console.log(data)
        if (data)
            switch (data['mid']) {
                case type.chat:
                    // console.log(data)
                    that.speaking(data)

                    break;
                case type.gift:
                    // console.log(data)
                    that.renderGift(data)
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
            msg: data.info,
        });
        //  console.log()
        if (this.chatArray.length > 50) {
            this.chatArray.splice(0, 1);
        }
        let chatList = this.chatArray.map((item, index) => {
            // if (item.gift) {
            //     console.log(item)
            // }
            let vls = item.msg ? item.msg.vl : item.gift.vl;

            let chatNameStyle = vls === 1 ? 'vipUser' : vls === 2 ? 'svipUser' : "";
            let badges = "";
            let vips = "";
            let fans = ""
            if (!item.gift) {
                vips = vls === 1 ? <img src={require("../assets/icon_vip.png")} /> : vls === 2 ? <img src={require("../assets/svipicon.png")} /> : "";
                fans = item.msg.fl >= 1 ? <span className="fans">{item.msg.fl}</span> : "";
                if (item.msg.bdg) {
                    badges = this.renderBadge(item.msg.bdg)
                }
            }
            return item.gift ? <div className="chatGift" key={index}>
                <img className="sendGiftImg" src={require("../assets/send_gift.png")} alt="" />
                <div className={["chatUserName", "user-send-gift", chatNameStyle].join(" ")}>{item.gift.nn}</div>
                <img src={this.giftItem[item.gift.gid].pic} alt="" />
                <div className="chat-gift-num">
                    <span>x</span>
                    <label>{item.gift.gnum}</label>
                </div>
            </div>
                : <div className="chat-items" key={index}>
                    <div className="chat-item">
                        <div className="user-chat">
                            <div className={["chatUserName", chatNameStyle].join(" ")} >{item.msg.nn || "xxx"}</div>
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
        });

    }
    renderGift(data) {
        let gitfMessage = data.info;
        // console.log(data)
        this.chatArray.push({
            gift: gitfMessage
        });

    }
    renderBadge(badge) {
        // console.log(badge)
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
        })

    }

    componentWillUnmount() {
        clearInterval(this.timer)
        //关闭socket
        Communicator.closeWebSocket();
        Communicator.closeHeartBeatiing();
    }
}

export default WebsocketCom;