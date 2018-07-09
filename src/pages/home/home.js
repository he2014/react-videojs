import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
import Live from "../live/live"
import { connect } from "react-redux";
import { changeHeader } from "../../store/header/action"

import Footers from "../../components/footerComponent"
import "./home.css"
class Home extends Component {

    state = {
        show: "uuu0",
        entered: false,
    }
    componentWillMount() {
        this.props.changeHeader({ headtypes: true })
    }
    render() {
        console.log(this.props)
        // const { show } = this.state;
        // const { location } = this.props.match;
        return <div>
            {/* <Headers headers="index" /> */}
            <div className="container">


                <Live className="star" {...this.props} />

            </div>
            <Footers footers="index" />
        </div >
    }
}


export default connect(state => ({}), { changeHeader })(Home);