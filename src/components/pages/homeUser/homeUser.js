import React, {Component} from 'react';
import './homeUser.css';
import api from '../../../services/api'
import {logout} from '../../../services/auth.js'
import {Link} from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            restaurantes: [],
            search: ''
        }
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

    Logout() {
        logout();
        
    }
    
    handleChange = async e => {
            var search = e.target.value
            await this.setState({search: search})
    
            api.get('/findProductOrRestaurante/'+ this.state.search)
                .then(res => {
                    const restaurantes = res.data;
                    this.setState( { restaurantes } );
                    console.log(restaurantes.length)
                    console.log(this.state.search)
                
                }).catch((err) => {
                    console.log(err)
            });
       
    }
    
  render () {
    return (
      <div className="Home">
          <div className="row d-flex justify-content-center">
                <form className='col-xs-12 col-md-8'>
                    <input id="Search" className="form-control mr-sm-2 " onChange={this.handleChange} type="search" placeholder="Pesquisa restaurante/prato"></input>
                    
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
    );
  }
}

var styles = {
    logout: {
        marginLeft: 550,
    },

}
