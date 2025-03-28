import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HistorialChart from "../Graficas/HistorialChar";
import CerrarSesion from "../../pages/CerrarSesion";

const CrudHistConsu = () => {
  const [historial, setHistorial] = useState([]);
  const [termino, setTermino] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const registrosPerPage = 10;

  useEffect(() => {
    fetchHistorial();
  }, []);

  // Obtener historial de consumo
  const fetchHistorial = () => {
    axios
      .get("http://localhost:3000/api/historial_consumo")
      .then((response) => setHistorial(response.data))
      .catch((error) => console.error("Error al cargar los registros:", error));
  };

  // Buscar historial por término
  const handleSearch = useCallback(
    debounce((termino) => {
      if (termino) {
        axios
          .get(`http://localhost:3000/api/historial/buscar?termino=${termino}`)
          .then((response) => setHistorial(response.data))
          .catch((error) => console.error("Error al buscar:", error));
      } else {
        fetchHistorial();
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setTermino(value);
    handleSearch(value);
  };

  // Eliminar un registro
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      axios
        .delete(`http://localhost:3000/api/historial_consumo/${id}`)
        .then(() => {
          alert("Registro eliminado exitosamente.");
          fetchHistorial(); // Refrescar datos
        })
        .catch((error) => console.error("Error al eliminar el registro:", error));
    }
  };

  // Paginación
  const indexOfLastRecord = currentPage * registrosPerPage;
  const indexOfFirstRecord = indexOfLastRecord - registrosPerPage;
  const currentHistorial = historial.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(historial.length / registrosPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
          <Link to="/CrudAlertas"><button type="button" className="styled-button">Alertas</button></Link>
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
        <div className="dev-header-actions">
          <h2 className="dev-page-title">Gestión de Historial de Consumo</h2>
        </div>
        <div className="dev-search-container">
          <input
            type="text"
            className="dev-search-input"
            placeholder="Buscar por usuario, dispositivo, consumo, periodo..."
            value={termino}
            onChange={handleChange}
          />
        </div>
        <div className="dev-table-responsive">
          <table className="dev-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario ID</th>
                <th>Dispositivo ID</th>
                <th>Consumo</th>
                <th>Periodo</th>
                <th>Fecha Registro</th>
                <th>Comentarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentHistorial.length > 0 ? (
                currentHistorial.map((registro) => (
                  <tr key={registro.id}>
                    <td>{registro.id}</td>
                    <td>{registro.usuario_id}</td>
                    <td>{registro.dispositivo_id}</td>
                    <td>{registro.consumo}</td>
                    <td>{registro.periodo}</td>
                    <td>{registro.fecha_registro}</td>
                    <td>{registro.comentarios}</td>
                    <td>
                      <Link to={`/Editar_Historial/${registro.id}`}>
                        <button className="dev-btn dev-btn-edit">Editar</button>
                      </Link>
                      <button className="dev-btn dev-btn-delete" onClick={() => handleDelete(registro.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No hay registros disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="dev-pagination">
          <button className="dev-btn dev-btn-secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button className="dev-btn dev-btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
        <div className="dev-chart-container">
          <HistorialChart historial={historial} />
        </div>
      </div>
    </div>
  );
};

export default CrudHistConsu;
