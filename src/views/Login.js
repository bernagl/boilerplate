import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Input from '../components/Input'
import CenterBox from '../components/CenterBox'
import AuthWrapper from '../components/AuthWrapper'
import Login from '../models/login'

export default () => {
  return (
    <AuthWrapper type="login">
      {action => (
        <CenterBox title="Iniciar sesión">
          <Form
            action={action}
            // redirect="/"
            submitText="Iniciar sesión"
            success="Bienvenido"
          >
            {Login.map(input => <Input {...input} />)}
            {/* <Input
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
            /> */}
          </Form>
          <div className="row">
            <div className="col-12 mt-2">
              <span>
                ¿Aún no tienes tu cuenta? <Link to="/registro">Registrate</Link>
              </span>
            </div>
            <div className="col-12 mt-2">
              <span>
                <Link to="/recuperar">Recuperar contraseña</Link>
              </span>
            </div>
          </div>
        </CenterBox>
      )}
    </AuthWrapper>
  )
}

// export default connect(null, { login })(Login)
