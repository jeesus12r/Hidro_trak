import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SensorChart from "../Graficas/SensorChart"; 
import CerrarSesion from "../../pages/CerrarSesion";

const CrudSensores = () => {
  const [sensores, setSensores] = useState([]);
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSensores();
  }, []);

  const fetchSensores = () => {
    axios
      .get("http://localhost:3000/api/sensores")
      .then((response) => {
        setSensores(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al obtener sensores:", err);
        setError("No se pudieron cargar los sensores.");
      });
  };

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm) {
        axios
          .get(`http://localhost:3000/api/sensores/buscar?termino=${searchTerm}`)
          .then((response) => {
            setSensores(response.data);
            setError(null);
          })
          .catch((err) => {
            console.error("Error al buscar sensores:", err);
            setError("No se pudieron realizar los resultados de la búsqueda.");
          });
      } else {
        fetchSensores();
      }
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTermino(value);
    handleSearch(value);
  };

  const handleDeleteSensor = (id) => {
    axios
      .delete(`http://localhost:3000/api/sensores/${id}`)
      .then(() => {
        fetchSensores();
        alert("Sensor eliminado con éxito.");
      })
      .catch((err) => {
        console.error("Error al eliminar el sensor:", err);
        alert("Hubo un problema al eliminar el sensor.");
      });
  };

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <div>
      <header className="header">
        <a href="/" className="logo">
          <img src="/src/components/assets/System Tecnologic Penguins logo.png" alt="Logo" className="logo-image" />
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
        <div className="dev-header-actions">
          <h2 className="dev-page-title">Gestión de Sensores</h2>
        </div>

        <div className="dev-search-container">
          <input
            type="text"
            className="dev-search-input"
            placeholder="Buscar por cualquier campo..."
            value={termino}
            onChange={handleInputChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="dev-table-responsive">
          <table className="dev-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Unidad de Medida</th>
                <th>Rango Mín</th>
                <th>Rango Máx</th>
                <th>Dispositivo ID</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sensores.map((sensor) => (
                <tr key={sensor.id}>
                  <td>{sensor.id}</td>
                  <td>{sensor.tipo}</td>
                  <td>{sensor.unidad_medida}</td>
                  <td>{sensor.rango_min}</td>
                  <td>{sensor.rango_max}</td>
                  <td>{sensor.dispositivo_id}</td>
                  <td className="dev-actions">

                  <Link to={`/EdithSensor/${sensor.id}`} className="dev-btn dev-btn-edit" title={`Editar sensor con ID ${sensor.id}`}> <i className="dev-icon dev-icon-edit"></i> Editar</Link>


                    <button onClick={() => handleDeleteSensor(sensor.id)} className="dev-btn dev-btn-delete">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sensores.length > 0 && (
          <div className="dev-chart-container">
            <SensorChart sensores={sensores} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CrudSensores;
