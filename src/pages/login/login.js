import React from "react"

export default (props) => {
    return <div onClick={() => {
        console.log(props)
        props.history.push(props.location.otherState.from)
    }}> 登陆</div>
}