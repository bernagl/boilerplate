import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
import Table from '../components/Table'
import { logout } from '../actions/auth'
import { updateProfile } from '../actions/perfil'
import PerfilModel from '../models/perfil'
import { Input as Ainput, Radio, Select } from 'antd'
import Xtable from 'react-xtable'
const RadioGroup = Radio.Group
const InputGroup = Ainput.Group
const Option = Select.Option

class ComprarCreditos extends Component {
  render() {
    const { auth, logout, updateProfile } = this.props

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    }
    return (
      <AnimationWrapper>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="bw p-0 p-md-4">
              <RadioGroup>
                <Radio style={radioStyle} value={1}>
                  Paquete 5 créditos
                </Radio>
                <Radio style={radioStyle} value={2}>
                  Paquete 10 créditos
                </Radio>
                <Radio style={radioStyle} value={3}>
                  Paguete 15 créditos
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div className="col-12 col-md-6 mt- mt-md-0">
            <div className="bw p-0 p-md-4">
              <Form submitText="Pagar" action={updateProfile}>
                <Input
                  name="nombre"
                  label="Tarjeta"
                  validations={{
                    minLength: 16,
                    isNumeric: true,
                    maxLength: 16
                  }}
                  validationError="Ingresa una tarjeta válida"
                  required
                  value={auth.nombre}
                />
                <div className="row">
                  <div className="col-4">
                    <label>Mes</label>
                    <Select defaultValue="Option1-1">
                      <Option value="Option1-1">Option1-1</Option>
                      <Option value="Option1-2">Option1-2</Option>
                    </Select>
                  </div>
                  <div className="col-4">
                    <label>Año</label>
                    <Select defaultValue="Option1-1">
                      <Option value="Option1-1">Option1-1</Option>
                      <Option value="Option1-2">Option1-2</Option>
                    </Select>
                  </div>
                  <div className="col-4">
                    <Input
                      name="CVV"
                      label="Código de seguridad"
                      validations="isNumeric"
                      validationError="Ingresa un CVV válido"
                      required
                      //   value={auth.telefono}
                    />
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-6">
                    <Input
                      name="correo"
                      label="Correo"
                      validations="isEmail"
                      validationError="Ingresa un correo válido"
                      required
                      value={auth.correo}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      name="telefono"
                      label="Teléfono"
                      validations="isNumeric"
                      validationError="Ingresa un telefono válido"
                      required
                      value={auth.telefono}
                    />
                  </div>
                </div> */}
              </Form>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { logout, updateProfile })(
  ComprarCreditos
)
