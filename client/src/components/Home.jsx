import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import HomeServices from "./HomeServices";
import CarouselHome from "./CarouselHome";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function Home() {
  const [welcomeForm, setWelcomeForm] = useState({
    title: "",
    content: "",
    images: "",
  });
  const [welcomeData, setWelcomeData] = useState([]);

  // Obtener los datos guardados en el servidor al cargar la página
  useEffect(() => {
    axios
      .get("http://localhost:3002/event")
      .then((response) => {
        setWelcomeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const eliminarEvento = (id) => {
    axios
      .delete(`http://localhost:3002/event/${id}`)
      .then(() => {
        const noticiasActualizadas = welcomeData.filter(
          (noticia) => noticia._id !== id
        );
        setWelcomeData(noticiasActualizadas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWelcomeFormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(welcomeForm),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setWelcomeData([...welcomeData, data]);
        // Limpiar el formulario
        setWelcomeForm({
          title: "",
          content: "",
          images: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  return (
    <div>
      <div className="Secc">
        <div className="uno1">
          {/*SECCIÓN WELCOME*/}
          <form onSubmit={handleWelcomeFormSubmit}>
            <h1>Sección 1</h1>
            <p>
              Aqui puedes editar la primera sección inserta el titulo de
              bienvenida, descripcción e imagen
            </p>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Titulo"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                value={welcomeForm.title}
                onChange={(e) =>
                  setWelcomeForm({ ...welcomeForm, title: e.target.value })
                }
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Descripcción"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                value={welcomeForm.content}
                onChange={(e) =>
                  setWelcomeForm({ ...welcomeForm, content: e.target.value })
                }
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Imagen"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                value={welcomeForm.images}
                onChange={(e) =>
                  setWelcomeForm({ ...welcomeForm, images: e.target.value })
                }
              />
            </FloatingLabel>

            <button type="submit" className="btn btn-success">
              Guardar cambios
            </button>
          </form>
        </div>

        <div className="uno1">
          <div className="card-container">
            {welcomeData.map((noticia) => (
              <Card style={{ width: "20rem" }} key={noticia._id}>
                <Card.Title>{noticia.title}</Card.Title>
                <Card.Img variant="top" src={noticia.images} />
                <Card.Text>{noticia.content}</Card.Text>
                <button
                  key={noticia._id}
                  onClick={() => eliminarEvento(noticia._id)}
                  class="btn btn-danger"
                >
                  Eliminar
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/*SECCIÓN SERVICIOS*/}
      <HomeServices />
      {/*SECCIÓN Carrusel*/}
      <CarouselHome />
    </div>
  );
}
