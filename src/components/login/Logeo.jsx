import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Logeo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password, "Remember Me:", rememberMe);
  
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email, 
        password
      });
  
      console.log('Respuesta del servidor:', response.data);
  
      if (response.data.success) {
        login(); // Actualiza el estado de autenticación
        const { rol } = response.data.user; // Obtén el rol del usuario
  
        // Redirigir según el rol
        switch (rol) {
          case 'admin':
            navigate("/admin");
            break;
          case 'tecnico':
            navigate("/tecnico");
            break;
          case 'usuario':
            navigate("/inicio");
            break;
          default:
            navigate("/inicio");
            break;
        }
      } else {
        setError("Las credenciales no son correctas. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError("Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo.");
    }
  };
  
  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="input-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="icon">👤</span>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <span className="icon">🔒</span>
        </div>
        <div className="options">
          <label>
            <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            Remember me
          </label>
          <a href="#">Olvidaste tu contraseña?</a>
        </div>
        <button type="submit">Entrar</button>
        <p>
          No tienes cuenta? <Link to="/registro"><button type="button" className="btn btn-success">Registrarse</button></Link>
        </p>
      </form>
    </div>
  );
};

export default Logeo;
