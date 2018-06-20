import React, { Component } from 'react'
import Formsy from 'formsy-react'
import { withRouter } from 'react-router-dom'
import { Button, message } from 'antd'

class Form extends Component {
  state = { canSubmit: false, loading: false }

  disableButton = () => {
    this.setState({ canSubmit: false })
  }

  enableButton = () => {
    this.setState({ canSubmit: true })
  }

  submit = async model => {
    const { action, uid, error, history, redirect, success } = this.props
    this.setState({ loading: true })
    const r = await action({...model, uid})
    // this.setState(() => {
    r
      ? (message.success(success),
        redirect ? history.push(redirect) : this.setState({ loading: false }))
      : (this.setState({ loading: false }),
        message.error(
          error ? error : 'Ocurrio un error, por favor intentalo de nuevo'
        ))

    // !redirect && this.setState({ loading: false })
    // },
    // )
  }

  render() {
    const { canSubmit, loading } = this.state
    const { children, submitText } = this.props
    return (
      <Formsy
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        className="ant-form-vertical"
      >
        {children}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading ? true : !canSubmit ? true : false}
          className="fw mt-2"
        >
          {submitText}
        </Button>
      </Formsy>
    )
  }
}

export default withRouter(Form)
