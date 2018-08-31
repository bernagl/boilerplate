import React from 'react'
import { withFormsy } from 'formsy-react'
import { Form } from 'antd'
const { Item } = Form

class Wrapper extends React.Component {
  state = { error: false, blurred: false, value: null }

  changeValue = value => {
    this.setState({ value }, () => this.props.setValue(value))
  }

  onBlur = () => {
    this.setState({ blurred: true })
  }

  componentDidMount() {
    const { defaultValue, setValue } = this.props
    this.setState(
      ({ blurred }) =>
        defaultValue ? { value: defaultValue, blurred: !blurred } : { blurred },
      () => defaultValue && setValue(defaultValue)
    )
  }

  setRenderProps = () => ({
    onChange: this.changeValue,
    onBlur: this.onBlur,
    value: this.state.value
  })

  render() {
    const {
      children,
      // feedBack,
      // getErrorMessage,
      isValid: validate,
      label,
      validationError
    } = this.props
    const { blurred } = this.state
    // const errorMessage = getErrorMessage()
    const isValid = validate()
    return (
      <Item
        layout="vertical"
        label={label}
        validateStatus={
          blurred ? (isValid ? 'success' : !isValid ? 'error' : null) : null
        }
        // help={blurred ? (!isValid ? errorMessage : null) : null}
        // hasFeedback={feedBack && blurred}
      >
        {children({ ...this.setRenderProps() })}
        {!isValid &&
          blurred && <span className="input-has-error">{validationError}</span>}
      </Item>
    )
  }
}

export default withFormsy(Wrapper)
