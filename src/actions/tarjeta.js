import { db } from './firebase-config'
import { message } from 'antd'

export const saveCard = push => async model => {
  var data = {
    card: {
      number: model.tarjeta,
      name: model.nombre,
      exp_year: model.ano,
      exp_month: model.mes,
      cvc: model.CVV
    }
  }

  var successHandler = function({ id }) {
    /* token keys: id, livemode, used, object */
    message.info('Generando token de seguridad')
    makeCharge(push)({ ...model, token: id })
  }

  var errorHandler = function({ message_to_purchaser }) {
    /* err keys: object, type, message, message_to_purchaser, param, code */
    message.error(message_to_purchaser)
  }

  window.Conekta.Token.create(data, successHandler, errorHandler)
}

export const deleteCard = id => {
  return db
    .ref('tarjeta')
    .child(id)
    .remove()
    .then(r => message.success('La tarjeta se ha eliminado'))
    .catch(e =>
      message.error('Ocurrió un error, por favor vuelve a intentarlo')
    )
}

export const payWithCard = push => model => {
  message.info('Estamos validando tu información')
  const userRef = db.ref('usuario').child(model.uid)
  window.$.ajax({
    type: 'POST',
    url: 'ifs/_ctrl/ctrl.conekta.php',
    data: { data: model, exec: 'compra_creditos' },
    dataType: 'json',
    success: function({ error, info, status }) {
      if (+status === 500) {
        message.error(error)
        return
      } else if (+status === 202) {
        userRef.once('value').then(usnap => {
          const usuario = usnap.val()
          message.success('Generando la compra')
          db.ref('pago')
            .push({ ...info })
            .then(r => {
              const cid = r.key
              if (model.type === 'paquete') {
                let sucursalCreditos = 0
                if (typeof usuario.creditos !== 'undefined') {
                  sucursalCreditos = usuario['creditos'][model.sid]
                }
                if (!sucursalCreditos) sucursalCreditos = model.creditos
                else sucursalCreditos += model.creditos
                userRef
                  .update({
                    creditos: usuario.creditos + model.creditos,
                    creditos: {
                      ...usuario.creditos,
                      [model.sid]: sucursalCreditos
                    },
                    pagos: { ...usuario.pagos, [cid]: true }
                  })
                  .then(() => {
                    message.success('El paquete se ha comprado')
                    push('/')
                  })
              } else if (model.type === 'subscripcion') {
                userRef
                  .update({
                    status: 1,
                    last_class: model.fecha,
                    pagos: { ...usuario.pagos, [cid]: true }
                  })
                  .then(() => {
                    message.success('Gracias por renovar tu suscripción')
                    push('/')
                  })
              }
            })
        })
      }
    },
    error: function(r) {
      console.log(r)
    }
  })
}

const makeCharge = push => async model => {
  const userRef = db.ref('usuario').child(model.uid)

  window.$.ajax({
    type: 'POST',
    url: 'ifs/_ctrl/ctrl.conekta.php',
    data: { data: model, exec: 'save' },
    dataType: 'json',
    success: function({ cc, status, error }) {
      if (+status === 500) {
        message.error(error)
        return
      } else {
        db.ref('tarjeta')
          .push({ ...cc, uid: model.uid, fecha: model.fecha, status: 1 })
          .then(tsnap => {
            const id = tsnap.key
            userRef.once('value').then(snapshot => {
              const usuario = snapshot.val()
              userRef
                .update({ tarjetas: { ...usuario.tarjetas, [id]: true } })
                .then(r => {
                  payWithCard(push)({
                    ...model,
                    parent_id: cc.parent_id,
                    conekta_id: cc.id,
                    tarjeta: cc.brand,
                    last4: cc.last4
                  })
                })
            })
          })
          .catch(e => 404)
      }
    },
    error: function(r) {
      console.log(r)
    }
  })
}
