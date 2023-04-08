import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

import logo from '../../img/logo optimen blanco.png';

import ES from '../../img/espana.png';
import EN from '../../img/reino-unido.png';

import './Navbar.css';

export default function Navbar() {
  const [t, i18n] = useTranslation('global');
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {/*DIV PARA BARRA DE VANEGACIÓN */}
      <nav className='navbar navbar-expand-lg'>
        <img src={logo} width='230' height='65' className='left' alt='' />
        <button
          className={`navbar-toggler ${expanded ? '' : 'collapsed'}`}
          type='button'
          onClick={handleToggle}
          aria-controls='navbarNav'
          aria-expanded={expanded}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}
          id='navbarNav'
        >
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                {t('navbar.home')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/Services'>
                {t('navbar.services')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/ContactUs'>
                {t('navbar.contact-Us')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/News'>
                {t('navbar.news')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/Innovation'>
                {t('navbar.inovation')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/About'>
                {t('navbar.about-Us')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/Customers'>
                {t('navbar.customers')}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className='Traductor'>
        <img src={ES} alt='' onClick={() => i18n.changeLanguage('es')} />
        <img src={EN} alt='' onClick={() => i18n.changeLanguage('en')} />
      </div>
      <Outlet />
    </div>
  );
}
