import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarDispocitivo = () => {
  const { id } = useParams(); // Obtener el ID del dispositivo desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar o cancelar
  const [dispositivo, setDispositivo] = useState({
    nombre: "",
    tipo: "",
    ubicacion: "",
    estado: "",
    usuario_id: "",
    fecha_instalacion: "",
  });
  const [error, setError] = useState(null);

  // Formatear la fecha para cumplir con el formato "yyyy-MM-dd"
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""; // Manejar valores nulos o vacíos
    try {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Extraer solo "yyyy-MM-dd"
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return ""; // Retornar cadena vacía si hay error
    }
  };

  // Obtener datos del dispositivo por ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/dispositivos/${id}`)
      .then((response) => {
        setDispositivo({
          ...response.data,
          fecha_instalacion: formatDateForInput(response.data.fecha_instalacion), // Formatear la fecha
        });
      })
      .catch((err) => {
        console.error("Error al obtener el dispositivo:", err);
        setError("No se pudo cargar el dispositivo.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDispositivo((prevDispositivo) => ({
      ...prevDispositivo,
      [name]: value, // Actualizar el valor del campo correspondiente
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud de actualización
    axios
      .put(`http://localhost:3000/api/dispositivos/${id}`, dispositivo)
      .then(() => {
        alert("Dispositivo actualizado exitosamente.");
        navigate("/CrudDispocitivos"); // Redirigir después de la actualización
      })
      .catch((err) => {
        console.error("Error al actualizar el dispositivo:", err);
        setError("Hubo un problema al actualizar el dispositivo.");
      });
  };

  const handleCancel = () => {
    navigate("/CrudDispocitivos"); // Redirigir al cancelar
  };

  return (
    <div className="usuario-edit__container">
      <h2 className="usuario-edit__form-title">Editar Dispositivo</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="usuario-edit__form">
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={dispositivo.nombre}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="tipo">
              Tipo
            </label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={dispositivo.tipo}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
        </div>
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="ubicacion">
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={dispositivo.ubicacion}
              onChange={handleChange}
              className="usuario-edit__form-input"
            />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="estado">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              value={dispositivo.estado}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>
        </div>
        <div className="usuario-edit__form-row">
          
          <div className="usuario-edit__form-group">
            <label
              className="usuario-edit__form-label"
              htmlFor="fecha_instalacion"
            >
              Fecha de Instalación
            </label>
            <input
              type="date"
              id="fecha_instalacion"
              name="fecha_instalacion"
              value={dispositivo.fecha_instalacion || ""}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
        </div>
        <div className="usuario-edit__button-container">
          <button
            type="submit"
            className="usuario-edit__btn usuario-edit__btn-primary"
          >
            Actualizar
          </button>
          <button
            type="button"
            className="usuario-edit__btn usuario-edit__btn-secondary"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarDispocitivo;
