import React, { Component } from 'react';
import {Link, Outlet} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../img/logo optimen blanco.png';

/*COMPONENTES*/
import './Navbar.css'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        {/*DIV PARA BARRA DE VANEGACIÓN */}
        <nav className="navbar navbar-expand-lg">
            <img
              src={logo}
              width="230"
              height="65"
              className="left"
              alt=''
            />
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <Link className="nav-link" to='/'>Noticias</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Outlet/>
      </div>
    )
  }
}
