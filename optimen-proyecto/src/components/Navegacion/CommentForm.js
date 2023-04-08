import React, { useState } from 'react';
import './CommentForm.css'
function CommentForm() {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
      });

      if (response.ok) {
        console.log('Comentario guardado exitosamente');
        setComment('');
      } else {
        console.error('Error al guardar el comentario');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='Comentarios'>
        <label htmlFor="comment">Comentario:</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit" class="btn btn-success">Guardar comentario</button>
    </form>
  );
}

export default CommentForm;
