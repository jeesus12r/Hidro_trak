import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RegistroMChart from "../Graficas/RegistroMChart";
import CerrarSesion from "../../pages/CerrarSesion";

const CrudRegistroM = () => {
  const [mediciones, setMediciones] = useState([]);
  const [error, setError] = useState(null);
  const [termino, setTermino] = useState(""); 

  useEffect(() => {
    fetchMediciones(); 
  }, []);

  //api 
  const fetchMediciones = () => {
    axios
      .get("http://localhost:3000/api/registros_mediciones")
      .then((response) => {
        setMediciones(response.data); // Guardar los datos de las mediciones
        setError(null);
      })
      .catch((err) => {
        console.error("Error al obtener registros de mediciones:", err);
        setError("No se pudieron cargar los registros de mediciones.");
      });
  };

  
  const handleBuscar = (valor) => {
    if (valor === "") {
      fetchMediciones(); 
    } else {
      axios
        .get(`http://localhost:3000/api/registros_mediciones/buscar?termino=${valor}`)
        .then((response) => {
          setMediciones(response.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error en la búsqueda:", err);
          setError("No se pudo realizar la búsqueda. Por favor, inténtelo de nuevo.");
        });
    }
  };

  
  const handleChange = (e) => {
    const valor = e.target.value;
    setTermino(valor);
    handleBuscar(valor); 
  };

  // Eliminar un registro
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      axios
        .delete(`http://localhost:3000/api/registros_mediciones/${id}`)
        .then(() => {
          alert("Registro eliminado exitosamente.");
          setMediciones((prevMediciones) => prevMediciones.filter((m) => m.id !== id)); 
        })
        .catch((err) => console.error("Error al eliminar el registro:", err));
    }
  };

  return (
    <div>
      <header className="header">
        <a href="/" className="logo">
          <img
            src="/src/components/assets/System Tecnologic Penguins logo.png"
            alt="Logo"
            className="logo-image"
          />
        </a>
        <nav className="navbar">
          <Link to="/CrudAlertas">
            <button type="button" className="styled-button">Alertas</button>
          </Link>
          <Link to="/CrudConfiguracion">
            <button type="button" className="styled-button">Configuración</button>
          </Link>
          <Link to="/CrudDispocitivos">
            <button type="button" className="styled-button">Dispositivos</button>
          </Link>
          <Link to="/CrudHistConsu">
            <button type="button" className="styled-button">Historial Consumo</button>
          </Link>
          <Link to="/CrudRegistroM">
            <button type="button" className="styled-button">Registros Medida</button>
          </Link>
          <Link to="/CrudRegistro">
            <button type="button" className="styled-button">Registros</button>
          </Link>
          <Link to="/CrudSensores">
            <button type="button" className="styled-button">Sensores</button>
          </Link>
          <Link to="/CUsuarios">
            <button type="button" className="styled-button">Usuarios</button>
          </Link>
        </nav>
      </header>

      <div className="dev-dispositivo-container">
      <div style={{ textAlign: 'right' }}>
        <CerrarSesion />
      </div>
        
        <h2 className="dev-page-title">Gestión de Registros de Medida</h2>

        <div className="dev-search-container">
          
          <input
            type="text"
            className="dev-search-input"
            placeholder="Buscar por sensor, valor o calidad..."
            value={termino}
            onChange={handleChange} 
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="dev-table-responsive">
          <table className="dev-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sensor ID</th>
                <th>Valor</th>
                <th>Fecha de Registro</th>
                <th>Calidad del Dato</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mediciones.map((medicion) => (
                <tr key={medicion.id}>
                  <td>{medicion.id}</td>
                  <td>{medicion.sensor_id}</td>
                  <td>{medicion.valor}</td>
                  <td>{medicion.fecha_registro}</td>
                  <td>{medicion.calidad_dato}</td>
                  <td>
                  
                    <Link to={`/EditarRegistroM/${medicion.id}`}>
                      <button className="dev-btn dev-btn-edit">Editar</button>
                    </Link>
                    
                    <button
                      className="dev-btn dev-btn-delete"
                      onClick={() => handleDelete(medicion.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dev-chart-container">
          <RegistroMChart mediciones={mediciones} />
        </div>
      </div>
    </div>
  );
};

export default CrudRegistroM;
