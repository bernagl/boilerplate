import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
import Table from '../components/Table'
import { comprarCreditos } from '../actions/creditos'
import { getGimnasiosByStatus } from '../actions/gimnasio'
import { updateProfile } from '../actions/perfil'
import { getPaquetesByGym } from '../actions/paquete'
import { Button, Divider, message, Radio, Select } from 'antd'
import moment from 'moment'

const { Option } = Select

class ComprarCreditos extends Component {
  state = { nuevaTarjeta: false, paquete: null, metodo: null, paquetes: [] }

  componentDidMount() {
    this.props.getGimnasiosByStatus(1)
  }

  handlePaquetes = async id => {
    getPaquetesByGym(this)(id)
  }

  pagar = async () => {
    const { uid } = this.props.auth
    const { metodo, paquete } = this.state
    const r = await this.props.comprarCreditos({
      uid,
      metodo,
      paquete,
      fecha: moment().format('L')
    })
    r &&
      (message.success('Créditos comprados'),
      this.props.history.push('/perfil'))
  }
  render() {
    const { metodo, nuevaTarjeta, paquete, paquetes } = this.state
    const { updateProfile, gimnasios } = this.props
    const { creditos } = this.props.auth
    return (
      <AnimationWrapper>
        <div className="row my-4">
          <div className="col-12 col-md-6">
            <div className="container-shadow p-2 p-md-4">
              <h1>Comprar créditos</h1>
              <Divider />
              <Select
                className="fw mt-2 mb-4"
                placeholder="Selecciona un gimnasio"
                onChange={id => this.handlePaquetes(id)}
              >
                {gimnasios.map(({ nombre, id }) => (
                  <Option value={id} key={id}>
                    {nombre}
                  </Option>
                ))}
              </Select>
              <Table
                title="Mis clases"
                data={paquetes}
                cols={[
                  { label: 'Paquete', key: 'nombre' },
                  { label: 'Creditos', key: 'creditos' },
                  {
                    label: 'Precio',
                    key: 'precio',
                    Render: ({ precio }) => <span>MXN{precio}</span>
                  },
                  {
                    label: 'Seleccionar',
                    Render: item => (
                      <Radio
                        onClick={() => this.setState({ paquete: item })}
                        checked={
                          paquete
                            ? item.id === paquete.id
                              ? true
                              : false
                            : false
                        }
                      />
                    )
                  }
                ]}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4 mt-md-0">
            <div className="container-shadow p-2 p-md-4">
              <div className="row">
                <div className="col-12 my-2">
                  <h4>Paquete seleccionado:</h4>
                  {paquete ? (
                    <React.Fragment>
                      <div>
                        <span>Paquete: {paquete.nombre}</span> <br />
                        <span>Creditos: {paquete.creditos}</span> <br />
                        <span>Precio: {paquete.precio}</span>
                      </div>
                      {/* <div className="mt-2">
                        <span
                          onClick={() => this.setState({ nuevaTarjeta: true })}
                          className="a"
                        >
                          Agregar nueva tarjeta
                        </span>
                      </div> */}
                    </React.Fragment>
                  ) : (
                    <span>Selecciona un paquete para continuar</span>
                  )}
                </div>
                <div className="col-12 my-2">
                  <h4>Método de pago: </h4>
                  <Select
                    // defaultValue="0"
                    onChange={metodo => this.setState({ metodo })}
                    disabled={paquete ? false : true}
                    className="fw"
                    placeholder="Selecciona un método de pago"
                  >
                    {/* <Option value="0">Selecciona método de pago</Option> */}
                    <Option value="1">Visa-6398</Option>
                    <Option value="2">MasterCard-4568</Option>
                    <Option value="3">Visa-1234</Option>
                  </Select>
                </div>
                {paquete && (
                  <div className="col-12 my-2">
                    <div>
                      <span>Saldo anterior: {creditos}</span>
                    </div>
                    <div>
                      <span>Saldo nuevo: {creditos + paquete.creditos}</span>
                    </div>
                  </div>
                )}
                {!nuevaTarjeta && (
                  <div className="col-12 my-2">
                    <Button
                      type="primary"
                      className="fw"
                      disabled={metodo ? false : true}
                      onClick={this.pagar}
                    >
                      Pagar
                    </Button>
                  </div>
                )}
              </div>
              {nuevaTarjeta && (
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
              )}
            </div>
          </div>
        </div>
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth, gimnasios }) => ({ auth, gimnasios })

export default connect(
  mapStateToProps,
  { comprarCreditos, getGimnasiosByStatus, updateProfile }
)(ComprarCreditos)
