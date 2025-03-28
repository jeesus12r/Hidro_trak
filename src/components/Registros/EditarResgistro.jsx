import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarResgistro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registro, setRegistro] = useState({
    accion: "",
    fecha_registro: "",
    detalles: "",
  });
  const [error, setError] = useState(null);

  const formatDatetimeLocal = (dateString) => {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date - offset).toISOString().slice(0, 16);
    return localDate;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/registros/${id}`)
      .then((response) => {
        setRegistro({
          ...response.data,
          fecha_registro: formatDatetimeLocal(response.data.fecha_registro),
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
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/registros/${id}`, registro)
      .then(() => {
        alert("Registro actualizado exitosamente.");
        navigate("/CrudRegistro"); // Cambiar redirección a "/CrudRegistro"
      })
      .catch((err) => {
        console.error("Error al actualizar el registro:", err);
        setError("Hubo un problema al actualizar el registro.");
      });
  };

  const handleCancel = () => {
    navigate("/CrudRegistro"); // Asegurarse de que cancelar también lleve a "/CrudRegistro"
  };

  return (
    <div className="usuario-edit__container">
      <h2 className="usuario-edit__form-title">Editar Registro</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="usuario-edit__form">
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="accion">
              Acción
            </label>
            <input
              type="text"
              id="accion"
              name="accion"
              value={registro.accion}
              onChange={handleChange}
              className="usuario-edit__form-input"
            />
          </div>
        </div>
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="fecha_registro">
              Fecha de Registro
            </label>
            <input
              type="datetime-local"
              id="fecha_registro"
              name="fecha_registro"
              value={registro.fecha_registro}
              onChange={handleChange}
              className="usuario-edit__form-input"
            />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label" htmlFor="detalles">
              Detalles
            </label>
            <textarea
              id="detalles"
              name="detalles"
              value={registro.detalles}
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

export default EditarResgistro;
