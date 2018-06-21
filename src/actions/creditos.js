import { auth, db } from './firebase-config'

export const comprarCreditos = ({ uid, metodo, creditos, fecha }) => dispatch => {
    console.log(uid, metodo, creditos, fecha)
}