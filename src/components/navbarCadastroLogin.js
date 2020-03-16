import { Nav, Dropdown } from 'react-bootstrap';
import React, {Component} from 'react';
import api from '../services/api'
import Login from './Login'
import {withRouter} from 'react-router-dom'

class CadastroLogin extends Component {

    state = {
        firstName: '',
        lastName:'',
        email: '',
        password: '',
        
        name_estab: '', 
        delivery_free: false, 
        category: '', 
        balance:''
    }

    /* Cadastra */
    cadaUser() { 
        var first_name = document.querySelector('#formNome1').value;
        var last_name= document.querySelector('#formNome2').value;
        var email = document.querySelector('#formEmail').value;
        var password = document.querySelector('#formPassword').value;
        
        api.post('/users',{first_name, last_name, email, password})
        .then((res) => {
            console.log(res);
            setTimeout(function(){ console.log("deubom"); }, 3000);

        }).catch((err) => {
            alert("error: " + err.toString());
        });
    }
    /* Cadastra restaurante */

    cadaRestaurante() {
        var name_estab = document.querySelector('#estab_name').value;
        var email = document.querySelector('#estab_formEmail').value;
        var password = document.querySelector('#estab_formPassword').value;
        var delivery_free = true;
        var category = '';
        var balance = 0

        api.post('/restaurantes',{name_estab, email, password, delivery_free, category, balance })
        .then((res) => {
            alert(res);
            
        }).catch((err) => {
            alert("error: " + err.toString());
        });
    }
    

    render () {
        return (
            <div className="Teste">
                <Nav className="justify-content" id="mynav">
                    <Login/>
                    <div className="Cadastro">
                        <div className="btn">         
                            <Dropdown>
                                <Dropdown.Toggle>
                                    Cadastrar como usuário
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu-cadastro">
                                    <form className="px-4 py-3">
                                        <div className="form-group">
                                            <label htmlFor="formNome1">Primeiro Nome</label>
                                            <input className="form-control" id="formNome1" placeholder="Primeiro nome"/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="formNome2">Segundo Nome </label>
                                            <input className="form-control" id="formNome2" placeholder="Segundo nome"/>
                                        </div>                                  

                                        <div className="form-group">
                                            <label htmlFor="formEmail">Endereço de email</label>
                                            <input type="email" className="form-control" id="formEmail" placeholder="email@exemplo.com"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="formPassword">Senha</label>
                                            <input type="password" className="form-control" id="formPassword" placeholder="Senha"/>
                                        </div>
                                        
                                        <button onClick={this.cadaUser} className="btn btn-primary">Cadastrar-se</button>
                                    </form>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>         
                                
                        <div className="btn">         
                            <Dropdown>
                                <Dropdown.Toggle>
                                    Cadastrar como restaurante
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu-cadastro">
                                    <form className="px-4 py-3">
                                        <div className="form-group">
                                            <label htmlFor="formNome1">Restaurante</label>
                                            <input className="form-control" id="estab_name" placeholder="Nome"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="formEmail">Endereço de email</label>
                                            <input type="email" className="form-control" id="estab_formEmail" placeholder="email@exemplo.com"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="formPassword">Senha</label>
                                            <input type="password" className="form-control" id="estab_formPassword" placeholder="Senha"/>
                                        </div>
                                        
                                        <button onClick={this.cadaRestaurante} className="btn btn-primary">Cadastrar-se</button>
                                    </form>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </Nav>
            </div>
        );
    }
}

export default withRouter(CadastroLogin)