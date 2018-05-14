import React, { Component } from "react"
import "./liveDetail.css"
import Headers from "../../components/headerComponent"
import Footers from "../../components/footerComponent"
// import VideoCom from "../../components/videoComponent"
import asyncComponent from "../../util/asyncComponent"
import config from "../../api/config"


const VideoCom = asyncComponent(() => import("../../components/videoComponent"))
class LiveDetail extends Component {
    render() {
        return <div>
            <Headers headers="detail" />
            <div className="details">
                <VideoCom playType="live" socketType={config.websocketConfig.LIVETYPE} ids={this.props.match.params.roomId} {...this.props} />
                <Footers footers="detail" />
            </div>
        </div>
    }

}

export default LiveDetail;