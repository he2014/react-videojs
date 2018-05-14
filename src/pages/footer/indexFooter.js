import React, { Component } from "react";
import "./indexFooter.css"

class IndexFooter extends Component {

    render() {
        return <div className="footer-index">
            <div className="footer-index-left">
                <img className="footer-logo" src={require("../../assets/logo.png")} alt="" />
                <img className="footer-head" src={require("../../assets/7nujoom@2x.png")} alt="" />
            </div>
            <div className="footer-index-right">
                <img onClick={this.popShow.bind(this)} src={require("../../assets/download.png")} alt="" />
            </div>
        </div>
    }
    popShow() {//下载弹窗显示

    }
}

export default IndexFooter;