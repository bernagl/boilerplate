import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Input from '../components/Input'
import CenterBox from '../components/CenterBox'
import AuthWrapper from '../components/AuthWrapper'
import bg from '../assets/login.jpg'

export default () => {
  return (
    <AuthWrapper type="recover">
      {action => (
        <div style={{ background: `url(${bg})`, backgroundSize: 'cover' }} className="fh-login">
          <CenterBox title="Recuperar contraseña">
            <Form
              action={action}
              redirect="/login"
              submitText="Recuperar contraseña"
              success="Se te ha enviado un correo para que recuperes tu contraseña"
              error="Al parecer el correo no se encuentra registrado en nuestra base de datos"
            >
              <Input
                name="correo"
                label="Correo"
                validations="isEmail"
                validationError="Ingresa un email válido"
                required
              />
            </Form>
            <div className="row">
              <div className="col-12 mt-4">
                <span>
                  <Link to="/login">Iniciar sesión</Link>
                </span>
              </div>
              <div className="col-12 mt-4">
                <span>
                  <Link to="/registro">Registrate</Link>
                </span>
              </div>
            </div>
          </CenterBox>
        </div>
      )}
    </AuthWrapper>
  )
}

// export default connect(null, { login })(Login)
