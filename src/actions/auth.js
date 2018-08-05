import { auth, db } from './firebase-config'
import { LOGIN, LOGOUT, REGISTER } from '../types'
import moment from 'moment'
import { message } from 'antd'

export const register = ({
  correo,
  contrasena,
  nombre,
  telefono,
  edad
}) => async dispatch => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(
      correo,
      contrasena
    )
    return db
      .ref(`usuario/${user.uid}`)
      .set({
        correo,
        edad,
        nombre,
        status: 0,
        telefono,
        clases: {},
        creditos: { '-LJ5w7hFuZxYmwiprTIY': 1 },
        created_at: moment().format(),
        tarjetas: {},
        invitado: true
      })
      .then(result => {
        dispatch({
          type: REGISTER,
          payload: {
            correo,
            edad,
            contrasena,
            nombre,
            telefono,
            invitado: true,
            uid: user.uid,
            // creditos: 1,
            status: 0,
            clases: new Map(),
            creditos: { '-LJ5w7hFuZxYmwiprTIY': 1 },
            tarjetas: []
          }
        })
        return user.uid
      })
  } catch ({ code }) {
    var errorText = ''
    switch (code) {
      case 'auth/invalid-email':
        errorText = 'El correo es inválido'
        break
      case 'auth/weak-password':
        errorText = 'La contraseña es muy sencilla, intenta con otra'
        break
      case 'auth/email-already-in-use':
        errorText = 'El correo ya está en uso, prueba con otro'
        break
      default:
        errorText = 'Ocurrió un error, por favor vuelve a intentarlo'
        break
    }
    message.error(errorText)
  }
}

export const login = ({ correo, contrasena }) => async dispatch => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(correo, contrasena)
    return user.uid
  } catch ({ code }) {
    if (code === 'auth/user-not-found')
      message.error('El correo no existe en nuestras base de datos')
    else message.error('Usuario y/o contraseña incorrectos')
    return false
  }
}

export const getAuth = params => async dispatch => {
  let clases = new Map()
  let pagos = []
  // let tarjetas = []
  auth.onAuthStateChanged(function(user) {
    if (user) {
      db.ref(`usuario/${user.uid}`).on('value', async snapshot => {
        let { clases: uclases } = snapshot.val()
        if (typeof uclases === 'undefined') uclases = {}
        const clasesPromise = Object.keys(uclases).map(clase =>
          db
            .ref('horario')
            .child(clase)
            .once('value')
            .then(c =>
              clases.set(clase, {
                ...c.val(),
                id: c.key,
                status: uclases[clase]
              })
            )
        )

        const clasesResolve = await Promise.all(clasesPromise)
        db.ref('usuario')
          .child(user.uid)
          .once('value', async snap => {
            let { tarjetas: cards } = snap.val()
            if (typeof cards === 'undefined') cards = {}
            const tarjetasPromise = Object.keys(cards).map(card =>
              db
                .ref('tarjeta')
                .child(card)
                .once('value')
                .then(r => {
                  const tarjeta = r.val()
                  if (tarjeta) return { ...tarjeta, tid: r.key }
                })
            )
            const tarjetasResolve = await Promise.all(tarjetasPromise)
            const tarjetas = tarjetasResolve.filter(
              tarjeta => tarjeta && tarjeta
            )
            dispatch({
              type: LOGIN,
              payload: {
                uid: user.uid,
                ...snapshot.val(),
                clases,
                tarjetas,
                pagos
              }
            })
            params.setState({ loading: false })
          })
      })
    } else {
      dispatch({ type: LOGOUT })
      params.setState({ loading: false })
    }
  })
}

export const recover = ({ correo }) => {
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
