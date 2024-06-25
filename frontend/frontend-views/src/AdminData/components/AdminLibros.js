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
    const fetchLibros = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (!response.ok) {
          throw new Error('Error al obtener los libros');
        }
        const data = await response.json();
        setLibros(data);
      } catch (error) {
        console.error('Error al obtener los libros', error);
      }
    };

    fetchLibros();
  }, []);

  const handleToggleEdit = (libroId) => {
    setEditableLibro(editableLibro === libroId ? null : libroId);
  };

  const handleChange = (e, libroId, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLibros((prevLibros) =>
      prevLibros.map((libro) =>
        libro.id === libroId ? { ...libro, [field]: value } : libro
      )
    );
  };

  const handleFileChange = (e, libroId) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setLibros((prevLibros) =>
        prevLibros.map((libro) =>
          libro.id === libroId ? { ...libro, imagen_url: reader.result } : libro
        )
      );
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (libroId) => {
    const libroToUpdate = libros.find((libro) => libro.id === libroId);
    try {
      // Verificar si se seleccionó una nueva imagen
      //if (!libroToUpdate.imagen_url.startsWith('data:image')) {
        //libroToUpdate.imagen_url = null; // Establecer imagen_url como null si no se seleccionó una nueva imagen
      //}

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

      setEditableLibro(null);
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

      setLibros((prevLibros) => prevLibros.filter((libro) => libro.id !== libroId));
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
      setNewLibro({ ...newLibro, imagen_url: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewLibro = async () => {
    try {
      console.log('Enviando nuevo libro:', newLibro); // Log para verificar datos
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLibro),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtener texto de error del servidor
        throw new Error(`Error al agregar el libro: ${errorText}`);
      }

      const addedLibro = await response.json();
      setLibros([...libros, addedLibro]);
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
          const isExpanded = expandedLibro === libro.id;
          const isEditable = editableLibro === libro.id;
          const collapseId = `collapse${index + 1}`;

          return (
            <div key={libro.id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{libro.Titulo}</h5>
                  <p className="card-text">Autor: {libro.autor}</p>
                  <p className="card-text">Stock: {libro.cantidad_stock}</p>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => toggleAccordion(libro.id)}
                    aria-expanded={isExpanded}
                    aria-controls={collapseId}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(libro.id)}
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
                        onChange={(e) => handleChange(e, libro.id, 'Titulo')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Autor</label>
                      <input
                        type="text"
                        className="form-control"
                        value={libro.autor}
                        onChange={(e) => handleChange(e, libro.id, 'autor')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        value={libro.descripcion}
                        onChange={(e) => handleChange(e, libro.id, 'descripcion')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Género</label>
                      <input
                        type="text"
                        className="form-control"
                        value={libro.genero}
                        onChange={(e) => handleChange(e, libro.id, 'genero')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Fecha de publicación</label>
                      <input
                        type="date"
                        className="form-control"
                        value={libro.fecha_publicacion}
                        onChange={(e) => handleChange(e, libro.id, 'fecha_publicacion')}
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`disponibilidadCheckbox_${libro.id}`}
                        checked={libro.disponibilidad}
                        onChange={(e) => handleChange(e, libro.id, 'disponibilidad')}
                      />
                      <label className="form-check-label" htmlFor={`disponibilidadCheckbox_${libro.id}`}>
                        Disponibilidad
                      </label>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cantidad en stock</label>
                      <input
                        type="number"
                        className="form-control"
                        value={libro.cantidad_stock}
                        onChange={(e) => handleChange(e, libro.id, 'cantidad_stock')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Puntuación promedio</label>
                      <input
                        type="number"
                        step="0.1"
                        className="form-control"
                        value={libro.puntuacion_promedio}
                        onChange={(e) => handleChange(e, libro.id, 'puntuacion_promedio')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={libro.precio}
                        onChange={(e) => handleChange(e, libro.id, 'precio')}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Imagen</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(e, libro.id)}
                      />
                    </div>
                    <button
                      className="btn btn-success"
                      onClick={() => handleSave(libro.id)}
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div className="card-body">
                    <p><strong>Descripción:</strong> {libro.descripcion}</p>
                    <p><strong>Género:</strong> {libro.genero}</p>
                    <p><strong>Fecha de publicación:</strong> {libro.fecha_publicacion}</p>
                    <p><strong>Disponibilidad:</strong> {libro.disponibilidad ? 'Sí' : 'No'}</p>
                    <p><strong>Stock:</strong> {libro.cantidad_stock}</p>
                    <p><strong>Puntuación promedio:</strong> {libro.puntuacion_promedio}</p>
                    <p><strong>Precio:</strong> ${libro.precio}</p>
                    <p><strong>Imagen:</strong> <img src={libro.imagen_url} alt="Imagen del libro" style={{ width: '100px' }} /></p>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleToggleEdit(libro.id)}
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </div>
        );
      })}

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nuevo Libro</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
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
                    step="0.1"
                    className="form-control"
                    value={newLibro.puntuacion_promedio}
                    onChange={(e) => handleChangeNewLibro(e, 'puntuacion_promedio')}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={newLibro.precio}
                    onChange={(e) => handleChangeNewLibro(e, 'precio')}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChangeNewLibro}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleAddNewLibro}>Guardar</button>
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

export default AdminLibros;
