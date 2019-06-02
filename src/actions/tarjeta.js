import { db } from './firebase-config'
import { message } from 'antd'
import moment from 'moment'
import { conekta } from '../constants/conektaCredentials'

export const saveCard = push => async (model, context) => {
  // if (!model.sid) {
  //   message.error('Por favor selecciona una sucursal e intentalo de nuevo')
  //   return
  // }
  const publicKey = conekta[model.sid || '-LJ5w7hFuZxYmwiprTIY']
  window.Conekta.setPublicKey(publicKey)
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
    await makeCharge(push)({ ...model, token: id }, context)
    // context.setState({ loadingPayment: false })
  }

  var errorHandler = async ({ message_to_purchaser }) => {
    /* err keys: object, type, message, message_to_purchaser, param, code */
    await message.error(message_to_purchaser)
    context.setState({ loadingPayment: false })
  }

  window.Conekta.Token.create(data, successHandler, errorHandler)
}

export const deleteCard = id => {
  return db
    .ref('tarjeta')
    .child(id)
    .remove()
    .then(r => 202)
    .catch(e => 404)
}

export const payWithCard = push => (model, context) => {
  message.info('Estamos validando tu información')
  const userRef = db.ref('usuario').child(model.uid)
  // if (!model.sid) {
  //   message.error('Por favor selecciona una sucursal e intentalo de nuevo')
  //   return
  // }
  const publicKey = conekta[model.sid || '-LJ5w7hFuZxYmwiprTIY']
  window.Conekta.setPublicKey(publicKey)
  window.$.ajax({
    type: 'POST',
    url: 'https://reserva.impulsefitness.mx/api/_ctrl/ctrl.conekta.php',
    // url: 'ifsapi/_ctrl/ctrl.conekta.php',
    data: { data: model, exec: 'compra_creditos', suc: model.sid },
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
                  const { ilimitado = {}, expires: userExpires } = usuario
                  let inicio, fin
                  const now = moment()

                  if (typeof ilimitado[model.sid] === 'undefined') {
                    inicio = now.format()
                    fin = now.add(model.meses, 'M')
                  } else {
                    if (moment(ilimitado[model.sid].fin) < now) {
                      inicio = now.format()
                      fin = now.add(model.meses, 'M')
                    } else {
                      inicio = ilimitado[model.sid].inicio
                      fin = moment(ilimitado[model.sid].fin).add(
                        model.meses,
                        'M'
                      )
                    }
                  }
                  const expires =
                    moment(userExpires) > moment()
                      ? moment(userExpires)
                          .add(model.meses, 'M')
                          .format()
                      : moment()
                          .add(model.meses, 'M')
                          .format()

                  userRef
                    .update({
                      pagos,
                      ilimitado: {
                        ...ilimitado,
                        [model.sid]: {
                          inicio: moment(inicio).format(),
                          fin: moment(fin).format()
                        }
                      },
                      expires
                    })
                    .then(r => {
                      message.success('El paquete ilímitado se ha comprado')
                      push('/perfil')
                    })
                } else {
                  let sucursalCreditos = 0
                  const { expires: userExpires } = usuario
                  const expires =
                    moment(userExpires) > moment()
                      ? moment(userExpires)
                          .add(1, 'M')
                          .format()
                      : moment()
                          .add(1, 'M')
                          .format()
                  if (typeof usuario.creditos !== 'undefined') {
                    sucursalCreditos = +usuario['creditos'][model.sid]
                  }
                  if (!sucursalCreditos) sucursalCreditos = +model.creditos
                  else sucursalCreditos += +model.creditos

                  userRef
                    .update({
                      creditos: {
                        ...usuario.creditos,
                        [model.sid]: +sucursalCreditos
                      },
                      expires,
                      pagos
                    })
                    .then(() => {
                      message.success('El paquete se ha comprado')
                      push('/perfil')
                    })
                }
              } else if (model.type === 'subscripcion') {
                const expires = moment()
                  .add(1, 'M')
                  .format()
                userRef
                  .update({
                    status: 1,
                    last_class: model.fecha,
                    pagos,
                    expires
                  })
                  .then(() => {
                    message.success('Gracias por renovar tu suscripción')
                    push('/perfil')
                  })
              }
            })
        })
      }
    },
    error: function(r) {
      context.setState({ loadingPayment: false })
    }
  })
}

const makeCharge = push => async (model, context) => {
  const userRef = db.ref('usuario').child(model.uid)

  window.$.ajax({
    type: 'POST',
    url: 'https://reserva.impulsefitness.mx/api/_ctrl/ctrl.conekta.php',
    //url: 'ifsapi/_ctrl/ctrl.conekta.php',
    data: { data: model, exec: 'save', suc: model.sid },
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
                  payWithCard(push)(
                    {
                      ...model,
                      parent_id: cc.parent_id,
                      conekta_id: cc.id,
                      tarjeta: cc.brand,
                      last4: cc.last4
                    },
                    context
                  )
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
