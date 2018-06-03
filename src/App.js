import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NoAuth, WithAuth } from './router'
import { getAuth } from './actions/auth'
import AnimationWrapper from './components/AnimationWrapper'
import Header from './components/Header'
import Loading from './components/Loading'
import { withRouter } from 'react-router-dom'

class App extends Component {
  state = { loading: true }
  async componentDidMount() {
    this.props.getAuth(this)
  }

  render() {
    const { loading } = this.state
    const { auth } = this.props
    // !auth && import ('./assets/login.css')

    return loading ? (
      <Loading />
    ) : auth ? (
      <React.Fragment>
        <Header />
        <div className="container" style={{ marginTop: 80 }}>
          <WithAuth auth={auth} />
        </div>
      </React.Fragment>
    ) : (
      <NoAuth />
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default withRouter(connect(mapStateToProps, { getAuth })(App))
