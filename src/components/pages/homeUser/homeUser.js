import React, {Component} from 'react';
import './homeUser.css';
import api from '../../../services/api'
import { Link } from 'react-router-dom'
import { logout } from '../../../services/auth'
import CardRestaurante from './cardRestaurante'

export default class Home extends Component {

    state = {
        restaurantes: [],
        search: '',
        id_establishment: 0,
        pratos: [],
        rest_barato: []
    }

    Logout() {
        logout ();
        
    }

    componentDidMount () {
        api.get('/findProductOrRestaurante/')
        .then(res => {
            const restaurantes = res.data;
            this.setState( { restaurantes } );
        
        }).catch((err) => {
            console.log(err)
        });
    }
    
    handle = async e => {
        await this.setState({[ e.target.name] : e.target.value})
    }
    
    

    mostraPratos = () => {
        var name_dish = this.state.search
        console.log(name_dish)
        api.get('/findProduct/' + name_dish)
        .then(res => {
            const dish = res.data;
            console.log(dish)
            this.setState({ restaurantes: [] })
            this.setState({ pratos: dish })

        }).catch(err => {
            console.log(err)

        })
    } 

    mostraRestaurantes =() => {
        var name_estab = this.state.search

        api.get('/findRestaurante/' +  name_estab)
        .then(res => {
            const restaurantes = res.data;
            console.log(restaurantes)
            this.setState({ pratos: [] })
            this.setState({ restaurantes })

        }).catch(err => {
            console.log(err)

        })
    }

    mostPedidos = () => {
        api.get('/restaurantes/mostpopular/'+ 5)
        .then(res => {
            const restaurantes = res.data;
            console.log(restaurantes)
            this.setState({ pratos: [] })
            this.setState({ restaurantes })

        }).catch(err => {
            console.log(err)

        })
    }

    mostPopular = async () => {
        var rest_barato = []
        var i=0

        await this.state.restaurantes.map(rest => {
            api.get('/restaurantes/bestcheap/'+ rest.id_establishment)
            .then(res => {
                console.log(res.data[0].max)
                if (parseInt(res.data[0].max) <= 10) {
                    api.get('/restaurantes/'+ rest.id_establishment).then(rest =>{
                        console.log(rest)
                        rest_barato = rest_barato.concat(rest.data)
                        this.setState({ restaurantes: rest_barato })

                    })
                    
                }
    
            }).catch(err => {
                console.log(err)
    
            })

        })
        console.log(rest_barato)
        
        this.setState({ pratos: [] })
       
        console.log(this.state.restaurantes)
        
    }

    findDeliveryFree = () => {
        api.get('restaurantes/delivery/' + true).then(res => {
            console.log(res)
            const restaurantes = res.data;

            this.setState({ pratos: [] })
            this.setState({ restaurantes })
        })
    }

    findDeliveryFast = () => {
        api.get('restaurantes/delivery/' + false).then(res => {
            console.log(res)
            const restaurantes = res.data;
            
            this.setState({ pratos: [] })
            this.setState({ restaurantes })
        })
    }

  render () {
    return (
      <div className="HomeUser">
          <h1 className="home-tittle">Home cliente</h1>
          <div className="naveHomeUser">
                <div className="container-search">
                    <input className='search' name='search' onChange={ this.handle } type="search" placeholder="Pesquisa restaurante/prato"></input>
                    <img src={require("../../../assets/search.png")} width="29" height="29" alt="search"></img>
                    <Link to="/" className="button-logout">
                        <button onClick={this.Logout}>Logout</button>
                    </Link>
                </div>
                <div>
                    <div className="button-position">
                        <button id="button-pesquisa-prato" onClick={ this.mostraPratos }>Pesquisar prato</button>
                        <button onClick={ this.mostraRestaurantes }>Pesquisar restaurante</button>
                    </div>
                    
                </div>
                

          </div>
          
          <div className="grid-container">
            <div className="containerCategorias">
                <div className="categorias">    
                    
                    <ul className="ulCategorias">
                        <h5>Categorias</h5>
                        <li><button onClick={ this.mostPedidos } className="button-star">Mais pedidos</button></li>
                        <li><button onClick={ this.promocoes } className="button-star">Promoções</button></li>
                        <li><button onClick={ this.findDeliveryFree } className="button-star">Entrega grátis</button></li>
                        <li><button onClick={ this.mostPopular } className="button-star">Restaurante popular</button></li>
                        <li><button  onClick={ this.findDeliveryFast }className="button-star">Entrega rápida</button></li>
                    </ul>
                    
                </div>
            </div>

            <div className="cardsRestaurantes">
                <h3>Pesquisa</h3>
                <br></br>
                { 
                    this.state.restaurantes.map (restaurantes => (    
                    <div key={restaurantes.id_establishment} className = "container-cards-cardapio">
                        <CardRestaurante rest={restaurantes}/>

                    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                    ))
                }
                
                { 
                    this.state.pratos.map (pratos => (
                    <div key={pratos.id_dish} className = "container-cards-cardapio" >
                        
                        <div className="cards">
                            <h5> <b>{pratos.name_dish}</b></h5>
                            <p>Valor: {pratos.value_dish}</p>
                            
                            <p></p>
                            <Link to = "/homeUser/compras">
                                <button name="id_dish" type="submit" onClick={ this.sendIdCompras } value={ pratos.id_establishment } className="btn btn-primary" >  Ver mais </button>
                            </Link>
                            
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