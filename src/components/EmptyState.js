import React from 'react'
import AnimationWrapper from './AnimationWrapper'

export default ({ children }) => {
  return (
    <AnimationWrapper>
      <div className="row align-items-center justify-content-center fh">
        <div className="col-11 center-text">{children}</div>
      </div>
    </AnimationWrapper>
  )
}
