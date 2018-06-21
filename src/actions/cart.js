import { db } from './firebase-config'

export const setCheckout = props => dispatch => {
  dispatch({ type: 'SET_CART', payload: props })
}

export const confirmCheckout = props => {
  let response = ''
  console.log(props)
  return db
    .ref('usuario/' + props.uid)
    .once('value', snapshot => {
      const usuario = snapshot.val()
      const creditos = usuario.creditos - props.creditos
      console.log(usuario)
      console.log(usuario.creditos, props.creditos)
      if (creditos >= 0) {
        db.ref('pago')
          .push({
            uid: props.uid,
            creditos: props.creditos,
            fecha: props.fecha
          })
          .then(r =>
            db
              .ref('usuario/' + props.uid)
              .child('pagos')
              .push({ id: r.getKey() })
              .then(r =>
                db
                  .ref('usuario')
                  .child(props.uid)
                  .update({ creditos })
              )
              .then(r => {
                props.clases.forEach(clase => {
                  db.ref('clase/' + clase.id).once('value', snapshot => {
                    const cl = snapshot.val()
                    console.log(cl.cupo, cl.inscritos + 1)
                    if (cl.cupo >= cl.inscritos + 1) {
                      db.ref('clase')
                        .child(clase.id)
                        .update({
                          inscritos: cl.inscritos + 1
                        })
                        .then(r => {
                          db.ref('usuario')
                            .child(props.uid + '/clases')
                            .push(cl)
                        })
                    } else {
                      return (response = 202)
                    }
                  })
                })
                return (response = 200)
              })
          )
      } else {
        return (response = 204)
      }
    })
    .then(r => response)
}
