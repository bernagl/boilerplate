import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

export default ({ children }) => {
  return (
    // <CSSTransitionGroup
    //   transitionName="fade"
    //   transitionEnterTimeout={1000}
    //   transitionLeaveTimeout={600}
    //   transitionAppear={true}
    //   transitionAppearTimeout={1000}
    // >
    <div className="fadeIn"> {children}</div>
    // </CSSTransitionGroup>
  )
}
