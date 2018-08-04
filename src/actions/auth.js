import { auth, db } from './firebase-config'
import { LOGIN, LOGOUT, REGISTER } from '../types'
import { Object } from 'core-js'

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
  // let tarjetas = []
  auth.onAuthStateChanged(function(user) {
    console.log(user)
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
        console.log(clases)
        // db.ref('usuario/' + user.uid)
        //   .child('clases')
        //   .once('value', snap => {
        //     clases.clear()
        //     snap.forEach((clase, i) => {
        //       const value = clase.val()
        //       console.log(value)
        //       clases.set(value.id, {
        //         ...value,
        //         nombre: value.nombre,
        //         cuid: clase.key,
        //         profesor: value.instructor.nombre
        //       })
        //     })
        //   })
        // .then(r => {
        db.ref('usuario')
          .child(user.uid)
          .once('value', async snap => {
            let { tarjetas: cards } = snap.val()
            // const tarjetas = []
            if (typeof cards === 'undefined') cards = {}
            const tarjetasPromise = Object.keys(cards).map(card =>
              db
                .ref('tarjeta')
                .child(card)
                .once('value')
                .then(r => {
                  const tarjeta = r.val()
                  if (tarjeta) return { ...tarjeta, tid: r.key }
                  // return tarjeta && { ...tarjeta, tid: r.key }
                })
            )
            const tarjetasResolve = await Promise.all(tarjetasPromise)
            const tarjetas = tarjetasResolve.filter(
              tarjeta => tarjeta && tarjeta
            )
            console.log(...snapshot.val())
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
          })
        // })

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
