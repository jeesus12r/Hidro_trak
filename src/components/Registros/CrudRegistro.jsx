import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RegistroChart from "../Graficas/RegistroChart";
import CerrarSesion from "../../pages/CerrarSesion";





const CrudRegistro = () => {
  const [registros, setRegistros] = useState([]);
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener registros iniciales
    fetchRegistros();
  }, []);

  const fetchRegistros = () => {
    axios
      .get("http://localhost:3000/api/registros")
      .then((response) => {
        setRegistros(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al obtener registros:", err);
        setError("No se pudieron cargar los registros.");
      });
  };

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm) {
        axios
          .get(`http://localhost:3000/api/registros/buscar?termino=${searchTerm}`)
          .then((response) => {
            setRegistros(response.data);
            setError(null);
          })
          .catch((err) => {
            console.error("Error al buscar registros:", err);
            setError("No se pudieron realizar los resultados de la búsqueda.");
          });
      } else {
        fetchRegistros();
      }
    }, 500), // Debounce para limitar las solicitudes al servidor
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTermino(value);
    handleSearch(value);
  };

  // Función de debounce para limitar el número de solicitudes al servidor
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
          <Link to="/CrudConfiguracion"><button type="button" className="styled-button">Configuracion</button></Link>
          <Link to="/CrudDispocitivos"><button type="button" className="styled-button">Dispositivos</button></Link>
          <Link to="/CrudHistConsu"><button type="button" className="styled-button">Historial Consumo</button></Link>
          <Link to="/CrudRegistroM"><button type="button" className="styled-button">Registros Medida</button></Link>
          <Link to="/CrudRegistro"><button type="button" className="styled-button">Registros</button></Link>
          <Link to="/CrudSensores"><button type="button" className="styled-button">Sensores</button></Link>
          <Link to="/CUsuarios"><button type="button" className="styled-button">Usuarios</button></Link>
        </nav>
      </header>

      <div className="dev-dispositivo-container">
      <div style={{ textAlign: 'right' }}>
        <CerrarSesion />
      </div>
        <h2 className="dev-page-title">Gestión de Registros</h2>

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
                <th>Usuario ID</th>
                <th>Dispositivo ID</th>
                <th>Sensor ID</th>
                <th>Acción</th>
                <th>Fecha de Registro</th>
                <th>Detalles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.usuario_id}</td>
                  <td>{registro.dispositivo_id}</td>
                  <td>{registro.sensor_id}</td>
                  <td>{registro.accion}</td>
                  <td>{registro.fecha_registro}</td>
                  <td>{registro.detalles}</td>
                  <td>
                  <Link 
  to={`/EditarResgistro/${registro.id}`} 
  className="dev-btn dev-btn-edit" 
  title={`Editar registro con ID ${registro.id}`}
>
  <i className="dev-icon dev-icon-edit"></i> Editar
</Link>

                    <button className="dev-btn dev-btn-delete">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dev-chart-container">
  <RegistroChart registros={registros} />
</div>
      </div>
    </div>
  );
};

export default CrudRegistro;
