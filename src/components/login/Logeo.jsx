import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Logeo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
  
      if (data.success) {
        const { user, token } = data;
        localStorage.setItem('user', JSON.stringify(user)); // Guarda los datos del usuario
        localStorage.setItem('token', token); // Guarda el token para autenticaciones futuras
        navigate("/mi-perfil"); // Redirige al perfil del usuario
      
      

        // Redirigir según el rol
        switch (user.rol) {
          case 'admin':
            navigate("/admin"); // Área para administradores
            break;
          case 'tecnico':
            navigate("/tecnico"); // Área para técnicos
            break;
          case 'usuario':
            navigate("/mi-perfil"); // Área para usuarios generales
            break;
          default:
            navigate("/"); // Por defecto redirige al área general
            break;
        }
      } else {
        setError(data.error || "Credenciales incorrectas. Inténtalo nuevamente.");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="wrapper">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUserCircle className="icon" />
        </div>
        <div className="input-box password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
          <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash className="small-icon" /> : <FaEye className="small-icon" />}
          </button>
        </div>
        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit">Entrar</button>
        <div className="register-link">
          <p>
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Logeo;