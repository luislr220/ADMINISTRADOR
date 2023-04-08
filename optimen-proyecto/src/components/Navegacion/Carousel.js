import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/*IMAGENES*/
import next from "../../img/flecha-correcta.png";
import prev from "../../img/flecha-izquierda.png";

export default function Carousel() {
  const [carouselHome, setCarouselHome] = useState([]);

  //Obtenemos los datos de nuestra base de datos (Servidor)
  useEffect(() => {
    async function fetchCarouselHome() {
      try {
        const response = await fetch("http://localhost:3002/carouselHome");
        if (response.ok) {
          const data = await response.json();
          setCarouselHome(data);
        } else {
          console.error("Error al recuperar los eventos");
        }
      } catch (error) {
        console.error("Error al recuperar los eventos", error);
      }
    }
    fetchCarouselHome();
  }, []);

  const CustomPrevArrow = (props) => (
    <button {...props} className="slick-arrow_prev">
      <img src={prev} alt="" className="prev" />
    </button>
  );

  const CustomNextArrow = (props) => (
    <button {...props} className="slick-arrow_next">
      <img src={next} alt="" className="next" />
    </button>
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 1300,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 700,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div>
      <div className="carousel-wrapper">
        <Slider {...settings}>
          {carouselHome.map((eventC) => (
            <div className="c" key={eventC._id}>
              <img src={eventC.images} className="carruIMG" alt="" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
