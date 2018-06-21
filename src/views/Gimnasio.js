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
import { getGimnasios } from '../actions/gimnasio'

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
    week: 0,
    events: [],
    creditos: 5,
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
    this.props.getGimnasios()
    this.props.getClases()
    const { creditos, clases } = this.props.cart
    this.setState({
      creditos,
      clases: clases ? clases : new Map()
    })
  }

  componentWillReceiveProps(newProps) {
    const {
      auth: { creditos },
      clases,
      gimnasios
    } = newProps
    const gyms = []
    if (clases.length > 0 && gimnasios.length > 0) {
      gimnasios.map((gym, i) => {
        clases.map(clase => {
          clase.gimnasio === gym.id && gimnasios[i].events.push({ ...clase })
        })
      })

      this.setState({ creditos, gimnasios }, () =>
        this.handleGym(this.state.gymSelected)
      )
    }
  }

  handleGym = i => {
    const { gimnasios } = this.state
    this.setState({ events: gimnasios[i].events, gymSelected: i }, () =>
      this.daysHandler()
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
      const evts = events.filter(
        (e, j) => moment(day).format('L') === moment(e.fecha).format('L')
      )
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

  eventHandler = event => {
    const { clases, creditos } = this.state
    let c = creditos
    let isSet = clases.has(event.id)

    if (creditos >= 1) {
      isSet
        ? (clases.delete(event.id), (c += 1), message.warning('Clase devuelta'))
        : (clases.set(event.id, event),
          (c -= 1),
          message.success(`Clase ${event.nombre} agregada`))
      this.setState({ clases, creditos: c })
    } else {
      isSet
        ? (clases.delete(event.id), (c += 1), message.warning('Clase devuelta'))
        : message.error('No tienes suficientes créditos')
      this.setState({ clases, creditos: c })
    }
  }

  setCheckout = () => {
    const { clases, creditos } = this.state
    clases.size === 0
      ? message.error('Para proceder al pago debes agregar al menos una clase')
      : (this.props.setCheckout({ clases, creditos }),
        this.props.history.push('/checkout'))
  }

  render() {
    const { dates, creditos, dias, clases, gymSelected, gimnasios } = this.state
    // const { auth } = this.props
    // console.log(gimnasios)
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
                  <span>Créditos disponibles: {creditos}</span> <br />
                  {clases.size > 0 && <span>Tienes {clases.size} clases</span>}
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
  { getClases, getGimnasios, setCheckout }
)(Gimnasio)
