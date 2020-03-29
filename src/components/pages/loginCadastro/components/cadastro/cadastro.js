import React, { Component } from 'react'
import './cadastro.css'
import api from '../../../../../services/api'

export class Cadastro extends Component {

    state = {
        firstName: '',
        lastName:'',
        email: '',
        password: '',
        city: '',
        neighborhood:'',
        street:'',
        number:'',
        
        name_estab: '', 
        delivery_free: true, 
        category: '', 
        balance:'',

        error: ''
    }

    handle = (e) => {
        console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.value })
    }

    addUser = (e) => {
        const { firstName, lastName, email, password, city, neighborhood, street, number } = this.state

        api.post("/users",  { firstName, lastName, email, password, city, neighborhood, street, number } )
        .then(() => { alert("Cadasrado com sucesso como cliente!") })
        .catch((err) => {
            this.setState({ error: err.toString() })
            
        })

    }

    addRestaurante = (e) => {
        
        const { name_estab, email, password, city, neighborhood, street, number, delivery_free, category, balance } = this.state
        
        api.post("/restaurantes", { name_estab, email, password, city, neighborhood, street, number, delivery_free, category, balance })
        .then(() => { alert("Sucesso ao cadastrar como restaurante!" ) })
        .catch(err => {
            this.setState({ error: err.toString() })
        })
    }

    render() {
        return (
            <div className="cadastro">
                <div className="container-error">
                    <p className="error">{this.state.error}</p>
                </div>
                
                
                <div className="grid-container-cadastro">
                    <form className="cadastroForm" id="cadastroForm" onSubmit={this.addUser}>
                        
                        <div className="gridInput" id="cadastroUser">
                            <h2>Cadastro cliente</h2>
                            <label>Pimeiro nome</label>
                            <input name="firstName" className="form-control" onChange={ this.handle } placeholder="Primeiro nome"></input>

                            <label>Segundo nome</label>
                            <input name="lastName" className="form-control" onChange={ this.handle } placeholder="Segundo nome"></input>
                            
                            <label>Email</label>
                            <input name="email" className="form-control" onChange={ this.handle } type="email" placeholder="example@hotmail.com"></input>

                            <label>Senha</label>
                            <input name="password" className="form-control" onChange={ this.handle } type="password" placeholder="Senha"></input>

                            <br></br>
                            <h4>Endereço</h4>

                            <label>Cidade</label>
                            <input name="city" className="form-control" onChange={ this.handle } placeholder="Ex: Joao Pessoa"></input>
                            
                            <label>Municipio</label>
                            <input name="neighborhood" className="form-control" onChange={ this.handle } placeholder="Ex: Mangabeira"/>
                            
                            <label>Rua</label>
                            <input name="street" className="form-control" onChange={ this.handle } placeholder="Ex: Rua dos escoteiros"/>
                            
                            <label>Número</label>
                            <input name="number" className="form-control" onChange={ this.handle } placeholder="55"></input>
                            
                            <button className="button-cadastro">Cadastrar</button>
                        </div>
                    </form>
    
                    <form className="cadastroForm" onSubmit={this.addRestaurante}>
                        <div className="gridInput">                            
                            <div className="gridInput" id="cadastroUser">
                                
                                <h2>Cadastro restaurante</h2>
                                <label>Restaurante</label>
                                <input name="name_estab" className="form-control" onChange={ this.handle } placeholder="Nome restaurante"></input>
                                
                                <label>Email</label>
                                <input name="email" className="form-control" onChange={ this.handle } type="email" placeholder="example@hotmail.com"></input>

                                <label>Senha</label>
                                <input name="password" className="form-control" onChange={ this.handle } type="password" placeholder="Senha"></input>

                                <br></br>
                                <h4>Endereço</h4>
                                <label>Cidade</label>
                                <input name="city" className="form-control" onChange={ this.handle } placeholder="Ex: Joao Pessoa"></input>
                                
                                <label>Municipio</label>
                                <input name="neighborhood" className="form-control" onChange={ this.handle } placeholder="Ex: Mangabeira"/>
                                
                                <label>Rua</label>
                                <input name="street" className="form-control" onChange={ this.handle } placeholder="Ex: Rua dos escoteiros"/>
                                
                                <label>Número</label>
                                <input name="number" className="form-control" onChange={ this.handle } placeholder="55"></input>

                                <button className="button-cadastro" type="submit">Cadastrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Cadastro
