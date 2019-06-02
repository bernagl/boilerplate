import axios from 'axios'
import { db } from '../actions/firebase-config'

const getUsuarios = id => {
  return db
    .ref('horario')
    .child(id)
    .once('value')
    .then(async snap => {
      let { espera } = snap.val()
      const usuarios = []
      if (typeof espera === 'undefined') espera = {}
      const usuariosPromise = Object.keys(espera).map(uid => {
        if (espera[uid]) {
          return db
            .ref('usuario')
            .child(uid)
            .once('value')
            .then(usnap => ({ ...usnap.val(), id: usnap.key }))
        }
      })

      const usuariosResolve = await Promise.all(usuariosPromise)
      return usuariosResolve.filter(v => v && v)
    })
}

export const sendMail = async event => {
  const users = await getUsuarios(event.id)
  //   if(users.length === 0) return
  const form = new FormData()
  form.append('event', JSON.stringify(event))
  form.append(
    'data',
    JSON.stringify([
      ...users,
      { correo: 'luisb.galo@gmail.com', nombre: 'Luis Bernardo Garcia Lopez' }
    ])
  )
  debugger
  form.append('type', '__qeue_notification__')
  axios
    .post('https://admin.impulsefitness.mx/sendgrid/index.php', form, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    .then(r => {
      //   console.log(r)
      return 202
      // this.setState({ loading: false, filepath })
    })
    .catch(e => {
      //   console.log(e)
      return 404
    })
}
