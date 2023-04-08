import React, { useState, useEffect } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function Innovation() {
  //constante para la constante que utilizaremos para el form
  const [innovationForm, setInnovationForm] = useState({
    titleInn: "",
    contentInn: "",
    imagesInn: "",
  });

  //constante para obtener los datos
  const [innovationData, setInnovationData] = useState([]);
  //editar los card
  const [editingInnovation, setEditingInnovation] = useState(null);

  //usamos un useEffect para tarer los datos del servidor y vidualizarlos
  useEffect(() => {
    axios
      .get("http://localhost:3002/innovation")
      .then((response) => {
        setInnovationData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Función para activar el modo de edición
  const activateEditMode = (service) => {
    setEditingInnovation(service);
  };

  //constante para eliminar los card
  const eliminarInnovation = (id) => {
    axios
      .delete(`http://localhost:3002/Innovation/${id}`)
      .then(() => {
        const innovationActualizado = innovationData.filter(
          (noticia) => noticia._id !== id
        );
        setInnovationData(innovationActualizado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Form Para cards
  const handleInnovationFormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/innovation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(innovationForm),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setInnovationData([...innovationData, data]);
        // Limpiar el formulario
        setInnovationForm({
          titleInn: "",
          contentInn: "",
          imagesInn: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  //Enviar los datos actualizados al servidor
  const handleInnovationEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3002/innovation/${editingInnovation._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingInnovation),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        const updatedInnovation = innovationData.map((service) =>
          service._id === data._id ? data : service
        );
        setInnovationData(updatedInnovation);
        // Salir del modo de edición
        setEditingInnovation(null);
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
      <br/>
      <div className="uno">
        <form
          onSubmit={
            editingInnovation
              ? handleInnovationEditSubmit
              : handleInnovationFormSubmit
          }
        >
          <h2>{editingInnovation ? "Editar" : "Agregar"}</h2>

          <FloatingLabel
            controlId="floatingInput"
            label="Titulo"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={
                editingInnovation
                  ? editingInnovation.titleInn
                  : innovationForm.titleInn
              }
              onChange={(e) =>
                editingInnovation
                  ? setEditingInnovation({
                      ...editingInnovation,
                      titleInn: e.target.value,
                    })
                  : setInnovationForm({
                      ...innovationForm,
                      titleInn: e.target.value,
                    })
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Imagenes"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={
                editingInnovation
                  ? editingInnovation.imagesInn
                  : innovationForm.imagesInn
              }
              onChange={(e) =>
                editingInnovation
                  ? setEditingInnovation({
                      ...editingInnovation,
                      imagesInn: e.target.value,
                    })
                  : setInnovationForm({
                      ...innovationForm,
                      imagesInn: e.target.value,
                    })
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
              value={
                editingInnovation
                  ? editingInnovation.contentInn
                  : innovationForm.contentInn
              }
              onChange={(e) =>
                editingInnovation
                  ? setEditingInnovation({
                      ...editingInnovation,
                      contentInn: e.target.value,
                    })
                  : setInnovationForm({
                      ...innovationForm,
                      contentInn: e.target.value,
                    })
              }
            />
          </FloatingLabel>

          <button type="submit" className="btn btn-success">
            {editingInnovation ? "Guardar cambios" : "Agregar"}
          </button>
        </form>
      </div>

      {/*Listado de las Cards*/}
      <div className="card-container">
      {innovationData.map((noticia) => (
          <Card border="dark" style={{ width: "18rem" }} key={noticia._id}>
            <Card.Title>{noticia.titleInn}</Card.Title>
            <hr/>
            <Card.Img variant="top" src={noticia.imagesInn} />
            <hr/>
            <Card.Text>{noticia.contentInn}</Card.Text>
            <button
              key={noticia._id}
              onClick={() => eliminarInnovation(noticia._id)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
            <button
              onClick={() => activateEditMode(noticia)}
              className="btn btn-success"
            >
              Actualizar
            </button>
          </Card>
        ))}
      </div>
                



    </div>
  );
}
