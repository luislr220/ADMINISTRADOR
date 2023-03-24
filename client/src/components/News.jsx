import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';
import NewsForm from './NewsForm';

export default function News() {
  const [noticias, setNoticias] = useState([]);
  const [formularioActualizar, setFormularioActualizar] = useState(null);
  const [contadorNoticias, setContadorNoticias] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3002/news')
      .then((response) => {
        setNoticias(response.data);
        setContadorNoticias(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const agregarNoticia = (nuevaNoticia) => {
    axios.post('http://localhost:3002/news', nuevaNoticia)
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

    axios.put(`http://localhost:3002/news/${noticiaEditada._id}`, noticiaEditada)
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
    axios.delete(`http://localhost:3002/news/${id}`)
      .then(() => {
        const noticiasActualizadas = noticias.filter((noticia) => noticia._id !== id);
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
      <div className="padreNews">
        {noticias.map((noticia) => (
          <div key={noticia._id} className="NewsContainer">
            <div className="News">
              <h1 className="Titulo">{noticia.title}</h1>
              {noticia.images && <img src={noticia.images} alt={noticia.title} className="imgNews" />}
              <p>{noticia.content}</p>
              <p>{noticia.date}</p>
              <div className="NoticiaBotones">
                <button key={noticia._id} onClick={() => eliminarNoticia(noticia._id)} className="eliminarbtn">Eliminar</button>
                <button key={noticia._id + 'edit'} onClick={() => mostrarFormularioActualizar(noticia)} className="button-Agregar">Actualizar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {formularioActualizar && (
        <div className="formularioActualizar">
          <div className='divh2'><h2>Actualizar noticia</h2></div>
          <NewsForm onSubmit={editarNoticia} noticia={formularioActualizar} />
        </div>
      )}

      <footer className="foo">
        <p className="PcFooter">
          Av. León 119. <br />
          León Guanajuato<br />
          Mexico<br />
          info@optimen.com.mx<br />
        </p>
      </footer>
    </div>
  );
}
