import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";

import logo from "../img/logo optimen blanco.png";

/*COMPONENTES*/
import "./Navbar.css";

export default function Navbar() {
  const { logout } = useAuth0();

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      {/*DIV PARA BARRA DE VANEGACIÓN */}
      <nav className="navbar navbar-expand-lg">
        <img src={logo} width="230" height="65" className="left" alt="" />
        <button
          className={`navbar-toggler ${expanded ? "" : "collapsed"}`}
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/News">
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Innovation">
                Innovation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AboutUs">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Customers">
                Customers
              </Link>
            </li>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link className="nav-link active" to="/Perfil">
                  Profile
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => logout()}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
