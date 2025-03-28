import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EdithSensor = () => {
  const { id } = useParams(); // Obtener el ID del sensor desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [sensor, setSensor] = useState({
    tipo: "",
    unidad_medida: "",
    rango_min: "",
    rango_max: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener los datos del sensor por ID
    axios
      .get(`http://localhost:3000/api/sensores/${id}`)
      .then((response) => {
        const { tipo, unidad_medida, rango_min, rango_max } = response.data;
        setSensor({ tipo, unidad_medida, rango_min, rango_max }); // Excluir dispositivo_id
      })
      .catch((err) => {
        console.error("Error al obtener el sensor:", err);
        setError("No se pudo cargar el sensor.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSensor((prevSensor) => ({
      ...prevSensor,
      [name]: value, // Actualizar el valor del campo
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualizar sensor en la API
    axios
      .put(`http://localhost:3000/api/sensores/${id}`, sensor)
      .then(() => {
        alert("Sensor actualizado exitosamente.");
        navigate("/CrudSensores"); // Redirigir a la lista de sensores
      })
      .catch((err) => {
        console.error("Error al actualizar el sensor:", err);
        setError("Hubo un problema al actualizar el sensor.");
      });
  };

  const handleCancel = () => {
    navigate("/CrudSensores"); // Redirigir a la página de sensores
  };

  return (
    <div className="usuario-edit__container">
      <h2 className="usuario-edit__form-title">Editar Sensor</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="usuario-edit__form">
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="tipo">
              Tipo
            </label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={sensor.tipo}
              onChange={handleChange}
              className="usuario-edit__form-input"
            />
          </div>

          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="unidad_medida">
              Unidad de Medida
            </label>
            <input
              type="text"
              id="unidad_medida"
              name="unidad_medida"
              value={sensor.unidad_medida}
              onChange={handleChange}
              className="usuario-edit__form-input"
            />
          </div>
        </div>

        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="rango_min">
              Rango Mínimo
            </label>
            <input
              type="number"
              id="rango_min"
              name="rango_min"
              value={sensor.rango_min}
              onChange={handleChange}
              className="usuario-edit__form-input"
            />
          </div>

          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="rango_max">
              Rango Máximo
            </label>
            <input
              type="number"
              id="rango_max"
              name="rango_max"
              value={sensor.rango_max}
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

export default EdithSensor;
