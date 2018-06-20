import { auth, db } from './firebase-config'

export const updateProfile = ({ uid, correo, ...args }) => async dispatch => {
  const user = auth.currentUser
  return user.updateEmail(correo).then(e => {
    return db
      .ref('usuario')
      .child(uid)
      .update({ ...args, correo })
      .then(e => true)
      .catch(e => false)
  })
}
