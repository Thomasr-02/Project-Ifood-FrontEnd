import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../../services/auth'
export class NaveHomeUser extends Component {
    Logout() {
        logout ();
        
    }

    render() {
        return (
            <div className="naveHomeUser">
                <div className="container-search">
                    <input className='search' id="Search" onChange={this.handleChange} type="search" placeholder="Pesquisa restaurante/prato"></input>
                    <img src={require("../../../../assets/search.png")} width="29" height="29" alt="search"></img>
                    <Link to="/" className="button-logout">
                        <button className="col-xs-6" onClick={this.Logout}>Logout</button>
                    </Link>
                </div>
          </div>
        )
    }
}

export default NaveHomeUser
