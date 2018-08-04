import { db } from './firebase-config'

export const comprarCreditos = ({
  uid,
  metodo,
  paquete,
  fecha
}) => dispatch => {
  return db
    .ref('usuario/' + uid)
    .once('value', data => {
      const usuario = data.val()
      db.ref('usuario/' + uid)
        .update({ creditos: usuario.creditos + paquete.creditos })
        .then(r =>
          db
            .ref('compra')
            .push({
              nombre: usuario.nombre,
              correo: usuario.correo,
              telefono: usuario.telefono,
              fecha,
              creditos: paquete.creditos,
              precio: paquete.precio,
              paquete: paquete.nombre,
              metodo
            })
            .then(r => true)
        )
    })
    .then(r => true)
}
