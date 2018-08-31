export default [
  {
    name: 'correo',
    label: 'Correo',
    validations: 'isEmail',
    type: 'email',
    validationError: 'Ingresa un correo válido',
    required: true
  },
  {
    name: 'contrasena',
    label: 'Contraseña',
    validations: 'minLength:6',
    type: 'password',
    validationError: 'Ingresa una contraseña válida',
    required: true
  }
]
