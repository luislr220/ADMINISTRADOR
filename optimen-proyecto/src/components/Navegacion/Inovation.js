import React, { useState, useEffect } from "react";
import "./Inovaton.css";

import { useTranslation } from "react-i18next";

export default function Inovation() {
  //contante para los datos
  const [innovationC, setInnovationC] = useState([]);

  const [t] = useTranslation("global");

  //Obtenemos los datos de nuestra base de datos (Servidor)
  useEffect(() => {
    async function fetchInnovationC() {
      try {
        const response = await fetch('http://localhost:3002/innovation');
        if (response.ok) {
          const data = await response.json();
          setInnovationC(data);
        } else {
          console.error('Error al recuperar los eventos');
        }
      } catch (error) {
        console.error('Error al recuperar los eventos', error);
      }
    }
    fetchInnovationC();
  }, []);

  return (
    <div>
      <div className="ftInovation">
        <h1>{t("navbar.innovation-Hub")}</h1>
      </div>

      <div className="InovationContenedor">
        <div className="Inovation-container">
            {innovationC.map((eventInn) => (
          <div className="Inovation" key={eventInn._id}>
            <img src={eventInn.imagesInn} alt="Service" />
            <div className="Inovation-text-container">
              <div className="Inovation-text">
                <h3>{eventInn.titleInn}</h3>
                <p>{eventInn.contentInn}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>

      <footer className="foo">
        <p className="PcFooter">
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
