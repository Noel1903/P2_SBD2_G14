import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './MyNavBar';

const AdminLibros = () => {
  const [libros, setLibros] = useState([]);
  const [expandedLibro, setExpandedLibro] = useState(null);
  const [editableLibro, setEditableLibro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newLibro, setNewLibro] = useState({
    Titulo: '',
    autor: '',
    descripcion: '',
    genero: '',
    fecha_publicacion: '',
    disponibilidad: false,
    cantidad_stock: 0,
    puntuacion_promedio: 0,
    precio: 0.0,
    imagen_url: ''
  });

  useEffect(() => {
    fetchLibros();
  }, []);

  const fetchLibros = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      if (!response.ok) {
        throw new Error('Error al obtener los libros');
      }
      const data = await response.json();
      setLibros(data.books);
    } catch (error) {
      console.error('Error al obtener los libros', error);
    }
  };

  const handleToggleEdit = (libroId) => {
    setEditableLibro(editableLibro === libroId ? null : libroId);
  };

  const handleChange = (e, libroId, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLibros((prevLibros) =>
      prevLibros.map((libro) =>
        libro._id === libroId ? { ...libro, [field]: value } : libro
      )
    );
  };

  const handleFileChange = (e, libroId) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Obtiene solo el base64 sin la parte inicial "data:image/png;base64,"
      setLibros((prevLibros) =>
        prevLibros.map((libro) =>
          libro._id === libroId ? { ...libro, imagen_url: base64String } : libro
        )
      );
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  const handleSave = async (libroId) => {
    const libroToUpdate = libros.find((libro) => libro._id === libroId);
    try {
      const response = await fetch(`http://localhost:5000/api/books/${libroId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(libroToUpdate),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el libro');
      }
      //console.log(libroToUpdate)
      setEditableLibro(null);
      fetchLibros(); // Actualizar la lista de libros después de guardar cambios
    } catch (error) {
      console.error('Error al actualizar el libro', error);
    }
  };

  const handleDelete = async (libroId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${libroId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el libro');
      }

      fetchLibros(); // Actualizar la lista de libros después de eliminar
    } catch (error) {
      console.error('Error al eliminar el libro', error);
    }
  };

  const toggleAccordion = (libroId) => {
    setExpandedLibro(expandedLibro === libroId ? null : libroId);
  };

  const handleChangeNewLibro = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setNewLibro({ ...newLibro, [field]: value });
  };

  const handleFileChangeNewLibro = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Obtiene solo el base64 sin la parte inicial "data:image/png;base64,"
      setNewLibro({ ...newLibro, imagen_url: base64String });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  const handleAddNewLibro = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLibro),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el libro');
      }

      fetchLibros(); // Actualizar la lista de libros después de agregar uno nuevo
      setShowModal(false);
      setNewLibro({
        Titulo: '',
        autor: '',
        descripcion: '',
        genero: '',
        fecha_publicacion: '',
        disponibilidad: false,
        cantidad_stock: 0,
        puntuacion_promedio: 0,
        precio: 0.0,
        imagen_url: ''
      });
    } catch (error) {
      console.error('Error al agregar el libro', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="my-4">Catálogo de Libros</h2>
        <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
          Agregar Nuevo Libro
        </button>
        {libros.map((libro, index) => {
          const isExpanded = expandedLibro === libro._id;
          const isEditable = editableLibro === libro._id;
          const collapseId = `collapse${index + 1}`;

          return (
            <div key={libro._id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{libro.Titulo}</h5>
                  <p className="card-text">Autor: {libro.autor}</p>
                  <p className="card-text">Stock: {libro.cantidad_stock}</p>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => toggleAccordion(libro._id)}
                    aria-expanded={isExpanded}
                    aria-controls={collapseId}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(libro._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div id={collapseId} className={`collapse ${isExpanded ? 'show' : ''}`}>
                {isEditable ? (
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Titulo</label>
                      <input
                        type="text"
                        className="form-control"
                        value={libro.Titulo}
                        onChange={(e) => handleChange(e, libro._id, 'Titulo')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Autor</label>
                      <input
                        type="text"
                        className="form-control"
                        value={libro.autor}
                        onChange={(e) => handleChange(e, libro._id, 'autor')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        value={libro.descripcion}
                        onChange={(e) => handleChange(e, libro._id, 'descripcion')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Género</label>
                      <input
                        type="text"
                        className="form-control"
                        value={libro.genero}
                        onChange={(e) => handleChange(e, libro._id, 'genero')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Fecha de publicación</label>
                      <input
                        type="date"
                        className="form-control"
                        value={libro.fecha_publicacion.split('T')[0]}
                        onChange={(e) => handleChange(e, libro._id, 'fecha_publicacion')}
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`disponibilidadCheckbox_${libro._id}`}
                        checked={libro.disponibilidad}
                        onChange={(e) => handleChange(e, libro._id, 'disponibilidad')}
                      />
                      <label className="form-check-label" htmlFor={`disponibilidadCheckbox_${libro._id}`}>
                        Disponibilidad
                      </label>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cantidad en stock</label>
                      <input
                        type="number"
                        className="form-control"
                        value={libro.cantidad_stock}
                        onChange={(e) => handleChange(e, libro._id, 'cantidad_stock')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Puntuación promedio</label>
                      <input
                        type="number"
                        className="form-control"
                        value={libro.puntuacion_promedio}
                        onChange={(e) => handleChange(e, libro._id, 'puntuacion_promedio')}
                        step="0.1"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input
                        type="number"
                        className="form-control"
                        value={libro.precio}
                        onChange={(e) => handleChange(e, libro._id, 'precio')}
                        step="0.01"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Imagen</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(e, libro._id)}
                      />
                      {libro.imagen_url && (
                        <img
                          src={libro.imagen_url}
                          alt="Portada del libro"
                          style={{ width: '100px', marginTop: '10px' }}
                        />
                      )}
                    </div>
                    <button className="btn btn-primary" onClick={() => handleSave(libro._id)}>
                      Guardar
                    </button>
                    <button className="btn btn-secondary ms-2" onClick={() => handleToggleEdit(libro._id)}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="card-body">
                    <p>Descripción: {libro.descripcion}</p>
                    <p>Género: {libro.genero}</p>
                    <p>Fecha de publicación: {new Date(libro.fecha_publicacion).toLocaleDateString()}</p>
                    <p>Disponibilidad: {libro.disponibilidad ? 'Disponible' : 'No disponible'}</p>
                    <p>Cantidad en stock: {libro.cantidad_stock}</p>
                    <p>Puntuación promedio: {libro.puntuacion_promedio}</p>
                    <p>Precio: ${libro.precio}</p>
                    {libro.imagen_url && (
                      <img
                        src={libro.imagen_url}
                        alt="Portada del libro"
                        style={{ width: '100px', marginTop: '10px' }}
                      />
                    )}
                    <button className="btn btn-primary mt-2" onClick={() => handleToggleEdit(libro._id)}>
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar Nuevo Libro</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newLibro.Titulo}
                      onChange={(e) => handleChangeNewLibro(e, 'Titulo')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Autor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newLibro.autor}
                      onChange={(e) => handleChangeNewLibro(e, 'autor')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      value={newLibro.descripcion}
                      onChange={(e) => handleChangeNewLibro(e, 'descripcion')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Género</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newLibro.genero}
                      onChange={(e) => handleChangeNewLibro(e, 'genero')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fecha de publicación</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newLibro.fecha_publicacion}
                      onChange={(e) => handleChangeNewLibro(e, 'fecha_publicacion')}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="disponibilidadCheckbox"
                      checked={newLibro.disponibilidad}
                      onChange={(e) => handleChangeNewLibro(e, 'disponibilidad')}
                    />
                    <label className="form-check-label" htmlFor="disponibilidadCheckbox">
                      Disponibilidad
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cantidad en stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newLibro.cantidad_stock}
                      onChange={(e) => handleChangeNewLibro(e, 'cantidad_stock')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Puntuación promedio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newLibro.puntuacion_promedio}
                      onChange={(e) => handleChangeNewLibro(e, 'puntuacion_promedio')}
                      step="0.1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newLibro.precio}
                      onChange={(e) => handleChangeNewLibro(e, 'precio')}
                      step="0.01"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChangeNewLibro}
                    />
                    {newLibro.imagen_url && (
                      <img
                        src={newLibro.imagen_url}
                        alt="Portada del libro"
                        style={{ width: '100px', marginTop: '10px' }}
                      />
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleAddNewLibro}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLibros;
