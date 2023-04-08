import React, {useState, useEffect} from 'react'
import './HomeServices.css';

export default function HomeServices() {
  const [seccionH2, setSeccionH2] = useState([]);
  const [seccionH2C, setSeccionH2C] = useState([]);

  //Obtenemos los datos de nuestra base de datos (Servidor)
  useEffect(() => {
    async function fetchSeccionH2() {
      try {
        const response = await fetch('http://localhost:3002/seccionH2');
        if (response.ok) {
          const data = await response.json();
          setSeccionH2(data);
        } else {
          console.error('Error al recuperar los eventos');
        }
      } catch (error) {
        console.error('Error al recuperar los eventos', error);
      }
    }
    fetchSeccionH2();
  }, []);

  /**************************************************************************************** */

  //Obtenemos los datos de nuestra base de datos (Servidor)
  useEffect(() => {
    async function fetchSeccionH2C() {
      try {
        const response = await fetch('http://localhost:3002/seccionH2C');
        if (response.ok) {
          const data = await response.json();
          setSeccionH2C(data);
        } else {
          console.error('Error al recuperar los eventos');
        }
      } catch (error) {
        console.error('Error al recuperar los eventos', error);
      }
    }
    fetchSeccionH2C();
  }, []);

  /**************************************************************************************** */

  return (
    <div>
      <div className='HomeSer'>
        {seccionH2.map((event) => (
        <div className='Aworld' key={event._id}>
          <div>
            <div>
              <div>
                <h1 className='textS'>{event.title}</h1>
              </div>
            </div>

            <div>
              <p className='textSP'>
                {event.content}
              </p>
            </div>
          </div>
        </div>
        ))}

        <div className='fondoCard'>
          <h1 className='textservicesh1'>Services</h1>
          <div className='pad'>
            {seccionH2C.map((eventC) => (
            <div>
              <div class="card">
                <ul>
                  <li class="list-group-item">{eventC.titleC}</li>
                </ul>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}
