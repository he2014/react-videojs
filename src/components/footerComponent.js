import React, { Component } from "react";
import FooterHead from "../pages/footer/indexFooter";
import Footerdetail from "../pages/footer/detailFooter";

class FooterCom extends Component {
    render() {
        return this.props.footers === "detail" ? <Footerdetail /> : <FooterHead />
    }
}

export default FooterCom;