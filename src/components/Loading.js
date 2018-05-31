import React from 'react'
import AnimationWrapper from './AnimationWrapper'
import EmptyState from './EmptyState'
import { Icon, Spin } from 'antd'

export default ({ children }) => {
  return (
    <AnimationWrapper>
      <EmptyState>
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 18 }} spin />}
        />
        <p>Cargando</p>
      </EmptyState>
    </AnimationWrapper>
  )
}
