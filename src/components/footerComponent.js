import React, { Component } from "react";
import FooterHead from "../pages/footer/indexFooter";
import Footerdetail from "../pages/footer/detailFooter";

class FooterCom extends Component {
    render() {
        return this.props.footers === "index" ? <FooterHead /> : <Footerdetail />
    }
}

export default FooterCom;