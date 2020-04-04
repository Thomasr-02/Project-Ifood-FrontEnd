import React, { Component } from 'react'
import api from '../../../../services/api'

export class Situacao extends Component {

    state = {
        delivery_fee: false,
        delivery_fast: false,
        status: true
    }

    update_free = async () => {
        await this.setState({ delivery_fee: true })
        var id_establishment = this.props.id

        var delivery_fee = true
        var status = this.state.status

        api.put('/restaurantes/'+id_establishment, { delivery_fee, status }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })

        this.setState({ delivery_fast: false })
    }

    update_fast = async () => {
        await this.setState({ delivery_fast: true })
        var id_establishment = this.props.id

        var delivery_fee = false
        var status = this.state.status

        api.put('/restaurantes/' + id_establishment, { delivery_fee, status }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })

        this.setState({ delivery_fee: false })

    }

    update_aberto = async () => {
        await this.setState({ status: true })
        
        var status = this.state.status
        var id_establishment = this.props.id
        var delivery_fee = this.state.delivery_fee


        api.put('/restaurantes/' + id_establishment, { delivery_fee, status }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
    
    update_fechado = async () => {
        await this.setState({ status: false })

        var status = this.state.status
        var id_establishment = this.props.id
        var delivery_fee = this.state.delivery_fee


        api.put('/restaurantes/' + id_establishment, { delivery_fee, status }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <form className="situacao">
                <div className="container-situacao">
                    <div className="abertoFechado">
                        <input onChange={ this.update_aberto} type="radio" id="aberto" name="openOrClosed"></input>
                        <label  className="abertoFechado" for="aberto">Aberto</label>
                        
                        <input onChange={ this.update_fechado} type="radio" id="fechado" name="openOrClosed" ></input>
                        <label className="abertoFechado" for="fechado">Fechado</label>
                    </div>

                    <div className="frete">
                        <input onChange={this.update_free } type="radio" id="frete-gratis" name="frete"></input>
                        <label  className="frete" for="fete-gratis">Entrega grátis</label>
                        
                        <input onChange={this.update_fast } type="radio" id="entrega-rapida" name="frete"></input>
                        <label  className="frete" for="entrega-rapida">Entrega rápida</label>
                    </div>
                </div>
                
            </form>
        )
    }
}

export default Situacao
