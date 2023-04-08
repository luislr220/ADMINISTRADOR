import React, { useState, useEffect } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function Services() {
  //constante para la constante que utilizaremos para el form
  const [servicesCardForm, setServicesCardForm] = useState({
    titleSC: "",
    contentSC: "",
    imagesSC: "",
  });

  //constante para obtener los datos
  const [servicesCardData, setServicesCardData] = useState([]);
  //editar los card
  const [editingService, setEditingService] = useState(null);

  //usamos un useEffect para tarer los datos del servidor y vidualizarlos
  useEffect(() => {
    axios
      .get("http://localhost:3002/servicesCard")
      .then((response) => {
        setServicesCardData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Función para activar el modo de edición
  const activateEditMode = (service) => {
    setEditingService(service);
  };

  //constante para eliminar los card
  const eliminarSCard = (id) => {
    axios
      .delete(`http://localhost:3002/servicesCard/${id}`)
      .then(() => {
        const servicesCardActualizadas = servicesCardData.filter(
          (noticia) => noticia._id !== id
        );
        setServicesCardData(servicesCardActualizadas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Form Para cards
  const handleServicesCardFormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/servicesCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(servicesCardForm),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setServicesCardData([...servicesCardData, data]);
        // Limpiar el formulario
        setServicesCardForm({
          titleSC: "",
          contentSC: "",
          imagesSC: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  //Enviar los datos actualizados al servidor
  const handleServiceEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3002/servicesCard/${editingService._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingService),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        const updatedServices = servicesCardData.map((service) =>
          service._id === data._id ? data : service
        );
        setServicesCardData(updatedServices);
        // Salir del modo de edición
        setEditingService(null);
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  return (
    <div>
      <br/>      
      {/*Formulario para insertar los card */}
      <div className="uno">
        <form
          onSubmit={
            editingService
              ? handleServiceEditSubmit
              : handleServicesCardFormSubmit
          }
        >
          <h2>{editingService ? "Editar servicio" : "Agregar servicio"}</h2>

          <FloatingLabel
            controlId="floatingInput"
            label="Titulo"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={
                editingService
                  ? editingService.titleSC
                  : servicesCardForm.titleSC
              }
              onChange={(e) =>
                editingService
                  ? setEditingService({
                      ...editingService,
                      titleSC: e.target.value,
                    })
                  : setServicesCardForm({
                      ...servicesCardForm,
                      titleSC: e.target.value,
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
                editingService
                  ? editingService.imagesSC
                  : servicesCardForm.imagesSC
              }
              onChange={(e) =>
                editingService
                  ? setEditingService({
                      ...editingService,
                      imagesSC: e.target.value,
                    })
                  : setServicesCardForm({
                      ...servicesCardForm,
                      imagesSC: e.target.value,
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
                editingService
                  ? editingService.contentSC
                  : servicesCardForm.contentSC
              }
              onChange={(e) =>
                editingService
                  ? setEditingService({
                      ...editingService,
                      contentSC: e.target.value,
                    })
                  : setServicesCardForm({
                      ...servicesCardForm,
                      contentSC: e.target.value,
                    })
              }
            />
          </FloatingLabel>

          <button type="submit" className="btn btn-success">
            {editingService ? "Guardar cambios" : "Agregar servicio"}
          </button>
        </form>
      </div>

      {/*Listado de las Cards*/}
      <div className="card-container">
      {servicesCardData.map((noticia) => (
          <Card style={{ width: "10rem" }} key={noticia._id}>
            <Card.Title>{noticia.titleSC}</Card.Title>
            <Card.Img variant="top" src={noticia.imagesSC} />
            <Card.Text>{noticia.contentSC}</Card.Text>
            <button
              key={noticia._id}
              onClick={() => eliminarSCard(noticia._id)}
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
