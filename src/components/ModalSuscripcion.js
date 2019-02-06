import React from 'react'
import { Alert, Button, Divider, Modal, Select } from 'antd'
import moment from 'moment'
import FormTarjeta from './FormTarjeta'
import { payWithCard, saveCard } from '../actions/tarjeta'
import { withRouter } from 'react-router-dom'

const { Option } = Select

class Suscripcion extends React.Component {
  state = {
    visible: true,
    metodo: null,
    nuevaTarjeta: false,
    loadingPayment: false
  }

  paySubscription = async model => {
    const { correo, nombre, uid } = this.props.auth
    this.setState({ loadingPayment: true })
    const r = await saveCard(this.props.history.push)(
      {
        ...model,
        uid,
        correo,
        nombre,
        precio: '700',
        fecha: moment().format(),
        name: 'Suscripción',
        type: 'subscripcion'
      },
      this
    )
  }

  payWithCard = async () => {
    const { metodo } = this.state
    const { correo, nombre, tarjetas, uid } = this.props.auth
    const tarjeta = tarjetas[metodo - 1]
    this.setState({ loadingPayment: true })
    payWithCard(this.props.history.push)(
      {
        uid,
        correo,
        parent_id: tarjeta.parent_id,
        conekta_id: tarjeta.id,
        tarjeta: tarjeta.brand,
        last4: tarjeta.last4,
        usuario: nombre,
        nombre,
        precio: 700,
        fecha: moment().format(),
        name: 'Suscripción',
        type: 'subscripcion'
      },
      this
    )
  }

  render() {
    const { loadingPayment, metodo, nuevaTarjeta, visible } = this.state
    const { auth, push } = this.props
    const { tarjetas } = auth
    return (
      <Modal
        title="Renovar suscripción"
        visible={visible}
        closable={false}
        onOk={() => console.log('ok')}
        cancelText="Regresar"
        onCancel={() => push('/perfil')}
      >
        <div className="row">
          <div className="col-12">
            <Alert
              message="Esto se debe a que no hiciste uso de cuenta durante tres meses.
                Y no podrás hacer uso de tus créditos hasta que la renueves"
              type="error"
            />
          </div>
          <Divider />
          <div className="col-12 my-2">
            <h4>Método de pago: </h4>
            {tarjetas.length > 0 && (
              <Select
                onChange={metodo =>
                  this.setState({ metodo, nuevaTarjeta: false })
                }
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
              <React.Fragment>
                <div className="col-12 my-2 p-0">
                  <Button
                    type="primary"
                    className="fw"
                    disabled={loadingPayment ? true : metodo ? false : true}
                    onClick={this.payWithCard}
                  >
                    Pagar
                  </Button>
                </div>
                <div className="mt-2">
                  <span
                    onClick={() => this.setState({ nuevaTarjeta: true })}
                    className="a"
                  >
                    Agregar nueva tarjeta
                  </span>
                </div>
              </React.Fragment>
            )}
          </div>
          {nuevaTarjeta && (
            <div className="col-12">
              <FormTarjeta
                action={this.paySubscription}
                loading={loadingPayment}
              />
            </div>
          )}
        </div>
      </Modal>
    )
  }
}

export default withRouter(Suscripcion)
