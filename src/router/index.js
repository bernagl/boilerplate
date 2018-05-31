import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../views/Login'
import Registro from '../views/Registro'
import Index from '../views/Index'
import Perfil from '../views/Perfil'
import PrivateRoute from './PrivateRoute'

export default ({ auth }) => {
  return (
    <Switch>
      <PrivateRoute path="/" component={Index} exact auth={auth} />
      <PrivateRoute path="/perfil" component={Perfil} auth={auth} />
      <Route path="/login" component={Login} />
      <Route path="/registro" component={Registro} />
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
