import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import "./navbar.css"

class NavbarHeader extends Component {
    render() {
        return <div>
            <ul className="nav">
                <li><NavLink exact to="/" activeClassName="active">
                    <img src={require("../assets/tab_live_btn_pres.png")} alt="" />
                </NavLink></li>
                <li><NavLink to="/video" activeClassName="active">
                    <img src={require("../assets/tab_btn_video1.png")} alt="" />
                </NavLink></li>
                <li><NavLink to="/chat" activeClassName="active">
                    <img src={require("../assets/tab_btn_chat@2x.png")} alt="" />
                </NavLink></li>
            </ul>
        </div>
    }
}


export default NavbarHeader;