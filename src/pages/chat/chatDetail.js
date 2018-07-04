import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { saveChat, createshow } from "../../store/chartDetail/action"
import http from "../../api/api";
import config from "../../api/config"
import asyncComponent from "../../util/asyncComponent"
import './chatDetail.css';
const CreateChat_com = asyncComponent(() => import("./createChat"));
class ChatDetail extends Component {
    state = {

    }
    static propTypes = {
        chatData: PropTypes.object.isRequired,
        saveChat: PropTypes.func.isRequired,

    }
    render() {
        return <main className="chatdetail-container">
            <div className="detail-title">聊天室信息</div>
            <div className="chat-detailName">聊天室名字：{this.props.chatData.rmn}</div>
            <div className="chat-detaiDsc">聊天室描述：{this.props.chatData.rds}</div>
            <div className="chat-detailPic"><img src={this.props.chatData.pathtype ? this.props.chatData.rpp : config.imgUrl + this.props.chatData.rpp} alt="" /></div>
            <div className="chat-detailBtn">
                <div className="createChat" onClick={this.createChatcallback.bind(this)}>编辑聊天室</div>
            </div>
            {this.props.chatData.iscreatechat && <CreateChat_com />}

        </main>
    }
    async componentWillMount() {
        let data = await http.getChatItem(this.props.match.params.roomId);
        this.props.saveChat(data);
    }
    createChatcallback() {
        if (!this.props.chatData.iseditchat)
            this.props.createshow({ iscreatechat: true })
    }

};
export default connect(state => ({
    chatData: state.chatDate
}), {
        createshow,
        saveChat,
    })(ChatDetail)

    ;