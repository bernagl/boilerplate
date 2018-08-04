import React from 'react'
import { Alert, Divider, Modal } from 'antd'
import moment from 'moment'
import FormTarjeta from './FormTarjeta'
import { saveCard } from '../actions/tarjeta'
import { withRouter } from 'react-router-dom'

class Suscripcion extends React.Component {
  state = {
    visible: true
  }

  paySubscription = async model => {
    const { correo, nombre, uid } = this.props.auth
    const r = await saveCard(this.props.history.push)({
      ...model,
      uid,
      correo,
      nombre,
      precio: '700',
      fecha: moment().format(),
      name: 'Suscripción',
      type: 'subscripcion'
    })
  }

  render() {
    const { visible } = this.state
    const { push } = this.props
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
          <div className="col-12">
            <FormTarjeta action={this.paySubscription} />
          </div>
        </div>
      </Modal>
    )
  }
}

export default withRouter(Suscripcion)
