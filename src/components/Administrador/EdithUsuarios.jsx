import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const UsuarioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion_completa: "",
    rol: "usuario"
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/Users/${id}`)
      .then(response => setUsuario(response.data))
      .catch(error => console.error('Error al obtener el usuario:', error));
  }, [id]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(usuario);  // Verifica los valores del usuario antes de enviarlos
    axios.put(`http://localhost:3000/api/Users/${id}`, usuario)
      .then(() => {
        alert("Usuario actualizado");
        navigate('/CUsuarios');  // Redirige a la página de usuarios después de la actualización
      })
      .catch(error => {
        console.error("Error al actualizar el usuario:", error);
        alert("Hubo un problema al actualizar el usuario. Por favor, intenta nuevamente.");
      });
  };

  const handleCancel = () => {
    navigate('/CUsuarios');  // Redirige a la página de usuarios al cancelar
  };

  return (
    <div className="usuario-edit__container">
      <form className="usuario-edit__form" onSubmit={handleSubmit}>
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label">Nombre</label>
            <input type="text" className="usuario-edit__form-input" name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={handleChange} required />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label">Email</label>
            <input type="email" className="usuario-edit__form-input" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="usuario-edit__form-row">
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label">Teléfono</label>
            <input type="text" className="usuario-edit__form-input" name="telefono" placeholder="Teléfono" value={usuario.telefono} onChange={handleChange} />
          </div>
          <div className="usuario-edit__form-group">
            <label className="usuario-edit__form-label">Dirección</label>
            <input type="text" className="usuario-edit__form-input" name="direccion_completa" placeholder="Dirección Completa" value={usuario.direccion_completa} onChange={handleChange} />
          </div>
        </div>
        <div className="usuario-edit__form-row">
         
        </div>
        <div className="usuario-edit__button-container">
          <button className="usuario-edit__btn usuario-edit__btn-primary" type="submit">Actualizar Usuario</button>
          <button className="usuario-edit__btn usuario-edit__btn-secondary" type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default UsuarioEdit;
