import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DispositivoChart from "../Graficas/DispositivoChart"; 
import CerrarSesion from "../../pages/CerrarSesion";

const CrudDispocitivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [termino, setTermino] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDispositivos();
  }, []);

  // Formatear fecha para cumplir con el formato "yyyy-MM-dd"
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""; // Manejar valores vacíos
    try {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Extraer solo "yyyy-MM-dd"
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return ""; // Retornar cadena vacía si hay error
    }
  };

  // Obtener dispositivos
  const fetchDispositivos = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/api/dispositivos")
      .then((response) => {
        const dispositivosFormateados = response.data.map((dispositivo) => ({
          ...dispositivo,
          fecha_instalacion: formatDateForInput(dispositivo.fecha_instalacion), // Formatear fecha
        }));
        setDispositivos(dispositivosFormateados);
        setError(null);
      })
      .catch((error) => {
        console.error("Error al cargar dispositivos:", error);
        setError("No se pudieron cargar los dispositivos. Por favor, inténtelo de nuevo.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Función para buscar dispositivos dinámicamente
  const handleBuscar = (termino) => {
    if (termino === "") {
      fetchDispositivos(); // Si no hay término, cargar todos los dispositivos
    } else {
      setIsLoading(true);
      axios
        .get(`http://localhost:3000/api/dispositivos/buscar?termino=${termino}`)
        .then((response) => {
          const dispositivosFormateados = response.data.map((dispositivo) => ({
            ...dispositivo,
            fecha_instalacion: formatDateForInput(dispositivo.fecha_instalacion), // Formatear fecha
          }));
          setDispositivos(dispositivosFormateados);
          setError(null);
        })
        .catch((error) => {
          console.error("Error en la búsqueda:", error);
          setError("No se pudo realizar la búsqueda. Por favor, inténtelo de nuevo.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Manejar cambios en el input y buscar automáticamente
  const handleChange = (e) => {
    const valor = e.target.value;
    setTermino(valor);
    handleBuscar(valor); // Llama automáticamente a la búsqueda al escribir
  };

  // Manejar la eliminación de dispositivos
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) {
      axios
        .delete(`http://localhost:3000/api/dispositivos/${id}`)
        .then(() => {
          alert("Dispositivo eliminado exitosamente.");
          setDispositivos((prevDispositivos) =>
            prevDispositivos.filter((dispositivo) => dispositivo.id !== id)
          );
        })
        .catch((error) => {
          console.error("Error al eliminar dispositivo:", error);
          setError("No se pudo eliminar el dispositivo.");
        });
    }
  };

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
                  <button type="button" className="styled-button">Configuracion</button>
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
          <h2 className="dev-page-title">Gestión de Dispositivos</h2>
        </div>

        <div className="dev-search-container">
          <div className="dev-search-box">
            <input
              type="text"
              className="dev-search-input"
              placeholder="Buscar por nombre, tipo o ubicación..."
              value={termino}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <div className="dev-error-message">{error}</div>}

        {isLoading ? (
          <div className="dev-loading">Cargando dispositivos...</div>
        ) : (
          <>
            {dispositivos.length === 0 ? (
              <div className="dev-empty-state">
                No se encontraron dispositivos. Intente con otro término de búsqueda.
              </div>
            ) : (
              <div className="dev-table-responsive">
                <table className="dev-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Ubicación</th>
                      <th>Estado</th>
                      <th>Usuario ID</th>
                      <th>Fecha de Instalación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispositivos.map((dispositivo) => (
                      <tr key={dispositivo.id}>
                        <td>{dispositivo.id}</td>
                        <td>{dispositivo.nombre}</td>
                        <td>{dispositivo.tipo}</td>
                        <td>{dispositivo.ubicacion}</td>
                        <td>
                          <span className={`dev-status dev-status-${dispositivo.estado.toLowerCase()}`}>
                            {dispositivo.estado}
                          </span>
                        </td>
                        <td>{dispositivo.usuario_id}</td>
                        <td>{dispositivo.fecha_instalacion}</td>
                        <td className="dev-actions">
                          <Link
                            to={`/EditarDispocitivo/${dispositivo.id}`}
                            className="dev-btn dev-btn-edit"
                            title="Editar dispositivo"
                          >
                            <i className="dev-icon dev-icon-edit"></i> Editar
                          </Link>
                          <button
                            className="dev-btn dev-btn-delete"
                            onClick={() => handleDelete(dispositivo.id)}
                            title="Eliminar dispositivo"
                          >
                            <i className="dev-icon dev-icon-delete"></i> Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Componente para las gráficas */}
            <div className="dev-chart-container">
              <DispositivoChart dispositivos={dispositivos} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CrudDispocitivos;
