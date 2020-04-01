import React, { Component } from 'react'
import { isId_estab, TOKEN_KEY2 } from '../../../services/auth.js'
import api from '../../../services/api'
import "./homeRestaurante.css"
import { Form, Button } from 'react-bootstrap';

import NaveHomeRestaurante from './components/naveHomeRestaurante'
import Situacao from './components/situacao'


export default class HomeRestaurante extends Component {

    state = {
        dishes: [],
        
        name_dish: '',
        type_dish: '',
        description_dish: '',
        value_dish: '',
        fk_establishment_id_establishment: 0,
        err: ''
    }

    componentDidMount () {
        api.get('/dishOfRestaurantes/' + isId_estab(TOKEN_KEY2))
                .then(res => {
                    const dishes = res.data;
                    
                    this.setState( { dishes } );
                    this.setState({ fk_establishment_id_establishment: isId_estab(TOKEN_KEY2) })
                
                }).catch((err) => {
                    console.log(err)
         });
    }

    handle = async (e) => { 
        await this.setState({ [e.target.id]: e.target.value })
    }

    addDish = (e) => {
        const { type_dish, name_dish, value_dish, description_dish, fk_establishment_id_establishment } = this.state
        
        console.log(fk_establishment_id_establishment)
        
            api.post('/dishes' , { type_dish, name_dish, value_dish, description_dish, fk_establishment_id_establishment })
        .then(e => {
            console.log(e + ' adicionou')
            window.location.reload(false);
        }).catch(err => {
            console.log(err)
            this.setState({err: 'algo de errado nao esta certo'})
        })
    }

    removeDish = (e) => {
        const id_dish = e.target.value

        api.delete('/dishes/'+  id_dish)
        .then(e  => {
            console.log('removido')
            window.location.reload(false)
         }).catch(err => {
             console.log(err)
         })
    }


    render() {
        return (
            <div className="homeRestaurante">
                <h1>Home restaurante</h1>
                <NaveHomeRestaurante id={ this.state.fk_establishment_id_establishment } />

                <Situacao id={ this.state.fk_establishment_id_establishment }/>
                
                <div className="grid-container">
                    <div className="addPrato">
                        <h2>Adicionar prato</h2>

                        <Form.Group className="formAddPrato">
                            <Form.Label></Form.Label>  
                            <Form.Control id="name_dish"className="input" onChange={this.handle} type="text" placeholder="Nome do prato"></Form.Control>
                            <Form.Control id="type_dish" className="input" onChange={this.handle} type="text" placeholder="Tipo do prato"></Form.Control>
                            <Form.Control id="description_dish"className="input" onChange={this.handle} type="text" placeholder="Descrição"></Form.Control>
                            <Form.Control id="value_dish" className="input" onChange={this.handle} type="text" placeholder="Preço"></Form.Control>
                            {this.state.err}
                            <Button className="button" id="buttonAddPrato" onClick={ this.addDish} type="submit"> Adicionar </Button>
                        </Form.Group>
                        
                    </div>
                    <div className="containerListaPratos">
                        <div className="listaPratos">
                            <h2>Cardápio</h2>
                            { 
                                this.state.dishes.slice(0).reverse().map (dishes => (
                                <div key={dishes.id_dish} className = "container-cards-dishes">
                                    <div className="dishesCards">
                                        <h5>Nome do prato: {dishes.name_dish}</h5>
                                        <p>Preço: R$ {dishes.value_dish}</p>
                                        <p>Descrição: {dishes.description_dish}</p>
                                        <p></p>
                                        <button type="submit" value={ dishes.id_dish } onClick={this.removeDish} className="btn btn-primary" >Remover</button>
                                    </div>
                                </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>      
        )
    }
}
