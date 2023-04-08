import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function CarouselAbU() {
  const [carouselAboutUs, setCarouselAboutUs] = useState([]);

  //Obtenemos los datos de nuestra base de datos (Servidor)
  useEffect(() => {
    async function fetchCarouselAboutUs() {
      try {
        const response = await fetch("http://localhost:3002/carouselAbout");
        if (response.ok) {
          const data = await response.json();
          setCarouselAboutUs(data);
        } else {
          console.error("Error al recuperar los eventos");
        }
      } catch (error) {
        console.error("Error al recuperar los eventos", error);
      }
    }
    fetchCarouselAboutUs();
  }, []);

  return (
    <div>
      <Carousel>
        {carouselAboutUs.map((Cabout) => (
        <Carousel.Item key={Cabout._id}>
          <img className="d-block w-100" src={Cabout.imagesCaA} alt="First slide" />
          <Carousel.Caption>
            <p>{Cabout.contentCaA}</p>
          </Carousel.Caption>
        </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
