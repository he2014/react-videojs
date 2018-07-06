import React from "react"

export default (props) => {
    return <div onClick={() => {
        console.log(props)
        //  props.history.push()
    }}> 登陆</div>
}