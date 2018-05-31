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

  // console.log('actions', { correo, contrasena })
}

export const login = ({ correo, contrasena }) => async dispatch => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(correo, contrasena)
    return db
      .ref(`usuario/${user.uid}`)
      .update({ last_login: Date.now() })
      .then(result => {
        dispatch({
          type: LOGIN,
          payload: { correo, contrasena, uid: user.uid }
        })
        console.log(user.uid)
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
      dispatch({ type: LOGIN, payload: user.uid })
    } else {
      dispatch({ type: LOGOUT })
    }
    params.setState({ loading: false })
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
