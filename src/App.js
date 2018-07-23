import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import "./index.css"
import './App.css';
import asyncComponent from "./util/asyncComponent"
import home from "./pages/home/home"
import chat_room from "./pages/chat/chat"
import video_list from "./pages/video/video"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { changeHeader } from "./store/header/action"
import IndexHeader from "./pages/header/indexHeader"
import Login from "./pages/login/login"
import AnimateRouter from "./pages/chat/animateRouter"
import chat_detail from "./pages/chat/chatDetail"
import live_detail from "./pages/live/liveDetail";
const video_detail = asyncComponent(() => import("./pages/video/videoDetail"));

class App extends Component {
    componentWillMount() {
        this.props.changeHeader();
    }
    render() {
        const supportsHistory = 'pushState' in window.history
        return (
            <div>
                <BrowserRouter forceRefresh={!supportsHistory}>
                    <div>
                        {this.props.headData.headtypes && <IndexHeader />}
                        <Route render={({ location }) => (
                            // <TransitionGroup >
                            //     <CSSTransition key={location.key} classNames="message" timeout={500}>
                            <div>
                                <Switch location={location}>
                                    <AnimateRouter exact path="/" component={home} {...this.props} />
                                    <AnimateRouter path="/live/:roomId" component={live_detail} {...this.props} />
                                    <AnimateRouter exact path="/video" component={video_list} />
                                    <AnimateRouter path="/video/:videoId" component={video_detail} />
                                    <AnimateRouter exact path="/chat" component={chat_room} />
                                    <AnimateRouter path="/chat/:roomId" component={chat_detail} {...this.props} />
                                    <AnimateRouter path="/login" component={Login} />


                                    {/* <Route exact path="/" component={home} {...this.props} />
                                            <Route path="/live/:roomId" component={live_detail} {...this.props} />
                                            <Route exact path="/video" component={video_list} />
                                            <Route path="/video/:videoId" component={video_detail} />
                                            <Route exact path="/chat" component={chat_room} />
                                            <Route path="/chat/:roomId" component={chat_detail} {...this.props} />
                                            <Route path="/login" component={Login} /> */}
                                </Switch>

                            </div>
                            //     </CSSTransition>
                            // </TransitionGroup>
                        )}

                        />
                    </div>
                </BrowserRouter >
            </div >
        );
    }
}

export default connect(state => ({
    headData: state.headersate


}), { changeHeader })(App);
