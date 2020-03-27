import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { login, isId_estab } from "../../../../../services/auth";

import './login.css'
import api from '../../../../../services/api'


export class Login extends Component {
    state = {
        email: "",
        password: "",
        error: ""
      };

      handle = (e) => {
        this.setState({ [e.target.id]: e.target.value })
      }

      login = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        console.log(email, password)

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
                  this.props.history.push("/homeRestaurante");
  
              }
  
            }catch (err) {
              this.setState({
                  error: "Algo de errado nao esta certo"
                  
              });
            }
          }
      }

    render() {
        return (
            <div className= "login">            
                <Dropdown className="dropdownLogin">
                    <Dropdown.Toggle>
                        Login
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        
                        <form className="formLogin" >
                            <h2>Login</h2>
                            <input className="formLogin" id="email" onChange={this.handle} placeholder="examplo@hotmail.com" type="email"></input>
                            <input className="formLogin" id="password" onChange={this.handle} placeholder="Senha" type="password"></input>
                            <button className="formLogin" onClick={this.login}> Entrar</button>
                            
                        </form>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        )
    }
}

export default withRouter(Login);
