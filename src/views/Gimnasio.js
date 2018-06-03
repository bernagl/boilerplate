import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import EmptyState from '../components/EmptyState'
import SelectGym from '../components/SelectGym'
import { Select } from 'antd'
const { Option } = Select

export default class Gimnasio extends Component {
  state = { gym: null }

  handleChange = gym => this.setState({ gym })

  renderSelect = () => {
    const { gym } = this.state
    return (
      <Select onChange={this.handleChange} style={{ width: 120 }}>
        <Option value="1">Gimnasio 1</Option>
        <Option value="2">Gimnasio 2</Option>
      </Select>
    )
  }
  render() {
    const { auth, logout, updateProfile } = this.props
    const { gym } = this.state
    return (
      <AnimationWrapper>
        {gym && (
          <div className="select-to-top">
            <Select onChange={this.handleChange} style={{ width: 120 }}>
              <Option value={1}>Gimnasio 1</Option>
              <Option value={2}>Gimnasio 2</Option>
            </Select>
          </div>
        )}
        <EmptyState>
          {!gym && (
            <Select onChange={this.handleChange} style={{ width: 120 }}>
              <Option value={1}>Gimnasio 1</Option>
              <Option value={2}>Gimnasio 2</Option>
            </Select>
          )}
          {gym &&
            (gym === 1 ? (
              <AnimationWrapper>
                <p>Gimnasio 1</p>
              </AnimationWrapper>
            ) : (
              <AnimationWrapper>
                <p>Gimnasio 2</p>
              </AnimationWrapper>
            ))}
        </EmptyState>
      </AnimationWrapper>
    )
  }
}

// const mapStateToProps = ({ auth }) => ({ auth })

// export default connect(mapStateToProps, { logout, updateProfile })(Perfil)
