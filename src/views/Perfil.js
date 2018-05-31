import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import AuthWrapper from '../components/AuthWrapper'
import { logout } from '../actions/auth'

class Perfil extends Component {
  render() {
    const { auth, logout } = this.props
    return (
      <AnimationWrapper>
        <div className="col-12">perfil</div>
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { logout })(Perfil)
