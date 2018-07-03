import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import "./index.css"
import './App.css';
import asyncComponent from "./util/asyncComponent"
import home from "./pages/home/home"
import chat_room from "./pages/chat/chat"
import video_list from "./pages/video/video"
const live_detail = asyncComponent(() => import("./pages/live/liveDetail"));
const chat_detail = asyncComponent(() => import("./pages/chat/chatDetail"));
const video_detail = asyncComponent(() => import("./pages/video/videoDetail"));

class App extends Component {

    render() {
        const supportsHistory = 'pushState' in window.history

        return (
            <div >
                <BrowserRouter forceRefresh={!supportsHistory}>
                    <Switch>
                        <Route path="/" exact component={home} {...this.props} />
                        <Route path="/live/:roomId" component={live_detail} {...this.props} />
                        <Route exact path="/video" component={video_list} />
                        <Route exact path="/video/:videoId" component={video_detail} />
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
