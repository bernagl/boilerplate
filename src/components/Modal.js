import React, { Component } from 'react'
import { Modal as M } from 'antd'

export default WrappedComponent => ChildrenComponent => ({ ...props }) => {
  return class Modal extends Component {
    state = { visible: true }

    openModal = () => {
      console.log('hola de modal')
      this.setState({ visible: true })
    }

    closeModal = () => {
      this.setState({ visible: false })
    }

    //   cancelModal = () => {

    //   }

    sendProps = () => {
      return {
        toggleModal: this.toggleModal
        //   onCancel: this.onCancel
      }
    }
    render() {
      //   const { cancelText, children, handleOk, okText, title } = this.props
      console.log(...props)
      return (
        <WrappedComponent openModal={this.openModal}>
          <M
            title="Modal"
            visible={true}
            onOk={this.closeModal}
            onCancel={this.closeModal}
            okText="确认"
            cancelText="取消"
          >
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
          </M>
        </WrappedComponent>
      )
    }
  }
}
