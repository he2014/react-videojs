import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import "./navbar.css"

class NavbarHeader extends Component {
    render() {
        return <div>
            <ul className="nav">
                <li><NavLink exact to="/" activeClassName="selected">
                    <img src={require("../assets/tab_live_btn_pres.png")} alt="" />
                </NavLink></li>
                <li><NavLink to="/video" activeStyle={{ color: '#4dc060' }}>
                    <img src={require("../assets/tab_btn_video1.png")} alt="" />
                </NavLink></li>
                <li><NavLink to="/chat" activeStyle={{ color: '#4dc060' }}>
                    <img src={require("../assets/tab_btn_chat@2x.png")} alt="" />
                </NavLink></li>
            </ul>
        </div>
    }
}


export default NavbarHeader;