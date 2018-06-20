import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import { logout } from '../actions/auth'

class Index extends Component {
  render() {
    const { auth, logout } = this.props
    return auth ? (
      <AnimationWrapper>
        <div className="col-12">
          <Link to="/registro">Registro</Link>
          <br />
          <Link to="/perfil">Perfil</Link>
          <br />
          <span onClick={logout}>Logout</span>
        </div>
      </AnimationWrapper>
    ) : (
      <Redirect to="/login" />
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { logout })(Index)
