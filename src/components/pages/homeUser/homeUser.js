import React, {Component} from 'react';
import './homeUser.css';
import api from '../../../services/api'
import {logout} from '../../../services/auth.js'
import {Link} from 'react-router-dom'
import  NaveHomeUser from './components/naveHomeUser'

export default class Home extends Component {
    state = {
        restaurantes: [],
        search: ''
    }
    
    Logout() {
        logout();
        
    }

    componentDidMount () {
        api.get('/findProductOrRestaurante/'+ this.state.search)
                .then(res => {
                    const restaurantes = res.data;
                    this.setState( { restaurantes } );
                
                }).catch((err) => {
                    console.log(err)
         });
    }
    
    handleChange = async e => {
        var search = e.target.value
        await this.setState({search: search})

        api.get('/findProductOrRestaurante/' + this.state.search)
            .then(res => {
                const restaurantes = res.data;
                this.setState( { restaurantes } );
            
            }).catch((err) => {
                console.log(err)
        });
    }
    
  render () {
    return (
      <div className="HomeUser">
          <NaveHomeUser />
          
          <div className="grid-container">
            <div className="containerCategorias">
                <div className="categorias">    
                    
                    <ul className="ulCategorias">
                        <h5>Categorias</h5>
                        <li><a href="teste">Mais pedidos</a></li>
                        <li><a href="teste">Promoções</a></li>
                        <li><a href="teste">Entrega grátis</a></li>
                        <li><a href="teste">Restaurante popular</a></li>
                        <li><a href="teste">Entrega rápida</a></li>
                    </ul>
                    
                </div>
            </div>
            {/* cards */}
            <div className="cardsRestaurantes">
                { 
                    this.state.restaurantes.map (restaurantes => (
                    <div key={restaurantes.id_establishment} className = "container border" id="CardsRestaurantes">
                        
                        <div className="cards">
                            <h5>Restaurante: {restaurantes.name_estab}</h5>
                            <p>Cidade: {restaurantes.city}</p>
                            {restaurantes.delivery_free ? (<p>Frete grátis!</p>) : (<p>Preço do frete: R$ 2,00</p>)}
                            <p></p>
                            <button id="id" type="submit" value={ restaurantes.id } className="btn btn-primary" >Ver mais</button>
                        </div>
                    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                    ))
                }
            </div>
            
          </div>
          
    
      </div>
    );
  }
}

var styles = {
    logout: {
        marginLeft: 550,
    },

}
