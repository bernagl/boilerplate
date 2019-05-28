import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import { setCheckout } from '../actions/cart'
import { Button, Icon, message, Radio } from 'antd'
import Affix from 'antd/lib/affix'
import moment from 'moment-timezone'
import 'moment/locale/es'
import { Body, Header } from '../components/Calendario'
import { agregarEnEspera, getClases } from '../actions/clase'
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
    creditos: 0,
    menosCreditos: 0,
    clases: new Map(),
    month: moment().format('MMMM'),
    sid: null,
    sucursalSelected: null,
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
    const { expires, clases, isIlimitado, ilimitado } = this.props.auth

    this.setState({
      creditos,
      expires,
      isIlimitado,
      ilimitadoFin: isIlimitado ? ilimitado.fin : null,
      clases: new Map(clases)
    })
  }

  componentWillReceiveProps(newProps) {
    let {
      auth: { creditos },
      clases,
      gimnasios
    } = newProps
    if (clases === this.props.clases) return
    let sucursales = {}
    if (typeof creditos === 'undefined') creditos = {}
    gimnasios.map(
      gym =>
        (sucursales = {
          ...sucursales,
          [gym.id]: { creditos: creditos[gym.id], nombre: gym.nombre }
        })
    )
    if (clases.length > 0 && gimnasios.length > 0) {
      gimnasios.map((gym, i) => {
        clases.map(clase => {
          clase.gimnasio.id === gym.id &&
            clase.status !== 2 &&
            gimnasios[i].events.push({ ...clase })
        })
      })

      const defaultGym =
        +creditos['-LJ5w7hFuZxYmwiprTIY'] > 0
          ? 0
          : +creditos['-LPrNpstwZt7J3NLUJXc'] > 0
          ? 1
          : 0

      const sid = gimnasios[defaultGym].id
      this.setState(
        {
          gimnasios,
          sucursales,
          gymSelected: defaultGym
        },
        () => this.handleGym(defaultGym, sid)
      )
    }
  }

  handleGym = (i, sid) => {
    const { gimnasios } = this.state
    const {
      auth: { clases, creditos: c, ilimitado }
    } = this.props
    const { isUnlimited, fecha: fechaUnlimited } = this.checkUnlimited(
      ilimitado,
      sid
    )
    
    const creditos = c[sid] ? c[sid] : 0
    this.setState(
      {
        events: gimnasios[i].events,
        gymSelected: i,
        sid,
        isUnlimited,
        fechaUnlimited,
        clases: new Map(clases),
        clasesCount: 0,
        creditos
      },
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
      const evts = events.filter(
        (e, j) =>
          moment(day).format('MM-DD-YYYY') ===
            moment(e.fecha).format('MM-DD-YYYY') ||
          moment(day).format('L') === e.fecha
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

  eventHandler = async (event, cola) => {
    const {
      gymSelected,
      gimnasios,
      clases,
      clasesCount: cc,
      sucursales,
      // isIlimitado,
      // ilimitadoFin,
      expires,
      creditos,
      sid
    } = this.state
    const { ilimitado } = this.props.auth

    const gymId = gimnasios[gymSelected].id
    const sucursalNombre = gimnasios[gymSelected].nombre
    const { isUnlimited, fecha } = this.checkUnlimited(ilimitado, sid)
    // const creditos = sucursales[gymId].creditos ? sucursales[gymId].creditos : 0
    let c = creditos
    let isSet = clases.has(event.id)
    let clase = clases.get(event.id)
    let clasesCount = cc
    if (isSet && clase.status === 1) {
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
      else {
        const r = await agregarEnEspera({
          uid: this.props.auth.uid,
          cid: event.id
        })
        r === 202
          ? message.success(
              'Fuiste agregado a la lista de espera, si un usuario cancela la clase se t enotificará'
            )
          : message.error('Ocurrió un error, por favor vuelve a intentarlo')
        return
      }
    }

    if (creditos >= 1 || isUnlimited) {
      if (isUnlimited) {
        if (moment(fecha) < moment(event.inicio)) {
          message.error('El paquete ilimitado no abarca esta fecha')
          return
        }
      } else {
        if (moment(expires) < moment(event.inicio)) {
          message.error('Tus créditos expiran antes de la clase seleccionada')
          return
        }
      }
      isSet
        ? (clases.delete(event.id),
          (clasesCount -= 1),
          (c += 1),
          message.warning('Clase devuelta'))
        : (clases.set(event.id, { ...event, status: 3, cola }),
          (c -= 1),
          (clasesCount += 1),
          message.success(`Clase ${event.clase.nombre} agregada`))
      this.setState({
        clases,
        creditos: c,
        sucursales: {
          ...sucursales,
          [gymId]: { creditos: c, nombre: sucursalNombre }
        },
        clasesCount
      })
    } else {
      isSet
        ? (clases.delete(event.id),
          (c += 1),
          (clasesCount -= 1),
          message.warning('Clase devuelta'))
        : message.error('No tienes suficientes créditos')
      this.setState({
        clases,
        creditos: c,
        clasesCount,
        sucursales: {
          ...sucursales,
          [gymId]: { creditos: c, nombre: sucursalNombre }
        }
      })
    }
  }

  setCheckout = () => {
    const {
      clases,
      clasesCount,
      creditos,
      gimnasios,
      sucursales,
      sid
    } = this.state

    if (this.props.auth.status !== 1) {
      message.error(
        'Para poder reservar es necesario que tengas una suscripción activa'
      )

      return
    }
    clasesCount === 0
      ? message.error('Para proceder al pago debes agregar al menos una clase')
      : (this.props.setCheckout({
          clases,
          creditos,
          gimnasios,
          sucursales,
          sid
        }),
        this.props.history.push('/checkout'))
  }

  checkUnlimited = (ilimitado, sid) => {
    
    const fecha = ilimitado
      ? ilimitado[sid]
        ? ilimitado[sid].fin
        : null
      : null

    const isUnlimited = moment(fecha) > moment()
    return { isUnlimited, fecha }
  }

  render() {
    const {
      auth: { invitado, expires, status }
    } = this.props

    const {
      dates,
      clasesCount,
      isUnlimited,
      fechaUnlimited,
      dias,
      clases,
      gymSelected,
      gimnasios,
      creditos
    } = this.state

    const defaultGym = gimnasios.length > 0 ? gimnasios[gymSelected].id : 0
    const gymName = gimnasios.length > 0 ? gimnasios[gymSelected].nombre : null
    return (
      <AnimationWrapper>
        <div className="col-12 my-4">
          <div className="row">
            <div className="col-12 container-shadow p-md-4">
              <div className="row">
                <div className="fixed col-12">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="inline-block">Clases</h1>
                      <Button
                        type="primary"
                        size="large"
                        onClick={this.setCheckout}
                        style={{ float: 'right' }}
                        className="btn-morado"
                        disabled={status === 0 && !invitado ? true : false}
                      >
                        Checkout
                        <Icon type="right" />
                      </Button>
                      {status === 0 && !invitado && (
                        <div>
                          <span
                            className="no-credits-label fade"
                            style={{ color: '#ed174f' }}
                          >
                            Debes tener una suscripción activa para poder
                            reservar
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <span>
                        Créditos disponibles en <b>{gymName}</b>:{' '}
                        {isUnlimited ? (
                          'Ilimitado'
                        ) : (
                          <span key={0}>{creditos}</span>
                        )}
                        {!isUnlimited && creditos > 0 && (
                          <div>Vencen en: {moment(expires).format('LL')}</div>
                        )}
                        {isUnlimited && (
                          <div>
                            Vence en: {moment(fechaUnlimited).format('LL')}
                          </div>
                        )}
                      </span>
                      <br />
                      {clasesCount > 0 && (
                        <span>Tienes {clasesCount} clases</span>
                      )}
                      {creditos === 0 && !isUnlimited && (
                        <span className="no-credits-label fade">
                          Ya no tienes créditos disponibles,{' '}
                          <Link to="/comprar">comprar créditos</Link>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 center-text my-4 my-md-0">
                  {gimnasios.length > 0 && (
                    <RadioGroup defaultValue={defaultGym} size="large">
                      {gimnasios.map((gym, i) => (
                        <RadioButton
                          value={gym.id}
                          onClick={() => this.handleGym(i, gym.id)}
                          key={i}
                        >
                          {gym.nombre}
                        </RadioButton>
                      ))}
                    </RadioGroup>
                  )}
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
