import React from 'react'
import AnimationWrapper from './AnimationWrapper'
import { login, recover, register } from '../actions/auth'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Index from '../views/Index'

const AuthWrapper = ({ auth, children, login, register, type }) => {
  const actions = { login, recover, register }
  const action = actions[type]
  // type === 'login' ? login : type === 'register' ? register : recover
  return auth ? (
    <Redirect to="/" />
  ) : (
    <AnimationWrapper>{children(action)}</AnimationWrapper>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { login, register })(AuthWrapper)
