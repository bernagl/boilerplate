import { auth, db } from './firebase-config'
import { LOGIN, LOGOUT, REGISTER } from '../types'

export const updateProfile = ({
  correo,
  nombre,
  telefono
}) => async dispatch => {
  const user = auth.currentUser
  console.log(correo, nombre, telefono)
  return user
    .updateProfile({
      displayName: nombre,
      photoUrl: ''
    })
    .then(e => {
      user.updateEmail(correo).then(e => {
        return true
        // user.updatePhoneNumber(telefono)
      }).catch(e => false)
    })
    .catch(e => false)
}
