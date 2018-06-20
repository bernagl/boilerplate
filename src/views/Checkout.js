import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationWrapper from '../components/AnimationWrapper'
import { Button } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import moment from 'moment'

class Checkout extends Component {
  render() {
    const { clases } = this.props.cart
    const items = []
    clases.forEach((item, i) => {
      items.push(
        <Tr key={i}>
          <Td>{item.title}</Td>
          <Td>{item.profesor}</Td>
          <Td>{item.creditos}</Td>
          <Td>{moment(item.date).format('LLLL')}</Td>
        </Tr>
      )
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
                      <h3>Total: ${items.length} créditos</h3>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-6">
                          <Button type="secondary">Cancelar</Button>
                        </div>
                        <div className="col-6 ">
                          <Button type="primary">Confirmar</Button>
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

const mapStateToProps = ({ cart }) => ({ cart })

export default connect(mapStateToProps)(Checkout)
