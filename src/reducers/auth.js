import { LOGIN, LOGOUT, REGISTER } from '../types'

// const INITIAL_STATE = {
//   nombre: null,
//   apellido: null,
//   correo: null,
//   telefono: null,
//   uid: null
// }

export default (state = null, { payload, type }) => {
  switch (type) {
    case LOGIN:
      return payload
    case LOGOUT:
      return null
    case REGISTER:
      return payload
    default:
      return state
  }
}
