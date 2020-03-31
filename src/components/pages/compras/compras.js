import React, { Component } from 'react'
import Modal from 'react-awesome-modal';
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
        id_restaurante: intermediador.idRest(0, "get"),
        id_person: intermediador.idUser(0, "get"),

        dishes: [],
        carrinho: [],

        name: '',
        preco: '',
        total: 0,
        visible: false,

        person: []

    } 

    
    componentDidMount = () => {
        api.get('/restaurantes/'+ this.state.id_restaurante)
        .then(res => {
            const {name_estab, delivery_fee, email} = res.data[0]    
            this.setState({ name_estab }) 
            this.setState({ delivery_fee }) 
            this.setState({ email }) 
            
        }).catch(() => {
            console.log("Erro ao encontrar restaurante")
        })
        
        api.get('/dishOfRestaurantes/'+ this.state.id_restaurante)
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

    mostraModal = () => {
        this.setState({ visible: true })
        api.get("/users/" + this.state.id_person).then((res) => {
            const person = res.data

            console.log(person)

            this.setState({ person })

        })
    }

    fechaModal = () => {
        this.setState({ visible: false })
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
                            <button onClick={ this.mostraModal } >Finalizar</button>
                        </div>
                    </div>

                        <Modal visible={ this.state.visible }  effect="fadeInUp" onClickAway={ this.fechaModal }>
                            
                            <div className="modal-informacoes">
                                <h2>Confirme suas informações</h2>
                                <h3> Total a pagar: { this.state.total } </h3>
                                {
                                    this.state.person.map(person =>(
                                        <div className="container-info-endereco">
                                            <form className="form-info-endereco">
                                                <b>Rua</b>
                                                <input className="form-info-endereco" value={person.street} ></input>

                                                <b>Bairro</b>
                                                <input className="form-info-endereco" value={person.neighborhood} ></input>
                                        
                                                <b>Cidade</b>
                                                <input className="form-info-endereco" value={person.city} ></input>
                                                
                                                <b>Número</b>
                                                <input className="form-info-endereco" value={person.number} ></input>

                                                <div>
                                                    
                                                </div>

                                            </form>
                                            <button type="submit"> Finzalizar compra </button>
                                        </div>
                                    ))
                                }
                            </div>
                            
                        </Modal>

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