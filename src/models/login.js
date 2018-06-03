export default [
  {
    name: 'correo',
    label: 'Correo',
    validations: 'isEmail',
    type: 'email',
    validationError: 'Ingrese un correo válido',
    required: true
  },
  {
    name: 'contrasena',
    label: 'Contraseña',
    validations: 'minLength:6',
    type: 'password',
    validationError: 'Ingrese una contraseña válida',
    required: true
  }
]

{
  /* <Input
name="contrasena"
label="Contraseña"
validations="minLength:6"
type="password"
validationError="Ingresa una contraseña válida"
required
/> */
}
