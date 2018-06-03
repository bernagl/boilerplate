import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from './router'
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
    return (
      <React.Fragment>
        {auth && <Header />}
        <div className="container" style={{ marginTop: 80 }}>
          {loading ? <Loading /> : <Router auth={auth} />}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default withRouter(connect(mapStateToProps, { getAuth })(App))
