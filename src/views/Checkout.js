import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationWrapper from '../components/AnimationWrapper'
import { Button, message } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { confirmCheckout, setCheckout } from '../actions/cart'
import moment from 'moment'

class Checkout extends Component {
  state = { loading: false, label: 'Confirmar' }
  confirm = async ({ clases, creditos, items }) => {
    this.setState({ loading: true, label: 'Asignando clases' })
    const { invitado, uid, isIlimitado } = this.props.auth
    const c = []
    clases.forEach(item => item.status === 3 && c.push(item))
    const r = await confirmCheckout({
      creditos,
      clases: c,
      invitado,
      uid,
      isIlimitado,
      fecha: moment().format()
    })

    setTimeout(() => {
      message.success('Tus clases se han comprado'),
        this.props.history.push('/perfil'),
        this.props.setCheckout({})
    }, 1000)
  }

  render() {
    const { clases, gimnasios } = this.props.cart
    const { label, loading } = this.state
    const items = []
    let creditos = 0
    clases.forEach((item, i) => {
      const gimnasio = gimnasios.find(gym => gym.id === item.gimnasio.id)
      item.status === 3 &&
        (items.push(
          <Tr key={i}>
            <Td>{item.clase.nombre}</Td>
            <Td>{item.instructor.nombre}</Td>
            <Td>{gimnasio.nombre}</Td>
            <Td>{item.costo}</Td>
            <Td>{moment(item.inicio).format('LL')}</Td>
          </Tr>
        ),
        (creditos += item.costo))
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
                          <Button
                            type="secondary"
                            onClick={() => this.props.history.push('/clase')}
                          >
                            Cancelar
                          </Button>
                        </div>
                        <div className="col-6 ">
                          <Button
                            type="primary"
                            disabled={items.length > 0 ? false : true}
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

export default connect(
  mapStateToProps,
  { setCheckout }
)(Checkout)
