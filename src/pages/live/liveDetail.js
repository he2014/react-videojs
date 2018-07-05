import React, { Component } from "react"
import "./liveDetail.css"
import DetailH from "../header/detailHeader"
// import Headers from "../../components/headerComponent"
import Footers from "../../components/footerComponent"
import asyncComponent from "../../util/asyncComponent"
import config from "../../api/config"
import { connect } from "react-redux";
import { changeHeader } from "../../store/header/action"

const VideoCom = asyncComponent(() => import("../../components/videoComponent"))
class LiveDetail extends Component {
    componentWillMount() {
        this.props.changeHeader({ headtypes: false })
    }
    render() {
        return <div>
            <DetailH headers="detail" />
            <div className="details">
                <VideoCom playType="live" socketType={config.websocketConfig.LIVETYPE} ids={this.props.match.params.roomId} {...this.props} />
                <Footers footers="detail" />
            </div>
        </div>
    }

}

export default connect(state => ({}), { changeHeader })(LiveDetail);