import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './MyNavBar';
//import { set } from 'mongoose';

const UserReview = () => {
    const [books, setBooks] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false); //Para mostrar el fromulario añadir reseña
    const [showModalReviews, setShowModalReviews] = useState(false); //Para mostrar las reseñas
    const [singleReview, setSingleReview] = useState({
      IdUser: '',
      IdBook: '',
      review: '',
      rating: 0,
    });
    const [currentBook, setCurrentBook] = useState({});//[{}

    //Guardo el id del usuario en el estado singleReview
    useEffect(() => {
      setSingleReview(prevstate => ({...prevstate, IdUser: localStorage.getItem('uid')}));
    }, []);

    // Listado de libros 
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

      // Listado de reseñas para un libro específico
      const handleGetReviews = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/api/reviews/${id}`);
          if (!response.ok) {
           alert('Error al obtener reseñas');
           throw new Error('Error al obtener reseñas');
          }
          //setShowModalReviews(true);
          const data = await response.json();
          setReviews(data.reviews);
        } catch (error) {
          alert('Error al obtener reseñas');
          console.error('Error al obtener las reseñas', error);
        }
      }
  
      // Nueva Reseña
      // Guardar la nueva reseña
      const handleSaveReview = async () => {
        try {
          //
          //alert("POST: user:"+ singleReview.IdUser+" book:"+ singleReview.IdBook+" review:"+singleReview.review+" rating:"+singleReview.rating);
          const response = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(singleReview),
          });
    
          if (!response.ok) {
            throw new Error('Error al agregar el libro');
          }
    
          setShowModal(false);
          // Reiniciar la variable excepto el id del usuario
          setSingleReview(prevstate => ({...prevstate,
            IdBook: '',
            review: '',
            rating: 0,
          }));
        } catch (error) {
          console.error('Error al agregar el libro', error);
        }
      };

      //  Para guardar los datos del fromulario
      const handleAddReview = (e,field) => {
        setSingleReview({ ...singleReview, [field]: e.target.value });
      }

  return (
    <div>
       <NavBar />
      <div className="container">
        <h2 className="my-4">Reseñas</h2>
        {/* Agregar buscar libros */}
        {books.map((libro, index) => {
          
          return (
            <div key={libro._id} className="card mb-3">
              <div class="row g-0">
                <div class="col-md-2">
                  {libro.imagen_url && (
                    <img
                      class="img-fluid rounded-start"
                      src={libro.imagen_url}
                      alt="Portada del libro"
                      style={{ width: '100px', margin: '10px' }}
                    />
                  )}
                </div>
                <div class="col-md-8">

                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">{libro.Titulo}</h5>
                      <p className="card-text"><b>Autor:</b> {libro.autor}
                        <br /><b>Descripción:</b> {libro.descripcion}
                        <br /><b>Puntuación:</b> {libro.puntuacion_promedio}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          handleGetReviews(libro._id);setShowModalReviews(true);
                        }}
                      >
                        Ver Reseñas
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => {setShowModal(true);
                            setSingleReview(prevstate => ({...prevstate  ,IdBook: libro._id}));
                        }}
                      >
                        Añadir reseña
                      </button>
                    </div>
                  </div>

                </div>
                
              </div>
            </div>
          );
        })}
        {/*Formularo para agregar reseña*/}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar reseña</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Clasificación</label>
                    <input
                      type="number"
                      className="form-control"
                      value={singleReview.rating}
                      onChange={(e) => handleAddReview(e, 'rating')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Reseña</label>
                    <input
                      type="text"
                      className="form-control"
                      value={singleReview.review}
                      onChange={(e) => handleAddReview(e, 'review')}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary" 
                  onClick={handleSaveReview}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/*Mostrar Reseñas*/}
        {showModalReviews && (
          <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Opiniones</h5>
                <button type="button" className="btn-close" onClick={() => setShowModalReviews(false)}></button>
              </div>
              <div className="modal-body">
                {reviews.map((review, index) => {
                  return (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <p>Reseña: {review.review}</p>
                        <p>Clasificación: {review.rating}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalReviews(false)}>
                  Cancelar
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

export default UserReview
