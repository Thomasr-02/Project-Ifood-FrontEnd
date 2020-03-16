import React, {Component} from 'react';
import '../App.css';
import api from '../services/api'
import {logout} from '../services/auth'
import {Link} from 'react-router-dom'

export default class Home extends Component {

    state = {
        restaurantes: [],
    }

    Logout() {
        logout();
        
    }

    // api.get('/restaurantes?q='+ e.target.value)
    HandleSearch = (e) => {
        api.get('/restaurantes')
        .then(res => {
            const restaurantes = res.data;
            this.setState( { restaurantes } );
            console.log(restaurantes.length)
        
        }).catch((err) => {
            console.log(err)
        });
    }
  render () {
    return (
      <div>
          <div className="row d-flex justify-content-center">
                <form className='col-xs-12 col-md-8'>
                    <input className="form-control mr-sm-2 " onChange= { this.HandleSearch } type="search" placeholder="Pesquisa restaurante/prato" aria-label="Search"></input>
                    
                </form>
                <Link to="/">
                    <button styles={styles.logout}className="col-xs-6" onClick={this.Logout}>Logout</button>
                </Link>
                
          </div>
          <div className="container border row d-flex justify-content-center" id="containerCategorias">
            <div className="row" id="containerCategorias">
                <div className="col-md-10">    
                    <h5>Categorias</h5>
                    <a styles={styles.categorias} href="teste">Mais pedidos</a>
                    <br></br>
                    <a href="teste">Promoções</a>
                    <br></br>
                    <a href="teste">Entrega grátis</a>
                    <br></br>
                    <a href="teste">Restaurante popular</a>
                    <br></br>
                    <a href="teste">Entrega rápida</a>

                </div>
            </div>
          </div>

        {/* cards */}
        { 
            this.state.restaurantes.map (restaurantes => (
            <div key={restaurantes.id_estabilishment} className = "container border" id="CardsRestaurantes">
                
                <div className="cards">
                    <h5>Restaurante : {restaurantes.name_estab}</h5>
                    <p>Email: {restaurantes.email}</p>
                    {restaurantes.delivery_free ? (<p>Frete grátis!</p>) : (<p>Preço do frete: R$ 2,00</p>)}
                    <p></p>
                    <button id="id" type="submit" value={ restaurantes.id } className="btn btn-primary" >Ver mais</button>
                </div>
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            ))
        }
    
      </div>
    );
  }
}

var styles = {
    logout: {
        marginLeft: 550,
    },

}
