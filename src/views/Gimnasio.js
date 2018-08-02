import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import { setCheckout } from '../actions/cart'
import { Button, Icon, message, Radio } from 'antd'
import moment from 'moment-timezone'
import 'moment/locale/es'
import { Body, Header } from '../components/Calendario'
import { getClases } from '../actions/clase'
import { getGimnasiosByStatus } from '../actions/gimnasio'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
moment.locale('es')
moment.tz.setDefault('America/Mexico_City')
message.config({
  duration: 2,
  maxCount: 3
})

class Gimnasio extends Component {
  state = {
    gymSelected: 0,
    gimnasios: [],
    clasesCount: 0,
    week: 0,
    events: [],
    creditos: 5,
    menosCreditos: 0,
    clases: new Map(),
    month: moment().format('MMMM'),
    dates: [],
    dias: [
      { name: 'Lunes', events: [] },
      { name: 'Martes', events: [] },
      { name: 'Miércoles', events: [] },
      { name: 'Jueves', events: [] },
      { name: 'Viernes', events: [] },
      { name: 'Sábado', events: [] },
      { name: 'Domingo', events: [] }
    ]
  }

  componentDidMount() {
    this.props.getGimnasiosByStatus(1)
    this.props.getClases()
    const { creditos } = this.props.cart
    const { clases } = this.props.auth
    this.setState({
      creditos,
      clases: new Map(clases)
    })
  }

  componentWillReceiveProps(newProps) {
    const { clases, gimnasios } = newProps
    const { gymSelected } = this.state
    const gyms = []
    if (clases.length > 0 && gimnasios.length > 0) {
      gimnasios.map((gym, i) => {
        clases.map(clase => {
          clase.gimnasio.id === gym.id &&
            clase.status !== 2 &&
            gimnasios[i].events.push({ ...clase })
        })
      })

      this.setState({ gimnasios }, () => this.handleGym(gymSelected))
    }
  }

  handleGym = i => {
    const { gimnasios } = this.state
    const {
      auth: { creditos: c }
    } = this.props
    const creditos =
      gimnasios.length > 0 ? (c[gimnasios[i].id] ? c[gimnasios[i].id] : 0) : 0
    this.setState(
      { creditos, events: gimnasios[i].events, gymSelected: i },
      () => this.daysHandler()
    )
  }

  daysHandler = sum => {
    const { events, dias, week } = this.state
    const weekNumber = sum ? week + 1 : week === 0 ? 0 : week - 1
    var startOfWeek = moment()
      .add(weekNumber, 'weeks')
      .startOf('isoWeek')
    var endOfWeek = moment()
      .add(weekNumber, 'weeks')
      .endOf('isoWeek')

    var days = []
    var day = startOfWeek

    while (day <= endOfWeek) {
      days.push(day.toDate())
      day = day.clone().add(1, 'd')
    }
    let d = [...dias]
    days.map((day, i) => {
      const evts = events.filter((e, j) => moment(day).format('L') === e.fecha)
      d[i] = { events: evts, name: d[i].name }
    })

    const month = moment(startOfWeek).format('MMMM')
    this.setState({
      week: weekNumber,
      dates: days,
      dias: d,
      month
    })
  }

  eventHandler = (event, cola) => {
    const { clases, clasesCount: cc, creditos } = this.state
    let c = creditos
    let isSet = clases.has(event.id)
    let clase = clases.get(event.id)
    let clasesCount = cc
    if (isSet && clase.status === 0) {
      message.error('Para cancelar la clase debe ser desde tu perfil')
      return
    } else if (isSet && clase.status === 2) {
      clases.delete(event.id)
      isSet = false
    }

    if (cola) {
      if (
        !window.confirm(
          '¿Esta clase ya está llena, deseas que te agreguemos a la cola?'
        )
      )
        return
    }

    if (creditos >= 1) {
      isSet
        ? (clases.delete(event.id),
          (clasesCount -= 1),
          (c += 1),
          message.warning('Clase devuelta'))
        : (clases.set(event.id, { status: 1, cola, ...event }),
          (c -= 1),
          (clasesCount += 1),
          message.success(`Clase ${event.clase.nombre} agregada`))
      this.setState({ clases, creditos: c, clasesCount })
    } else {
      isSet
        ? (clases.delete(event.id),
          (c += 1),
          (clasesCount -= 1),
          message.warning('Clase devuelta'))
        : message.error('No tienes suficientes créditos')
      this.setState({ clases, creditos: c, clasesCount })
    }
  }

  setCheckout = () => {
    const { clases, creditos, gimnasios } = this.state
    clases.size === 0
      ? message.error('Para proceder al pago debes agregar al menos una clase')
      : (this.props.setCheckout({ clases, creditos, gimnasios }),
        this.props.history.push('/checkout'))
  }

  render() {
    const {
      dates,
      clasesCount,
      creditos,
      dias,
      clases,
      gymSelected,
      gimnasios,
      menosCreditos
    } = this.state

    return (
      <AnimationWrapper>
        {/* <div className="row align-items-center"> */}
        <div className="col-12 my-4">
          <div className="row">
            <div className="col-12 container-shadow p-2 p-md-4">
              <div className="row">
                <div className="col-12">
                  <h1 className="inline-block">Clases</h1>
                  <Button
                    type="primary"
                    size="large"
                    onClick={this.setCheckout}
                    style={{ float: 'right' }}
                    className="btn-morado"
                  >
                    Checkout
                    <Icon type="right" />
                  </Button>
                </div>
                <div className="col-12">
                  <span>Créditos disponibles: {creditos}</span>
                  <br />
                  {clasesCount > 0 && <span>Tienes {clasesCount} clases</span>}
                  {creditos === 0 && (
                    <span className="no-credits-label fade">
                      Ya no tienes créditos disponibles,{' '}
                      <Link to="/comprar">comprar créditos</Link>
                    </span>
                  )}
                </div>
                <div className="col-12 center-text my-4 my-md-0">
                  <RadioGroup defaultValue={gymSelected} size="large">
                    {gimnasios.map((gym, i) => (
                      <RadioButton
                        value={gym.id}
                        onClick={() => this.handleGym(i)}
                        key={i}
                      >
                        {gym.nombre}
                      </RadioButton>
                    ))}
                  </RadioGroup>
                </div>
                <div className="col-12">
                  <div className="calendar-container">
                    <Button
                      type="primary"
                      onClick={() => this.daysHandler(0)}
                      className="box-button"
                    >
                      <Icon type="left" />
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => this.daysHandler(1)}
                      className="box-button"
                    >
                      <Icon type="right" />
                    </Button>
                    <Header dates={dates} dias={dias} />
                    <Body
                      clases={clases}
                      dates={dates}
                      dias={dias}
                      eventHandler={this.eventHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth, cart, clases, gimnasios }) => ({
  auth,
  clases,
  cart,
  gimnasios
})

export default connect(
  mapStateToProps,
  { getClases, getGimnasiosByStatus, setCheckout }
)(Gimnasio)
