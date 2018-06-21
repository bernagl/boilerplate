import { GET_GIMNASIOS } from '../types'
import Gimnasio from '../views/Gimnasio'

export default function(state = [], { type, payload }) {
  switch (type) {
    case GET_GIMNASIOS:
      return payload
    default:
      return state
  }
}
