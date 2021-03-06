import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationWrapper from '../components/AnimationWrapper'
import Table from '../components/Table'
import { comprarCreditos } from '../actions/creditos'
import { getGimnasiosByStatus } from '../actions/gimnasio'
import { updateProfile } from '../actions/perfil'
import { payWithCard, saveCard } from '../actions/tarjeta'
import { getPaquetesByGym } from '../actions/paquete'
import { Button, Divider, message, Radio, Select } from 'antd'
import ModalSuscripcion from '../components/ModalSuscripcion'
import moment from 'moment'
import { db } from '../actions/firebase-config'
import FormTarjeta from '../components/FormTarjeta'

const { Option } = Select

class ComprarCreditos extends Component {
  state = {
    nuevaTarjeta: false,
    paquete: null,
    metodo: null,
    paquetes: [],
    sucursal: null,
    modal: false,
    loadingPayment: false
  }

  componentDidMount() {
    const { auth } = this.props
    if (auth.status === 0) {
      this.setState({ modal: true })
    }
    this.props.getGimnasiosByStatus(1)
  }

  handlePaquetes = async id => {
    const { gimnasios } = this.props
    const sucursal = gimnasios.find(gimnasio => gimnasio.id === id)
    this.setState({ sucursal }, () => getPaquetesByGym(this)(id))
  }

  saveCard = async model => {
    const { expires, correo, nombre, uid } = this.props.auth
    const { paquete, sucursal } = this.state
    if (!paquete) {
      message.error('Debes seleccionar un paquete')
      return
    }
    const { meses, creditos } = paquete
    const isLowerPrice = this.checkPackagePrice(+paquete.precio)
    if (!isLowerPrice) return
    this.setState({ loadingPayment: true })
    const r = await saveCard(this.props.history.push)(
      {
        ...model,
        expires,
        uid,
        precio: +paquete.precio,
        creditos,
        meses,
        name: paquete.nombre,
        correo,
        nombre,
        usuario: nombre,
        fecha: moment().format(),
        sucursal: sucursal.nombre,
        sid: sucursal.id,
        type: 'paquete'
      },
      this
    )
    return r
  }

  checkPackagePrice = precio => {
    if (typeof precio === 'number') {
      if (precio >= 3000) {
        message.error(
          'Por el momento solo se pueden hacer comprar menores a $3,000.00 pesos en la página'
        )
        message.info(
          'Si desea puede pagar en la sucursal en efectivo o en terminal'
        )
        return false
      }
    }
    return true
  }

  payWithCard = async () => {
    const { paquete, metodo, sucursal } = this.state
    const { tarjetas, uid, nombre: usuario } = this.props.auth
    const tarjeta = tarjetas[metodo - 1]
    const { meses, creditos } = paquete
    const isLowerPrice = this.checkPackagePrice(+paquete.precio)
    if (!isLowerPrice) return
    this.setState({ loadingPayment: true })
    payWithCard(this.props.history.push)(
      {
        uid,
        precio: +paquete.precio,
        meses,
        usuario,
        creditos,
        name: paquete.nombre,
        parent_id: tarjeta.parent_id,
        conekta_id: tarjeta.id,
        fecha: moment().format(),
        tarjeta: tarjeta.brand,
        last4: tarjeta.last4,
        sucursal: sucursal.nombre,
        sid: sucursal.id,
        type: 'paquete'
      },
      this
    )
  }

  render() {
    const {
      metodo,
      nuevaTarjeta,
      loadingPayment,
      paquete,
      paquetes,
      sucursal
    } = this.state
    const { auth, gimnasios } = this.props
    let { creditos: c, tarjetas } = this.props.auth
    if (typeof c === 'undefined') c = {}
    const creditos = sucursal ? (c[sucursal.id] ? c[sucursal.id] : 0) : 0
    const defaultGimnasio = gimnasios.length > 0 ? gimnasios[0].id : null
    return (
      <AnimationWrapper>
        <div className={`row my-4 ${auth.status === 0 && 'blur'}`}>
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
                    Render: ({ precio }) => <span>MXN${precio}</span>
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
                        <span>Sucursal: {sucursal.nombre}</span>
                        <br />
                        <span>Paquete: {paquete.nombre}</span> <br />
                        {paquete['creditos'] && (
                          <div>Creditos: {paquete.creditos}</div>
                        )}
                        <span>Precio: MXN${paquete.precio}</span>
                        {auth.status === 0 && <span>Suscripción: MXN$150</span>}
                      </div>
                    </React.Fragment>
                  ) : (
                    <span>Selecciona un paquete para continuar</span>
                  )}
                </div>
                <div className="col-12 my-2">
                  <h4>Método de pago: </h4>
                  {tarjetas.length > 0 && (
                    <Select
                      onChange={metodo =>
                        this.setState({ metodo, nuevaTarjeta: false })
                      }
                      disabled={paquete ? false : true}
                      className="fw"
                      placeholder="Selecciona un método de pago"
                    >
                      {tarjetas.map(({ brand, bin, id, last4 }, i) => (
                        <Option value={i + 1} key={id}>
                          {brand} - {bin}XXXXXX{last4}
                        </Option>
                      ))}
                    </Select>
                  )}
                  {!nuevaTarjeta && (
                    <div className="mt-2">
                      <span
                        onClick={() => this.setState({ nuevaTarjeta: true })}
                        className="a"
                      >
                        Agregar nueva tarjeta
                      </span>
                    </div>
                  )}
                </div>
                {paquete &&
                  (paquete['creditos'] && (
                    <div className="col-12 my-2">
                      <div>
                        <span>Saldo anterior: {creditos}</span>
                      </div>
                      <div>
                        <span>
                          Saldo nuevo: {+creditos + +paquete.creditos}
                        </span>
                      </div>
                    </div>
                  ))}
                {!nuevaTarjeta && (
                  <div className="col-12 my-2">
                    <Button
                      type="primary"
                      className="fw"
                      disabled={metodo ? false : loadingPayment ? true : true}
                      loading={loadingPayment}
                      onClick={this.payWithCard}
                    >
                      Pagar
                    </Button>
                  </div>
                )}
              </div>
              {nuevaTarjeta && (
                <div className="cardform">
                  {/* {loadingPayment && <div className="cardform__loader" />} */}
                  <FormTarjeta
                    action={this.saveCard}
                    loading={loadingPayment}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {auth.status === 0 && (
          <ModalSuscripcion
            tarjetas={auth.tarjetas}
            auth={auth}
            push={this.props.history.push}
          />
        )}
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth, gimnasios }) => ({ auth, gimnasios })

export default connect(
  mapStateToProps,
  { comprarCreditos, getGimnasiosByStatus, updateProfile }
)(ComprarCreditos)
