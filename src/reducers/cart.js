// import { LOGIN, LOGOUT, REGISTER } from '../types'

export default (state = { clases: new Map() }, { payload, type }) => {
  switch (type) {
    case 'SET_CART':
      return payload
    default:
      return state
  }
}
