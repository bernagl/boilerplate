import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ auth, ...props }) => {
    console.log(auth)
  return auth ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute
