import { GET_GIMNASIOS } from '../types'

export default function(state = [], { type, payload }) {
  switch (type) {
    case GET_GIMNASIOS:
      return payload
    default:
      return state
  }
}
