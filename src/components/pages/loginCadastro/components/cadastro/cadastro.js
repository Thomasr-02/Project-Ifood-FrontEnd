import React, { Component } from 'react'
import './cadastro.css'
import { Dropdown } from 'react-bootstrap'

export class Cadastro extends Component {
    render() {
        return (
            <div className="cadastro">
                <Dropdown>
                    <Dropdown.Toggle>
                        Cadastrar-se
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="menu-cadastro">
                        <div className="grid-container-cadastro" id>
                            <form className="cadastroForm">
                                
                                <div className="gridInput" id="cadastroUser">
                                    <h2 className="inputCadastro">Cadastro cliente</h2>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    
                                </div>
                                <button className="button-cadastro">Cadastrar</button>
                            </form>
            
                            <form className="cadastroForm">
                                
                                <div className="gridInput">
                                    <h2 className="inputCadastro">Cadastro restaurante</h2>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                    <input className="inputCadastro" placeholder="testeteste"></input>
                                </div>
                                <button className="button-cadastro">Cadastrar</button>
                            </form>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default Cadastro
