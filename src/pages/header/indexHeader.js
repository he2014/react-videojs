import React, { Component } from 'react'
import NavBar from "../../components/navbar"

import "./indexHeader.css"
class IndexHeader extends Component {
    render() {
        return <div>
            <div className="header-index">
                <div><img src={require("../../assets/head.png")} alt="7nujoom" /></div>
                <NavBar />
            </div>
        </div>



    }
}

export default IndexHeader;