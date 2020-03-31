import React, { Component } from 'react'
import Modal from 'react-awesome-modal';
import api from '../../../services/api'
import intermediador from './intermediador'
import './compras.css'
// import star0 from '../../../assets/'

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
        total: 0.0,
        visible: false,

        person: [],
        rate: 0,

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

    changeStar = (e) => {
        var rate = 0
        var estrela = e.target.id

        var src_ligada = require("../../../assets/star1.png")
        var src_desligada = require("../../../assets/star0.png")

        var s1 = document.getElementById("s1").src //pega o endereço da imagem de cada estrela
        var s2 = document.getElementById("s2").src
        var s3 = document.getElementById("s3").src
        var s4 = document.getElementById("s4").src
        var s5 = document.getElementById("s5").src

        if (estrela == 's1'){ //se clicar na estrela 1, liga ela
            document.getElementById("s1").src = require("../../../assets/star1.png");
            if (s5 === src_ligada || s4 === src_ligada || s3 === src_ligada || s2 ===src_ligada){ //se s5 tiver ligada, desliga todas, menos s1
                document.getElementById("s2").src = require("../../../assets/star0.png");
                document.getElementById("s3").src = require("../../../assets/star0.png");
                document.getElementById("s4").src = require("../../../assets/star0.png");
                document.getElementById("s5").src = require("../../../assets/star0.png");
            }
            else{
                document.getElementById("s1").src = require("../../../assets/star1.png");
            }
            
            rate = 1;

        }
        if (estrela == 's2'){ 
            document.getElementById("s1").src = require("../../../assets/star1.png");
            document.getElementById("s2").src = require("../../../assets/star1.png");
            
            if (s5 === src_ligada || s4 === src_ligada || s3 === src_ligada){
                document.getElementById("s3").src = require("../../../assets/star0.png");
                document.getElementById("s4").src = require("../../../assets/star0.png");
                document.getElementById("s5").src = require("../../../assets/star0.png");
            }
            else{
                document.getElementById("s2").src = require("../../../assets/star1.png");
            }
            rate = 2;



        }
        if (estrela == 's3'){ 
            document.getElementById("s1").src = require("../../../assets/star1.png");
            document.getElementById("s2").src = require("../../../assets/star1.png");
            document.getElementById("s3").src = require("../../../assets/star1.png");
            
            if (s5 === src_ligada || s4 === src_ligada){
                document.getElementById("s4").src = require("../../../assets/star0.png");
                document.getElementById("s5").src = require("../../../assets/star0.png");
            }
            else{
                document.getElementById("s3").src = require("../../../assets/star1.png");
            }
            rate = 3;

        }
        if (estrela == 's4'){ 
            document.getElementById("s1").src = require("../../../assets/star1.png");
            document.getElementById("s2").src = require("../../../assets/star1.png");
            document.getElementById("s3").src = require("../../../assets/star1.png");
            document.getElementById("s4").src = require("../../../assets/star1.png");

            if (s5 === src_ligada){
                document.getElementById("s5").src = require("../../../assets/star0.png");
            }
            else{
                document.getElementById("s4").src = require("../../../assets/star1.png");
            }
            
            rate = 4;

        }
        if (estrela == 's5'){ 
            document.getElementById("s1").src = require("../../../assets/star1.png");
            document.getElementById("s2").src = require("../../../assets/star1.png");
            document.getElementById("s3").src = require("../../../assets/star1.png");
            document.getElementById("s4").src = require("../../../assets/star1.png");
            document.getElementById("s5").src = require("../../../assets/star1.png");
            rate = 5;

        }

        this.setState({ rate })
            
           
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
                                <h3> Total a pagar: R$ { this.state.total } </h3>
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

                                                <div className="rate">
                                                    <b>Que tal dar uma nota ao prato? =^-^=</b>
                                                    <div className="stars">
                                                        <a href="javascript:void(0)" onClick={ this.changeStar }><img id="s1" src={require("../../../assets/star0.png")} alt="star1"></img></a>
                                                        <a href="javascript:void(0)" onClick={ this.changeStar }><img id="s2" src={require("../../../assets/star0.png")} alt="star2"></img></a>
                                                        <a href="javascript:void(0)" onClick={ this.changeStar }><img id="s3" src={require("../../../assets/star0.png")} alt="star3"></img></a>
                                                        <a href="javascript:void(0)" onClick={ this.changeStar }><img id="s4" src={require("../../../assets/star0.png")} alt="star4"></img></a>
                                                        <a href="javascript:void(0)" onClick={ this.changeStar }><img id="s5" src={require("../../../assets/star0.png")} alt="star5"></img></a>
                                                        <b>{ this.state.rate }</b>
                                                    </div>
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