import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";
import NewsForm from "./NewsForm";
import moment from "moment";
import Card from "react-bootstrap/Card";

export default function News() {
  const [noticias, setNoticias] = useState([]);
  const [formularioActualizar, setFormularioActualizar] = useState(null);
  const [contadorNoticias, setContadorNoticias] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3002/news")
      .then((response) => {
        setNoticias(response.data);
        setContadorNoticias(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const agregarNoticia = (nuevaNoticia) => {
    axios
      .post("http://localhost:3002/news", nuevaNoticia)
      .then((response) => {
        setNoticias([...noticias, response.data]);
        setContadorNoticias(contadorNoticias + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editarNoticia = (noticiaEditada) => {
    console.log("editarNoticia" + noticiaEditada._id);

    axios
      .put(`http://localhost:3002/news/${noticiaEditada._id}`, noticiaEditada)
      .then((response) => {
        const noticiasActualizadas = noticias.map((noticia) => {
          if (noticia._id === noticiaEditada.id) {
            return response.data;
          } else {
            return noticia;
          }
        });
        setNoticias(noticiasActualizadas);
        setFormularioActualizar(null); // Cierra el formulario de actualización después de actualizar la noticia
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarNoticia = (id) => {
    axios
      .delete(`http://localhost:3002/news/${id}`)
      .then(() => {
        const noticiasActualizadas = noticias.filter(
          (noticia) => noticia._id !== id
        );
        setNoticias(noticiasActualizadas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mostrarFormularioActualizar = (noticia) => {
    setFormularioActualizar(noticia);
  };

  return (
    <div>
      <div>
        <NewsForm onSubmit={agregarNoticia} />
      </div>
      <br />

      <div className="card-container">
        {noticias.map((noticia) => (
          <Card border="dark" style={{ width: "25rem" }} key={noticia._id}>
            <Card.Title>{noticia.title}</Card.Title>
            <hr/>
            <Card.Img variant="top" src={noticia.images} />
            <hr/>
            <Card.Text>{noticia.content}</Card.Text>
            <hr/>
            <Card.Text>{moment(noticia.date).format("DD/MM/YYYY")}</Card.Text>
            <button
              key={noticia._id}
              onClick={() => eliminarNoticia(noticia._id)}
              class="btn btn-danger"
            >
              Delete
            </button>
            <button
              key={noticia._id + "edit"}
              onClick={() => mostrarFormularioActualizar(noticia)}
              class="btn btn-success"
            >
              Update
            </button>
          </Card>
        ))}
      </div>

      {formularioActualizar && (
        <div className="formularioActualizar">
          <div className="divh2">
            <h2>Update News</h2>
          </div>
          <NewsForm onSubmit={editarNoticia} noticia={formularioActualizar} />
        </div>
      )}
    </div>
  );
}
