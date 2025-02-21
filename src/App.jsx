import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistroUsuario from './components/login/Registro';
import Logeo from './components/login/Logeo';
import Principal from './components/inicio/Principal';
import Admin from './components/Administrador/Admin';
import Tec from './components/Tecnicos/Tec';
import { AuthProvider } from './context/AuthContext';
import CrudUsuarios from './components/Administrador/CrudUsuarios';
import EdithUsuarios from './components/Administrador/EdithUsuarios';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/login" element={<Logeo />} />
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Principal />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tecnico" element={<Tec />} />
          <Route path="/CUsuarios" element={<CrudUsuarios />} />
          <Route path="/EDUsuarios/:id" element={<EdithUsuarios />} /> {/* Ajuste de ruta */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
