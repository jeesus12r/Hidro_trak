import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h1>Panel de Administrador</h1>
      <p>Bienvenido al panel de administrador.</p>
      <Link to="/CUsuarios">
        <button type="button" className="btn btn-success">Visualisar Usuarios</button>
      </Link>
    </div>
  );
};

export default Admin;
