import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const [dispositivo, setDispositivo] = useState({
    nombre: "",
    tipo: "",
    ubicacion: "",
    estado: "",
  });

  const [registro, setRegistro] = useState({
    accion: "",
    detalles: "",
  });

  const [sensor, setSensor] = useState({
    tipo: "",
    unidad_medida: "",
    rango_min: "",
    rango_max: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRolePassword, setShowRolePassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleDispositivoChange = (e) => {
    setDispositivo({ ...dispositivo, [e.target.name]: e.target.value });
  };

  const handleRegistroChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  const handleSensorChange = (e) => {
    setSensor({ ...sensor, [e.target.name]: e.target.value });
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
        console.log("Validando contraseña del rol...");
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
      console.log("Enviando datos del usuario al backend...");
      console.log(usuario); // Log para depurar los datos que se envían
      await axios.post("http://localhost:3000/api/Users", usuario);

      if (usuario.rol === "usuario") {
        // Enviar datos adicionales para dispositivos, registros y sensores
        console.log("Enviando datos del dispositivo al backend...");
        console.log(dispositivo); // Log para depurar los datos del dispositivo
        await axios.post("http://localhost:3000/api/Dispositivos", dispositivo);

        console.log("Enviando datos del registro al backend...");
        console.log(registro); // Log para depurar los datos del registro
        await axios.post("http://localhost:3000/api/Registros", registro);

        console.log("Enviando datos del sensor al backend...");
        console.log(sensor); // Log para depurar los datos del sensor
        await axios.post("http://localhost:3000/api/Sensores", sensor);
      }

      alert("Usuario registrado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError("Ya existe una cuenta con este correo electrónico.");
    }
  };

  const handleCancel = () => {
    navigate("/");
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
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={usuario.password}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
  
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
          <div className="password-container">
            <input
              type={showRolePassword ? "text" : "password"}
              name="rolePassword"
              value={usuario.rolePassword}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowRolePassword(!showRolePassword)}>
              {showRolePassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </>
      )}
  
      {/* Mostrar campos adicionales si el usuario elige "usuario" */}
      {usuario.rol === "usuario" && (
        <>
          <h3>Información del Dispositivo</h3>
          <label>Nombre del Dispositivo</label>
          <input type="text" name="nombre" value={dispositivo.nombre} onChange={handleDispositivoChange} required />
  
          <label>Tipo</label>
          <input type="text" name="tipo" value={dispositivo.tipo} onChange={handleDispositivoChange} required />
  
          <label>Ubicación</label>
          <input type="text" name="ubicacion" value={dispositivo.ubicacion} onChange={handleDispositivoChange} />
  
          <label>Estado</label>
          <input type="text" name="estado" value={dispositivo.estado} onChange={handleDispositivoChange} />
  
          <h3>Información del Registro</h3>
          <label>Acción</label>
          <input type="text" name="accion" value={registro.accion} onChange={handleRegistroChange} />
  
          <label>Detalles</label>
          <textarea name="detalles" value={registro.detalles} onChange={handleRegistroChange}></textarea>
  
          <h3>Información del Sensor</h3>
          <label>Tipo del Sensor</label>
          <input type="text" name="tipo" value={sensor.tipo} onChange={handleSensorChange} required />
  
          <label>Unidad de Medida</label>
          <input type="text" name="unidad_medida" value={sensor.unidad_medida} onChange={handleSensorChange} />
  
          <label>Rango Mínimo</label>
          <input type="number" name="rango_min" value={sensor.rango_min} onChange={handleSensorChange} />
  
          <label>Rango Máximo</label>
          <input type="number" name="rango_max" value={sensor.rango_max} onChange={handleSensorChange} />
        </>
      )}
  
      <div className="button-container">
        <button type="submit">Registrar</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </div>
    </form>
  );
  
};

export default RegistroUsuario;
 