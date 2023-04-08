import React, { useState, useEffect } from "react";
import "./About.css";
import CarouselAbU from "./CarouselAbU";
import { useTranslation } from "react-i18next";

export default function About() {
  //contante para los datos
  const [lineaAbout, setLineaAbout] = useState([]);

  const [t] = useTranslation("global");

  //Obtenemos los datos de nuestra base de datos (Servidor)
  useEffect(() => {
    async function fetchLineaAbout() {
      try {
        const response = await fetch("http://localhost:3002/lineaAbout");
        if (response.ok) {
          const data = await response.json();
          setLineaAbout(data);
        } else {
          console.error("Error al recuperar los eventos");
        }
      } catch (error) {
        console.error("Error al recuperar los eventos", error);
      }
    }
    fetchLineaAbout();
  }, []);

  return (
    <div className="header">
      <h1 className="h1C">
        {t("navbar.What-is-Optimen?")}
        <p className="box0">{t("navbar.What-is-Optimen?_P")}</p>
      </h1>

      <div className="bodyT">
        <div>
          <p className="purpo"> {t("navbar.Our-Purpose")}</p>
        </div>
        <div>
          <p className="title"> {t("navbar.Mission")}</p>

          <p className="box1">{t("navbar.Mission_P")}</p>
        </div>

        <div>
          <p className="title">{t("navbar.Vision")}</p>
          <p className="box1">{t("navbar.Vision_P")}</p>
        </div>
        <div>
          <p className="title"> {t("navbar.Values")}</p>
          <p className="box1">{t("navbar.Values_P")}</p>
        </div>
      </div>

      <div className="container">
        <div className="padre">
          <div>
            <h1 className="tituloPart">{t("navbar.Airline-Experience")}</h1>
            <CarouselAbU />
          </div>
        </div>
      </div>

      <div className="bodyT">
        <p className="Tp">{t("navbar.Our-Story-Through-the-Time")}</p>
        <div className="recuadros">
          <p> {t("navbar.The-beginning")}</p>
        </div>
        {lineaAbout.map((linea) =>(
        <div className="recuadros" key={linea._id}>
          <p>{linea.yearLA}</p>
          <div className="recuadros-info">
            <h2>{linea.titleLA}</h2>
            <p>{linea.contentLA}</p>
          </div>
        </div>
        ))}
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
