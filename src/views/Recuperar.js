import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Input from '../components/Input'
import AuthWrapper from '../components/AuthWrapper'

export default () => {
  return (
    <AuthWrapper type="recover">
      {action => (
        <div className="row margin-auto">
          <div className="col-12 col-md-5 col-lg-4 col-xl-3 login-box">
            <div className="row align-content-center fh-login p-2 p-md-4">
              <div className="col-12">
                <h1 className="mb-5">Recuperar contraseña</h1>
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
                    validationError="Ingresa un correo válido"
                    required
                  />
                </Form>
              </div>
              <div className="col-12 mt-4 center-text">
                <span>
                  <Link to="/login">Iniciar sesión</Link>
                </span>
              </div>
              <div className="col-12 mt-4 center-text">
                <span>
                  <Link to="/registro">Regístrate</Link>
                </span>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-7 col-lg-8 col-xl-9 hidden-sm-up bg-cover"
            style={{
              backgroundImage: `url(http://impulse-fitnessstudio.com/wp-content/uploads/2018/01/2-Impulse.jpg)`,
              backgroundSize: 'cover'
            }}
          />
        </div>
      )}
    </AuthWrapper>
  )
}

// export default connect(null, { login })(Login)
