import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AlertasChart from "../Graficas/AlertasChart";
import CerrarSesion from "../../pages/CerrarSesion";

const CrudAlertas = () => {
  const [alertas, setAlertas] = useState([]);
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Indicador de carga

  useEffect(() => {
    fetchAlertas(); // Cargar alertas al montar el componente
  }, []);
  
  // Obtener todas las alertas
  const fetchAlertas = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/api/alertas")
      .then((response) => {
        setAlertas(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al cargar alertas:", err);
        setError("No se pudieron cargar las alertas.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Buscar alertas dinámicamente
  const handleBuscar = (valor) => {
    console.log(`URL generada: http://localhost:3000/api/alertas/buscar?termino=${valor}`);
    setIsLoading(true);
  
    if (valor === "") {
      fetchAlertas();
    } else {
      axios
        .get(`http://localhost:3000/api/alertas/buscar?termino=${valor}`)
        .then((response) => {
          setAlertas(response.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error al buscar alertas:", err);
          if (err.response?.status === 404) {
            setError("No se encontraron alertas para este término de búsqueda.");
          } else {
            setError("No se pudo realizar la búsqueda. Por favor, inténtelo de nuevo.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  

  // Manejar cambios en el input de búsqueda
  const handleChange = (e) => {
    const valor = e.target.value;
    setTermino(valor);
    handleBuscar(valor); // Buscar automáticamente mientras se escribe
  };

  // Eliminar una alerta
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta alerta?")) {
      axios
        .delete(`http://localhost:3000/api/alertas/${id}`)
        .then(() => {
          alert("Alerta eliminada exitosamente.");
          setAlertas((prevAlertas) => prevAlertas.filter((a) => a.id !== id)); // Actualizar localmente
        })
        .catch((err) => {
          console.error("Error al eliminar alerta:", err);
          setError("No se pudo eliminar la alerta. Por favor, inténtelo de nuevo.");
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

      <div className="dev-alertas-container">
        <div style={{ textAlign: 'right' }}>
          <CerrarSesion />
        </div>

        <h2 className="dev-page-title">Gestión de Alertas</h2>

        <div className="dev-search-container">
          <input
            type="text"
            className="dev-search-input"
            placeholder="Buscar por cualquier campo..."
            value={termino}
            onChange={handleChange} // Buscar automáticamente al escribir
          />
        </div>

        {isLoading ? (
          <p className="dev-loading">Cargando alertas...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="dev-table-responsive">
            <table className="dev-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario ID</th>
                  <th>Dispositivo ID</th>
                  <th>Sensor ID</th>
                  <th>Mensaje</th>
                  <th>Tipo de Alerta</th>
                  <th>Prioridad</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alertas.map((alerta) => (
                  <tr key={alerta.id}>
                    <td>{alerta.id}</td>
                    <td>{alerta.usuario_id}</td>
                    <td>{alerta.dispositivo_id}</td>
                    <td>{alerta.sensor_id}</td>
                    <td>{alerta.mensaje}</td>
                    <td>{alerta.tipo_alerta}</td>
                    <td>{alerta.prioridad}</td>
                    <td>{alerta.fecha_registro}</td>
                    <td>
                      <Link to={`/EditarAlertas/${alerta.id}`}>
                        <button className="dev-btn dev-btn-edit">Editar</button>
                      </Link>
                      <button
                        className="dev-btn dev-btn-delete"
                        onClick={() => handleDelete(alerta.id)}
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
          <AlertasChart alertas={alertas} />
        </div>
      </div>
    </div>
  );
};

export default CrudAlertas;
