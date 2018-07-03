import React, { Component } from "react";
import http from "../../api/api";
import config from "../../api/config"
import './chatDetail.css';

class ChatDetail extends Component {
    state = {
        chat: {
            rmn: '',
            rds: '',
            rpp: ''
        }
    }
    render() {
        console.log(this.state)
        return <main className="chatdetail-container">
            <div className="detail-title">聊天室信息</div>
            <div className="chat-detailName">聊天室名字：{this.state.chat.rmn}</div>
            <div className="chat-detaiDsc">聊天室描述：{this.state.chat.rds}</div>
            <div className="chat-detailPic"><img src={config.imgUrl + this.state.chat.rpp} alt="" /></div>
            <div className="chat-detailBtn">
                <div className="createChat">创建聊天室</div>
                <div className="editChat">编辑聊天室 </div>
            </div>
            {/* <form className="chat-from" name="dfeoifewkjoi">
                <div className="chat-from-item">
                    <span>聊天室名字：</span>
                    <input type="text" placeholder="请输入聊天室名字" value="" />
                </div>
                <div className="chat-from-item">
                    <span>聊天室描述：</span>
                    <input type="text" placeholder="请输入聊天室名字" />
                </div>
            </form> */}

        </main>
    }
    async componentWillMount() {
        let data = await http.getChatItem(this.props.match.params.roomId)
        this.setState({
            chat: Object.assign({}, data)
        })
        console.log(this.state)
    }
};
export default ChatDetail;