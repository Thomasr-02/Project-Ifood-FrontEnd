import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export class Situacao extends Component {
    render() {
        return (
            <ul className="situacao">
                <h2>Situação restaurante</h2>
                <Form.Check label = "Aberto"/>
                <Form.Check label = "Fechado"/>
                <Form.Check label = "Entrega grátis"/>
                <Form.Check label = "Entrega rápida"/>                    
            </ul>
        )
    }
}

export default Situacao
