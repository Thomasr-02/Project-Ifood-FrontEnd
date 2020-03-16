import React, { Component } from 'react'
import { logout } from '../services/auth'
import { Link } from 'react-router-dom'

export default class HomeRestaurante extends Component {

    Logout() {
        logout();
        
    }

    render() {
        return (
            <div>
                <h1>Home restaurante</h1>
                <Link to="/"> <button onClick={this.Logout}>Logout</button> </Link> 
                
            </div>
        )
    }
}
