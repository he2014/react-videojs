import React, { Component } from "react";
import { connect } from 'react-redux';
//import http from "../../api/api";
import { saveChat, saveImg, createshow } from "../../store/chartDetail/action";
import config from "../../api/config"
import PropType from 'prop-types'
import "./createChat.css"
class CreateChat extends Component {
    static poropTypes = {
        saveChat: PropType.func.isRequired,
        saveImg: PropType.func.isRequired,
        createshow: PropType.func.isRequired,
        chatDate: PropType.object.isRequired
    }
    render() {
        console.log(this.props)
        return <main className="createChat-container">
            <div className="createchat-main">
                <div className="createChat-cancle" onClick={this.closeCreate.bind(this)}>关闭</div>
                <form className="createchat-form">
                    <div className="createchat-form-item">
                        <span>聊天室名字：</span>
                        <input type="text" placeholder="请输入聊天室名字" onChange={this.handlerInput.bind(this, "name")} defaultValue={this.props.chatDate.rmn} />
                    </div>
                    <div className="createchat-form-item">
                        <span>聊天室描述</span>
                        <input type="text" placeholder="请输入聊天室描述" onChange={this.handlerInput.bind(this, "ooo")} defaultValue={this.props.chatDate.rds} />
                    </div>
                    <div className="createchat-form-item" style={{ height: "220px" }}>
                        <span></span>
                        <img onClick={this.uploadImgBefore.bind(this)} src={this.props.chatDate.pathtype ? this.props.chatDate.rpp : config.imgUrl + this.props.chatDate.rpp} alt="ll" />
                        <input style={{ display: "none" }} type="file" ref="uploadImg" onChange={this.uploadImg} />
                    </div>
                    <div className="createchat-form-item">
                        <span></span>
                        <input type="button" value="提交" onClick={this.closeCreate.bind(this)} />
                    </div>
                </form>
            </div>
        </main>
    }
    handlerInput(type, event) {
        let value = event.target.value;
        // console.log(event.target.value);
        switch (type) {
            case "name":
                value = { rmn: event.target.value };
                break;
            default:
                value = { rds: event.target.value };
        }
        this.props.saveChat(value);
    }
    closeCreate() {
        this.props.createshow({ iscreatechat: false })
    }
    uploadImgBefore() {
        this.refs.uploadImg.click();
    }
    uploadImg = async event => {
        try {
            // let formdata = new FormData();
            //formdata.append('file', event.target.files[0]);

            // let result = await http.uploadImg({ data: formdata });f
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.props.saveImg(reader.result, true);
            }

            console.log();
        } catch (err) {
            console.error(err);
        }
    }
}

export default connect(state => ({
    chatDate: state.chatDate
}), {
        saveChat,
        saveImg,
        createshow
    })(CreateChat) 