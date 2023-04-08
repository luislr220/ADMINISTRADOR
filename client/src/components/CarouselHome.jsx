import React, { useState, useEffect } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";


export default function CarouselHome() {
  //Constante para Carousel
  const [carouselForm, setCarouselForm] = useState({
    images: "",
  });

  const [carouselData, setCarouselData] = useState([]);

  // Obtener los datos guardados en el servidor al cargar la página
  useEffect(() => {
    axios
      .get("http://localhost:3002/carouselHome")
      .then((response) => {
        setCarouselData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Form Para las imagenes del carousel
  const handleCarouselFormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/carouselHome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carouselForm),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setCarouselData([...carouselData, data]);
        // Limpiar el formulario
        setCarouselForm({
          images: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  const eliminarImagen = (id) => {
    axios
      .delete(`http://localhost:3002/carouselHome/${id}`)
      .then(() => {
        const noticiasActualizadas = carouselData.filter(
          (noticia) => noticia._id !== id
        );
        setCarouselData(noticiasActualizadas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="Secc">
        <div className="uno1">
          {/*Formulario para editar el caurusel */}
          <form onSubmit={handleCarouselFormSubmit}>
          <h1>Sección 3</h1>
          <p>Aqui puedes quitar o agregar mas imagenes al carrusel</p>
            <FloatingLabel
              controlId="floatingInput"
              label="Imagen"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={carouselForm.images}
                onChange={(e) =>
                  setCarouselForm({ ...carouselForm, images: e.target.value })
                }
              />
            </FloatingLabel>

            
            
            <button type="submit" className="btn btn-success" >Guardar Imagen</button>
          </form>
        </div>
      </div>

      <div className="card-container">
        {carouselData.map((noticia) => (
          <Card border="dark" style={{ width: "10rem" }} key={noticia._id}>
            <Card.Img variant="top" src={noticia.images} />
            <hr/>
            <button
              key={noticia._id}
              onClick={() => eliminarImagen(noticia._id)}
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
