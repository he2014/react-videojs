import React, { Component } from "react";
import video from 'video';
// import "videojs-flash"
import enableInlineVideo from 'iphone-inline-video';
import "videojs-contrib-hls";
import "../../node_modules/video.js/dist/video-js.min.css";
import util from "../util/util";
import "./VideoStle.css"
import http from "../api/api"
import config from "../api/config"
import Websockets from "./websocketComponent"
// import Communicator from "./websocket"

class VideoCom extends Component {
    constructor(props) {
        super(props);
        this.palyer = "";

        this.state = {
            isRenderSocet: false,
            VideoStle: {
                height: "920px",
                width: "100%"
            },
            buttonStyle: {

            },
            palayStyle: {
                height: "100%",
                width: "100%"
            },
            videoHtml: "",//video 实例视图
            vaideoPay: "",// player实例 绑定state 全局调用
            hot_message: ""//主播信息

        }
    }
    async initData() {//config.imgUrl + liveData.rpp
        if (this.props.playType === "live") {

            let liveData = await http.getLiveVideo(this.props.ids);
            let uri = "http://streamerhls.7nujoom.com/live/" + liveData.prefixion.split(".")[0] + ".m3u8"
            // console.log(uri)
            let htmls_video = <div className="live_videos"  >
                {/* <img style={this.state.posterStyle} className="posterImg" src={config.imgUrl + liveData.rpp} alt="" /> */}
                <video loop id="example_video_1" className="video-js vjs-default-skin vjs-big-play-centered vjs-tech"
                    controls={false} preload="auto" style={this.state.palayStyle}
                    x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" airplay="airplay"
                    data-setup='{"example_option":true}'
                    poster={config.imgUrl + liveData.rpp}>

                    {/* <source src={uri} type='application/x-mpegURL' /> */}
                    <source src="http://www.7nujoom.com/resource/group1/M00/0C/8D/CgAA91r3FjmAMKFTADpUlpY98fI924.mov" type='video/mp4' />
                </video>
            </div>
            let htmls_hotmsg = <div className="hotmsg_out">
                <div className="hotDetailMsg">
                    <div className="hot_name">{liveData.nk}</div>
                    <div className="hot_online"><div className="_hot_online"></div><div className="hot_name_inner">{liveData.ol}</div></div>
                </div>
                <div className="hot_head">
                    <img src={liveData.headPic ? config.imgUrl + liveData.headPic : require("../assets/recommend/head.png")} alt="" />
                </div>
            </div>
            this.setState({
                videoHtml: htmls_video,
                hot_message: htmls_hotmsg
            })
        } else if (this.props.playType === "chat") {

        } else {

        }
    }

    render() {
        return <div style={this.state.VideoStle} className="VideoStle" >
            <div className="hot_messaage">{this.state.hot_message}</div>
            {/* 控制播放 */}
            <div className="button" style={this.state.buttonStyle}><img onClick={this.videoPlay.bind(this)} src="http://www.7nujoom.com/html5/resources/img/playBut.png" alt="" /></div>
            {/* 控制暂停 */}
            {/*poster*/}

            <div className="videoPop" onClick={this.videoPause.bind(this)}>

            </div>
            {/* 注册videojs */}
            {this.state.videoHtml}
            {
                // 视屏播放成功实例化websocket
                this.state.isRenderSocet ? <Websockets {...this.props} /> : null
            }

        </div>
    }

    videoPause() {

        video("example_video_1").pause();
        this.setState({
            buttonStyle: {
                display: "block"
            }
        })
        //关闭socket
        // Communicator.closeWebSocket();
        // Communicator.closeHeartBeatiing();
    }
    videoPlay() {
        let that = this;
        if (this.state.vaideoPay) {
            this.state.vaideoPay.ready(function () {
                let myPlayers = this;
                myPlayers.play();
                if (document.querySelector(".posterImg")) {//销毁海报
                    document.querySelector(".posterImg").remove();
                }
                that.setState({//重新渲染dom video 全屏
                    isRenderSocet: true,
                    VideoStle: {
                        height: window.innerHeight + "px",
                        width: "100%"
                    },
                    buttonStyle: {
                        display: "none"
                    },

                })

            });
        }

    }
    async componentWillMount() {
        await this.initData();
        // let options = {
        //     hls: {
        //         withCredentials: true
        //     },
        // };
        let palyer = video("example_video_1", {
            hls: {
                withCredentials: true
            },
            // techOrder: ['flash', 'html5'],
            // flash: options,
            // html5: options

        });
        this.setState({
            vaideoPay: palyer
        })
    }
    componentDidMount() {// ios 同层播放
        if (util.browserRedirect()) {
            enableInlineVideo(document.querySelector('video'));
        }
    }
    componentWillUnmount() {
        //销毁player 实例，每次重新实例dom
        this.state.vaideoPay.dispose()
    }
}

export default VideoCom;