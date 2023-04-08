import React, {useState, useEffect} from 'react';
import './Services.css';

/**IMAGENES */
import {useTranslation} from 'react-i18next';

export default function Services () {

  //contante para los datos
  const [servicesCard, setServicesCard] = useState([])

  const [t] = useTranslation("global");

  //Obtenemos los datos de nuestra base de datos (Servidor)
  useEffect(() => {
    async function fetchServicesCard() {
      try {
        const response = await fetch('http://localhost:3002/servicesCard');
        if (response.ok) {
          const data = await response.json();
          setServicesCard(data);
        } else {
          console.error('Error al recuperar los eventos');
        }
      } catch (error) {
        console.error('Error al recuperar los eventos', error);
      }
    }
    fetchServicesCard();
  }, []);

   
    return (
      <div>
        <div className='ftServices'>
          <h1>
            {t("navbar.Our-Services")}
          </h1>
        </div>

        <div className='ServicesContenedor'>
          <div className='services-container'>
            {servicesCard.map((eventSC) => (
            <div className='service' key={eventSC._id}>
              <img src={eventSC.imagesSC} alt='Service 1' />
              <div className='service-text-container'>
                <div className='service-text'>
                  <h3>{eventSC.titleSC}</h3>
                  <p>{eventSC.contentSC}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        <footer className='foo'>
          <p className='PcFooter'>
            Av. León 119. <br />
            León Guanajuato<br />
            Mexico<br />
            info@optimen.com.mx<br />
          </p>
        </footer>
      </div>
    )
  }