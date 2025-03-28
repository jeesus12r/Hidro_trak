import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfiguracionChart from "../Graficas/ConfiguracionChart"; 
import CerrarSesion from "../../pages/CerrarSesion";

const CrudConfiguracion = () => {
  const [configuraciones, setConfiguraciones] = useState([]);
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Indicador de carga

  useEffect(() => {
    fetchConfiguraciones();
  }, []);

  // Obtener todas las configuraciones
  const fetchConfiguraciones = () => {
    setIsLoading(true); // Mostrar indicador de carga
    axios
      .get("http://localhost:3000/api/configuraciones")
      .then((response) => {
        setConfiguraciones(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al cargar configuraciones:", err);
        setError("No se pudieron cargar las configuraciones.");
      })
      .finally(() => {
        setIsLoading(false); // Ocultar indicador de carga
      });
  };

  // Buscar configuraciones dinámicamente
  const handleBuscar = (valor) => {
    setIsLoading(true); // Mostrar indicador de carga
    if (valor === "") {
      fetchConfiguraciones(); // Si el término está vacío, obtener todas las configuraciones
    } else {
      axios
        .get(`http://localhost:3000/api/configuraciones/buscar?termino=${valor}`)
        .then((response) => {
          setConfiguraciones(response.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error al buscar configuraciones:", err);
          if (err.response?.status === 404) {
            setError("No se encontraron configuraciones para este término de búsqueda.");
          } else {
            setError("No se pudo realizar la búsqueda. Por favor, inténtelo de nuevo.");
          }
        })
        .finally(() => {
          setIsLoading(false); // Ocultar indicador de carga
        });
    }
  };

  // Manejar cambios en el input de búsqueda
  const handleChange = (e) => {
    const valor = e.target.value;
    setTermino(valor);
    handleBuscar(valor); // Buscar automáticamente mientras se escribe
  };

  // Eliminar una configuración
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta configuración?")) {
      axios
        .delete(`http://localhost:3000/api/configuraciones/${id}`)
        .then(() => {
          alert("Configuración eliminada exitosamente.");
          setConfiguraciones((prevConfiguraciones) =>
            prevConfiguraciones.filter((c) => c.id !== id)
          ); // Actualizar la lista localmente
        })
        .catch((err) => {
          console.error("Error al eliminar configuración:", err);
          setError("No se pudo eliminar la configuración. Por favor, inténtelo de nuevo.");
        });
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

        <h2 className="dev-page-title">Gestión de Configuraciones</h2>

        <div className="dev-search-container">
          {/* Campo de búsqueda */}
          <input
            type="text"
            className="dev-search-input"
            placeholder="Buscar por clave, valor o descripción..."
            value={termino}
            onChange={handleChange} // Búsqueda dinámica
          />
        </div>

        {isLoading ? (
          <p className="dev-loading">Cargando configuraciones...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="dev-table-responsive">
            <table className="dev-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Clave</th>
                  <th>Valor</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {configuraciones.map((configuracion) => (
                  <tr key={configuracion.id}>
                    <td>{configuracion.id}</td>
                    <td>{configuracion.clave}</td>
                    <td>{configuracion.valor}</td>
                    <td>{configuracion.descripcion}</td>
                    <td>
                      <Link to={`/EditarConfiguracion/${configuracion.id}`}>
                        <button className="dev-btn dev-btn-edit">Editar</button>
                      </Link>
                      <button
                        className="dev-btn dev-btn-delete"
                        onClick={() => handleDelete(configuracion.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="dev-chart-container">
          <ConfiguracionChart configuraciones={configuraciones} />
        </div>
      </div>
    </div>
  );
};

export default CrudConfiguracion;
