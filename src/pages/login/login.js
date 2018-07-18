import React from "react"

export default (props) => {
    return <div style={{ width: "300px", padding: "20px 0", margin: "0 auto", fontSize: "50px" }} onClick={() => {
        console.log(props)
        props.history.push(props.location.state.from)
    }}> 登陆</div>
}