import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import EmptyState from '../components/EmptyState'
import SelectGym from '../components/SelectGym'

export default class Gimnasio extends Component {
  render() {
    const { auth, logout, updateProfile } = this.props
    return (
      <AnimationWrapper>
        <EmptyState>
          <SelectGym />
        </EmptyState>
      </AnimationWrapper>
    )
  }
}

// const mapStateToProps = ({ auth }) => ({ auth })

// export default connect(mapStateToProps, { logout, updateProfile })(Perfil)
