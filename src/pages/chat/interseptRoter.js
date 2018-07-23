import React from "react"
import { Route, Redirect } from "react-router"

export default ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        const { blcoking } = { ...rest }
        return blcoking ? <Component /> : <Redirect to={{
            pathname: "/login",
            state: { from: `/chat/${props.match.params.roomId}` }//额外参数
        }} />
    }} />
}