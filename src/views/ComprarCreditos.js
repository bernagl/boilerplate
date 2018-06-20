import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
import Table from '../components/Table'
import { logout } from '../actions/auth'
import { updateProfile } from '../actions/perfil'
import { Divider } from 'antd'

class ComprarCreditos extends Component {
  render() {
    const { updateProfile } = this.props

    return (
      <AnimationWrapper>
        <div className="row my-4">
          <div className="col-12 col-md-6">
            <div className="container-shadow p-2 p-md-4">
              <h1>Comprar créditos</h1>
              <Divider />
              {/* <h4>Paquetes</h4> */}
              <Table
                title="Mis clases"
                data={[
                  {
                    paquete: 'Paquete 1',
                    creditos: 5,
                    precio: '$150 MXN'
                  },
                  {
                    paquete: 'Paquete 2',
                    creditos: 10,
                    precio: '$250 MXN'
                  },
                  {
                    paquete: 'Paquete 3',
                    creditos: 15,
                    precio: '$300 MXN'
                  },
                  {
                    paquete: 'Paquete 4',
                    creditos: 20,
                    precio: '$400 MXN'
                  }
                ]}
                cols={[
                  { label: 'Paquete', key: 'paquete' },
                  { label: 'Creditos', key: 'creditos' },
                  { label: 'Precio', key: 'precio' }
                ]}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4 mt-md-0">
            <div className="container-shadow p-2 p-md-4">
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
                />
                <div className="row">
                  <div className="col-4">
                    <Input
                      name="mes"
                      label="Mes"
                      validations={{
                        minLength: 2,
                        isNumeric: true,
                        maxLength: 2
                      }}
                      validationError="Ingrese un mes válido"
                      required
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      name="ano"
                      label="Año"
                      validations={{
                        minLength: 2,
                        isNumeric: true,
                        maxLength: 2
                      }}
                      validationError="Ingresa una año válido"
                      required
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      name="CVV"
                      label="CVV"
                      validations="isNumeric"
                      validationError="Ingresa un CVV válido"
                      required
                    />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  { logout, updateProfile }
)(ComprarCreditos)
