import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AnimationWrapper from '../components/AnimationWrapper'
import Form from '../components/Form'
import Input from '../components/Input'
import { logout } from '../actions/auth'
import { updateProfile } from '../actions/perfil'
import PerfilModel from '../models/perfil'
import { Tabs } from 'antd'
import Xtable from 'react-xtable'

const { TabPane } = Tabs

class Perfil extends Component {
  render() {
    const { auth, logout, updateProfile } = this.props
    return (
      <AnimationWrapper>
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="bw p-4">
                <Form submitText="Guardar" action={updateProfile}>
                  {PerfilModel.map(input => <Input {...input} />)}
                </Form>
              </div>
            </div>
            <div className="col-12 col-md-8 mt-4 mt-md-0">
              <div className="bw p-4">
                <Tabs defaultActiveKey="1" onChange={e => console.log(e)}>
                  <TabPane tab="Mis clases" key="1">
                    <Xtable
                      title="Historial de clases"
                      data={[
                        {
                          fecha: '28/Octubre/2018',
                          profesor: 'Luis Bernardo García López',
                          gimnasio: 'Super bodies gym',
                          status: 'Pendiente'
                        }
                      ]}
                      columns={[
                        { label: 'Fecha', key: 'fecha' },
                        { label: 'Profesor', key: 'profesor' },
                        { label: 'Gimnasio', key: 'gimnasio' },
                        { label: 'Status', key: 'status' }
                      ]}
                    />
                  </TabPane>
                  <TabPane tab="Historial de pagos" key="2">
                    <Xtable
                      title="Historial de pagos"
                      data={[]}
                      columns={[
                        { label: 'Fecha', key: 'fecha' },
                        { label: 'Créditos', key: 'creditos' },
                        { label: 'Método', key: 'metodo' },
                        { label: 'Status', key: 'status' }
                      ]}
                    />
                  </TabPane>
                  <TabPane tab="Métodos de pagos" key="3">
                    <Xtable
                      title="Métodos de pago"
                      data={[]}
                      columns={[
                        { label: 'Fecha', key: 'fecha' },
                        { label: 'Terminación', key: 'terminacion' }
                      ]}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { logout, updateProfile })(Perfil)
