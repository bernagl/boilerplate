import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import EmptyState from '../components/EmptyState'
import SelectGym from '../components/SelectGym'
import { Button, Icon, Select } from 'antd'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { ReactCSSTransitionGroup } from 'react-transition-group'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const { Option } = Select

BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

export default class Gimnasio extends Component {
  state = {
    gym: null,
    week: 0,
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
    ],
    events: [
      {
        title: 'Evento domingo',
        date: new Date('2018, 6, 10')
      },
      {
        title: 'Evento domingo',
        date: new Date('2018, 6, 17')
      },
      {
        title: 'Evento lunes',
        date: new Date('2018, 6, 4')
      },
      {
        title: 'Evento martes',
        date: new Date('2018, 6, 5')
      },
      {
        title: 'Evento mniercoles',
        date: new Date('2018, 6, 6')
      },
      {
        title: 'Evento mniercoles',
        date: new Date('2018, 6, 6')
      },
      {
        title: 'Evento mniersdsdsdsdsksmksnfksnfknskfnms ds kncoles',
        date: new Date('2018, 6, 6')
      },
      {
        title: 'Evento miercoles',
        date: new Date('2018, 6, 6')
      },
      {
        title: 'Evento jueves',
        date: new Date('2018, 6, 7')
      },
      {
        title: 'Evento viernes',
        date: new Date('2018, 6, 8')
      },
      {
        title: 'Evento sabado',
        date: new Date('2018, 6, 9')
      }
    ]
  }

  handleChange = gym => this.setState({ gym })

  componentDidMount() {
    this.daysHandler()
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
      d[i] = { ...dias[i], events: evts }
    })

    const month = moment(startOfWeek).format('MMMM')
    this.setState({
      week: weekNumber,
      dates: days,
      dias: d,
      month
    })
  }

  render() {
    const { auth, logout, updateProfile } = this.props
    const { dates, dias, gym, month } = this.state
    return (
      <div>
        <Button type="primary" onClick={() => this.daysHandler(0)}>
          <Icon type="left" />
        </Button>
        <Button type="primary" onClick={() => this.daysHandler(1)}>
          <Icon type="right" />
        </Button>
        {/* <button onClick={() => this.daysHandler(1)}>next week</button> */}
        <div className="row align-items-center">
          <div className="col-12 center-text">
            <Select onChange={this.handleChange} style={{ width: 120 }}>
              <Option value={1}>Gimnasio 1</Option>
              <Option value={2}>Gimnasio 2</Option>
            </Select>
          </div>
          <div className="col-12 p-md-0 p-3 calendar-container">
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
            <div className="week">
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
                        dias[i].events.map((ev, j) => (
                          <div className="col-12 day-event">{ev.title}</div>
                        ))
                      ) : (
                        <span style={{ fontSize: 14, textAlign: 'center', width: '100%' }}>
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
    )
  }
}

// const mapStateToProps = ({ auth }) => ({ auth })

// export default connect(mapStateToProps, { logout, updateProfile })(Perfil)
{
  /* <BigCalendar
              events={[
                {
                  id: 13,
                  title: 'Multi-day Event',
                  start: new Date('2018, 6, 3'),
                    end: new Date('2018, 6, 3')
                  },
                  {
                    id: 14,
                    title: 'Segundo Event',
                    start: new Date('2018, 6, 3'),
                    end: new Date('2018, 6, 3')
                  }
                ]}
                showMultiDayTimes
                defaultDate={new Date(2015, 3, 1)}
                defaultView={'week'}
                views={['week']}
                min={new Date('2018, 5, 3, 08:00')}
                max={new Date('2018, 5, 3, 08:00')}
                step={1}
              /> */
}
