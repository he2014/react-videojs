import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
import Live from "../live/live"
import NavBar from "../../components/navbar"
import Headers from "../../components/headerComponent"
import Footers from "../../components/footerComponent"
import "./home.css"
class Home extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return <div>
            <Headers headers="index" />
            <div className="container">
                <NavBar />
                <Live {...this.props} />
            </div>
            <Footers footers="index" />
        </div>
    }
}


export default Home