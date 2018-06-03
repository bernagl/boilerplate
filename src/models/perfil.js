export default [
  {
    name: 'nombre',
    label: 'Nombre',
    validations: 'minLength:3',
    type: 'text',
    validationError: 'Su nombre no es válido',
    required: true
  },
  {
    name: 'correo',
    label: 'Correo',
    validations: 'isEmail',
    type: 'email',
    validationError: 'Ingrese un correo válido',
    required: true
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    // validations: 'isNumeric',
    type: 'text',
    pattern:'[0-9]{10}',
    validationError: 'Ingrese un número te teléfono/celular válido',
    required: true
  }
]
