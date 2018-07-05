import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
import Table from '../components/Table'
import { logout } from '../actions/auth'
import { updateProfile } from '../actions/perfil'
import { cancelarClase } from '../actions/clase'
import { Icon, message, Popconfirm, Popover, Tabs, Tag } from 'antd'
import moment from 'moment'

const { TabPane } = Tabs

// const pagos = [{ fecha: '28/Octubre/2018', creditos: 4, metodo: 'visa-1234' }]
const pagosCol = [
  { label: 'Fecha', key: 'fecha' },
  { label: 'Créditos', key: 'creditos' },
  { label: 'Método', key: 'uid' }
]

class Perfil extends Component {
  state = {
    metodos: [
      { fecha: '28/Octubre/2018', metodo: 'visa-1234', status: 1 },
      { fecha: '28/Octubre/2018', metodo: 'visa-5678', status: 0 }
    ],
    metodosCol: [
      { label: 'Fecha', key: 'fecha' },
      { label: 'Método', key: 'metodo' },
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
            onConfirm={() => {
              this.setState(
                ({ metodos }) => {
                  metodos.splice(i, 1)
                  return { metodos }
                },
                () => message.success('Método de pago eliminado')
              )
            }}
            okText="Si"
            cancelText="No"
          >
            <Icon type="delete" />
          </Popconfirm>
        )
      }
    ]
  }

  cancelarClase = async (...props) => {
    const r = await cancelarClase(...props)
    r && message.success('Clase cancelada, tus créditos han sido devueltos')
  }

  clasesCol = () => [
    { label: 'Clase', key: 'nombre' },
    { label: 'Profesor', key: 'profesor' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Créditos', key: 'costo_creditos' },
    {
      label: 'Estatus',
      key: 'status',
      Render: item => {
        console.log(item)
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
    const { auth, updateProfile } = this.props
    const { metodos, metodosCol } = this.state
    const clases = []
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

    console.log(this.props)

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
              <span>Miembro desde: 28/Octubre/2017</span>
              <br />
              <h5 className="mb-0">
                Total de clases compradas: {clases.length}
              </h5>
              <h5>Créditos disponibles: {auth.creditos}</h5>
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
                    data={auth.pagos}
                    cols={pagosCol}
                  />
                </TabPane>
                <TabPane tab="Métodos de pagos" key="3">
                  <Table
                    title="Métodos de pago"
                    data={metodos}
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

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  { logout, updateProfile }
)(Perfil)
