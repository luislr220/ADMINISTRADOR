import React, { useState, useEffect } from 'react';
import './Home.css';
import HomeServices from './HomeServices';
import Partnerships from './Partnerships';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('http://localhost:3002/event');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Error al recuperar los eventos');
        }
      } catch (error) {
        console.error('Error al recuperar los eventos', error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div>
      {/*SECCIÓN WELCOME*/}
      <div className='WelcomeB'>
        {events.map((event) => (
          <div className='Welcome' key={event._id}>
            <div>
              <div>
                <div>
                  <h1 className='textWl'>{event.title}</h1>
                </div>
              </div>

              <div>
                <p className='HtextP'>{event.content}</p>
              </div>
            </div>
            <div>
              <div>
                <img
                  src={event.images}
                  width='80%'
                  className='Avion1'
                  alt=''
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*SECCIÓN SERVICIOS*/}
      <HomeServices />
      {/*SECCIÓN PARTNERSHIPS*/}
      <Partnerships />

      <footer className='foo'>
        <p className='PcFooter'>
          Av. León 119. <br />
          León Guanajuato
          <br />
          Mexico
          <br />
          info@optimen.com.mx
          <br />
        </p>
      </footer>
    </div>
  );
}
