import React from 'react'
import { Tag } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <Table>
        <Thead>
          <Tr>
            <Th>Fecha</Th>
            <Th>Créditos</Th>
            <Th>Método</Th>
            <Th>Estatus</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>28/Octubre/2018</Td>
            <Td>10</Td>
            <Td>Visa-6369</Td>
            <Td>
              <Tag color="geekblue">Pendiente</Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>28/Octubre/2018</Td>
            <Td>10</Td>
            <Td>Visa-6369</Td>
            <Td>
              <Tag color="geekblue">Pendiente</Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>28/Octubre/2018</Td>
            <Td>10</Td>
            <Td>Visa-6369</Td>
            <Td>
              <Tag color="geekblue">Pendiente</Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>28/Octubre/2018</Td>
            <Td>10</Td>
            <Td>Visa-6369</Td>
            <Td>
              <Tag color="geekblue">Pendiente</Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>28/Octubre/2018</Td>
            <Td>10</Td>
            <Td>Visa-6369</Td>
            <Td>
              <Tag color="geekblue">Pendiente</Tag>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  )
}
