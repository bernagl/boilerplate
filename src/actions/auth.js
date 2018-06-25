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
          payload: { correo, contrasena, nombre, uid: user.uid, creditos: 1 }
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
    const clases = []
    return db
      .ref(`usuario/${user.uid}`)
      .update({ last_login: Date.now() })
      .then(result => {
        db.ref(`usuario/${user.uid}`).once('value', snapshot => {
          db.ref('usuario/' + user.uid)
            .child('clases')
            .once('value', snap => {
              snap.forEach(clase =>
                clases.push({
                  id: clase.key,
                  ...clase.val(),
                  profesor: clase.val().profesor.nombre
                })
              )
              console.log('clases', clases)
              dispatch({
                type: LOGIN,
                payload: { uid: user.uid, ...snapshot.val(), clases }
              })
            })
        })
        return user.uid
      })
  } catch (e) {
    console.error(e)
    return false
  }
}

export const getAuth = params => async dispatch => {
  let clases = new Map()
  let pagos = []
  auth.onAuthStateChanged(function(user) {
    console.log(user)
    if (user) {
      db.ref(`usuario/${user.uid}`).on('value', snapshot => {
        db.ref('usuario/' + user.uid)
          .child('clases')
          .once('value', snap => {
            clases.clear()
            snap.forEach((clase, i) => {
              clases.set(clase.val().id_clase, {
                ...clase.val(),
                id: clase.key,
                profesor: clase.val().profesor.nombre
              })
            })
          })
          .then(r => {
            db.ref('usuario/' + user.uid)
              .child('pagos')
              .once('value', snapPagos => {
                pagos = []
                snapPagos.forEach(pago => {
                  db.ref('pago/' + pago.val().id).once('value', snapPago => {
                    pagos.push({ ...snapPago.val() })
                  })
                })
                dispatch({
                  type: LOGIN,
                  payload: { uid: user.uid, ...snapshot.val(), clases, pagos }
                })
              })
          })

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
