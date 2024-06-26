import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './MyNavBar';

const AdminAutores = () => {
  const [autores, setAutores] = useState([]);
  const [expandedAutor, setExpandedAutor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAutor, setNewAutor] = useState({
    name: '',
    biography: '',
    photoProfile: '',
    booksList: ''
  });

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

  const handleDelete = async (autorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/author/${autorId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el autor');
      }

      setAutores((prevAutores) => prevAutores.filter((autor) => autor._id !== autorId));
    } catch (error) {
      console.error('Error al eliminar el autor', error);
    }
  };

  const toggleAccordion = (autorId) => {
    setExpandedAutor(expandedAutor === autorId ? null : autorId);
  };

  const handleChangeNewAutor = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setNewAutor({ ...newAutor, [field]: value });
  };

  const handleFileChangeNewAutor = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Obtiene solo el base64 sin la parte inicial "data:image/png;base64,"
      setNewAutor({ ...newAutor, photoProfile: base64String });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewAutor = async () => {
    try {
      // Convertir la cadena de libros separada por comas en una lista de objetos
      const booksList = newAutor.booksList.split(',').map((book) => book.trim());

      const autorToSubmit = {
        ...newAutor,
        booksList: booksList
      };

      // Realizar la solicitud POST para agregar el nuevo autor
      const response = await fetch('http://localhost:5000/api/author', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(autorToSubmit),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar el autor: ${errorText}`);
      }

      // Si la solicitud POST fue exitosa, obtener la lista actualizada de autores
      const updatedAutoresResponse = await fetch('http://localhost:5000/api/author');
      if (!updatedAutoresResponse.ok) {
        throw new Error('Error al obtener la lista de autores actualizada');
      }
      const updatedAutoresData = await updatedAutoresResponse.json();

      // Acceder a la lista de autores desde la clave "authors"
      const updatedAutores = updatedAutoresData.authors.map(autor => ({
        ...autor,
        booksList: autor.booksList || []
      }));

      // Actualizar el estado con la lista completa de autores actualizada
      setAutores(updatedAutores);
      setShowModal(false);
      setNewAutor({
        name: '',
        biography: '',
        photoProfile: '',
        booksList: ''
      });
    } catch (error) {
      console.error('Error al agregar el autor', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="my-4">Catálogo de Autores</h2>
        <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
          Agregar Nuevo Autor
        </button>
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
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(autor._id)}
                  >
                    Eliminar
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

        {showModal && (
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar Nuevo Autor</h5>
                  <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newAutor.name}
                      onChange={(e) => handleChangeNewAutor(e, 'name')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Biografía</label>
                    <textarea
                      className="form-control"
                      value={newAutor.biography}
                      onChange={(e) => handleChangeNewAutor(e, 'biography')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChangeNewAutor}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Libros (Separado por comas ",")</label>
                    <textarea
                      className="form-control"
                      value={newAutor.booksList}
                      onChange={(e) => handleChangeNewAutor(e, 'booksList')}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddNewAutor}>Agregar Autor</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
};

export default AdminAutores;
