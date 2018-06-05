// import { LOGIN, LOGOUT, REGISTER } from '../types'

export default (
  state = { clases: new Map(), creditos: 4 },
  { payload, type }
) => {
  switch (type) {
    case 'SET_CART':
      return payload
    default:
      return state
  }
}
