import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import NavBar from './MyNavBar';

const Historial = () => {
  const [compras, setCompras] = useState([]);
  const [expandedCompra, setExpandedCompra] = useState(null); // Estado para controlar el acordeón

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/purchases');
        if (!response.ok) {
          throw new Error('Error al obtener las compras');
        }
        const data = await response.json();
        setCompras(data.purchases);
      } catch (error) {
        console.error('Error fetching compras', error);
      }
    };

    fetchCompras();
  }, []);

  const handleChangeEstado = async (idCompra, nuevoEstado) => {
    try {
      const response = await fetch(`http://localhost:5000/api/purchases`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: idCompra, status: nuevoEstado })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado de la compra');
      }

      // Actualizar el estado local después de la actualización exitosa
      const updatedCompras = compras.map(compra => {
        if (compra._id === idCompra) {
          return { ...compra, status: nuevoEstado };
        }
        return compra;
      });
      setCompras(updatedCompras);

      //console.log(`Estado de compra ${idCompra} actualizado a ${nuevoEstado}`);
    } catch (error) {
      console.error('Error updating compra', error);
    }
  };

  const toggleAccordion = (compraNumero) => {
    setExpandedCompra(expandedCompra === compraNumero ? null : compraNumero);
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="my-4">Historial de Compras</h2>
        {compras.map((compra, index) => {
          const compraNumero = index + 1;
          const isExpanded = expandedCompra === compraNumero;
          const collapseId = `collapse${compraNumero}`;

          return (
            <div key={compra._id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Compra {compraNumero}</h5>
                  <p className="card-text">Usuario: {compra.userId}</p>
                  <p className="card-text">Estado: {compra.status}</p>
                </div>
                <div className="d-flex align-items-center">
                  <select
                    className="form-select me-3"
                    value={compra.status}
                    onChange={(e) => handleChangeEstado(compra._id, e.target.value)}
                  >
                    <option value={0}>En Proceso</option>
                    <option value={1}>Enviado</option>
                    <option value={2}>Entregado</option>
                  </select>
                  <button
                    className="btn btn-primary"
                    onClick={() => toggleAccordion(compraNumero)}
                    aria-expanded={isExpanded}
                    aria-controls={collapseId}
                  >
                    +
                  </button>
                </div>
              </div>
              <div id={collapseId} className={`collapse ${isExpanded ? 'show' : ''}`}>
                <ul className="list-group list-group-flush">
                  {compra.cart.map((item, idx) => (
                    <li key={item._id} className="list-group-item">
                      {item.name} - Cantidad: {item.quantity}
                    </li>
                  ))}
                </ul>
                <div className="card-body">
                  <p>Total de productos: {compra.totalQuantity}</p>
                  <p>Total a pagar: {compra.totalPrice}</p>
                  <p>Dirección de envío: {compra.address}</p>
                  <p>Método de pago: {compra.payment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Historial;
