import { db } from './firebase-config'
import { GET_GIMNASIOS } from '../types'

export const getGimnasios = () => async dispatch => {
  const collection = []
  db.ref('gimnasio').on('value', function(snapshot) {
    snapshot.forEach(element => {
      collection.push({ id: element.key, ...element.val(), events: [] })
    })
    dispatch({ type: GET_GIMNASIOS, payload: collection })
  })
}
