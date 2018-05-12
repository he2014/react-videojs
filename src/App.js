import React, { Component } from 'react';
import video from 'video.js';
import enableInlineVideo from 'iphone-inline-video';
import "../node_modules/video.js/dist/video-js.min.css";
import './App.css';
import util from './util/util'
import asyncComponent from './util/asyncComponent'
import http from './api/api';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
            buttonStyle: {},

        }
        // this.initData = this.initData.bind(this);
    }
    async initData() {
        let data = await http.getHots();
        console.log(data)
    }
    render() {
        return (
            <div className="App">
                {/* 控制播放 */}
                <div className="button" style={this.state.buttonStyle}><img onClick={this.videoPlay.bind(this)} src="http://www.7nujoom.com/html5/resources/img/playBut.png" alt="" /></div>
                {/* 控制暂停 */}
                <div className="videoPop" onClick={this.videoPause.bind(this)}></div>
                {/* 注册videojs */}
                <video loop id="example_video_1" className="video-js vjs-default-skin vjs-big-play-centered"
                    controls preload="auto" width="750" height={this.state.height}
                    poster="http://www.7nujoom.com/resource/group1/M00/0B/02/CgAA91rYr5mABrzcAADcEghp5CU289.jpg"
                    data-setup='{"example_option":true}'>
                    <source src="http://www.7nujoom.com/resource/group1/M00/0B/06/CgAA91rY0t6AN6Z1ACyOcqbq8Wk269.mov" type='video/mp4' />
                </video>
            </div>
        );
    }
    videoPause() {

        video("example_video_1").pause();
        this.setState({
            buttonStyle: {
                display: "block"
            }
        })
    }
    videoPlay() {
        let that = this;
        video("example_video_1").ready(function () {
            let myPlayers = this;
            myPlayers.play();
            that.setState({
                buttonStyle: {
                    display: "none"
                }
            })
        });
    }
    componentDidMount() {
        alert(console)
        this.initData();
        //解决ios 同层播放
        if (util.browserRedirect()) {
            enableInlineVideo(document.querySelector('video'));
        }


    }
}

export default App;
