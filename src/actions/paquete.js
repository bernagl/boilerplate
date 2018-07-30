import { db } from './firebase-config'

export const getPaquetesByGym = context => gym => {
  return db
    .ref('paquete')
    .orderByChild('sucursal')
    .equalTo(gym)
    .once('value', snapshot => {
      const collection = []
      snapshot.forEach(snap => {
        const paquete = { ...snap.val(), id: snap.key }
        if (paquete.status === 1) collection.push(paquete)
      })
      context.setState({ paquetes: collection, paquete: null })
    })
    .catch(e => context.setState({ paquetes: [], paquete: null }))
}
