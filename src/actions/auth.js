import { auth, db } from './firebase-config'
import { LOGIN, LOGOUT, REGISTER } from '../types'
import moment from 'moment'
import { message } from 'antd'

export const register = ({
  correo,
  contrasena,
  nombre,
  telefono,
  // edad,
  fecha_nacimiento
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
        nombre,
        status: 0,
        telefono,
        clases: {},
        creditos: { '-LJ5w7hFuZxYmwiprTIY': 1, '-LPrNpstwZt7J3NLUJXc': 1 },
        created_at: moment().format(),
        tarjetas: {},
        expires: moment()
          .add(1, 'M')
          .format(),
        invitado: true,
        fecha_nacimiento: fecha_nacimiento || moment().format()
      })
      .then(result => {
        dispatch({
          type: REGISTER,
          payload: {
            correo,
            contrasena,
            nombre,
            telefono,
            invitado: true,
            expires: moment()
              .add(1, 'M')
              .format(),
            uid: user.uid,
            status: 0,
            clases: new Map(),
            creditos: { '-LJ5w7hFuZxYmwiprTIY': 1, '-LPrNpstwZt7J3NLUJXc': 1 },
            tarjetas: [],
            logs: [],
            fecha_nacimiento: fecha_nacimiento || moment().format()
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
  auth.onAuthStateChanged(function(user) {
    // console.log(user.uid)
    if (user) {
      getUser(params, user.uid)(dispatch)
    } else {
      dispatch({ type: LOGOUT })
      params.setState({ loading: false })
    }
  })
}

export const updateAuth = (params, uid) => async dispatch => {
  getUser(params, uid)(dispatch)
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

const getUser = (params, uid) => dispatch => {
  let clases = new Map()
  let pagos = []

  db.ref(`usuario/${uid}`).on('value', async snapshot => {
    let { clases: uclases, ilimitado } = snapshot.val()
    let isIlimitado = false
    if (typeof uclases === 'undefined') uclases = {}
    if (typeof ilimitado === 'undefined') isIlimitado = false
    else {
      if (moment().format() > moment(ilimitado.fin).format()) {
        isIlimitado = false
      } else {
        isIlimitado = true
      }
    }
    const clasesPromise = Object.keys(uclases).map(clase =>
      db
        .ref('horario')
        .child(clase)
        .once('value')
        .then(csnap => {
          const c = csnap.val()
          const status = c['status']
            ? c['status'] === 2
              ? 4
              : uclases[clase]
            : uclases[clase]
          clases.set(clase, {
            ...c,
            id: csnap.key,
            status
          })
        })
    )

    const clasesResolve = await Promise.all(clasesPromise)
    db.ref('usuario')
      .child(uid)
      .once('value', async snap => {
        let { tarjetas: cards, logs: userLogs } = snap.val()
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
        const logsPromise =
          typeof userLogs === 'undefined'
            ? []
            : Object.keys(userLogs).map(id =>
                db
                  .ref('log')
                  .child(id)
                  .once('value')
                  .then(r => {
                    const log = r.val()
                    if (log) return { ...log, lid: r.key }
                  })
              )
        const logs = await Promise.all(logsPromise)
        logs.sort((a, b) =>
          moment(a.fecha) - moment(b.fecha)
            ? -1
            : moment(a.fecha) > moment(b.fecha)
            ? 1
            : 0
        )
        const tarjetasResolve = await Promise.all(tarjetasPromise)
        const tarjetas = tarjetasResolve.filter(tarjeta => tarjeta && tarjeta)
        dispatch({
          type: LOGIN,
          payload: {
            uid: uid,
            ...snapshot.val(),
            clases,
            logs,
            isIlimitado,
            tarjetas,
            pagos
          }
        })
        params.setState({ loading: false })
      })
  })
}
