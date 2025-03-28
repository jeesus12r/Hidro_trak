import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarAlertas = () => {
  const { id } = useParams(); // Obtener el ID de la alerta desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar o cancelar
  const [alerta, setAlerta] = useState({
    usuario_id: "",
    dispositivo_id: "",
    sensor_id: "",
    mensaje: "",
    tipo_alerta: "",
    prioridad: "",
  });
  const [error, setError] = useState(null);

  // Obtener datos de la alerta por ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/alertas/${id}`)
      .then((response) => {
        setAlerta(response.data); // Guardar los datos en el estado
      })
      .catch((err) => {
        console.error("Error al obtener la alerta:", err);
        setError("No se pudo cargar la alerta.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlerta((prevAlerta) => ({
      ...prevAlerta,
      [name]: value, // Actualizar el valor del campo correspondiente
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud de actualización
    axios
      .put(`http://localhost:3000/api/alertas/${id}`, alerta)
      .then(() => {
        alert("Alerta actualizada exitosamente.");
        navigate("/CrudAlertas"); // Redirigir después de la actualización
      })
      .catch((err) => {
        console.error("Error al actualizar la alerta:", err);
        setError("Hubo un problema al actualizar la alerta.");
      });
  };

  const handleCancel = () => {
    navigate("/CrudAlertas"); // Redirigir al cancelar
  };

  return (
    <div className="usuario-edit__container">
      <h2 className="usuario-edit__form-title">Editar Alerta</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="usuario-edit__form">
        
        <div className="usuario-edit__form-row">
          
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={alerta.mensaje}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            ></textarea>
          </div>
        </div>
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="tipo_alerta">
              Tipo de Alerta
            </label>
            <input
              type="text"
              id="tipo_alerta"
              name="tipo_alerta"
              value={alerta.tipo_alerta}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="prioridad">
              Prioridad
            </label>
            <select
              id="prioridad"
              name="prioridad"
              value={alerta.prioridad}
              onChange={handleChange}
              className="usuario-edit__form-input"
              required
            >
              <option value="">Seleccione la prioridad</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
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

export default EditarAlertas;
