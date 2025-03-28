import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const userData = localStorage.getItem('user'); // Obtén los datos del usuario desde localStorage

  if (!userData) {
    // Si no hay un usuario, redirige al login
    return <Navigate to="/login" />;
  }

  let user;
  try {
    user = JSON.parse(userData); // Intenta parsear los datos del usuario
  } catch (error) {
    console.error("Error al parsear los datos del usuario:", error);
    return <Navigate to="/login" />;
  }

  if (!user?.rol || !allowedRoles.includes(user.rol)) {
    // Si el rol del usuario no es permitido, redirige a una página de "No autorizado"
    return <Navigate to="/no-autorizado" />;
  }

  // Si todo es válido, renderiza el componente
  return children;
};

export default PrivateRoute;
