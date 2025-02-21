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
    <form className="usuario-edit-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-input" name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-input" name="telefono" placeholder="Teléfono" value={usuario.telefono} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-input" name="direccion_completa" placeholder="Dirección Completa" value={usuario.direccion_completa} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Rol</label>
          <select className="form-select" name="rol" value={usuario.rol} onChange={handleChange} required>
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">Actualizar Usuario</button>
      <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancelar</button>
    </form>
  );
};

export default UsuarioEdit;
