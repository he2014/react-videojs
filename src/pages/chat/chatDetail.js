import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom"
import PropTypes from 'prop-types'
import { saveChat, createshow } from "../../store/chartDetail/action"
import { changeHeader } from "../../store/header/action"
import http from "../../api/api";
import config from "../../api/config"
import { CSSTransition } from "react-transition-group"
import ReactDOM from "react-dom"
import Details from "./details"
import InterseptRoter from "./interseptRoter"

import './chatDetail.css';
import CreateChat_com from "./createChat";
class ChatDetail extends Component {
    static propTypes = {
        chatData: PropTypes.object.isRequired,
        saveChat: PropTypes.func.isRequired,

    }
    state = {
        blcoking: false
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
            <CSSTransition
                in={this.props.chatData.iscreatechat}
                timeout={300}
                classNames="nav"
                appear={true}
                unmountOnExit
                onEnter={() => {
                    this.CreateChatDom = ReactDOM.findDOMNode(this.refs.CreateChatDom);
                    console.log(this.CreateChatDom)
                }}
            >
                <CreateChat_com ref="CreateChatDom" />
            </CSSTransition>}
                    <div style={{ height: "100px" }} >
                <Link to={`/chat/${this.props.match.params.roomId}/detail`} style={{ padding: "30px", color: "#fff", background: "red" }}>查看详情</Link>


            </div>
            <div>
                {/* 定义路由拦截 */}
                <InterseptRoter blcoking={this.state.blcoking} exact path={`/chat/${this.props.match.params.roomId}/detail`} component={Details} />

            </div>
        </main>
    }
    async componentWillMount() {
        this.props.changeHeader({ headtypes: false })
        let data = await http.getChatItem(this.props.match.params.roomId);
        this.props.saveChat(data);
    }

    createChatcallback() {
        if (!this.props.chatData.iseditchat) {
            this.props.createshow({ iscreatechat: true })
        }

    }
};
export default connect(state => ({
    chatData: state.chatDate
}), {
        createshow,
        saveChat,
        changeHeader
    })(ChatDetail)

    ;