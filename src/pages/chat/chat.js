import React, { Component } from "react";
import http from "../../api/api"
import { Link } from "react-router-dom"
import NavBar from "../../components/navbar"
import Headers from "../../components/headerComponent"
import Footers from "../../components/footerComponent"
import config from "../../api/config"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import "./chat.css"
class Chat extends Component {
    state = {
        chatList: ""
    }
    render() {
        return <div>
            <Headers />
            <div className="chatList container">
                <NavBar />
                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: 'example-enter',
                        leave: 'example-leave',
                        appear: 'example-appear',
                        enterActive: 'example-enter-active',
                        leaveActive: 'example-leave-active',
                        appearActive: 'example-appear-active'
                    }}
                    transitionName="carousel"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.state.chatList}
                </ReactCSSTransitionGroup>

            </div>
            <Footers />
        </div>
    }
    async initData() {
        const result = await http.getchatList();
        const listStr = result.map((item) => {
            let num = (Math.floor(Math.random() * (50 - 10)) + 10);
            if (num === 30) {
                num += 1
            }
            return <div className="chatItems" key={item.rid}>
                <Link to={"/chat/" + item.rid}>
                    <div className="chatListMain">
                        <div className="chatPoster"><img src={config.imgUrl + item.rpp} alt="7nujoom" /></div>
                        <div className="chatName">{item.rmn}</div>
                        <div className="chatnum">{item.ol || num}</div>
                    </div>
                </Link>
            </div>
        })
        this.setState(
            {
                chatList: listStr
            }
        )
        console.log(result)
    }
    componentDidMount() {
        this.initData();
    }

}

export default Chat;