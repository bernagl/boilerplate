import { db } from './firebase-config'
import axios from 'axios'

export const saveCard = async model => {
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
    console.log(id)
    makeCharge({ ...model, token: id })
  }

  var errorHandler = function(err) {
    /* err keys: object, type, message, message_to_purchaser, param, code */
    console.log(err)
  }

  window.Conekta.Token.create(data, successHandler, errorHandler)
}

export const deleteCard = id => {
  console.log(id)
  return db
    .ref('tarjeta')
    .child(id)
    .remove()
    .then(r => 202)
    .catch(e => 404)
}

export const payWithCard = model => {
  console.log(model)
  const userRef = db.ref('usuario').child(model.uid)
  window.$.ajax({
    type: 'POST',
    url: 'ifs/_ctrl/ctrl.conekta.php',
    data: { data: model, exec: 'compra_creditos' },
    dataType: 'json',
    success: function(r) {
      userRef.once('value').then(usnap => {
        const usuario = usnap.val()
        db.ref('pago')
          .push({ ...r.info })
          .then(r => {
            const cid = r.key
            let sucursalCreditos = usuario['creditos'][model.sid]
            if (!sucursalCreditos) sucursalCreditos = model.creditos
            else sucursalCreditos += model.creditos
            userRef.update({
              creditos: usuario.creditos + model.creditos,
              creditos: { [model.sid]: sucursalCreditos },
              pagos: { ...usuario.pagos, [cid]: true }
            })
          })
      })
    },
    error: function(r) {
      console.log(r)
    }
  })
}

const makeCharge = async model => {
  const userRef = db.ref('usuario').child(model.uid)

  window.$.ajax({
    type: 'POST',
    url: 'ifs/_ctrl/ctrl.conekta.php',
    data: { data: model, exec: 'save' },
    dataType: 'json',
    success: function({ cc }) {
      db.ref('tarjeta')
        .push({ ...cc, uid: model.uid, fecha: model.fecha, status: 1 })
        .then(tsnap => {
          const id = tsnap.key
          userRef.once('value').then(snapshot => {
            const usuario = snapshot.val()
            userRef
              .update({ tarjetas: { ...usuario.tarjetas, [id]: true } })
              .then(r => {
                payWithCard({
                  ...model,
                  parent_id: cc.parent_id,
                  conekta_id: cc.id,
                  tarjeta: cc.brand,
                  last4: cc.last4,
                })
              })
          })
        })
        .catch(e => 404)
    },
    error: function(r) {
      console.log(r)
    }
  })
}
