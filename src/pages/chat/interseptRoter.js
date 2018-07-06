import React from "react"
import { Route, Redirect } from "react-router"

export default ({ component: Component, ...rest }) => {
    return <Route {...rest} render={() => {
        const { blcoking } = { ...rest }
        return blcoking ? <Component /> : <Redirect to={{
            pathname: "/login/b",
            otherState: { from: "/chat/71803174" }//额外参数
        }} />
    }} />
}