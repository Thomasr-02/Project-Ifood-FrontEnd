import React, { Component } from 'react'
import api from '../services/api'
import { Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { login, isId_estab } from "../services/auth";

class Login extends Component {

    state = {
        email: "",
        password: "",
        error: ""
      };
    
      handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
          this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
          try {
            const response = await api.post("/login", { email, password });

            if (response.data[0].id_person !== undefined) {

                login(response.data.token);
                this.props.history.push("/homeUser");

                
                
            }
            else if(response.data[0].id_establishment !== undefined) {

                login(response.data.token);
                localStorage.setItem('@airbnb-Token2', response.data[0].id_establishment);
                console.log(isId_estab("@airbnb-Token2"))
                this.props.history.push("/homeRestaurante");

            }
          } catch (err) {
            this.setState({
              error: "Algo de errado nao esta certo"
                
            });
          }
        }
    }

    render() {
        return (
            <div className="container" id="ContainerLogin">
                <Dropdown>
                    <div className="container">
                        <Dropdown.Toggle>
                            Login
                        </Dropdown.Toggle>
                    
                        <Dropdown.Menu className="dropdown-menu">
                            <form className="px-4 py-3" onSubmit={this.handleSignIn}>
                            {this.state.error && <p>{this.state.error}</p>}
                                <div className="form-group">
                                    <label>Email</label>
                                    <input onChange={e => this.setState({ email: e.target.value })} type="email" className="form-control" id="formEmail" placeholder="email@exemplo.com"/>
                                </div>

                                <div className="form-group">
                                    <label>Senha</label>
                                    <input onChange={e => this.setState({ password: e.target.value })} type="password" className="form-control" id="formPassword" placeholder="Senha"/>
                                </div>
                               
                                <button type="submit" className="btn btn-primary">Entrar</button>    

                            </form>
                        </Dropdown.Menu>
                    </div>
                </Dropdown>
            </div>
        )
    }
}

export default withRouter(Login);