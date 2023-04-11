import React, { useState, useEffect } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useAuth0 } from "@auth0/auth0-react";

export default function CarouselAbout() {
  //Función para el formulario del carrusel
  const [carouselAboutForm, setCarouselAboutForm] = useState({
    contentCaA: "",
    imagesCaA: "",
  });

  //Función para traer los datos del carrusel
  const [carouselAboutData, setCarouselAboutData] = useState([]);

  //editar los card
  const [editingCAbout, setEditingCAbout] = useState(null);

  const { user, isAuthenticated } = useAuth0();

  const isAdmin =
    isAuthenticated &&
    user &&
    user["https://optimenLogin.com/roles"] &&
    user["https://optimenLogin.com/roles"].includes("admin");
  console.log("isAdmin value: ", isAdmin);

  // Obtener los datos guardados en el servidor al cargar la página
  useEffect(() => {
    axios
      .get("http://localhost:3002/carouselAbout")
      .then((response) => {
        setCarouselAboutData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Form Para las imagenes y la descripción del carousel
  const handleCarouselAboutFormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/carouselAbout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carouselAboutForm),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setCarouselAboutData([...carouselAboutData, data]);
        // Limpiar el formulario
        setCarouselAboutForm({
          contentCaA: "",
          imagesCaA: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  //Función para activar el modo de edición
  const activateEditMode = (CAbout) => {
    setEditingCAbout(CAbout);
  };

  const eliminarCa = (id) => {
    axios
      .delete(`http://localhost:3002/carouselAbout/${id}`)
      .then(() => {
        const carouselActualizado = carouselAboutData.filter(
          (noticia) => noticia._id !== id
        );
        setCarouselAboutData(carouselActualizado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Enviar los datos actualizados al servidor
  const handleCarouselAboutEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3002/carouselAbout/${editingCAbout._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingCAbout),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        const updatedServices = carouselAboutData.map((service) =>
          service._id === data._id ? data : service
        );
        setCarouselAboutData(updatedServices);
        // Salir del modo de edición
        setEditingCAbout(null);
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  return (
    <div>
      {/*Formulario para insertar los card */}
      <div className="uno">
        <form
          onSubmit={
            editingCAbout
              ? handleCarouselAboutEditSubmit
              : handleCarouselAboutFormSubmit
          }
        >
          <h2>
            {editingCAbout
              ? "Edit carousel"
              : isAdmin
              ? "Add Image"
              : "Edit carousel"}
          </h2>

          <FloatingLabel
            controlId="floatingInput"
            label="Image URL"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={
                editingCAbout
                  ? editingCAbout.imagesCaA
                  : carouselAboutForm.imagesCaA
              }
              onChange={(e) =>
                editingCAbout
                  ? setEditingCAbout({
                      ...editingCAbout,
                      imagesCaA: e.target.value,
                    })
                  : setCarouselAboutForm({
                      ...carouselAboutForm,
                      imagesCaA: e.target.value,
                    })
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              value={
                editingCAbout
                  ? editingCAbout.contentCaA
                  : carouselAboutForm.contentCaA
              }
              onChange={(e) =>
                editingCAbout
                  ? setEditingCAbout({
                      ...editingCAbout,
                      contentCaA: e.target.value,
                    })
                  : setCarouselAboutForm({
                      ...carouselAboutForm,
                      contentCaA: e.target.value,
                    })
              }
            />
          </FloatingLabel>

          <button type="submit" className="btn btn-success">
            {editingCAbout
              ? "Save changes"
              : isAdmin
              ? "Add image"
              : "Save changes"}
          </button>
        </form>
      </div>

      {/*Listado de las Cards*/}
      <div className="card-container">
        {carouselAboutData.map((carouselAbout) => (
          <Card
            border="dark"
            style={{ width: "18rem" }}
            key={carouselAbout._id}
          >
            <Card.Img variant="top" src={carouselAbout.imagesCaA} />
            <hr />
            <Card.Text>{carouselAbout.contentCaA}</Card.Text>
            {isAdmin ? (
            <button
              key={carouselAbout._id}
              onClick={() => eliminarCa(carouselAbout._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            ):null}
            <button
              onClick={() => activateEditMode(carouselAbout)}
              className="btn btn-success"
            >
              Update
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
