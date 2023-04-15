//Modulo Realizado por Luis
// Importa las bibliotecas necesarias


import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./HomeServices.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useAuth0 } from "@auth0/auth0-react";

export default function HomeServices() {
  // Estado para almacenar el contenido del formulario
  const [seccionH2Form, setSeccionH2Form] = useState({
    title: "",
    content: "",
  });

  //Constante para Form de cards
  const [seccionH2CardsForm, setSeccionH2CardsForm] = useState({
    titleC: "",
  });

  // Estado para almacenar los datos de bienvenida y card de la seccion 2 obtenidos del servidor
  const [seccionH2Data, setSeccionH2Data] = useState([]);
  const [seccionH2CardsData, setSeccionH2CardsData] = useState([]);


   // Obtener el usuario y su estado de autenticación de Auth0
  const { user, isAuthenticated } = useAuth0();

  // Comprobar si el usuario es administrador (tiene el rol "admin")

  const isAdmin =
    isAuthenticated &&
    user &&
    user["https://optimenLogin.com/roles"] &&
    user["https://optimenLogin.com/roles"].includes("admin");
  console.log("isAdmin value: ", isAdmin);

  // Obtener los datos guardados en el servidor de el titulo y descripción al cargar la página
  useEffect(() => {
    axios
      .get("http://localhost:3002/seccionH2")
      .then((response) => {
        setSeccionH2Data(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Eliminar el evento por Id y actualizar la página despues de
  const eliminarEvento = (id) => {
    axios
      .delete(`http://localhost:3002/seccionH2/${id}`)
      .then(() => {
        const eventoActualizado = seccionH2Data.filter(
          (noticia) => noticia._id !== id
        );
        setSeccionH2Data(eventoActualizado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Función que manda los adatos ingresados en el formulario al servidor
  const handleWelcomeFormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/seccionH2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seccionH2Form),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setSeccionH2Data([...seccionH2Data, data]);
        // Limpiar el formulario
        setSeccionH2Form({
          title: "",
          content: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  //***********************************************************************************************/

  // Obtener los datos guardados en el servidor al cargar la página para las cards
  useEffect(() => {
    axios
      .get("http://localhost:3002/seccionH2C")
      .then((response) => {
        setSeccionH2CardsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /****************************************************************************************************************/

  //Form Para cards
  const handleSeccionH2CardsFormSubmit = async (e) => {
    e.preventDefault(); // prevenimos que se recargue la página al enviar el formulario

    try {
      const response = await fetch("http://localhost:3002/seccionH2C", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seccionH2CardsForm),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar los datos mostrados en la vista
        setSeccionH2CardsData([...seccionH2CardsData, data]);
        // Limpiar el formulario
        setSeccionH2CardsForm({
          titleC: "",
        });
      } else {
        console.error("Error al enviar formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  //Eliminar el titleC
  const eliminarTitleC = (id) => {
    axios
      .delete(`http://localhost:3002/seccionH2C/${id}`)
      .then(() => {
        const titleCardsTActualizado = seccionH2CardsData.filter(
          (noticia) => noticia._id !== id
        );
        setSeccionH2CardsData(titleCardsTActualizado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="Secc">
        {isAdmin ? (
          <div className="uno">
            {/*Formulario para actualizar eventos parte 1 */}
            <h1>Section 2</h1>
            <p>Here you can edit the Title and description of this section</p>

            <form onSubmit={handleWelcomeFormSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Title"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  value={seccionH2Form.title}
                  onChange={(e) =>
                    setSeccionH2Form({
                      ...seccionH2Form,
                      title: e.target.value,
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
                  value={seccionH2Form.content}
                  onChange={(e) =>
                    setSeccionH2Form({
                      ...seccionH2Form,
                      content: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </form>
          </div>
        ) : null}

        <div className="uno">
          {/*Formulario para cards*/}

          <form onSubmit={handleSeccionH2CardsFormSubmit}>
            <h1>Section 2 cards</h1>
            <p>Here you can add more service cards or remove</p>

            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={seccionH2CardsForm.titleC}
                onChange={(e) =>
                  setSeccionH2CardsForm({
                    ...seccionH2CardsForm,
                    titleC: e.target.value,
                  })
                }
              />
            </FloatingLabel>

            <button type="submit" className="btn btn-success">
              Save Card
            </button>
          </form>
        </div>
      </div>

      <div className="Secc">
        {/*Listado del titulo*/}
        {isAdmin ? (
          <div className="uno">
            <Table striped bordered hover className="TablaC">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {seccionH2Data.map((noticia) => (
                  <tr key={noticia._id}>
                    <td>{noticia.title}</td>
                    <td>{noticia.content}</td>
                    <td>
                      <button
                        key={noticia._id}
                        onClick={() => eliminarEvento(noticia._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : null}
        {/*Listado del cards*/}
        <div className="uno">
          <Table striped bordered hover className="TablaC">
            <thead>
              <tr>
                <th>Title</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {seccionH2CardsData.map((noticiaCards) => (
                <tr key={noticiaCards._id}>
                  <td>{noticiaCards.titleC}</td>
                  <td>
                    <button
                      key={noticiaCards._id}
                      onClick={() => eliminarTitleC(noticiaCards._id)}
                      className="btn btn-danger"
                    >
                      Delete Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
