import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminComments.css";

function AdminComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get("http://localhost:3002/comment");
      setComments(response.data);
    }

    fetchComments();
  }, []);

  async function deleteComment(id) {
    await axios.delete(`http://localhost:3002/comment/${id}`);
    setComments(comments.filter((comment) => comment._id !== id));
  }

  return (
    <div>
      <div className="PadreComments">
      <h2>Comentarios Generales</h2>
      <div >
        <table className="Comentarios">
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id}>
                <td>{comment.comment}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteComment(comment._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      </div>
    </div>
  );
}

export default AdminComments;
