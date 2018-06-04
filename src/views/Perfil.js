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
import { Tabs, Tag } from 'antd'
import Xtable from 'react-xtable'

const { TabPane } = Tabs

class Perfil extends Component {
  render() {
    const { auth, logout, updateProfile } = this.props
    return (
      <AnimationWrapper>
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="container-shadow p-2 p-md-4">
              <Form submitText="Guardar" action={updateProfile}>
                {/* {PerfilModel.map(input => <Input {...input} />)} */}
                <Input
                  name="nombre"
                  label="Nombre completo"
                  validations="minLength:3"
                  validationError="Ingresa un nombre válido"
                  required
                  value={auth.nombre}
                />
                <Input
                  name="correo"
                  label="Correo"
                  validations="isEmail"
                  validationError="Ingresa un correo válido"
                  required
                  value={auth.correo}
                />
                <Input
                  name="telefono"
                  label="Teléfono"
                  validations="isNumeric"
                  validationError="Ingresa un telefono válido"
                  required
                  value={auth.telefono}
                />
              </Form>
            </div>
          </div>
          <div className="col-12 col-md-8 my-4 mt-md-0">
            <div className="container-shadow p-2 p-md-4">
              <Tabs defaultActiveKey="1" onChange={e => console.log(e)}>
                <TabPane tab="Mis clases" key="1">
                  <Table title="Historial de clases" />
                </TabPane>
                <TabPane tab="Historial de pagos" key="2">
                  <Table title="Historial de pagos" />
                </TabPane>
                <TabPane tab="Métodos de pagos" key="3">
                  <Table title="Métodos de pago" />
                </TabPane>
                <TabPane tab="Perfil" key="4">
                  <Form submitText="Guardar" success="Perfil actualizado" action={updateProfile}>
                    <Input
                      name="nombre"
                      label="Nombre completo"
                      validations="minLength:3"
                      validationError="Ingresa un nombre válido"
                      required
                      value={auth.nombre}
                    />
                    <Input
                      name="correo"
                      label="Correo"
                      validations="isEmail"
                      validationError="Ingresa un correo válido"
                      required
                      value={auth.correo}
                    />
                    <Input
                      name="telefono"
                      label="Teléfono"
                      validations="isNumeric"
                      validationError="Ingresa un telefono válido"
                      required
                      value={auth.telefono}
                    />
                  </Form>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { logout, updateProfile })(Perfil)
