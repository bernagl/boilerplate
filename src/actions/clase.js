import { db } from './firebase-config'
import { GET_CLASES } from '../types'

export const getClases = () => dispatch => {
  const collection = []
  db.ref('clase').on('value', function(snapshot) {
    snapshot.forEach(element => {
      collection.push({ id: element.key, ...element.val() })
    })
    dispatch({ type: GET_CLASES, payload: collection })
  })
}
