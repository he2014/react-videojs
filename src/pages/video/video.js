import React, { Component } from "react";
import { Link } from "react-router-dom"
import http from "../../api/api"
// import NavBar from "../../components/navbar"
// import Headers from "../../components/headerComponent"
import Footers from "../../components/footerComponent"
import config from "../../api/config"
import './video.css'
class Videos extends Component {
    state = {
        videoList: ""
    }
    render() {
        return <div>
            <div className="container">
                <div className="videoList">
                    {this.state.videoList}
                </div>

            </div>
            <Footers />
        </div>
    }
    async initData() {
        const result = await http.getvideoList();
        let videoList = result.map((item, key) => {
            return <div className="videoItem" key={item.vi}>
                <Link to={"/video/" + item.vi}>
                    <img src={config.imgUrl + item.vp} alt="" />
                </Link>
            </div>
        })
        this.setState({
            videoList
        })
        // console.log(result)
    }
    componentDidMount() {
        this.initData();
    }
}

export default Videos;