import React, { Component } from 'react'
import { isAuthenticated } from '../../../services/auth'

export class Compras extends Component {
    userConected() {
        console.log( isAuthenticated())
        return isAuthenticated()
    }
    render() {
        return (
            
            <div className="height-80">
                teste
               
            </div>
        )
    }
}

export default Compras
