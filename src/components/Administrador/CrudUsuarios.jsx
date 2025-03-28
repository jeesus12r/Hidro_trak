import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserChart from "../Graficas/UserChart"; // Asegúrate de que la ruta sea correcta
import CerrarSesion from "../../pages/CerrarSesion";

const CrudUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [termino, setTermino] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usuariosPerPage = 10;
  const [file, setFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    axios
      .get("http://localhost:3000/api/Users")
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error(error));
  };

  const handleSearch = useCallback(
    debounce((termino) => {
      if (termino) {
        axios
          .get(`http://localhost:3000/api/Users/buscar?termino=${termino}`)
          .then((response) => setUsuarios(response.data))
          .catch((error) => console.error(error));
      } else {
        fetchUsuarios();
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setTermino(value);
    handleSearch(value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setFile(selectedFile);
    } else {
      alert("Por favor, selecciona un archivo Excel válido.");
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost:3000/api/upload-excel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setUploadResponse(response.data);
          fetchUsuarios(); // Refrescar la lista de usuarios después de la carga
          alert("Archivo cargado exitosamente y procesado.");
        })
        .catch((error) => {
          console.error("Error al subir el archivo:", error);
          alert("Error al subir el archivo. Por favor, intenta de nuevo.");
        });
    } else {
      alert("Por favor, selecciona un archivo primero.");
    }
  };

  const indexOfLastUser = currentPage * usuariosPerPage;
  const indexOfFirstUser = indexOfLastUser - usuariosPerPage;
  const currentUsuarios = usuarios.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(usuarios.length / usuariosPerPage);

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
          <h2 className="dev-page-title">Gestión de Usuarios</h2>
        </div>
  
        <div className="dev-search-container">
          <input
            type="text"
            className="dev-search-input"
            placeholder="Buscar por nombre, email o teléfono..."
            value={termino}
            onChange={handleChange}
          />
        </div>
  
        <div className="dev-file-upload">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload} className="dev-btn dev-btn-primary">Subir Excel</button>
        </div>
  
        {uploadResponse && (
          <div className="dev-upload-response">
            <h3>Resultado de la carga:</h3>
            <p>{uploadResponse.message}</p>
          </div>
        )}
  
        <div className="dev-table-responsive">
          <table className="dev-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha</th>
                <th>Activo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.direccion_completa}</td>
                  <td>{usuario.fecha_registro}</td>
                  <td>{usuario.activo ? 'Si' : 'No'}</td>
                  <td>{usuario.rol}</td>
                  <td className="dev-actions">
                    <Link to={`/EDUsuarios/${usuario.id}`} className="dev-btn dev-btn-edit" title="Editar usuario">
                      <i className="dev-icon dev-icon-edit"></i> Editar
                    </Link>
                    <button className="dev-btn dev-btn-delete" title="Eliminar usuario">
                      <i className="dev-icon dev-icon-delete"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="dev-pagination">
          <button className="dev-btn dev-btn-secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            {currentPage} de {totalPages}
          </span>
          <button className="dev-btn dev-btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
  
        {usuarios.length > 0 && (
          <div className="dev-chart-container">
            <h3>Distribución de Usuarios por Rol</h3>
            <UserChart usuarios={usuarios} />
          </div>
        )}
      </div>
    </div>
  );
  
};

export default CrudUsuarios;
