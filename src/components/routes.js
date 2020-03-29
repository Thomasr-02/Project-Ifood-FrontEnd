import React                                      from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomeUser                                   from './pages/homeUser/homeUser'
import HomeRestaurante                            from './pages/homeRestaurante/homeRestaurante'
import Inicio                                     from './pages/loginCadastro/loginCadastro'
import { isAuthenticated }                        from "../services/auth";
import Compras                                    from './pages/compras/compras'

const PrivateRoute = ({ component: Component, ...rest }) => (
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
      <Route        exact path="/"                 component={ Inicio                      }/>
      <PrivateRoute exact path="/homeUser"         component={ HomeUser                    }/>
      <PrivateRoute exact path="/homeUser/compras" component={ Compras                     }/>
      <PrivateRoute exact path="/homeRestaurante"  component={ HomeRestaurante             }/>
      <Route              path="*"                 component={() => <h1>Page not found</h1>}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;