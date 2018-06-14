import React, { Component } from "react"
import { Link } from "react-router-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import http from "../../api/api"
import config from "../../api/config"
import "./live.css"

class Live extends Component {
    state = {
        liveList: []
    }
    async initData() {
        const result = await http.getHots();
        // console.log(result)
        const items = [];
        const maxNum = 10000;
        result.ri.forEach((item, key) => {
            if (item.st === 1) {
                items.push(
                    <div className="live_item" key={item.ri}>
                        <Link to={"/live/" + item.ri}>
                            <div className="message">
                                <div className="online">
                                    <img src={require("../../assets/live.gif")} alt="" />
                                </div>
                                <div className="line_number">{item.ol >= maxNum ? (item.ol / maxNum).toFixed(2).toString() + "w" : item.ol}</div>
                            </div>
                            <img className="livePost" src={config.imgUrl + item.ci} alt="7nujoom" />
                        </Link>
                    </div>
                )
            }
        })
        this.setState({
            liveList: items
        })
        // console.log(items)

    }
    componentWillMount() {
        console.log(this.props)
    }
    render() {
        return <div className="liveList">
            <ReactCSSTransitionGroup
                transitionName={{
                    enter: 'example-enter',
                    leave: 'example-leave',
                    appear: 'example-appear',
                    enterActive: 'example-enter-active',
                    leaveActive: 'example-leave-active',
                    appearActive: 'example-appear-active'
                }}
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {this.state.liveList}
            </ReactCSSTransitionGroup>
        </div>
    }
    componentDidMount() {
        // console.log(this.props)
        if (document.querySelector("#example_video_1")) {
            document.querySelector("#example_video_1").remove();
        }
        this.initData()
    }
}

export default Live;