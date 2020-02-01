import { Navbar, Form, FormControl, Button, Nav, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';
import React, {Component} from 'react';

export default class navbar extends Component {
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
                                <div class="form-group">
                                    <label for="exampleDropdownFormEmail1">Endereço de email</label>
                                    <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@exemplo.com"/>
                                </div>
                                <div className="form-group">
                                    <label for="exampleDropdownFormPassword1">Senha</label>
                                    <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Senha"/>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" class="form-check-input" id="dropdownCheck"/>
                                    <label className="form-check-label" for="dropdownCheck">
                                        Remember me
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary">Entrar</button>
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
                                    <div class="form-group">
                                        <label for="DropdownNome">Nome Completo</label>
                                        <input class="form-control" id="Nome" placeholder="Coloque seu nome completo"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="DropdownNome">Endereço</label>
                                        <input class="form-control" id="Nome" placeholder="Coloque seu endereço"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="DropdownFormEmail1">Endereço de email</label>
                                        <input type="email" class="form-control" id="DropdownFormEmail1" placeholder="email@exemplo.com"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="DropdownFormPassword1">Senha</label>
                                        <input type="password" class="form-control" id="DropdownFormPassword1" placeholder="Senha"/>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-primary">Cadastrar-se</button>
                                </form>
                                
                            </Dropdown.Menu>
                    </div>
                    </Dropdown>
             </Nav>                    

        );
    }
}