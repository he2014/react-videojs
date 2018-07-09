import React from "react"
import { Route } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../../App.css"
export default (props) => {
    return <TransitionGroup >
        <CSSTransition key={props.location.key} classNames="nav" timeout={500}>
            <Route {...props} />
        </CSSTransition>
    </TransitionGroup>
}