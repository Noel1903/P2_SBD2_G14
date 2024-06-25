import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import NavBar from './MyNavBar';

const Historial = () => {
  const [compras, setCompras] = useState([]);
  const [expandedCompra, setExpandedCompra] = useState(null); // Estado para controlar el acordeón

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/compras');
        if (!response.ok) {
          throw new Error('Error al obtener las compras');
        }
        const data = await response.json();
        setCompras(data);
      } catch (error) {
        console.error('Error fetching compras', error);
      }
    };

    fetchCompras();
  }, []);

  const handleChangeEstado = async (idCompra, nuevoEstado) => {
    try {
      const response = await fetch(`http://localhost:5000/api/compras/${idCompra}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ state: nuevoEstado })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado de la compra');
      }

      // Actualizar el estado local después de la actualización exitosa
      setCompras(prevCompras => 
        prevCompras.map(compraObject => {
          if (compraObject[idCompra]) {
            return {
              [idCompra]: {
                ...compraObject[idCompra],
                state: nuevoEstado
              }
            };
          }
          return compraObject;
        })
      );

      console.log(`Estado de compra ${idCompra} actualizado a ${nuevoEstado}`);
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
        {compras.map((compraObject, index) => {
          const compraKey = Object.keys(compraObject)[0];
          const { user, state, Libros } = compraObject[compraKey];
          const compraNumero = index + 1;
          const isExpanded = expandedCompra === compraNumero;
          const collapseId = `collapse${compraNumero}`;

          return (
            <div key={index} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Compra {compraNumero}</h5>
                  <p className="card-text">Usuario: {user}</p>
                  <p className="card-text">Estado: {state}</p>
                </div>
                <div className="d-flex align-items-center">
                  <select
                    className="form-select me-3"
                    value={state}
                    onChange={(e) => handleChangeEstado(compraKey, e.target.value)}
                  >
                    <option value="En Proceso">En Proceso</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregado">Entregado</option>
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
                  {Libros.map((libro, idx) => (
                    <li key={idx} className="list-group-item">{libro}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Historial;
