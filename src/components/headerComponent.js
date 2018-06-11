import React, { Component } from "react";
import IndexHead from "../pages/header/indexHeader";
import DetaiHead from "../pages/header/detailHeader";

class HeadCom extends Component {
    render() {
        return this.props.headers === "detail" ? <DetaiHead /> : <IndexHead />
    }
}

export default HeadCom;