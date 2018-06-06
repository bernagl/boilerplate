import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
import Table from '../components/Table'
import { logout } from '../actions/auth'
import { updateProfile } from '../actions/perfil'
import PerfilModel from '../models/perfil'
import { Icon, message, Popconfirm, Popover, Tabs, Tag } from 'antd'
import Xtable from 'react-xtable'

const { TabPane } = Tabs

const clases = [
  {
    fecha: '28/Octubre/2018',
    clase: 'Zumba',
    profesor: 'Luis García',
    creditos: 1,
    status: 0
  },
  {
    fecha: '28/Septiembre/2018',
    clase: 'Zumba',
    profesor: 'Luis García',
    creditos: 1,
    status: 1
  },
  {
    fecha: '28/Agosto/2018',
    clase: 'Zumba',
    profesor: 'Luis García',
    creditos: 1,
    status: 1
  },
  {
    fecha: '28/Julio/2018',
    clase: 'Zumba',
    profesor: 'Luis García',
    creditos: 1,
    status: 1
  }
]

const clasesCol = [
  { label: 'Clase', key: 'clase' },
  { label: 'Profesor', key: 'profesor' },
  { label: 'Fecha', key: 'fecha' },
  { label: 'Créditos', key: 'creditos' },
  {
    label: 'Estatus',
    key: 'status',
    Render: item => (
      <Popover
        content={
          <p>
            {item.status === 0
              ? 'La fecha aún no se cumple'
              : 'La clase ya pasó'}
          </p>
        }
        title={item.status === 0 ? 'Pendiente' : 'Cumplida'}
      >
        <Tag color={`${item.status === 0 ? 'green' : 'volcano'}`}>
          {item.status === 0 ? 'Pendiente' : 'Cumplida'}
        </Tag>
      </Popover>
    )
  }
]

const pagos = [{ fecha: '28/Octubre/2018', creditos: 4, metodo: 'visa-1234' }]
const pagosCol = [
  { label: 'Fecha', key: 'fecha' },
  { label: 'Créditos', key: 'creditos' },
  { label: 'Método', key: 'metodo' }
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
                  // console.log(i, methods)

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
  render() {
    const { auth, logout, updateProfile } = this.props
    const { metodos, metodosCol } = this.state
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
              <h5 className="mb-0">Total de clases compradas: 23</h5>
              <h5>Créditos disponibles: 4</h5>
            </div>
          </div>
          <div className="col-12 col-md-8 my-4 mt-md-0">
            <div className="container-shadow p-2 p-md-4">
              <Tabs defaultActiveKey="1" onChange={e => console.log(e)}>
                <TabPane tab="Mis clases" key="1">
                  <Table
                    title="Mis clases"
                    data={clases}
                    Render={() => <Link to="/comprar">Comprar créditos</Link>}
                    cols={clasesCol}
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
                    data={metodos}
                    cols={metodosCol}
                  />
                </TabPane>
                <TabPane tab="Perfil" key="4">
                  <Form
                    submitText="Guardar"
                    success="Perfil actualizado"
                    action={updateProfile}
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
