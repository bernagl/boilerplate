import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Input from '../components/Input'
import AuthWrapper from '../components/AuthWrapper'
import CenterBox from '../components/CenterBox'

export default () => {
  return (
    <AuthWrapper type="register">
      {action => (
        <CenterBox title="Registro">
          <Form
            action={action}
            // redirect="/"
            submitText="Registrarme"
            success="Gracias por registrarte"
          >
            <Input
              name="nombre"
              label="Nombre compelto"
              validations="minLength:3"
              validationError="Ingresa un nombre válido"
              required
            />
            <Input
              name="correo"
              label="Correo"
              validations="isEmail"
              validationError="Ingresa un email válido"
              required
            />
            <Input
              name="contrasena"
              label="Contraseña"
              validations="minLength:6"
              type="password"
              validationError="Ingresa una contraseña válida"
              required
            />
            <Input
              name="confirmar"
              label="Confirmar contraseña"
              validations="equalsField:contrasena"
              type="password"
              validationError="Las contraseñas no coinciden"
              required
            />
          </Form>
          <div className="row">
            <div className="col-12 mt-2">
              <span>
                ¿Ya tienes tu cuenta? <Link to="/login">Inicia sesión</Link>
              </span>
            </div>
          </div>
        </CenterBox>
      )}
    </AuthWrapper>
  )
}

// const mapStateToProps = ({ auth }) => ({ auth })

// export default connect(mapStateToProps, { register })(Registro)
