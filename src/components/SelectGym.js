import React from 'react'
import { Select } from 'antd'
const { Option } = Select

export default () => {
  return (
    <Select defaultValue="g1">
      <Option value="g1">Gimnasio 1</Option>
      <Option value="g2">Gimnasio 2</Option>
    </Select>
  )
}
