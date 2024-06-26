import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './MyNavBar';

const UserBooks = () => {
    const [books, setBooks] = useState([]);
    const [expandedLibro, setExpandedLibro] = useState(null);
    const [showModal, setShowModal] = useState(false); //Para mostrar el fromulario añadir carrito
    const [addToCart, setAddToCart] = useState({
        userId: '',
        book: '',
        quantity: 0,
    });
    

    useEffect(() => {
        const fetchLibros = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/books');
            if (!response.ok) {
              throw new Error('Error al obtener listado de libros');
            }
            const data = await response.json();
            setBooks(data.books);
          } catch (error) {
            alert('Error al obtener listado de libros');
            console.error('Error al obtener los libros', error);
          }
        };
    
        fetchLibros();
      }, []);

      const toggleAccordion = (libroId) => {
        setExpandedLibro(expandedLibro === libroId ? null : libroId);
      };
      const handleAddBook = (e,field) => {
        //const value = e.target.value;
        setAddToCart({ ...addToCart, [field]: e.target.value });
      };

      

      const handleSendToCart = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/books', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(addToCart),
          });
    
          if (!response.ok) {
            throw new Error('Error al agregar el libro');
          }
    
          setShowModal(false);
          setAddToCart({
            userId: '',
            book: '',
            quantity: 0,
            
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
        {/* Agregar buscar libros */}
        {books.map((libro, index) => {
          const isExpanded = expandedLibro === libro._id;
          //const isEditable = editableLibro === libro._id;
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
                    className="btn btn btn-warning"
                    onClick={() => {setShowModal(true);
                        setAddToCart({userId: '', book: libro._id, quantity: 0})
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
              <div id={collapseId} className={`collapse ${isExpanded ? 'show' : ''}`}>

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
                  </div>
              </div>
            </div>
          );
        })}

        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar al carrito</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      value={addToCart.quantity}
                      onChange={(e) => handleAddBook(e, 'quantity')}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSendToCart}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserBooks
