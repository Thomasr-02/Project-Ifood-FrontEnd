// import React, {Component} from 'react';
// import './App.css';
// import Navbar from './components/navbarCadastroLogin.js'
// import background from './back-image.jpg'
// import Login from './components/Login'


// export default class App extends Component {
//   render () {
//     return (
//       <div className="container">
//         <div>
//           <Login/>
//           <Navbar />
//         </div>
//         <img className="background" src={background} alt="background"></img>
//       </div>
    
//     );
//   }
// }
import React from "react";
import Routes from "./components/routes";

const App = () => <Routes />;
export default App;