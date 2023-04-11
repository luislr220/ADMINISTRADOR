import React, { useState, useEffect } from "react";
import axios from "axios";
import './CustomersCarusel.css';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function CarouselC2() {
  //Constante para Carousel
  const [carouselC2Form, setCarouselC2Form] = useState({
    imagesC2: "",
  });

  const [carouselC2Data, setCarouselC2Data] = useState([]);

  // Obtener los datos guardados en el servidor al cargar la página
  useEffect(() => {
    axios
      .get("http://localhost:3002/carouselC2")
      .then((response) => {
        setCarouselC2Data(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Form Para las imagenes del carousel
  const handleCarouselC2FormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/carouselC2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carouselC2Form),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setCarouselC2Data([...carouselC2Data, data]);
        // Limpiar el formulario
        setCarouselC2Form({
          imagesC2: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  const eliminarImagenC2 = (id) => {
    axios
      .delete(`http://localhost:3002/carouselC2/${id}`)
      .then(() => {
        const noticiasActualizadas = carouselC2Data.filter(
          (noticia) => noticia._id !== id
        );
        setCarouselC2Data(noticiasActualizadas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="uno1">
        {/*Formulario para editar el caurusel */}
        <form onSubmit={handleCarouselC2FormSubmit}>
          <h1>Section 2</h1>
          <p>Here you can remove or add more images to the carousel</p>
          <FloatingLabel
            controlId="floatingInput"
            label="Image URL"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={carouselC2Form.imagesC2}
              onChange={(e) =>
                setCarouselC2Form({
                  ...carouselC2Form,
                  imagesC2: e.target.value,
                })
              }
            />
          </FloatingLabel>

          <button type="submit" className="btn btn-success">
            Save image
          </button>
        </form>
      </div>

      {/**LISTADO DE LAS IMAGENES */}
      <div className="card-container">
        {carouselC2Data.map((noticia) => (
          <Card border="dark" style={{ width: "10rem"}} key={noticia._id}>
            <Card.Img variant="top" src={noticia.imagesC2} />
            <hr/>
            <button
              key={noticia._id}
              onClick={() => eliminarImagenC2(noticia._id)}
              className="btn btn-danger"
            >
              Delete image
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
