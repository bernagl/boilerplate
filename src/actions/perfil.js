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

export const getPagos = context => async uid => {
  db.ref('usuario')
    .child(uid)
    .on('value', async snapshot => {
      const { pagos: p } = snapshot.val()
      console.log(p)
      // const pagos = []
      if (!p) return
      const pagosPromise = Object.keys(p).map(pago => {
        return db
          .ref('pago')
          .child(pago)
          .once('value')
          .then(snap => ({ ...snap.val(), id: snap.key }))
      })

      const pagosResolve = await Promise.all(pagosPromise)
      const pagos = pagosResolve.sort(
        (a, b) => (a.fecha > b.fecha ? -1 : a.fecha < b.fecha ? 1 : 0)
      )
      context.setState({ pagos })
    })
}
