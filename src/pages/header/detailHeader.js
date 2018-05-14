import React, { Component } from "react"
import IndexFooter from "../footer/indexFooter"


let styles = {
    position: "relative",
    height: "100px",
    zIndex: "999"
}

class DetaiHead extends Component {
    render() {
        return <div style={styles}>
            <IndexFooter />
        </div>
    }
}

export default DetaiHead;