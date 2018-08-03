import React from 'react'
import { Alert, Divider, Modal } from 'antd'
import FormTarjeta from './FormTarjeta'

export default class Suscripcion extends React.Component {
  state = {
    visible: true
  }

  paySubscription = model => {
    const { uid } = this.props
    console.log(model)
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
