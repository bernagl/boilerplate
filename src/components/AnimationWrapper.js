import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

export default ({ children }) => {
  return (
    <CSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionAppear={true}
      transitionAppearTimeout={500}
    >
      {children}
    </CSSTransitionGroup>
  )
}
