import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Input from '../components/Input'
import CenterBox from '../components/CenterBox'
import AuthWrapper from '../components/AuthWrapper'
import Login from '../models/login'
import bg from '../assets/login.jpg'
import '../assets/login.css'

export default () => {
  return (
    <AuthWrapper type="login">
      {action => (
        <div className="row">
          <div className="col-12 col-md-5 col-lg-4 col-xl-3 login-box">
            <div className="row align-content-center fh p-4">
              <div className="col-12">
                <h1 className="mb-5 center-text">Iniciar sesión</h1>
                <Form
                  action={action}
                  // redirect="/"
                  submitText="Iniciar sesión"
                  success="Bienvenido"
                >
                  {Login.map(input => <Input {...input} />)}
                </Form>
              </div>
              <div className="col-12 mt-2">
                <p>
                  <span>¿Aún no tienes tu cuenta? </span>
                  <Link to="/registro">Registrate</Link>
                </p>
              </div>
              <div className="col-12 mt-2">
                <span>
                  <Link to="/recuperar">Recuperar contraseña</Link>
                </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-8 col-xl-9 hidden-sm-up bg-cover"
          style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }} />
        </div>
      )}
    </AuthWrapper>
  )
}

// export default connect(null, { login })(Login)
