import React, { Component } from 'react'

export class Situacao extends Component {
    render() {
        return (
            <form className="situacao">
                <div className="container-situacao">
                    <div className="abertoFechado">
                        <input  type="radio" id="aberto" name="openOrClosed" value="aberto" checked></input>
                        <label className="abertoFechado" for="aberto">Aberto</label>
                        
                        <input type="radio" id="fechado" name="openOrClosed" value="fechado"></input>
                        <label className="abertoFechado" for="fechado">Fechado</label>
                    </div>

                    <div className="frete">
                        <input type="radio" id="frete-gratis" name="frete" value="frete-gratis" checked></input>
                        <label  className="frete" for="fete-gratis">Entrega grátis</label>
                        
                        <input type="radio" id="entrega-rapida" name="frete" value="entrega-rapida"></input>
                        <label  className="frete" for="entrega-rapida">Entrega rápida</label>
                    </div>
                </div>
                
            </form>
        )
    }
}

export default Situacao
