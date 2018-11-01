import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationWrapper from '../components/AnimationWrapper'
import { Button, message } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { confirmCheckout, setCheckout } from '../actions/cart'
import moment from 'moment'

class Checkout extends Component {
  state = { loading: false, label: 'Confirmar', clases: [], creditos: 0 }

  componentDidMount() {
    const { clases: c } = this.props.cart
    const clases = []
    let creditos = 0
    c.forEach((item, i) => {
      item.status === 3 && (clases.push(item), (creditos += item.costo))
    })

    this.setState({ clases, creditos })
  }

  confirm = () => {
    const { clases, creditos } = this.state
    this.setState({ loading: true, label: 'Asignando clases' })
    console.log('state updated')
    const { invitado, uid, isIlimitado } = this.props.auth
    confirmCheckout(
      {
        creditos,
        clases,
        invitado,
        uid,
        isIlimitado,
        fecha: moment().format()
      },
      this.successCheckout
    )

    console.log('post async request')

    // setTimeout(() => {}, 1000)
  }

  successCheckout = () => {
    message.success('Tus clases se han comprado')
    this.props.setCheckout({})
    this.props.history.push('/perfil')
  }

  render() {
    const { clases, creditos, label, loading } = this.state
    console.log(this.props)
    console.log(this.state)
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
                        <Th>Coach</Th>
                        <Th>Gimnasio</Th>
                        <Th>Créditos</Th>
                        <Th>Fecha</Th>
                        <Th>Hora</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {clases.map((item, i) => (
                        <Tr key={i}>
                          <Td>{item.clase.nombre}</Td>
                          <Td>{item.instructor.nombre}</Td>
                          <Td>{item.gimnasio.nombre}</Td>
                          <Td>{item.costo}</Td>
                          <Td>{moment(item.inicio).format('LL')}</Td>
                          <Td>{moment(item.inicio).format('LT')}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>
                <div className="col-12 col-md-4 offset-md-8 my-4">
                  <div className="row">
                    <div className="col-12">
                      <h3>Clases: {clases.length}</h3>
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
                            disabled={clases.length > 0 ? false : true}
                            onClick={this.confirm}
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
