import React, {Component} from 'react';
import Login from './components/login/login'
import { withRouter } from 'react-router-dom'
import './loginCadastro.css'
import Cadastro from './components/cadastro/cadastro'

class CadastroLogin extends Component {
    render () {
        return (
            <div className="loginCadastro">
                <div className="buttonAndLogin">
                    <Login/>
                    <a href="#cadastroForm"><button id="id-button-cadastro">Cadastrar</button></a>
                </div>
                
                <div className="espaco">
                
                </div>
        
                <Cadastro id="cadastro"/>
            </div>
        );
    }
}

export default withRouter(CadastroLogin)