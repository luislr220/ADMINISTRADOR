import React, { useEffect, useState } from 'react';
import './News.css';
import moment from "moment";

export default function News() {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3002/news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='padreNews'>
        {news.map((noticia) => (
          <div key={noticia._id} className='NewsContainer'>
            <h2 className='Titulo'>{noticia.title} </h2>
            <img src={noticia.images} alt={noticia.title} className='imgNews' />
            <p>{noticia.content}</p>
            <p>{moment(noticia.date).format("DD/MM/YYYY")}</p>
            <div className='linea-horizontal'></div>
          </div>
        ))}
      </div>

      <footer className='foo'>
        <p className='PcFooter'>
          Av. León 119. <br />
          León Guanajuato<br />
          Mexico<br />
          info@optimen.com.mx<br />
        </p>
      </footer>
    </div>
  );
}