import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/*IMAGENES*/
import next from "../../img/flecha-correcta.png";
import prev from "../../img/flecha-izquierda.png";

export default function CarouselC1() {
  const [carouselC1, setCarouselC1] = useState([]);

  //Obtenemos los datos de nuestra base de datos (Servidor)
  useEffect(() => {
    async function fetchCarouselC1() {
      try {
        const response = await fetch("http://localhost:3002/carouselC1");
        if (response.ok) {
          const data = await response.json();
          setCarouselC1(data);
        } else {
          console.error("Error al recuperar los eventos");
        }
      } catch (error) {
        console.error("Error al recuperar los eventos", error);
      }
    }
    fetchCarouselC1();
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
          {carouselC1.map((eventC1) => (
            <div className="c" key={eventC1._id}>
              <img src={eventC1.imagesC1} className="carruIMG" alt="" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
