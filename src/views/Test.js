import React from 'react'
import { db } from '../actions/firebase-config'
import moment from 'moment'

export default class Test extends React.Component {
  state = { clases: [] }
  componentDidMount() {
    db.ref('horario')
      .once('value')
      .then(snapshot => {
        const clases = []
        // snapshot.forEach(clase => clases.push({ ...clase.val(), id: clase.id }))
        snapshot.forEach(snap => {
          const clase = snap.val()
          const fin = moment(clase.fin)
          const finm = fin.add(30, 'm')
          if (clase.clase.nombre === 'SPEED') return
          clases.push({
            ...clase,
            id: snap.key,
            fin: moment(finm).format()
          })
        })
        this.setState({ clases })
      })
  }

  updateClases = () => {
    // const { clases } = this.state
    // clases.map(clase => {
    //   db.ref('horario')
    //     .child(clase.id)
    //     .update({ ...clase })
    // })
  }

  render() {
    const { clases } = this.state
    // localStorage.setItem('clasesifs', JSON.stringify(clases))
    // console.log(clases)
    return (
      <div>
        <button onClick={this.updateClases}>Update</button>
      </div>
    )
  }
}
