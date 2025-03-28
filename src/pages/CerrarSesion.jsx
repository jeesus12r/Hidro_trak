import React from 'react';
import { useNavigate } from 'react-router-dom';

const CerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mostrar mensaje de confirmación
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      // Si el usuario confirma, elimina el token y redirige al login
      localStorage.removeItem('token'); // Elimina el token de autenticación
      localStorage.removeItem('userRole'); // Opcional, elimina el rol del usuario si lo guardaste

      navigate('/login'); // Redirige al inicio de sesión
    }
    // Si el usuario cancela, no sucede nada
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '10px 15px',
        cursor: 'pointer',
        backgroundColor: '#44ffcf',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '10px',
        fontSize: '25px',
        marginTop: 'px',
        
      }}
    >
      Cerrar Sesión
    </button>
  );
};

export default CerrarSesion;
