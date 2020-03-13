import { Nav, Dropdown } from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';


export default class navbar extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.cadaUser = this.cadaUser.bind(this);

        this.state = {
            firstName: '',
            lastName:'',
            email: '',
            password: ''
        }
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    /* Cadastra */
    cadaUser() { 
        var first_name = document.querySelector('#formNome1').value;
        var last_name= document.querySelector('#formNome2').value;
        var email = document.querySelector('#formEmail').value;
        var password = document.querySelector('#formPassword').value;
        
        axios.post('http://localhost:3000/users',{first_name, last_name, email, password})
        .then((res) => {
            console.log(res);
            setTimeout(function(){ console.log("deubom"); }, 3000);

        }).catch((err) => {
            alert("error: " + err.toString());
        });
    }
    
    /* Login */
    login(){
        var email = document.querySelector('#formEmail').value;
        var password = document.querySelector('#formPassword').value;

        axios.post('http://localhost:3000/login',{email, password}).
            then(console.log("logado"))//PASSAR UM HRFE PRA ROTA /home
            .catch((err)=>{
                alert("error: " + err.toString())
            });
    }


    render () {
        return (
            <Nav className="justify-content" id="mynav">
                <Dropdown>
                    <div className="btn">
                        <Dropdown.Toggle>
                            Login
                        </Dropdown.Toggle>
                    
                        <Dropdown.Menu className="dropdown-menu">
                            <form className="px-4 py-3">
                                <div className="form-group">
                                    <label htmlFor="formEmail">Endereço de email</label>
                                    <input type="email" className="form-control" id="formEmail" placeholder="email@exemplo.com"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="formPassword">Senha</label>
                                    <input type="password" className="form-control" id="formPassword" placeholder="Senha"/>
                                </div>

                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="check"/>
                                    <label className="form-check-label" htmlFor="check">
                                        Remember me
                                    </label>
                                </div>

                                <button onClick={this.login}  className="btn btn-primary">Entrar</button>
                            </form>
                        </Dropdown.Menu>
                    </div>
                </Dropdown>

                <Dropdown>
                    <div className="btn">
                            <Dropdown.Toggle>
                                Cadastrar-se
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
                    </div>
                    </Dropdown>
             </Nav>                    
        );
    }
}