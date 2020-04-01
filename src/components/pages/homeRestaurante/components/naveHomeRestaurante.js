import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../../services/auth'
import Modal from 'react-awesome-modal'
import api from '../../../../services/api'
import './naveHomeRestaurante.css'

export default class NaveHomeRestaurante extends Component {
    state = {
        visible_relatorio1: false,
        visible_relatorio2: false,
        visible_relatorio3: false,
        dishes: [],
        days: 0
    }
    
    mostraModal_relatorio1 = () => {
        this.setState({ visible_relatorio1: true })
    }
    mostraModal_relatorio2 = () => {
        this.setState({ visible_relatorio2: true })
    }
    mostraModal_relatorio3 = () => {
        this.setState({ visible_relatorio3: true })
    }


    fechaModal = () => {
        this.setState({ visible_relatorio1: false })        
        this.setState({ visible_relatorio2: false })        
        this.setState({ visible_relatorio3: false })        
    }
    
    Logout() {
        logout();
        
    }

    getRelatorioOne = () => {
        
        var id_establishment = this.props.id

        api.get('/restaurantes/'+id_establishment + '/reportone').then(response => {
            console.log(response)
            var dishes = response.data

            this.setState({ dishes })
        })
        this.mostraModal_relatorio1()
    }

    getRelatorioTwo = (e) => {
        var days = e.target.value
        this.setState({ days })

        var id_establishment = this.props.id

        api.get('/restaurantes/'+id_establishment + '/reporttwo/' + days).then(response => {
            console.log(response)
            var dishes = response.data

            this.setState({ dishes })
        })
        this.mostraModal_relatorio2()
    
    }

    getRelatorioTree = () => {
        var id_establishment = this.props.id

        api.get('/restaurantes/'+id_establishment + '/reportthree/').then(response => {
            console.log(response)
            var dishes = response.data
            console.log(dishes)
            this.setState({ dishes })
        })
        this.mostraModal_relatorio3()
    }

    render() {
        return (
            <div className="naveHomeRestaurante">
                <div className="buttonsRelatorios">
                    <button className="button" onClick={ this.getRelatorioOne }  >Emitir relatorio 1</button> 
                    <button className="button" value={0} onClick={ this.getRelatorioTwo }>Emitir relatorio 2</button>
                    <button className="button" onClick={ this.getRelatorioTree } >Emitir relatorio 3</button>
                    
                    <Link to="/"> 
                        <button className="button" id="buttonLogoutRestaurante" onClick={this.Logout}>Logout</button> 
                    </Link>  
                </div>
                <Modal visible={ this.state.visible_relatorio1 }  effect="fadeInUp" onClickAway={ this.fechaModal} >
                    <div className="pratos-mais-comprados">
                        <h1>Pratos mais comprados</h1>
                            {
                                this.state.dishes.map((dish, index) => (
                                    <div key={ index } className="prato-comprado">   
                                        <h4>Nome do prato: <b>{ dish.name_dish }</b> </h4>
                                        <h4>Quantidades vendidas: <b>{ dish.quantidade }</b></h4>
                                    </div>
                                ))
                            }
                            <button className="botao-fecha-modal" onClick={ this.fechaModal }>Fechar </button>
                        
                    </div>
                </Modal>

                <Modal className="modal-relatorio" visible={ this.state.visible_relatorio2 } effect="fadeInUp" onClickAway={ this.fechaModal} >
                    <div className="pratos-mais-comprados">

                        <h1>Relatório do prato dado os dias anteriores</h1>
                        <label className="label-relatorio"> Digite o dia </label>
                        <input onChange={ this.getRelatorioTwo }></input>
                            {
                                this.state.dishes.map((dish, index) => (
                                    <div key={ index } className="prato-comprado">   
                                        <h4>Nome do prato: <b>{ dish.name_dish }</b> </h4>
                                        <h4>Valor: R$ <b>{ dish.value }</b></h4>
                                    </div>
                                ))
                            }
                    </div>
                </Modal>
                                
                <Modal className="modal-relatorio" visible={ this.state.visible_relatorio3 } effect="fadeInUp" onClickAway={ this.fechaModal} >
                    <div className="pratos-mais-comprados">

                        <h4>Relatório do valor médio dos sete dias anteriores de cada prato</h4>
                            {
                                this.state.dishes.map((dish, index) => (
                                    <div key={ index } className="media-pratos">   
                                        <h7>Nome do prato: <b>{ dish.name_dish }</b> </h7>
                                        <h7>Valor: R$ <b>{ dish.value_dish }</b></h7>
                                        <h7>Média: <b>{ dish.average }</b></h7>
                                    </div>
                                ))
                            }
                    </div>
                </Modal>

            </div>
        )
    }
}