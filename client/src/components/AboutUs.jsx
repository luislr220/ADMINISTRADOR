import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./AboutUs.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useAuth0 } from "@auth0/auth0-react";

import CarouselAbout from "./CarouselAbout";
export default function AboutUs() {
  //constante para la constante que utilizaremos para el form
  const [lineaAboutForm, setLineaAboutForm] = useState({
    titleLA: "",
    contentLA: "",
    yearLA: "",
  });

  //constante para obtener los datos
  const [lineaAboutData, setLineaAboutData] = useState([]);
  //editar los card
  const [editingLineaAbout, setEditingLineaAbout] = useState(null);

  const { user, isAuthenticated } = useAuth0();

  const isAdmin =
    isAuthenticated &&
    user &&
    user["https://optimenLogin.com/roles"] &&
    user["https://optimenLogin.com/roles"].includes("admin");
  console.log("isAdmin value: ", isAdmin);

  //usamos un useEffect para tarer los datos del servidor y vidualizarlos
  useEffect(() => {
    axios
      .get("http://localhost:3002/lineaAbout")
      .then((response) => {
        setLineaAboutData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Función para activar el modo de edición
  const activateEditMode = (service) => {
    setEditingLineaAbout(service);
  };

  //constante para eliminar los card
  const eliminarLinea = (id) => {
    axios
      .delete(`http://localhost:3002/lineaAbout/${id}`)
      .then(() => {
        const lineaAboutActualizada = lineaAboutData.filter(
          (noticia) => noticia._id !== id
        );
        setLineaAboutData(lineaAboutActualizada);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Form Para cards
  const handleLineaAboutFormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/lineaAbout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lineaAboutForm),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setLineaAboutData([...lineaAboutData, data]);
        // Limpiar el formulario
        setLineaAboutForm({
          titleLA: "",
          contentLA: "",
          yearLA: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  //Enviar los datos actualizados al servidor
  const handleLineaAboutEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3002/lineaAbout/${editingLineaAbout._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingLineaAbout),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        const updatedServices = lineaAboutData.map((service) =>
          service._id === data._id ? data : service
        );
        setLineaAboutData(updatedServices);
        // Salir del modo de edición
        setEditingLineaAbout(null);
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  return (
    <div>
      <CarouselAbout />

      <hr />

      {/*Formulario para insertar los card */}
      <div className="uno">
        <form
          onSubmit={
            editingLineaAbout
              ? handleLineaAboutEditSubmit
              : handleLineaAboutFormSubmit
          }
        >
          <h2>
            {editingLineaAbout
              ? "Edit the line"
              : isAdmin
              ? "Add new history"
              : "Edit the line"}
          </h2>

          <FloatingLabel
            controlId="floatingInput"
            label="Year"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={
                editingLineaAbout
                  ? editingLineaAbout.yearLA
                  : lineaAboutForm.yearLA
              }
              onChange={(e) =>
                editingLineaAbout
                  ? setEditingLineaAbout({
                      ...editingLineaAbout,
                      yearLA: e.target.value,
                    })
                  : setLineaAboutForm({
                      ...lineaAboutForm,
                      yearLA: e.target.value,
                    })
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={
                editingLineaAbout
                  ? editingLineaAbout.titleLA
                  : lineaAboutForm.titleLA
              }
              onChange={(e) =>
                editingLineaAbout
                  ? setEditingLineaAbout({
                      ...editingLineaAbout,
                      titleLA: e.target.value,
                    })
                  : setLineaAboutForm({
                      ...lineaAboutForm,
                      titleLA: e.target.value,
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
                editingLineaAbout
                  ? editingLineaAbout.contentLA
                  : lineaAboutForm.contentLA
              }
              onChange={(e) =>
                editingLineaAbout
                  ? setEditingLineaAbout({
                      ...editingLineaAbout,
                      contentLA: e.target.value,
                    })
                  : setLineaAboutForm({
                      ...lineaAboutForm,
                      contentLA: e.target.value,
                    })
              }
            />
          </FloatingLabel>

          <button type="submit" className="btn btn-success">
            {editingLineaAbout
              ? "Save changes"
              : isAdmin
              ? "Add history"
              : "Save changes"}
          </button>
        </form>
      </div>

      <div className="AbTabla">
        <Table striped bordered hover className="TablaAb">
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th>Description</th>
              {isAdmin ? <th>Delete</th> : null}
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {lineaAboutData.map((linea) => (
              <tr key={linea._id}>
                <td>{linea.yearLA}</td>
                <td>{linea.titleLA}</td>
                <td>{linea.contentLA}</td>
                {isAdmin ? (
                  <td>
                    <button
                      key={linea._id}
                      onClick={() => eliminarLinea(linea._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
                <td>
                  <button
                    onClick={() => activateEditMode(linea)}
                    className="btn btn-success"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
