import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import { setCheckout } from '../actions/cart'
import { Button, Icon, message, Radio, Select } from 'antd'
import moment from 'moment-timezone'
import 'moment/locale/es'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
moment.locale('es')
moment.tz.setDefault('America/Mexico_City')
const { Option } = Select
message.config({
  duration: 2,
  maxCount: 3
})

class Gimnasio extends Component {
  state = {
    gymSelected: 1,
    gimnasios: [
      {
        id: 1,
        name: 'Gimnasio 1',
        events: [
          {
            title: 'Aerobic',
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            id: 4,
            date: new Date('2018-06-05T23:59:59')
          },
          {
            title: 'Zumbazzzz',
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            id: 1,
            date: new Date('2018-06-10T23:59:59')
          },
          {
            title: 'Ritmos látino',
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            id: 2,
            date: new Date('2018-06-17T23:59:59')
          },
          {
            title: 'Zumba',
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            id: 3,
            date: new Date('2018-06-04T23:59:59')
          },
          {
            title: 'Zumba',
            id: 5,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-06T23:59:59')
          },
          {
            title: 'Ritmos látino',
            id: 6,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-06T23:59:59')
          },
          {
            title: 'Pesas',
            id: 7,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-06T23:59:59')
          },
          {
            title: 'Cardio',
            id: 8,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-06T23:59:59')
          },
          {
            title: 'Bicicleta',
            id: 9,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-14T23:59:59')
          },
          {
            title: 'Ritmos látino',
            id: 10,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-08T23:59:59')
          },
          {
            title: 'Zumbaaaaa',
            id: 11,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-09T23:59:59')
          }
        ]
      },
      {
        name: 'Gimnasio 2',
        id: 2,
        events: [
          {
            title: 'Ritmos látino',
            id: 12,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-06T23:59:59')
          },
          {
            title: 'Pesas',
            id: 13,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-06T23:59:59')
          },
          {
            title: 'Cardio',
            id: 14,
            profesor: 'Luis García',
            creditos: 1,
            hora_inicio: '10:00',
            hora_fin: '11:30',
            date: new Date('2018-06-07T23:59:59')
          }
        ]
      }
    ],
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
    // this.daysHandler()
    const { creditos, clases } = this.props.cart
    const { gimnasios } = this.state
    this.setState(
      {
        creditos: creditos,
        clases: clases ? clases : new Map()
      },
      () => this.handleGym(0)
    )
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
        (e, j) => moment(day).format('L') === moment(e.date).format('L')
      )
      d[i] = { events: evts }
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
          message.success(`Clase ${event.title} agregada`))
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
    const { auth, logout, updateProfile } = this.props
    const {
      dates,
      dias,
      clases,
      creditos,
      gymSelected,
      gimnasios,
      month,
      events
    } = this.state
    console.log(events)
    return (
      <AnimationWrapper>
        {/* <div className="row align-items-center"> */}
        <div className="col-12 my-4">
          <div className="row">
            <div className="col-12 container-shadow p-2 p-md-4">
              <div className="row">
                <div className="col-12">
                  <Button
                    type="primary"
                    size="large"
                    onClick={this.setCheckout}
                    style={{ float: 'right' }}
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
                <div className="col-12 center-text ">
                  {/* <Select onChange={this.handleChange} style={{ width: 120 }}>
                    <Option value={1}>Gimnasio 1</Option>
                    <Option value={2}>Gimnasio 2</Option>
                  </Select> */}
                  <RadioGroup defaultValue={gymSelected} size="large">
                    {gimnasios.map((gym, i) => (
                      <RadioButton
                        value={gym.id}
                        onClick={() => this.handleGym(i)}
                      >
                        {gym.name}
                      </RadioButton>
                    ))}
                    {/* <RadioButton value="b">Gimnasio 2</RadioButton> */}
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
                    <div className="week">
                      <div className="week-header hidden-sm show-lg">
                        {dates.map((e, i) => (
                          <div className="day row">
                            <div className="col-12 day-row">
                              <b>{dias[i].name}</b>
                              <br />
                              <b>{moment(e).format('DD MMMM')}</b>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="week week-events">
                      {dates.map((e, i) => (
                        <div className="day row">
                          <div className="col-12 hidden-lg day-row show-sm">
                            <b>{dias[i].name}</b>
                            <br />
                            <b>{moment(e).format('DD MMMM')}</b>
                          </div>
                          <div className="col-12">
                            <div className="row">
                              {dias[i].events.length > 0 ? (
                                dias[i].events.map((ev, j) => {
                                  const future = new Date(ev.date) >= new Date()
                                  return (
                                    <div
                                      className={`col-12 day-event fade ${clases.has(
                                        ev.id
                                      ) && 'active'} ${!future && 'disabled'}`}
                                      onClick={() =>
                                        future
                                          ? this.eventHandler(ev)
                                          : message.info(
                                              'Esta clase ya se venció'
                                            )
                                      }
                                    >
                                      <b>{ev.title}</b> <br />
                                      <span>{ev.profesor}</span>
                                      <br />
                                      <span>
                                        {ev.hora_inicio} - {ev.hora_fin}
                                      </span>
                                    </div>
                                  )
                                })
                              ) : (
                                <span
                                  style={{
                                    fontSize: 14,
                                    textAlign: 'center',
                                    width: '100%'
                                  }}
                                >
                                  No hay eventos
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

const mapStateToProps = ({ cart }) => ({ cart })

export default connect(
  mapStateToProps,
  { setCheckout }
)(Gimnasio)
