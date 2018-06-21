import React from 'react'
import { db } from '../actions/firebase-config'

const gimnasio = {
  nommbre: 'Gym 2',
  direccion: {
    coordenadas: { lat: 1, lng: 2 },
    calle: 'Mariano azuela',
    colonia: 'Vista Hermosa',
    ciudad: 'Monterrey',
    cp: '89820',
    numero: '111A'
  },
  status: 1
}

const profesor = {
  nombre: 'Luis Miguel',
  edad: 23,
  gimnasio: '-LFUK6uLPvgOUTQkOh3b',
  correo: 'mike@mobkii.com',
  telefono: '8311381381',
  status: 1
}

const clase = {
  nombre: 'Aeróbics',
  profesor: '-LFUNVPQNazEzeVWz_6s',
  gimnasio: '-LFUK6uLPvgOUTQkOh3b',
  salon: '',
  costo_creditos: 1,
  hora_inicio: '12:00',
  hora_fin: '13:30',
  fecha: '2018-06-27',
  cupo: 15,
  inscritos: 0
}

export default class Fake extends React.Component {
  agregar = () => {
    // db.ref('clases').set({ nombre: 'Bernardo García', edad: 23, gimnasio})
    db.ref('clase').push(clase)
  }
  render() {
    return (
      <div>
        <button onClick={this.agregar}>Agregar</button>
      </div>
    )
  }
}
