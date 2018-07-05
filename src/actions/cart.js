import { db } from './firebase-config'

export const setCheckout = props => dispatch => {
  dispatch({ type: 'SET_CART', payload: props })
}

export const confirmCheckout = props => {
  const usuarioRef = db.ref('usuario').child(props.uid)
  // const claseRef = db.ref('horario').child(clase.id)
  return usuarioRef.once('value').then(snapshot => {
    const usuario = snapshot.val()
    console.log('usuario', usuario)
    props.clases.forEach(clase => {
      if (usuario.creditos > 0) {
        console.log('usuario.creditos', usuario.creditos)
        db.ref('horario')
          .child(clase.id)
          .once('value')
          .then(snap => {
            const c = snap.val()
            return db
              .ref('horario/' + clase.id)
              .child('inscritos')
              .push(usuario)
              .then(r => {
                db.ref('horario')
                  .child(clase.id)
                  .update({ inscritos_numero: c.inscritos_numero + 1 })
                  .then(r => {
                    const creditos = clase.creditos ? clase.creditos : 1
                    return usuarioRef
                      .update({ creditos: usuario.creditos - creditos })
                      .then(r => {
                        usuarioRef
                          .child('clases')
                          .push({ ...clase, status: 0 })
                          .then(r => 202)
                      })
                      .catch(e => 404)
                  })
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
