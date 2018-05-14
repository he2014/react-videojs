import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import "./index.css"
import './App.css';
import asyncComponent from "./util/asyncComponent"
import home from "./pages/home/home"

import chat_room from "./pages/chat/chat"
import video_list from "./pages/video/video"

const live_detail = asyncComponent(() => import("./pages/live/liveDetail"));
class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter >
                    <Switch>
                        <Route path="/" exact component={home} {...this.props} />
                        <Route path="/live/:roomId" component={live_detail} {...this.props} />
                        <Route path="/video" component={video_list} />
                        <Route path="/chat" component={chat_room} />
                        <Redirect to="/" />
                    </Switch>
                </BrowserRouter >
            </div>

            // <div className="App">
            //     {/* 控制播放 */}
            //     <div className="button" style={this.state.buttonStyle}><img onClick={this.videoPlay.bind(this)} src="http://www.7nujoom.com/html5/resources/img/playBut.png" alt="" /></div>
            //     {/* 控制暂停 */}
            //     <div className="videoPop" onClick={this.videoPause.bind(this)}></div>
            //     {/* 注册videojs */}
            //     <video loop id="example_video_1" className="video-js vjs-default-skin vjs-big-play-centered"
            //         controls preload="auto" width="750" height={this.state.height}
            //         poster="http://www.7nujoom.com/resource/group1/M00/0B/02/CgAA91rYr5mABrzcAADcEghp5CU289.jpg"
            //         data-setup='{"example_option":true}'>
            //         <source src="http://www.7nujoom.com/resource/group1/M00/0B/06/CgAA91rY0t6AN6Z1ACyOcqbq8Wk269.mov" type='video/mp4' />
            //     </video>
            // </div>
        );
    }
    // videoPause() {

    //     video("example_video_1").pause();
    //     this.setState({
    //         buttonStyle: {
    //             display: "block"
    //         }
    //     })
    // }
    // videoPlay() {
    //     let that = this;
    //     video("example_video_1").ready(function () {
    //         let myPlayers = this;
    //         myPlayers.play();
    //         that.setState({
    //             buttonStyle: {
    //                 display: "none"
    //             }
    //         })
    //     });
    // }
    // componentDidMount() {
    //     alert(console)
    //     this.initData();
    //     //解决ios 同层播放
    //     if (util.browserRedirect()) {
    //         enableInlineVideo(document.querySelector('video'));
    //     }


    // }
}

export default App;
