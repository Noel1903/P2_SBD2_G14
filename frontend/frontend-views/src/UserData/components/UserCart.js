import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './MyNavBar';

const UserCart = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [expandedLibro, setExpandedLibro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentType, setPaymentType] = useState('Credit Card');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setUserId(localStorage.getItem('uid'));
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener el carrito');
        }
        const data = await response.json();
        setCart(data.cart);
        let cartBooks = [];
        for (let bookInCart of data.cart) {
          const bookResponse = await fetch(`http://localhost:5000/api/books/${bookInCart.idBook}`);
          if (!bookResponse.ok) {
            throw new Error('Error al obtener el libro');
          }
          const bookData = await bookResponse.json();
          bookData.book.cartId = bookInCart.idItem;
          bookData.book.cartQuantity = bookInCart.quantity;
          cartBooks.push(bookData.book);
        }
        setBooks(cartBooks);
        calculateTotalPrice(cartBooks);
      } catch (error) {
        console.error('Error al obtener el carrito', error);
      }
    };
    fetchCart();
  }, [userId]);

  const calculateTotalPrice = (cartBooks) => {
    const total = cartBooks.reduce((acc, book) => acc + book.precio * book.cartQuantity, 0);
    setTotalPrice(total);
  };

  const toggleAccordion = (libroId) => {
    setExpandedLibro(expandedLibro === libroId ? null : libroId);
  };

  const handleRemoveBook = (bookId) => {
    const removeBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cart/${bookId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el libro');
        }
        const updatedBooks = books.filter(book => book.cartId !== bookId);
        setBooks(updatedBooks);
        setCart(cart.filter(book => book.idBook !== bookId));
        calculateTotalPrice(updatedBooks);
      } catch (error) {
        console.error('Error al eliminar el libro', error);
      }
    };
    removeBook();
  };

  const handlePlaceOrder = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = async () => {
    try {
      console.log(JSON.stringify({
        userId: userId,
        cart: cart.map(book => book.idItem),
        totalQuantity: cart.reduce((acc, book) => acc + book.quantity, 0),
        totalPrice: totalPrice,
        address: address,
        payment: paymentType,
        status: 0,
      }));
      const response = await fetch('http://localhost:5000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          cart: cart.map(book => book.idItem),
          totalQuantity: cart.reduce((acc, book) => acc + book.quantity, 0),
          totalPrice: totalPrice,
          address: address,
          payment: paymentType,
          status: 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar la compra');
      }
      setCart([]);
      setBooks([]);
      setTotalPrice(0);
      setShowConfirmModal(false);
      alert('Su pedido se ha enviado correctamente');
    } catch (error) {
      console.error('Error al realizar la compra', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="my-4">Carrito de compra</h2>
        {books.map((libro, index) => {
          const isExpanded = expandedLibro === libro._id;
          const collapseId = `collapse${index + 1}`;

          return (
            <div key={libro.cartId} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{libro.Titulo}</h5>
                  <p className="card-text">Autor: {libro.autor}</p>
                  <p className="card-text">Cantidad: {libro.cartQuantity}</p>
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
                    className="btn btn btn-danger"
                    onClick={() => handleRemoveBook(libro.cartId)}
                  >
                    Eliminar del carrito
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
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
          <button className="btn btn-success" onClick={handlePlaceOrder}>
            Ordenar
          </button>
        </div>

        {showConfirmModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar Compra</h5>
                  <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tipo de Pago</label>
                    <select
                      className="form-control"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                      <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Paypal">Paypal</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleConfirmOrder}>
                    Confirmar Compra
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

export default UserCart;
