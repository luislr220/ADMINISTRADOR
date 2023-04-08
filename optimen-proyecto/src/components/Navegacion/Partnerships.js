import React from 'react';
import './Partnerships.css';
import Carousel from './Carousel';
import {useTranslation} from 'react-i18next';


export default function Partnerships () {

  const [t] = useTranslation("global");

  return (
    <div className='padre'>

      <div>
        <h1 className='tituloPart'>
        {t("navbar.Partnership")}
        </h1>

        <Carousel />
      </div>

    </div>

  )
}

