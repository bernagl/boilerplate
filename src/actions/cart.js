import { db } from './firebase-config'
import moment from 'moment'

export const setCheckout = props => dispatch => {
  dispatch({ type: 'SET_CART', payload: props })
}

export const confirmCheckout = props => {
  const usuarioRef = db.ref('usuario').child(props.uid)
  return usuarioRef.once('value').then(snapshot => {
    const usuario = snapshot.val()
    let ucreditos = usuario.creditos
    let { clases: uclases } = usuario
    if (typeof uclases === 'undefined') uclases = {}

    props.clases.forEach(clase => {
      const creditos = usuario.creditos[clase.gimnasio.id]
        ? usuario.creditos[clase.gimnasio.id]
        : 0
      if (creditos > 0) {
        db.ref('horario')
          .child(clase.id)
          .once('value')
          .then(snap => {
            const c = snap.val()
            if (c.cupo <= c.inscritos_numero) return 404
            const inscritos = c.inscritos
              ? { ...c.inscritos, [props.uid]: true }
              : { [props.uid]: true }
            // return db
            //   .ref('horario/' + clase.id)
            //   .child('inscritos')
            //   .push(usuario)
            //   .then(r => {
            return db
              .ref('horario')
              .child(clase.id)
              .update({ inscritos, inscritos_numero: c.inscritos_numero + 1 })
              .then(r => {
                const creditos = clase.costo ? clase.costo : 1
                ucreditos = {
                  ...ucreditos,
                  [clase.gimnasio.id]: ucreditos[clase.gimnasio.id] - +creditos
                }
                uclases = { ...uclases, [clase.id]: 1 }
                const last_class =
                  moment(usuario.last_class).format() >
                  moment(clase.inicio).format()
                    ? moment(usuario.last_class).format()
                    : moment(clase.inicio).format()
                return usuarioRef
                  .update({
                    creditos: { ...ucreditos },
                    clases: uclases,
                    last_class
                  })
                  .then(r => 202)
                  .catch(e => 404)
              })
              .catch(e => 404)
          })
          .catch(e => 404)
      } else {
        return 404
      }
    })
  })
}
