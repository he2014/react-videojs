import React, { Component } from 'react'

import "./indexHeader.css"
class IndexHeader extends Component {
    render() {
        return <div className="header-index">
            <img src={require("../../assets/head.png")} alt="7nujoom" />
        </div>
    }
}

export default IndexHeader;