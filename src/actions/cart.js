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
                  console.log(clase)
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
                            .push({ id_clase: clase.id, cola: false, status: 0, ...cl })
                        })
                    } else {
                      db.ref('clase/' + clase.id)
                        .child('cola')
                        .push({
                          uid: props.uid
                        })
                        .then(r => {
                          db.ref('usuario')
                            .child(props.uid + '/clases')
                            .push({ id_clase: clase.id, status: 0, ...cl })
                        })
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
