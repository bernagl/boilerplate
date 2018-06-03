import { auth, db } from './firebase-config'
import { LOGIN, LOGOUT, REGISTER } from '../types'

export const updateProfile = ({ uid, correo, ...args }) => async dispatch => {
  console.log(...args)
  const user = auth.currentUser
  return user.updateEmail(correo).then(e => {
    console.log(e, 'e')
    return db
      .ref('usuario')
      .child('nuEyMAecMngcY7djXKVlMcJCpS13')
      .update({ ...args, correo })
      .then(e => true)
      .catch(e => false)
  })

  // return user
  //   .updateProfile({
  //     displayName: nombre,
  //     photoUrl: ''
  //   })
  //   .then(e => {
  //     user
  //       .updateEmail(correo)
  //       .then(e => {
  //         return true
  //       })
  //       .catch(e => false)
  //   })
  //   .catch(e => false)
}
