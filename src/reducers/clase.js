import { GET_CLASES } from '../types'

export default function(state = [], { type, payload }) {
  switch (type) {
    case GET_CLASES:
      return payload
    default:
      return state
  }
}
