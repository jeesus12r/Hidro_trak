import React from 'react';
import { Link } from 'react-router-dom';


const Admin = () => {
  return (
    <div>
<header className="header">
  <a href="/" className="logo">
    <img src="/src/components/assets/System Tecnologic Penguins logo.png" alt="" className="logo-image" />
  </a>
  <nav className="navbar">
  <Link to="/CrudAlertas"><button type="button" className="styled-button">Alertas</button></Link>
  <Link to="/CrudConfiguracion"><button type="button" className="styled-button">Configuracion</button></Link>
  <Link to="/CrudDispocitivos"><button type="button" className="styled-button">Dispositivos</button></Link>
  <Link to="/CrudHistConsu"><button type="button" className="styled-button">Historial Consumo</button></Link>
  <Link to="/CrudRegistroM"><button type="button" className="styled-button">Registros Medida</button></Link>
  <Link to="/CrudRegistro"><button type="button" className="styled-button">Registros</button></Link>
  <Link to="/CrudSensores"><button type="button" className="styled-button">Sensores</button></Link>
  <Link to="/CUsuarios"><button type="button" className="styled-button">Usuarios</button></Link>
  </nav>
</header>
    <div className="admin-panel">
      <h1>Panel de Administrador</h1>
      <p>Bienvenido al panel de administrador.</p>
      
      <div className='barra'>
        
        
      </div>
    </div>
    </div>
  );
};

export default Admin;
