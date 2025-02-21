import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const RegistroUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion_completa: "",
    rol: "usuario",
    rolePassword: "", // Contraseña del rol (para admin/tecnico)
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseña segura
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(usuario.password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
      return;
    }

    // Si el usuario elige admin o técnico, debe ingresar la contraseña de rol
    if (usuario.rol !== "usuario" && !usuario.rolePassword) {
      setError("Debe proporcionar una contraseña para el rol seleccionado.");
      return;
    }

    try {
      let validRolePassword = true;

      // Si el usuario es admin o técnico, validar la contraseña del rol con el backend
      if (usuario.rol === "admin" || usuario.rol === "tecnico") {
        const response = await axios.post("http://localhost:3000/api/validateRolePassword", {
          rol: usuario.rol,
          rolePassword: usuario.rolePassword,
        });

        validRolePassword = response.data.valid;
      }

      if (!validRolePassword) {
        setError("La contraseña del rol es incorrecta.");
        return;
      }

      // Enviar datos al backend sin hashear la contraseña
      await axios.post("http://localhost:3000/api/Users", usuario);

      alert("Usuario registrado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError("Ya existe una cuenta con este correo electrónico.");
    }
  };

  return (
    <form className="registro-usuario-form" onSubmit={handleSubmit}>
      <h2>Registro de Usuario</h2>
      {error && <p className="error-message">{error}</p>}

      <label>Nombre</label>
      <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" value={usuario.email} onChange={handleChange} required />

      <label>Contraseña</label>
      <input type="password" name="password" value={usuario.password} onChange={handleChange} required />

      <label>Teléfono</label>
      <input type="text" name="telefono" value={usuario.telefono} onChange={handleChange} />

      <label>Dirección</label>
      <input type="text" name="direccion_completa" value={usuario.direccion_completa} onChange={handleChange} />

      <label>Rol</label>
      <select name="rol" value={usuario.rol} onChange={handleChange} required>
        <option value="usuario">Usuario</option>
        <option value="admin">Administrador</option>
        <option value="tecnico">Técnico</option>
      </select>

      {/* Solo mostrar el campo de contraseña del rol si el usuario elige admin o técnico */}
      {(usuario.rol === "admin" || usuario.rol === "tecnico") && (
        <>
          <label>Contraseña del Rol</label>
          <input type="password" name="rolePassword" value={usuario.rolePassword} onChange={handleChange} required />
        </>
      )}

      <button type="submit">Registrar Usuario</button>
    </form>
  );
};

export default RegistroUsuario;
