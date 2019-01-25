import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
import Datepicker from '../components/Datepicker'
import Table from '../components/Table'
import { logout } from '../actions/auth'
import { getPagos, updateProfile, updateUserStatus } from '../actions/perfil'
import { cancelarClase } from '../actions/clase'
import { getGimnasiosByStatus } from '../actions/gimnasio'
import { deleteCard } from '../actions/tarjeta'
import {
  Badge,
  Divider,
  Icon,
  message,
  Popconfirm,
  Popover,
  Tabs,
  Tag,
  Tooltip
} from 'antd'
import moment from 'moment'

const { TabPane } = Tabs

const pagosCol = [
  {
    label: 'Fecha',
    Render: ({ fecha }) => <span>{moment(fecha).format('LL')}</span>
  },
  { label: 'Tipo', key: 'name' },
  {
    label: 'Precio',
    Render: ({ precio }) => (
      <span>
        MXN$
        {precio}
      </span>
    )
  },
  { label: 'Créditos', Render: ({ creditos }) => <span>{creditos}</span> },
  { label: 'Sucursal', Render: ({ sucursal }) => <span>{sucursal}</span> },
  {
    label: 'Método',
    Render: ({ tarjeta, last4 }) => (
      <span>
        {tarjeta}-{last4}
      </span>
    )
  }
]

class Perfil extends Component {
  state = {
    metodos: [],
    metodosCol: [
      {
        label: 'Fecha',
        Render: ({ fecha }) => <span>{moment(fecha).format('LL')}</span>
      },
      {
        label: 'Tarjeta',
        Render: ({ bin, last4, brand }) => (
          <span>
            {brand} - {bin}
            XXXXXX
            {last4}
          </span>
        )
      },
      {
        label: 'Estatus',
        key: 'status',
        Render: item => (
          <Tag color={`${item.status === 1 ? 'green' : 'volcano'}`}>
            {item.status === 1 ? 'Activa' : 'Inhabilitada'}
          </Tag>
        )
      },
      {
        label: 'Acciones',
        key: 'acciones',
        Render: (item, i) => (
          <Popconfirm
            placement="left"
            title={`Deseas eliminar el método de pago ${item.metodo}`}
            onConfirm={() => this.deleteCard(item)}
            okText="Si"
            cancelText="No"
          >
            <Icon type="delete" />
          </Popconfirm>
        )
      }
    ],
    pagos: []
  }

  componentDidMount() {
    const { auth } = this.props
    const suscripcion =
      moment().diff(moment(auth.last_class), 'days') >= 30 ? true : false
    if (suscripcion) updateUserStatus({ uid: auth.uid, status: 0 })
    this.props.getGimnasiosByStatus(1)
    getPagos(this)(auth.uid)
  }

  deleteCard = async ({ tid }) => {
    const r = await deleteCard(tid)
    r === 202
      ? message.success('La tarjeta se ha eliminado')
      : message.error('Ocurrió un error, por favor vuelve a intentarlo')
  }

  cancelarClase = async ({ inicio, gimnasio, id, costo, clase }) => {
    const { uid } = this.props.auth
    const difference = moment.duration(moment(inicio).diff(moment()))
    const cancelClass = difference.asHours() > 3 ? true : false
    if (cancelClass) {
      const r = await cancelarClase({
        sid: gimnasio.id,
        costo,
        cid: id,
        uid
      })
      r && message.success('Clase cancelada, tus créditos han sido devueltos')
    } else
      message.error(
        'Sólo puedes cancelar una clase 3 horas antes de que esta comience'
      )
  }

  clasesCol = () => [
    {
      label: 'Clase',
      Render: ({ clase: { nombre } }) => <span>{nombre}</span>
    },
    {
      label: 'Coach',
      Render: ({ instructor: { nombre } }) => <span>{nombre}</span>
    },
    {
      label: 'Sucursal',
      Render: ({ gimnasio: { nombre } }) => <span>{nombre}</span>
    },
    {
      label: 'Fecha',
      key: 'fecha',
      Render: ({ inicio }) => <span>{moment(inicio).format('LL')}</span>
    },
    {
      label: 'Hora',
      key: 'hora',
      Render: ({ inicio }) => <span>{moment(inicio).format('LT')}</span>
    },
    {
      label: 'Créditos',
      key: 'costo',
      Render: ({ costo, status }) => <span>{status === 4 ? 0 : costo}</span>
    },
    {
      label: 'Estatus',
      key: 'status',
      Render: item => {
        return (
          <React.Fragment>
            <Popover
              content={
                <p>
                  {item.status === 0
                    ? 'La fecha aún no se cumple'
                    : item.status === 2
                    ? 'Cancelaste la clase'
                    : item.status === 3
                    ? 'Estas en la lista de espera, si algún usuario cancela se te notificará por correo'
                    : item.status === 4
                    ? 'Cancelada por la Administración'
                    : 'La clase ya pasó'}
                </p>
              }
              title={
                item.status === 0
                  ? 'Pendiente'
                  : item.status === 1
                  ? 'Cumplida'
                  : item.status === 3
                  ? 'En cola'
                  : 'Cancelada'
              }
            >
              <Tag
                color={`${
                  item.status === 0
                    ? 'green'
                    : item.status === 3
                    ? 'blue'
                    : 'volcano'
                }`}
              >
                {item.status === 0
                  ? 'Pendiente'
                  : item.status === 2
                  ? 'Cancelada'
                  : item.status === 3
                  ? 'En lista de espera'
                  : item.status === 4
                  ? 'Cancelada [Admin]'
                  : 'Cumplida'}
              </Tag>
            </Popover>
            {item.status === 0 && (
              <Popconfirm
                title="¿Deseas cancelar la clase?"
                okText="Si"
                cancelText="No"
                onConfirm={() => this.cancelarClase(item)}
              >
                <Tag color="red">Cancelar</Tag>
              </Popconfirm>
            )}
          </React.Fragment>
        )
      }
    }
  ]

  logsCol = () => [
    { label: 'Log', key: 'log' },
    { label: 'Mótivo', key: 'motivo' },
    { label: 'Fecha', Render: ({ fecha }) => moment(fecha).format('LLL') }
  ]

  render() {
    const { auth, gimnasios, updateProfile } = this.props
    const { metodosCol, pagos } = this.state
    let { creditos, expires, ilimitado, isIlimitado } = auth
    const c = []
    if (typeof creditos === 'undefined') creditos = {}
    let classesCounter = 0
    auth.clases.forEach(clase => {
      const status =
        clase.status === 1 || clase.status === 0
          ? moment(clase.inicio) > moment()
            ? 0
            : 1
          : clase.status
      if (status === 0) classesCounter++
      c.push({ ...clase, status })
    })

    const clases = c.sort((a, b) => moment(b.inicio) - moment(a.inicio))
    return (
      <AnimationWrapper>
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="container-shadow p-2 p-md-4 center-text">
              <h3 className="mt-2">{auth.nombre}</h3>
              <span>Miembro desde: {moment(auth.created_at).format('LL')}</span>
              <br />
              <div>
                <span>
                  {auth.status === 1 ? (
                    <Badge status="success" text="Suscripción Activa" />
                  ) : auth.status === 0 ? (
                    <Badge status="default" text="Suscripción Inactiva" />
                  ) : (
                    <Badge status="error" text="Suscripción Inactiva" />
                  )}
                </span>
              </div>
              <div className="mb-0">
                Total de clases compradas: {classesCounter}
              </div>
              {isIlimitado ? (
                <div className="cp my-3">
                  <Tooltip
                    title="Podrás reservar las clases que quieras hasta que finalice tu paquete ilimitado"
                    placement="bottom"
                  >
                    <span>
                      <b>Paquete ilimitado (?)</b>
                    </span>
                  </Tooltip>
                  <div>
                    <span>Vence: {moment(ilimitado.fin).format('LL')}</span>
                  </div>
                </div>
              ) : (
                <div className="cp my-3">
                  <Tooltip
                    title="Podrás reservar clases antes de que finalice la fecha de tus créditos"
                    placement="bottom"
                  >
                    <div>
                      <span>
                        Créditos vencen: {moment(expires).format('LL')}
                      </span>
                    </div>
                  </Tooltip>
                </div>
              )}
              <Divider />
              <div>Créditos</div>
              {gimnasios.map(gym => (
                <div key={gym.id}>
                  {gym.nombre} : {creditos[gym.id] ? creditos[gym.id] : 0}
                </div>
              ))}
              {auth.status === 0 && (
                <div>
                  Tus créditos los podrás utilizar hasta que actives tu
                  suscripción <Link to="/comprar">aquí</Link>
                </div>
              )}
              <Divider />
              <div>
                <a onClick={this.props.logout}>Cerrar sesión</a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 my-4 mt-md-0">
            <div className="container-shadow p-2 p-md-4">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Clase(s)" key="1">
                  <Table
                    title="Clase(s)"
                    data={clases}
                    Render={() => (
                      <div className="mt-2 mb-3">
                        <Link to="/comprar">Comprar créditos</Link>
                      </div>
                    )}
                    cols={this.clasesCol()}
                  />
                </TabPane>
                <TabPane tab="Historial de pagos" key="2">
                  <Table
                    title="Historial de pagos"
                    data={pagos}
                    cols={pagosCol}
                  />
                </TabPane>
                <TabPane tab="Métodos de pagos" key="3">
                  <Table
                    title="Métodos de pago"
                    data={auth.tarjetas}
                    cols={metodosCol}
                  />
                </TabPane>
                <TabPane tab="Perfil" key="4">
                  <Form
                    submitText="Guardar"
                    success="Perfil actualizado"
                    action={updateProfile}
                    uid={auth.uid}
                  >
                    <Input
                      name="nombre"
                      label="Nombre completo"
                      validations="minLength:3"
                      validationError="Ingresa un nombre válido"
                      required
                      value={auth.nombre}
                    />
                    <Input
                      name="correo"
                      label="Correo"
                      validations="isEmail"
                      validationError="Ingresa un correo válido"
                      required
                      value={auth.correo}
                    />
                    <Input
                      name="telefono"
                      label="Teléfono"
                      validations="isNumeric"
                      validationError="Ingresa un número teléfono válido"
                      required
                      value={auth.telefono}
                    />
                    <Datepicker
                      name="fecha_nacimiento"
                      label="Fecha de nacimiento"
                      defaultValue={auth.fecha_nacimiento}
                    />
                  </Form>
                </TabPane>
                <TabPane tab="Logs" key="5">
                  <Table
                    title="Log(s)"
                    data={auth.logs}
                    cols={this.logsCol()}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth, gimnasios }) => ({ auth, gimnasios })

export default connect(
  mapStateToProps,
  { getGimnasiosByStatus, logout, updateProfile }
)(Perfil)
