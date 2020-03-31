import React, { Component } from 'react'
import api from '../../../services/api'
import intermediador from './intermediador'
import './compras.css'

export default class Compras extends Component  {

    //dishOfRestaurantes
    //pegar 1 restaurantes/id
    state = {
        name_estab: '',
        delivery_fee: false,
        email: '',
        id: intermediador.idRest(0, "get"),

        dishes: [],
        carrinho: [],

        name: '',
        preco: '',
        total: 0,

    } 

    
    componentDidMount = () => {
        api.get('/restaurantes/'+ this.state.id)
        .then(res => {
            const {name_estab, delivery_fee, email} = res.data[0]    
            this.setState({ name_estab }) 
            this.setState({ delivery_fee }) 
            this.setState({ email }) 
            
        }).catch(() => {
            console.log("Erro ao encontrar restaurante")
        })
        
        api.get('/dishOfRestaurantes/'+ this.state.id)
        .then((res)=>{
            const dishes = res.data
            this.setState({ dishes })
        })
        
    }

    addCarrinho =  (dish) => {
        const carrinho = this.state.carrinho.concat(dish) 
        const total = this.state.total + dish.value_dish
        
        this.setState({ carrinho })
        this.setState({ total })
    }

    removeCarrinho = (index, carrin) => {
        const carrinho = this.state.carrinho
        const total = this.state.total - carrin.value_dish

        
        carrinho.splice(index, 1) //remove o 1 elemento desse index
    
        this.setState({ carrinho })
        this.setState({   total  })
    }


    
    render() {

        return (
            <div className="Compras">
                <div className="info-restaurante">
                    <h2>{this.state.name_estab}</h2>    
                    {this.statedelivery_fee ? (<p>Frete grátis!</p>) : (<p>Preço do frete: R$ 2,00</p>)}
                    <p>Email: {this.state.email}</p>
                </div>
                
                <div className="grid-areas">
                    <div className="cardapio">
                        <h3 >Cardápio</h3>
                        {
                            this.state.dishes.map((dishes, index) => (
                                
                                <div className="card-dish" key={index}>
                                    <p>Prato {index + 1}</p>
                                    <p>Nome do prato: <b>{dishes.name_dish}</b></p>
                                    <p>Descrição: {dishes.description_dish}</p> 
                                    <p>Preço { dishes.value_dish }R$</p>
                                    <button onClick={ () => this.addCarrinho(dishes) } >Adicionar ao carrinho</button>
                                </div>
                            ))
                        }
                    </div>
                    
                    <div className="header-carrinho">
                        <div>
                            <h3> Seu carrinho: R$ { this.state.total } </h3>  
                        </div>
                        <div>
                            <button>Finalizar</button>
                        </div>
                    </div>

                    <div className="carrinho">
                        {
                            this.state.carrinho.map((carrinho, index) => (
                                <div className="card-carrinho" key={index}>
                                    
                                    <p>Prato {index + 1 }</p>
                                    <p>Nome do prato: <b>{carrinho.name_dish}</b></p>
                                    <p>Descrição: {carrinho.description_dish}</p> 
                                    <p>Preço { carrinho.value_dish }R$</p>
                                    <button onClick={() => this.removeCarrinho( index, carrinho ) }>Remover</button>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
                
                
            </div>
        )
    }
}