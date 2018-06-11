import React, { Component } from "react";
import http from "../../api/api"
import NavBar from "../../components/navbar"
import Headers from "../../components/headerComponent"
import Footers from "../../components/footerComponent"
class Videos extends Component {
    state = {

    }
    render() {
        return <div>
            <Headers />
            <div className="videoList container">
                <NavBar />
                video</div>
            <Footers />
        </div>
    }
    async initData() {
        const result = await http.getvideoList();
        console.log(result)
    }
    componentDidMount() {
        this.initData();
    }
}

export default Videos;