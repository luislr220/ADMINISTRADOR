//Modulo Realizado por Luis
// Importa las bibliotecas necesarias

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import HomeServices from "./HomeServices";
import CarouselHome from "./CarouselHome";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  // Estado para almacenar el contenido del formulario
  const [welcomeForm, setWelcomeForm] = useState({
    title: "",
    content: "",
    images: "",
  });

  // Estado para almacenar los datos de bienvenida obtenidos del servidor
  const [welcomeData, setWelcomeData] = useState([]);

  // Obtener el usuario y su estado de autenticación de Auth0
  const { user, isAuthenticated } = useAuth0();

  // Comprobar si el usuario es administrador (tiene el rol "admin")
  const isAdmin =
    isAuthenticated &&
    user &&
    user["https://optimenLogin.com/roles"] &&
    user["https://optimenLogin.com/roles"].includes("admin");
  console.log("isAdmin value: ", isAdmin);

  //Obtener los datos guardados en el servidor al cargar la página usando el hook useEffect
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

  // Función para eliminar un evento por ID del servidor y actualizar la vista
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

  // Función para enviar el formulario de bienvenida al servidor
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
      {/*Renderiza el contenido solamente si el usuario es un admin*/}
      {isAdmin ? (
        <div className="Secc">
          <div className="uno1">
            {/*SECCIÓN WELCOME*/}
            <form onSubmit={handleWelcomeFormSubmit}>
              <h1>Section 1</h1>
              <p>
                Here you can edit the first section insert the title of welcome,
                description and image
              </p>

              {/*Input para el título del welcome*/}
              <FloatingLabel
                controlId="floatingTextarea"
                label="Title"
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

              {/*Input para la descripción del welcome*/}
              <FloatingLabel
                controlId="floatingTextarea"
                label="Description"
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

              {/*Input para la imagen del welcome*/}
              <FloatingLabel
                controlId="floatingTextarea"
                label="image URL"
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

              {/*Botón para enviar el formulario de edición del welcome*/}
              <button type="submit" className="btn btn-success">
                Save changes
              </button>
            </form>
          </div>

          <div className="uno1">

            {/*Renderiza una lista de bienvenida*/}
            <div className="card-container">
              {welcomeData.map((noticia) => (
                <Card
                  border="dark"
                  style={{ width: "20rem" }}
                  key={noticia._id}
                >
                  <Card.Title>{noticia.title}</Card.Title>
                  <hr />
                  <Card.Img variant="top" src={noticia.images} />
                  <hr />
                  <Card.Text>{noticia.content}</Card.Text>

                  {/*Botón para eliminar el titulo, la descripcion y la bienvenida*/}
                  <button
                    key={noticia._id}
                    onClick={() => eliminarEvento(noticia._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <hr />
      {/*SECCIÓN SERVICIOS*/}
      <HomeServices />
      {/*SECCIÓN Carrusel*/}
      <hr />
      <CarouselHome />
    </div>
  );
}
