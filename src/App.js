import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbarCadastroLogin.js'
import background from './back-image.jpg'


export default class App extends Component {
  render () {
    return (
      <div className="container">
        <Navbar />
        <img className="background" src={background}></img>
      </div>
    
    );
  }
}
