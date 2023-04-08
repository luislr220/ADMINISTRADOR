import React, { useState, useEffect } from 'react';
import './NewsForm.css';

export default function NewsForm(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState('');
  const [date, setDate] = useState('');
  const [noticiaEditada, setNoticiaEditada] = useState(null);
 
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (props.noticia) {
      setTitle(props.noticia.title);
      setContent(props.noticia.content);
      setImages(props.noticia.images);
      setDate(props.noticia.date);
      setNoticiaEditada(props.noticia);
      //setEditMode(true);
    }
  }, [props.noticia]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Chequear si alguno de los campos está vacío
    if (!title || !content || !images || !date) {
      alert('Todos los campos son requeridos');
      return;
    }

    if (noticiaEditada) {
      await fetch(`http://localhost:3002/news/${noticiaEditada._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          images: images,
          date: date,
        }),
      }).then(response => {
        return response.json()
      })
      //console.log("noticiaEditada " + noticiaEditada._id)
    } else {
      let data = JSON.stringify({
        title: title,
        content: content,
        images: images,
        date: date,
      });
      console.log(data);
      await fetch('http://localhost:3002/news/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
    }

    setTitle('');
    setContent('');
    setImages('');
    setDate('');
    setShowForm(false);
    setNoticiaEditada(null);
    

    props.onSubmit();
    window.location.reload(); // Agrega esta línea para recargar la página
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setImages('');
    setDate('');
    setShowForm(false);
    setNoticiaEditada(null);
    //setEditMode(false);
    //setShowForm(false); // Oculta el formulario
  };

  return (
    <div className="NewsForm">
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn btn-success">Agregar noticia</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="NewsFormF">
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagen">URL de la imagen:</label>
            <input
              type="text"
              id="images"
              value={images}
              onChange={(event) => setImages(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-success">{noticiaEditada ? 'Actualizar' : 'Guardar'}</button>
            <button type="button" onClick={handleCancel} className="btn btn-danger">
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
