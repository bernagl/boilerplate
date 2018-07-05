import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationWrapper from '../components/AnimationWrapper'
import { Button, message } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { confirmCheckout } from '../actions/cart'
import moment from 'moment'

class Checkout extends Component {
  state = { loading: false, label: 'Confirmar' }
  confirm = async ({ clases, creditos, items }) => {
    this.setState({ loading: true, label: 'Asignando clases' })
    const { uid } = this.props.auth
    const c = []
    clases.forEach(item => item.status === 1 && c.push(item))
    const r = await confirmCheckout({
      creditos,
      clases: c,
      uid,
      fecha: moment().format('L')
    })

    setTimeout(() => {
      message.success('Tus clases se han comprado'),
        this.props.history.push('/perfil')
    }, 1000)
  }

  render() {
    const { clases } = this.props.cart
    const { label, loading } = this.state
    const items = []
    let creditos = 0
    clases.forEach((item, i) => {
      item.status === 1 &&
        (items.push(
          <Tr key={i}>
            <Td>{item.clase.nombre}</Td>
            <Td>{item.instructor.nombre}</Td>
            <Td>{item.costo}</Td>
            <Td>{moment(item.fecha).format('LL')}</Td>
          </Tr>
        ),
        (creditos += item.costo_creditos))
    })
    return (
      <AnimationWrapper>
        <div className="row my-4">
          <div className="col-12">
            <div className="p-2 p-md-4 container-shadow">
              <div className="row">
                <div className="col-12">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Clase</Th>
                        <Th>Profesor</Th>
                        <Th>Créditos</Th>
                        <Th>Fecha</Th>
                      </Tr>
                    </Thead>
                    <Tbody>{items}</Tbody>
                  </Table>
                </div>
                <div className="col-12 col-md-4 offset-md-8 my-4">
                  <div className="row">
                    <div className="col-12">
                      <h3>Clases: {items.length}</h3>
                      <hr />
                      <h3>Total: {creditos} créditos</h3>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-6">
                          <Button type="secondary">Cancelar</Button>
                        </div>
                        <div className="col-6 ">
                          <Button
                            type="primary"
                            onClick={() =>
                              this.confirm({ clases, creditos, items })
                            }
                            loading={loading ? true : false}
                          >
                            {label}
                          </Button>
                        </div>
                      </div>
                    </div>
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

const mapStateToProps = ({ auth, cart }) => ({ auth, cart })

export default connect(mapStateToProps)(Checkout)
