import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./HomeServices.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function HomeServices() {
  //constante para form parte 1
  const [seccionH2Form, setSeccionH2Form] = useState({
    title: "",
    content: "",
  });

  //Constante para Form de cards
  const [seccionH2CardsForm, setSeccionH2CardsForm] = useState({
    titleC: "",
  });

  const [seccionH2Data, setSeccionH2Data] = useState([]);
  const [seccionH2CardsData, setSeccionH2CardsData] = useState([]);

  // Obtener los datos guardados en el servidor al cargar la página
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

  //Eliminar el evento
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

  //Form Para titulo y descripcción
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

  // Obtener los datos guardados en el servidor al cargar la página
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
        <div className="uno">
          {/*Formulario para actualizar eventos parte 1 */}
          <h1>Sección 2</h1>
          <p>Aqui puedes editar el Titulo y la descripcción de esta sección</p>

          <form onSubmit={handleWelcomeFormSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Titulo"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={seccionH2Form.title}
                onChange={(e) =>
                  setSeccionH2Form({ ...seccionH2Form, title: e.target.value })
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
              Guardar 
            </button>
          </form>
        </div>

        <div className="uno">
          {/*Formulario para cards*/}

          <form onSubmit={handleSeccionH2CardsFormSubmit}>
            <h1>Sección 2 cards</h1>
            <p>Aqui puedes agregar mas targetas de servicios o quitar</p>

            <FloatingLabel
              controlId="floatingInput"
              label="Titulo"
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

            <button type="submit" className="btn btn-success" >Guardar tarjeta</button>
          </form>
        </div>
      </div>

      <div className="Secc">
        {/*Listado del titulo*/}
        <div className="uno">
          <Table striped bordered hover className="TablaC">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Descripcción</th>
                <th>Eliminar</th>
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
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/*Listado del cards*/}
        <div className="uno">
          <Table striped bordered hover className="TablaC">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Eliminar</th>
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
                      Eliminar tarjeta
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
