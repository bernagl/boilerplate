import { db } from './firebase-config'
import { GET_CLASES } from '../types'

export const getClases = () => dispatch => {
  const collection = []
  db.ref('horario').on('value', function(snapshot) {
    snapshot.forEach(element => {
      collection.push({ id: element.key, reservada: false, ...element.val() })
    })
    dispatch({ type: GET_CLASES, payload: collection })
  })
}

export const cancelarClase = ({ creditos, uid, id_clase }) => {
  return db
    .ref('usuario')
    .child(uid)
    .update({ creditos })
    .then(r =>
      db
        .ref('usuario/' + uid + '/clases')
        .child(id_clase)
        .update({ reservada: false, status: 2 })
        .then(r => 202)
    )
}
