import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Input from '../components/Input'
import AuthWrapper from '../components/AuthWrapper'
import Login from '../models/login'
import '../assets/login.css'

export default () => {
  return (
    <AuthWrapper type="login">
      {action => (
        <div className="row margin-auto">
          <div className="col-12 col-md-5 col-lg-4 col-xl-3 login-box">
            <div className="row align-content-center fh-login p-2 p-md-4">
              <div className="col-12">
                <h1 className="mb-5">Iniciar sesión</h1>
                <Form
                  action={action}
                  redirect="/"
                  submitText="Iniciar sesión"
                  success="Bienvenido"
                >
                  {Login.map((input, i) => <Input key={i} {...input} />)}
                </Form>
              </div>
              <div className="col-12 mt-2 mt-md-5 center-text">
                <p>
                  <span>¿Aún no tienes tu cuenta? </span>
                  <Link to="/registro">Registrate</Link>
                </p>
              </div>
              <div className="col-12 mt-3 center-text">
                <span>
                  <Link to="/recuperar">Recuperar contraseña</Link>
                </span>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-7 col-lg-8 col-xl-9 hidden-sm-up bg-cover"
            style={{ backgroundImage: `url(http://impulse-fitnessstudio.com/wp-content/uploads/2018/01/2-Impulse.jpg)`, backgroundSize: 'cover' }}
          />
        </div>
      )}
    </AuthWrapper>
  )
}







// export default connect(null, { login })(Login)
