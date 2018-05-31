import React from 'react'
import { Link } from 'react-router-dom'

const CenterBox = ({ children, title }) => {
  return (
    <div className="row auth align-items-center justify-content-center">
      <div className="col-12 col-md-6 col-lg-5 ant-form-vertical p-4 p-md-5 bw login-box">
        <div className="row justify-content-center">
          <div className="col-12 mb-4 center-text">
            <h1>{title}</h1>
          </div>
          <div className="col-12 col-lg-10">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default CenterBox
