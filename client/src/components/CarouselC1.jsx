import React, { useState, useEffect } from "react";
import axios from "axios";
import './CustomersCarusel.css';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function CarouselC1() {
  //Constante para Carousel
  const [carouselC1Form, setCarouselC1Form] = useState({
    imagesC1: "",
  });

  const [carouselC1Data, setCarouselC1Data] = useState([]);

  // Obtener los datos guardados en el servidor al cargar la página
  useEffect(() => {
    axios
      .get("http://localhost:3002/carouselC1")
      .then((response) => {
        setCarouselC1Data(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Form Para las imagenes del carousel
  const handleCarouselC1FormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/carouselC1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carouselC1Form),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setCarouselC1Data([...carouselC1Data, data]);
        // Limpiar el formulario
        setCarouselC1Form({
          imagesC1: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  const eliminarImagenC1 = (id) => {
    axios
      .delete(`http://localhost:3002/carouselC1/${id}`)
      .then(() => {
        const noticiasActualizadas = carouselC1Data.filter(
          (noticia) => noticia._id !== id
        );
        setCarouselC1Data(noticiasActualizadas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="uno1">
        {/*Formulario para editar el caurusel */}
        <form onSubmit={handleCarouselC1FormSubmit}>
          <h1>Sección 1</h1>
          <p>Aqui puedes quitar o agregar mas imagenes al carrusel</p>
          <FloatingLabel
            controlId="floatingInput"
            label="Imagen"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={carouselC1Form.imagesC1}
              onChange={(e) =>
                setCarouselC1Form({
                  ...carouselC1Form,
                  imagesC1: e.target.value,
                })
              }
            />
          </FloatingLabel>

          <button type="submit" className="btn btn-success">
            Guardar Imagen
          </button>
        </form>
      </div>

      {/**LISTADO DE LAS IMAGENES */}
      <div className="card-container">
        {carouselC1Data.map((noticia) => (
          <Card style={{ width: "10rem" }} key={noticia._id}>
            <Card.Img variant="top" src={noticia.imagesC1} />
            <button
              key={noticia._id}
              onClick={() => eliminarImagenC1(noticia._id)}
              className="btn btn-danger"
            >
              Eliminar Imagen
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
