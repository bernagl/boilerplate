import { auth, db } from './firebase-config'

export const comprarCreditos = ({
  uid,
  metodo,
  creditos,
  fecha
}) => dispatch => {
  return db
    .ref('usuario/' + uid)
    .once('value', data => {
      const usuario = data.val()
      db.ref('usuario/' + uid)
        .update({ creditos: usuario.creditos + creditos })
        .then(r => true)
    })
    .then(r => true)
  //   console.log(uid, metodo, creditos, fecha)
}
