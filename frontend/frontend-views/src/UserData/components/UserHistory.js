import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './MyNavBar';

const UserHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(localStorage.getItem('uid'));
  }, []);

  useEffect(() => {
    const getPurchases = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/purchases/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener el historial de compras');
        }
        const data = await response.json();
        setPurchases(data.ListPurchases);
      } catch (error) {
        console.error('Error al obtener el historial de compras', error);
      }
    };
    getPurchases();
  }, [userId]);

  const handleMarkAsReceived = async (purchaseId) => {
    console.log(purchaseId);
    try {
      const response = await fetch(`http://localhost:5000/api/purchases`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: purchaseId, status: 2 }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado de la compra');
      }
      setPurchases(purchases.map(purchase => 
        purchase.id === purchaseId ? { ...purchase, status: 2 } : purchase
      ));
    } catch (error) {
      console.error('Error al actualizar el estado de la compra', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="my-4">Historial de Compras</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Total de Libros</th>
              <th>Total Precio</th>
              <th>Dirección</th>
              <th>Pago</th>
              <th>Estado</th>
              <th>Libros</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.id}</td>
                <td>{purchase.totalQuantity}</td>
                <td>${purchase.totalPrice.toFixed(2)}</td>
                <td>{purchase.address}</td>
                <td>{purchase.payment}</td>
                <td>{purchase.status === 0 ? 'Pendiente' : 'Completado'}</td>
                <td>
                  <ul>
                    {purchase.cart.map((item) => (
                      <li key={item.idBook}>{item.book}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {purchase.status === 0 ? (
                    'En proceso'
                  ) : (
                    purchase.status === 1 ? (
                      <button 
                        className="btn btn-success"
                        onClick={() => handleMarkAsReceived(purchase.id)}
                      >
                        Recibido
                      </button>
                    ) : 
                    'Completado'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHistory;
