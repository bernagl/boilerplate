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

export const cancelarClase = ({ sid, costo, cid, uid }) => {
  const userRef = db.ref('usuario').child(uid)
  const classRef = db.ref('horario').child(cid)
  return userRef.once('value').then(snapshot => {
    const { clases: uclases, creditos: ucreditos } = snapshot.val()
    const creditos = { ...ucreditos, [sid]: ucreditos[sid] + costo }
    const clases = { ...uclases, [cid]: 2 }
    return classRef.once('value').then(sclase => {
      const { inscritos: ci, inscritos_numero: cin } = sclase.val()
      const inscritos_numero = cin > 0 ? cin - 1 : 0
      const inscritos = { ...ci, [uid]: false }
      return classRef.update({ inscritos, inscritos_numero }).then(r => {
        userRef.update({ clases, creditos }).then(r => 202)
      })
    })
  })
  // .update({ creditos })
  // .then(r =>
  //   db
  //     .ref('usuario/' + uid + '/clases')
  //     .child(id)
  //     .update({ reservada: false, status: 2 })
  //     .then(r => 202)
  // )
}
