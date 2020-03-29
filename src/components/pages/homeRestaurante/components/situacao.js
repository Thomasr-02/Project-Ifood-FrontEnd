import React, { Component } from 'react'

export class Situacao extends Component {
    render() {
        return (
            <ul className="situacao">
                <h2>Situação restaurante</h2>
                <div className="abertoFechado">
                    <label className="abertoFechado" > <input type="radio" name="open" checked></input> Aberto </label>
                    <label className="abertoFechado" > <input type="radio" name="closed"></input> Fechado </label>
                </div>

                <div className="frete">
                    <label className="frete" > <input type="radio" name="delivery_fee" checked></input> Entrega grátis </label>
                    <label className="frete" > <input type="radio" name="delivery_fast"></input> Entrega rápida </label>
                </div>                   
            </ul>
        )
    }
}

export default Situacao
