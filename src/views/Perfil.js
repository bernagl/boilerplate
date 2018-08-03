import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
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
  Tag
} from 'antd'
import moment from 'moment'

const { TabPane } = Tabs

// const pagos = [{ fecha: '28/Octubre/2018', creditos: 4, metodo: 'visa-1234' }]
const pagosCol = [
  {
    label: 'Fecha',
    Render: ({ fecha }) => <span>{moment(fecha).format('LL')}</span>
  },
  { label: 'Tipo', key: 'name' },
  { label: 'Precio', Render: ({ precio }) => <span>MXN${precio}</span> },
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
            {brand} - {bin}XXXXXX{last4}
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
    console.log('suscripcion', suscripcion)
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

  cancelarClase = async (...props) => {
    const r = await cancelarClase(...props)
    r && message.success('Clase cancelada, tus créditos han sido devueltos')
  }

  clasesCol = () => [
    {
      label: 'Clase',
      Render: ({ clase: { nombre } }) => <span>{nombre}</span>
    },
    { label: 'Profesor', key: 'profesor' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Créditos', key: 'costo' },
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
                      ? 'En cola'
                      : 'Cumplida'}
              </Tag>
            </Popover>
            {(item.status === 0 || item.status === 3) && (
              <Popconfirm
                title="¿Deseas cancelar la clase?"
                okText="Si"
                cancelText="No"
                onConfirm={() =>
                  this.cancelarClase({
                    uid: this.props.auth.uid,
                    creditos: +this.props.auth.creditos + +item.costo_creditos,
                    id_clase: item.id
                  })
                }
              >
                <Tag color="red">Cancelar</Tag>
              </Popconfirm>
            )}
          </React.Fragment>
        )
      }
    }
  ]

  render() {
    const { auth, gimnasios, updateProfile } = this.props
    const { metodos, metodosCol, pagos } = this.state
    let { creditos } = auth
    const clases = []
    const last_class = moment(auth.last_class)
    const today = moment()
    if (typeof creditos === 'undefined') creditos = {}
    auth.clases.forEach(clase =>
      clases.push({
        ...clase,
        status:
          clase.status === 2
            ? 2
            : clase.cola
              ? 3
              : clase.status === 0
                ? moment(clase.fin) > moment()
                  ? 0
                  : 1
                : clase.status
      })
    )
    return (
      <AnimationWrapper>
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="container-shadow p-2 p-md-4 center-text">
              <img
                src="https://pbs.twimg.com/profile_images/953277124558770176/MkOOnpFn_400x400.jpg"
                alt="Profile pic"
                className="profile-pic"
              />
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
              {/* <div>
                {today.diff(last_class, 'days') >= 30 && (
                  <span>
                    Última clase: {last_class.format('LL')} -{' '}
                    {last_class.diff(today, 'days')}
                  </span>
                )}
              </div> */}
              <div className="mb-0">
                Total de clases compradas: {clases.length}
              </div>
              <Divider />
              <div>Créditos</div>
              {gimnasios.map(gym => (
                <div>
                  {gym.nombre} : {creditos[gym.id] ? creditos[gym.id] : 0}
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-8 my-4 mt-md-0">
            <div className="container-shadow p-2 p-md-4">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Mis clases" key="1">
                  <Table
                    title="Mis clases"
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
                      validationError="Ingresa un telefono válido"
                      required
                      value={auth.telefono}
                    />
                  </Form>
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
