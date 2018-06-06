import React from 'react'
import { Tag } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default ({ title, cols, data, Render }) => {
  return (
    <div>
      <h2 className="inline-block my-2">{title}</h2>
      {Render && (
        <span className="float-right">
          <Render />
        </span>
      )}
      <Table class="">
        <Thead>
          <Tr>{cols.map(col => <Td>{col.label}</Td>)}</Tr>
        </Thead>
        <Tbody>
          {data.map((item, i) => (
            <Tr>
              {cols.map(({ Render, key }, j) => (
                <Td>{Render ? Render(item, i) : item[key]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
