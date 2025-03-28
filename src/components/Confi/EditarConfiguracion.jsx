import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarConfiguracion = () => {
  const { id } = useParams(); // Obtener el ID de la configuración desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar o cancelar
  const [configuracion, setConfiguracion] = useState({
    clave: "",
    valor: "",
    descripcion: "",
  });
  const [error, setError] = useState(null);

  // Obtener datos de configuración por ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/configuraciones/${id}`)
      .then((response) => {
        setConfiguracion(response.data); // Guardar los datos en el estado
      })
      .catch((err) => {
        console.error("Error al obtener la configuración:", err);
        setError("No se pudo cargar la configuración.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfiguracion((prevConfiguracion) => ({
      ...prevConfiguracion,
      [name]: value, // Actualizar el valor del campo correspondiente
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud de actualización
    axios
      .put(`http://localhost:3000/api/configuraciones/${id}`, configuracion)
      .then(() => {
        alert("Configuración actualizada exitosamente.");
        navigate("/CrudConfiguracion"); // Redirigir después de la actualización
      })
      .catch((err) => {
        console.error("Error al actualizar la configuración:", err);
        setError("Hubo un problema al actualizar la configuración.");
      });
  };

  const handleCancel = () => {
    navigate("/CrudConfiguracion"); // Redirigir al cancelar
  };

  return (
    <div className="usuario-edit__container">
      <h2 className="usuario-edit__form-title">Editar Configuración</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="usuario-edit__form">
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="clave">
              Clave
            </label>
            <input
              type="text"
              id="clave"
              name="clave"
              value={configuracion.clave}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="valor">
              Valor
            </label>
            <input
              type="text"
              id="valor"
              name="valor"
              value={configuracion.valor}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
        </div>
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={configuracion.descripcion}
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

export default EditarConfiguracion;
