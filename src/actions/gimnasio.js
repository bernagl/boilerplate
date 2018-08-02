import { db } from './firebase-config'
import { GET_GIMNASIOS } from '../types'

export const getGimnasios = () => async dispatch => {
  const collection = []
  db.ref('sucursal').once('value', function(snapshot) {
    snapshot.forEach(element => {
      collection.push({ id: element.key, ...element.val(), events: [] })
    })
    dispatch({ type: GET_GIMNASIOS, payload: collection })
  })
}

export const getGimnasiosByStatus = status => async dispatch => {
  const ref = db.ref('sucursal')
  return ref
    .orderByChild('status')
    .equalTo(status)
    .once('value')
    .then(snapshot => {
      const collection = []
      snapshot.forEach(snap => {
        collection.push({ ...snap.val(), id: snap.key, events: [] })
      })
      dispatch({ type: GET_GIMNASIOS, payload: collection })
    })
}
