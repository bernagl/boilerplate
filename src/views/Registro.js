import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Input from '../components/Input'
import AuthWrapper from '../components/AuthWrapper'
import Datepicker from '../components/Datepicker'

export default class Registro extends Component {
  state = { terminos: false }
  render() {
    const { terminos } = this.state
    return (
      <AuthWrapper type="register">
        {action => (
          <div className="row margin-auto">
            <div className="col-12 col-md-5 col-lg-4 col-xl-3 login-box">
              <div className="row align-content-center fh-login p-2 p-md-4">
                <div className="col-12">
                  <h1 className="mb-5">Registrate</h1>
                  <Form
                    action={action}
                    redirect="/"
                    submitText="Registrarme"
                    success="Gracias por registrarte"
                    dontShowError
                  >
                    <Input
                      name="nombre"
                      label="Nombre completo"
                      validations="minLength:3"
                      validationError="Ingresa un nombre válido"
                      required
                    />
                    {/* <Input
                      name="edad"
                      label="Edad (años)"
                      validations={{ isNumeric: true, maxLength: 2 }}
                      validationError="Ingresa una edad válida"
                      required
                    /> */}
                    <Datepicker name="fecha_nacimiento" label="Fecha de nacimiento" />
                    <Input
                      name="correo"
                      label="Correo"
                      validations="isEmail"
                      validationError="Ingresa un email válido"
                      required
                    />
                    <Input
                      name="telefono"
                      label="Celular"
                      validations={{
                        isNumeric: true,
                        maxLength: 10,
                        minLength: 10
                      }}
                      validationError="Ingresa un número de celular válido"
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
                    {/* <Checkbox>Aceptas los</Checkbox>
                    <span
                      onClick={() => this.setState({ terminos: !terminos })}
                      className="terminos-text"
                    >
                      términos y condiciones
                    </span> */}
                  </Form>
                </div>
                <div className="col-12 mt-5 center-text">
                  <span>
                    ¿Ya tienes tu cuenta? <Link to="/login">Inicia sesión</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-8 col-xl-9 hidden-sm-up bg-cover">
              {/* {terminos ? (
                <div className="row justify-content-center align-items-center fade container-shadow fh-login">
                  <div className="col-10">
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quo alias velit praesentium repudiandae ab doloremque
                      dicta quas fugiat impedit quidem odit accusantium
                      perferendis expedita, provident quod? Aspernatur ab atque
                      culpa? Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Voluptates quis deserunt assumenda quae maxime
                      reiciendis at beatae minus, rem ullam delectus hic quam,
                      laborum, necessitatibus eligendi nobis mollitia
                      laudantium. Officia?
                    </span>
                    <br />
                    <p
                      onClick={() => this.setState({ terminos: !terminos })}
                      className="terminos-text mt-4"
                    >
                      {' '}
                      Cerrar
                    </p>
                  </div>
                </div>
              ) : ( */}
              <div>
                <div
                  className="row fh-login fade"
                  style={{
                    backgroundImage: `url(http://impulse-fitnessstudio.com/wp-content/uploads/2018/01/1-Impulse-copy.jpg)`,
                    backgroundSize: 'cover'
                  }}
                />
              </div>
              {/* )} */}
            </div>
          </div>
        )}
      </AuthWrapper>
    )
  }
}

// const mapStateToProps = ({ auth }) => ({ auth })

// export default connect(mapStateToProps, { register })(Registro)
