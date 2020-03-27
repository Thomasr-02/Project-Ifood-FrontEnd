import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NaveHomeRestaurante extends Component {
    render() {
        return (
            <div className="naveHomeRestaurante">
                <div className="buttonsRelatorios">
                    <button className="button" >Emitir relatorio 1</button> 
                    <button className="button" >Emitir relatorio 2</button>
                    
                    <Link to="/"> 
                        <button className="button" id="buttonLogoutRestaurante" onClick={this.Logout}>Logout</button> 
                    </Link>  
                </div>
            </div>
        )
    }
}