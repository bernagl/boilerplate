import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../views/Login'
import Registro from '../views/Registro'
import Index from '../views/Index'
import Perfil from '../views/Perfil'
import Fake from '../views/Fake'
import Recuperar from '../views/Recuperar'
import Gimnasio from '../views/Gimnasio'
import ComprarCreditos from '../views/ComprarCreditos'
import Checkout from '../views/Checkout'
// import Tests from '../views/Test'
import PrivateRoute from './PrivateRoute'

export const WithAuth = ({ auth }) => {
  return (
    <Switch>
      <PrivateRoute path="/" component={Gimnasio} exact auth={auth} />
      <PrivateRoute path="/perfil" component={Perfil} auth={auth} />
      <PrivateRoute path="/clase" component={Gimnasio} auth={auth} />
      <PrivateRoute path="/comprar" component={ComprarCreditos} auth={auth} />
      <PrivateRoute path="/checkout" component={Checkout} auth={auth} />
      <PrivateRoute path="/fake" component={Fake} auth={auth} />
      {/* <PrivateRoute path="/Tests" component={Tests} auth={auth} /> */}
      <Route component={() => <p>Ruta no encontrada</p>} />
      {/* <Route path="/login" component={Login} />
      <Route path="/registro" component={Registro} />
      <Route path="/recuperar" component={Recuperar} /> */}
    </Switch>
  )
}

export const NoAuth = () => {
  return (
    <Switch>
      <Route path="/registro" component={Registro} />
      <Route path="/recuperar" component={Recuperar} />
      <Route component={Login} />
    </Switch>
  )
}

// export const AppRouter = () => {
//   return (
//     <Switch>
//       <Route path="/" component={Index} />
//     </Switch>
//   )
// }
