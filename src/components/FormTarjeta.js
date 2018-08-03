import React from 'react'
import Form from './Form'
import Input from './Input'

export default ({ action }) => {
  return (
    <Form submitText="Pagar" action={model => action(model)}>
      <Input
        name="tarjeta"
        label="Tarjeta"
        validations={{
          minLength: 16,
          isNumeric: true,
          maxLength: 16
        }}
        validationError="Ingresa una tarjeta válida"
        required
      />
      <div className="row">
        <div className="col-4">
          <Input
            name="mes"
            label="Mes"
            validations={{
              minLength: 2,
              isNumeric: true,
              maxLength: 2
            }}
            validationError="Ingrese un mes válido"
            required
          />
        </div>
        <div className="col-4">
          <Input
            name="ano"
            label="Año"
            validations={{
              minLength: 2,
              isNumeric: true,
              maxLength: 2
            }}
            validationError="Ingresa una año válido"
            required
          />
        </div>
        <div className="col-4">
          <Input
            name="CVV"
            label="CVV"
            validations="isNumeric"
            validationError="Ingresa un CVV válido"
            required
          />
        </div>
      </div>
    </Form>
  )
}
