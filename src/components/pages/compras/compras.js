import React, { Component } from 'react'
import Modal from 'react-awesome-modal';
import api from '../../../services/api'
import intermediador from './intermediador'
import './compras.css'

export default class Compras extends Component  {
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
        value: 0.0,
        visible: false,

        person: [],
        rating: 0,
        id_dish: 0,

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
        const value = this.state.value + dish.value_dish
        
        this.setState({ carrinho })
        this.setState({ value })
    }

    removeCarrinho = (index, carrin) => {
        const carrinho = this.state.carrinho
        const value = this.state.value - carrin.value_dish

        carrinho.splice(index, 1) //remove o 1 elemento desse index
    
        this.setState({ carrinho })
        this.setState({   value  })
    }

    mostraModal = () => {
        this.setState({ visible: true })
        console.log(this.state.id_person)

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
        e.preventDefault()
        var  rating   = 0
        var estrela = e.target.id

        var src_ligada = require("../../../assets/star1.png")

        var s2 = document.getElementById("s2").src //pega o endereço da imagem de cada estrela
        var s3 = document.getElementById("s3").src
        var s4 = document.getElementById("s4").src
        var s5 = document.getElementById("s5").src

        if (estrela === 's1'){ //se clicar na estrela 1, liga ela
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
            
            rating = 1;

        }
        if (estrela === 's2'){ 
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
            rating = 2;



        }
        if (estrela === 's3'){ 
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
            rating = 3;

        }
        if (estrela === 's4'){ 
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
            
            rating = 4;

        }
        if (estrela === 's5'){ 
            document.getElementById("s1").src = require("../../../assets/star1.png");
            document.getElementById("s2").src = require("../../../assets/star1.png");
            document.getElementById("s3").src = require("../../../assets/star1.png");
            document.getElementById("s4").src = require("../../../assets/star1.png");
            document.getElementById("s5").src = require("../../../assets/star1.png");
            rating = 5;

        }
        this.setState({ rating })

    }

    addCompra = () => {
        var { rating, value } = this.state
        var id_dishs = []
        console.log(value)
        var id_establishment = this.state.carrinho[0].id_establishment
        
        this.state.carrinho.map(dish =>(  //fazendo array pra pegar os ids
           id_dishs = id_dishs.concat(dish.id_dish)
           
        )) 

        api.get('/restaurantes/'+ id_establishment).then(res => {
            var frete = res.data[0].delivery_fee
            console.log(frete)
            if (frete === false) {
                value = value - 2
            }
        })
        console.log(value)
        
        api.post("/buys/", { rating, value }).then((response => {
            const id_buy = response.data[0].id_buy
            console.log(id_buy)


            var   data   = new Date(); 
            var   ano    = data.getFullYear(); 
            var   mes    = data.getMonth();
            var   dia    = data.getDate();
            var   hora   = data.getHours();
            var   min    = data.getMinutes();
            var   seg    = data.getSeconds();

            var date = ano + '-' + (mes + 1) + '-' + dia + ' ' + hora + ':' + min + ':' + seg //formatando data "YYY/-MM--DD Hora:Minutos:Segundos"

            for (var i=0; i < id_dishs.length; i++) {
                var id_dish = id_dishs[i] //pegando os ids de cada prato no carrinho

                api.post("/buys/"+id_buy+"/dishes", { id_dish, date }).then(response =>{
                }).catch((err) =>{
                })
            }
            alert("Compra efetuada!")
            this.fechaModal()
            this.props.history.push("/homeUser");
        })).catch(err => {
            alert(err)
        })
    }

    voltar = ()  => {
        this.props.history.push('/homeUser/')
    }
    
    render() {
        return (
            <div className="Compras">
                <div className="info-restaurante">
                    <h2>{this.state.name_estab}</h2>    
                    {this.state.delivery_fee ? (<p>Frete grátis!</p>) : (<p>Preço do frete: R$ 2,00</p>)}
                    <p>Email: {this.state.email}</p>
                </div>
                <button onClick={ this.voltar }>Voltar</button>
                
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
                            <h3> Seu carrinho: R$ { this.state.value } </h3>  
                        </div>
                        <div>
                            <button onClick={ this.mostraModal } >Finalizar</button>
                        </div>
                    </div>

                        <Modal visible={ this.state.visible }  effect="fadeInUp" onClickAway={ this.fechaModal }>
                            
                            <div className="modal-informacoes">
                                <h2>Confirme suas informações</h2>
                                <h3> Total a pagar: R$ { this.state.value } </h3>
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
                                                        <button className="button-star"><img id="s1"  onClick={ this.changeStar } src={require("../../../assets/star0.png")} alt="star1"></img></button>
                                                        <button className="button-star"><img id="s2"  onClick={ this.changeStar } src={require("../../../assets/star0.png")} alt="star1"></img></button>
                                                        <button className="button-star"><img id="s3"  onClick={ this.changeStar } src={require("../../../assets/star0.png")} alt="star1"></img></button>
                                                        <button className="button-star"><img id="s4"  onClick={ this.changeStar } src={require("../../../assets/star0.png")} alt="star1"></img></button>
                                                        <button className="button-star"><img id="s5"  onClick={ this.changeStar } src={require("../../../assets/star0.png")} alt="star1"></img></button>
                                                        <b>{ this.state.rating }</b>
                                                    </div>
                                                </div>

                                            </form>
                                            <button onClick={ this.addCompra } > Finzalizar compra </button>
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