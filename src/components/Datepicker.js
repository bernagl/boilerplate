import React from 'react'
import Parent from './InputWrapper'
import { DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

export const Field = props => (
  <Parent {...props}>
    {({ onChange, onBlur, value }) => {
      return (
        <DatePicker
          value={value ? moment(value) : null}
          // locale={locale}
          placeholder={props.placeholder}
          id={props.name}
          format={props.format}
          name={props.name}
          onChange={date => onChange(moment(date).format())}
          onBlur={onBlur}
          className="full-width"
        />
      )
    }}
  </Parent>
)

export default Field

Field.defaultProps = {
  validationError: 'Ingresa una fecha válida',
  placeholder: 'Ingresa una fecha',
  format: 'DD-MM-YYYY'
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  format: PropTypes.string,
  placeholder: PropTypes.string
}
