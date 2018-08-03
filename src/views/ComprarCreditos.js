import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
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
    modal: false
  }

  componentDidMount() {
    const { auth } = this.props
    if (auth.status === 0) {
      // notification.open({
      //   message: 'Tu suscripción ha vencido',
      //   description: 'Para poder utilizar tus créditos o comprar más renuevala'
      // })
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
    const { correo, nombre, uid } = this.props.auth
    const { paquete, metodo, sucursal } = this.state
    const r = saveCard({
      ...model,
      uid,
      precio: +paquete.precio,
      creditos: +paquete.creditos,
      name: paquete.nombre,
      correo,
      nombre,
      fecha: moment().format(),
      sucursal: sucursal.nombre,
      sid: sucursal.id,
      type: 'paquete'
    })
    return r
  }

  payWithCard = async () => {
    const { paquete, metodo, sucursal } = this.state
    const { tarjetas, uid } = this.props.auth
    const tarjeta = tarjetas[metodo - 1]
    payWithCard({
      uid,
      precio: +paquete.precio,
      creditos: +paquete.creditos,
      name: paquete.nombre,
      parent_id: tarjeta.parent_id,
      conekta_id: tarjeta.id,
      fecha: moment().format(),
      tarjeta: tarjeta.brand,
      last4: tarjeta.last4,
      sucursal: sucursal.nombre,
      sid: sucursal.id,
      type: 'paquete'
    })
  }

  pagar = async () => {
    const { uid } = this.props.auth
    const { metodo, paquete } = this.state
    const r = await this.props.comprarCreditos({
      uid,
      metodo,
      paquete,
      fecha: moment().format('L'),
      type: 'paquete'
    })
    r &&
      (message.success('Créditos comprados'),
      this.props.history.push('/perfil'))
  }

  vaciar = () => {
    db.ref('horario').remove()
  }
  render() {
    const { metodo, nuevaTarjeta, paquete, paquetes, sucursal } = this.state
    const { auth, updateProfile, gimnasios } = this.props
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
                defaultValue={defaultGimnasio}
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
                        <span>Sucursal: {sucursal.nombre}</span>
                        <br />
                        <span>Paquete: {paquete.nombre}</span> <br />
                        <span>Creditos: {paquete.creditos}</span> <br />
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
                      onChange={metodo => this.setState({ metodo })}
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
                  <div className="mt-2">
                    <span
                      onClick={() => this.setState({ nuevaTarjeta: true })}
                      className="a"
                    >
                      Agregar nueva tarjeta
                    </span>
                  </div>
                </div>
                {paquete && (
                  <div className="col-12 my-2">
                    <div>
                      <span>Saldo anterior: {creditos}</span>
                    </div>
                    <div>
                      <span>Saldo nuevo: {creditos + +paquete.creditos}</span>
                    </div>
                  </div>
                )}
                {!nuevaTarjeta && (
                  <div className="col-12 my-2">
                    <Button
                      type="primary"
                      className="fw"
                      disabled={metodo ? false : true}
                      onClick={this.payWithCard}
                    >
                      Pagar
                    </Button>
                  </div>
                )}
              </div>
              {nuevaTarjeta && <FormTarjeta action={this.saveCard} />}
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
