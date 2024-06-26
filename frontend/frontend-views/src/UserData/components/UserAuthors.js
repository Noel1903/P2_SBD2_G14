import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './MyNavBar';
const UserAuthors = () => {
  const [autores, setAutores] = useState([]);
  const [expandedAutor, setExpandedAutor] = useState(null);
  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/author');
        if (!response.ok) {
          throw new Error('Error al obtener los autores');
        }
        const data = await response.json();

        // Acceder a la lista de autores desde la clave "authors"
        const autoresConBooksList = data.authors.map(autor => ({
          ...autor,
          booksList: autor.booksList || []
        }));

        setAutores(autoresConBooksList);
      } catch (error) {
        console.error('Error al obtener los autores', error);
      }
    };

    fetchAutores();
  }, []);

  const toggleAccordion = (autorId) => {
    setExpandedAutor(expandedAutor === autorId ? null : autorId);
  };



  return (
    <div>
       <NavBar />
      <div className="container">
        <h2 className="my-4">Autores</h2>
        
        {autores.map((autor, index) => {
          const isExpanded = expandedAutor === autor._id;
          const collapseId = `collapse${index + 1}`;

          return (
            <div key={autor._id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{autor.name}</h5>
                  
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => toggleAccordion(autor._id)}
                    aria-expanded={isExpanded}
                    aria-controls={collapseId}
                  >
                    +
                  </button>
                </div>
              </div>
              <div id={collapseId} className={`collapse ${isExpanded ? 'show' : ''}`}>
                <div className="card-body">
                  <p><strong>Biografía:</strong> {autor.biography}</p>
                  <p><strong>Imagen:</strong> <img src={autor.photoProfile} alt="Imagen del autor" style={{ width: '100px' }} /></p>
                  <p><strong>Libros:</strong></p>
                  <ul>
                    {autor.booksList.map((book, bookIndex) => (
                      <li key={bookIndex}>
                        <strong>Título {bookIndex + 1}:</strong> {book} <br />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default UserAuthors
