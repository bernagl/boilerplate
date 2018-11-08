import { db } from './firebase-config'
import { message } from 'antd'
import moment from 'moment'

export const saveCard = push => async (model, context) => {
  var data = {
    card: {
      number: model.tarjeta,
      name: model.nombre,
      exp_year: model.ano,
      exp_month: model.mes,
      cvc: model.CVV
    }
  }

  var successHandler = async ({ id }) => {
    /* token keys: id, livemode, used, object */
    message.info('Generando token de seguridad')
    // context.setState({ loadingPayment: true })
    await makeCharge(push)({ ...model, token: id })
    context.setState({ loadingPayment: false })
  }

  var errorHandler = async ({ message_to_purchaser }) => {
    /* err keys: object, type, message, message_to_purchaser, param, code */
    await message.error(message_to_purchaser)
    console.log(context)
    context.setState({ loadingPayment: false })
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

export const payWithCard = push => (model, context) => {
  message.info('Estamos validando tu información')
  const userRef = db.ref('usuario').child(model.uid)
  window.$.ajax({
    type: 'POST',
    // url: 'ifs/_ctrl/ctrl.conekta.php',
    url: 'ifsapi/_ctrl/ctrl.conekta.php',
    data: { data: model, exec: 'compra_creditos' },
    dataType: 'json',
    success: function({ error, info, status }) {
      if (+status === 500) {
        message.error(error)
        context.setState({ loadingPayment: false })
        return
      } else if (+status === 202) {
        userRef.once('value').then(usnap => {
          const usuario = usnap.val()
          message.success('Generando la compra')
          db.ref('pago')
            .push({ ...info })
            .then(r => {
              const cid = r.key
              const pagos = { ...usuario.pagos, [cid]: true }
              if (model.type === 'paquete') {
                if (model.meses) {
                  const { ilimitado } = usuario
                  let inicio, fin
                  const now = moment()
                  if (typeof ilimitado === 'undefined') {
                    inicio = now.format()
                    fin = now.add(model.meses, 'M')
                  } else {
                    if (moment(fin).format() < now.format()) {
                      inicio = now.format()
                      fin = now.add(model.meses, 'M')
                    } else {
                      inicio = ilimitado['inicio']
                      fin = moment(ilimitado.fin).add(model.meses, 'M')
                    }
                  }
                  userRef
                    .update({
                      pagos,
                      ilimitado: {
                        inicio: moment(inicio).format(),
                        fin: moment(fin).format()
                      }
                    })
                    .then(r => {
                      message.success('El paquete ilímitado se ha comprado')
                      push('/')
                    })
                } else {
                  let sucursalCreditos = 0
                  if (typeof usuario.creditos !== 'undefined') {
                    sucursalCreditos = usuario['creditos'][model.sid]
                  }
                  if (!sucursalCreditos) sucursalCreditos = +model.creditos
                  else sucursalCreditos += +model.creditos
                  userRef
                    .update({
                      creditos: {
                        ...usuario.creditos,
                        [model.sid]: sucursalCreditos
                      },
                      pagos
                    })
                    .then(() => {
                      message.success('El paquete se ha comprado')
                      push('/')
                    })
                }
              } else if (model.type === 'subscripcion') {
                userRef
                  .update({
                    status: 1,
                    last_class: model.fecha,
                    pagos
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
      context.setState({ loadingPayment: false })
      console.log(r)
    }
  })
}

const makeCharge = push => async model => {
  const userRef = db.ref('usuario').child(model.uid)

  window.$.ajax({
    type: 'POST',
    // url: 'ifs/_ctrl/ctrl.conekta.php',
    url: 'ifsapi/_ctrl/ctrl.conekta.php',
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
