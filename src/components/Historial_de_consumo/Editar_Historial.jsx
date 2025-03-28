import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Editar_Historial = () => {
  const { id } = useParams(); // Obtener el ID del registro desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar o cancelar
  const [registro, setRegistro] = useState({
    consumo: "",
    periodo: "",
    fecha_registro: "",
    comentarios: "",
  });
  const [error, setError] = useState(null);

  // Formatear la fecha para el campo datetime-local
  const formatDatetimeLocal = (dateString) => {
    if (!dateString) return ""; // Manejar valores nulos o vacíos
    try {
      const date = new Date(dateString);
      const offset = date.getTimezoneOffset() * 60000;
      const localDate = new Date(date - offset).toISOString().slice(0, 16); // Formato yyyy-MM-ddThh:mm
      return localDate;
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return ""; // Retorna cadena vacía si hay error
    }
  };

  useEffect(() => {
    // Obtener el registro por ID
    axios
      .get(`http://localhost:3000/api/historial_consumo/${id}`)
      .then((response) => {
        setRegistro({
          ...response.data,
          fecha_registro: formatDatetimeLocal(response.data.fecha_registro), // Formatear fecha
        });
      })
      .catch((err) => {
        console.error("Error al obtener el registro:", err);
        setError("No se pudo cargar el registro.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistro((prevRegistro) => ({
      ...prevRegistro,
      [name]: value, // Actualizar el valor del campo
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualizar el registro en la API
    axios
      .put(`http://localhost:3000/api/historial_consumo/${id}`, registro)
      .then(() => {
        alert("Registro actualizado exitosamente.");
        navigate("/CrudHistConsu"); // Redirigir después de actualizar
      })
      .catch((err) => {
        console.error("Error al actualizar el registro:", err);
        setError("Hubo un problema al actualizar el registro.");
      });
  };

  const handleCancel = () => {
    navigate("/CrudHistConsu"); // Redirigir al cancelar
  };

  return (
    <div className="usuario-edit__container">
      <h2 className="usuario-edit__form-title">Editar Historial de Consumo</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="usuario-edit__form">
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="consumo">
              Consumo
            </label>
            <input
              type="number"
              id="consumo"
              name="consumo"
              value={registro.consumo}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="periodo">
              Periodo
            </label>
            <input
              type="text"
              id="periodo"
              name="periodo"
              value={registro.periodo}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
        </div>
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label
              className="usuario-edit__form-label"
              htmlFor="fecha_registro"
            >
              Fecha de Registro
            </label>
            <input
              type="datetime-local"
              id="fecha_registro"
              name="fecha_registro"
              value={registro.fecha_registro}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="comentarios">
              Comentarios
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={registro.comentarios}
              onChange={handleChange}
              className="usuario-edit__form-input"
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

export default Editar_Historial;
