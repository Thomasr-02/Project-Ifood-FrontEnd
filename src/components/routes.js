import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomeUser from './homeUser'
import HomeRestaurante from './homeRestaurante'
import Inicio from '../components/navbarCadastroLogin'

import { isAuthenticated } from "../services/auth";

const PrivateRouteUser = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const PrivateRouteRestaurante = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Inicio} />
      {/* <Route path="/home" component={() => <h1>SignUp</h1>} /> */}
      <PrivateRouteUser path="/homeUser" component={HomeUser} />
      <PrivateRouteRestaurante path="/homeRestaurante" component={HomeRestaurante} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;