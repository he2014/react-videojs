import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import "./index.css"
import './App.css';
import asyncComponent from "./util/asyncComponent"
import home from "./pages/home/home"

import chat_room from "./pages/chat/chat"
import video_list from "./pages/video/video"

const live_detail = asyncComponent(() => import("./pages/live/liveDetail"));
const chat_detail = asyncComponent(() => import("./pages/chat/chatDetail"))
console.log(chat_detail)
class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter >
                    <Switch>
                        <Route path="/" exact component={home} {...this.props} />
                        <Route path="/live/:roomId" component={live_detail} {...this.props} />
                        <Route exact path="/video" component={video_list} />
                        <Route exact path="/chat" component={chat_room} />
                        <Route path="/chat/:roomId" component={chat_detail} {...this.props} />
                        <Redirect to="/" />
                    </Switch>
                </BrowserRouter >
            </div>
        );
    }
}

export default App;
