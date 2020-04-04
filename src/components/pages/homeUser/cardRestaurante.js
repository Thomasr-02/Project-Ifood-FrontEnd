import React, { Component } from 'react'
import intermediador from '../compras/intermediador'
import { Link } from 'react-router-dom'

export class CardRestaurante extends Component {
    sendIdCompras = (e) => {

        intermediador.idRest(e.target.value, "set")
        // intermediador.idUser()
    }

    render() {
        if (this.props.rest.status === true) {
            return (
                <div className="cards">
                    <h5> <b>{this.props.rest.name_estab}</b></h5>
                    <p>Email: {this.props.rest.email}</p>
                    
                    {this.props.rest.delivery_fee ? (<p>Frete grátis!</p>) : (<p>Preço do frete: R$ 4,00</p>)}
                    <p></p>
                    <Link to = "/homeUser/compras">
                        <button name="id_establishment" type="submit" onClick={ this.sendIdCompras } value={ this.props.rest.id_establishment } className="btn btn-primary" >  Ver mais </button>
                    </Link>
                            
                </div>
            )
        }
        else if (this.props.rest.status === false || this.props.rest.status === null ) {
            return (
                <div className="cards">
                    <h5> <b>{this.props.rest.name_estab}</b></h5>
                    <p>Email: {this.props.rest.email}</p>
                    
                    {this.props.rest.delivery_fee ? (<p>Frete grátis!</p>) : (<p>Preço do frete: R$ 4,00</p>)}
                    <p></p>
                    <h4>Este restaurante está fechado!</h4>
                            
                </div>
            )
        }
        else if (this.props.rest.quantidade !== null || this.props.rest.quantidade !== undefined) {
            return (
                <div className="cards">
                    <h5> <b>{this.props.rest.name_estab}</b></h5>
                    <p>Prato: { this.props.rest.name_dish } </p>
                    <p>Quantidade: { this.props.rest.quantidade }</p>
                    <p></p>
                    
                    <Link to = "/homeUser/compras">
                        <button name="id_establishment" type="submit" onClick={ this.sendIdCompras } value={ this.props.rest.id_establishment } className="btn btn-primary" >  Ver mais </button>
                    </Link>


                </div>
            )
        }
        
    }
}

export default CardRestaurante
