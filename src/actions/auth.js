import { auth, db } from './firebase-config'
import { LOGIN, LOGOUT, REGISTER } from '../types'

export const register = ({ correo, contrasena, nombre }) => async dispatch => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(
      correo,
      contrasena
    )
    return db
      .ref(`usuario/${user.uid}`)
      .set({ correo, nombre })
      .then(result => {
        dispatch({
          type: REGISTER,
          payload: { correo, contrasena, nombre, uid: user.uid }
        })
        return user.uid
      })
  } catch (e) {
    return false
  }
}

export const login = ({ correo, contrasena }) => async dispatch => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(correo, contrasena)
    return db
      .ref(`usuario/${user.uid}`)
      .update({ last_login: Date.now() })
      .then(result => {
        db.ref(`usuario/${user.uid}`).on('value', snapshot => {
          dispatch({ type: LOGIN, payload: { ...snapshot.val() } })
        })
        return user.uid
      })
  } catch (e) {
    console.error(e)
    return false
  }
}

export const getAuth = params => async dispatch => {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      db.ref(`usuario/${user.uid}`).on('value', snapshot => {
        dispatch({ type: LOGIN, payload: { uid: user.uid, ...snapshot.val() } })
        params.setState({ loading: false })
      })
      // dispatch({ type: LOGIN, payload: user.uid })
    } else {
      dispatch({ type: LOGOUT })
      params.setState({ loading: false })
    }
  })
}

export const recover = ({ correo }) => {
  // try {
  //   const r = await auth.sendPasswordResetEmail(correo)
  //   return r && 202
  // } catch (error) {
  //   return false
  // }

  return auth
    .sendPasswordResetEmail(correo)
    .then(r => 202)
    .catch(e => false)
}

export const currentUser = async params => {
  const user = await auth.currentUser
  user ? user : true
}

export const logout = () => async dispatch => {
  auth
    .signOut()
    .then(function() {
      dispatch({ type: LOGOUT })
      console.log('Sign-out successful')
    })
    .catch(function(error) {
      console.log('An error happened.')
    })
}
