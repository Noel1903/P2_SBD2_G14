import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import NavBar from './MyNavBar';

const Report = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/top-books');
        if (!response.ok) {
          throw new Error('Error fetching the data');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="text-center">
          <h1 className="mb-4">Reporte</h1>
        </div>
        <div className="card shadow">
          <div className="card-body">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={books} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
