import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistroUsuario from './components/login/Registro';
import Logeo from './components/login/Logeo';
import Admin from './components/Administrador/Admin';
import Tec from './components/Tecnicos/Tec';
import { AuthProvider } from './context/AuthContext';
import CrudUsuarios from './components/Administrador/CrudUsuarios';
import EdithUsuarios from './components/Administrador/EdithUsuarios';
import CrudDispocitivos from './components/Dispocitivos/CrudDispocitivos';
import CrudAlertas from './components/Alerts/CrudAlertas';
import CrudConfiguracion from './components/Confi/CrudConfiguracion';
import CrudHistConsu from './components/Historial_de_consumo/CrudHistConsu';
import CrudRegistroM from './components/Registros_de_medidas/CrudRegistroM';
import CrudRegistro from './components/Registros/CrudRegistro';
import CrudSensores from './components/Sensores/CrudSensores';
import EdithSensor from './components/Sensores/EdithSensor';
import PrivateRoute from './components/PrivateRoute';
import MiPerfil from './pages/MiPerfil'; 
import EditarResgistro from './components/Registros/EditarResgistro';
import EditarRegistroM from './components/Registros_de_medidas/EditarRegistroM';
import Editar_Historial from './components/Historial_de_consumo/Editar_Historial';
import EditarDispocitivo from './components/Dispocitivos/EditarDispocitivo';
import EditarConfiguracion from './components/Confi/EditarConfiguracion';
import EditarAlertas from './components/Alerts/EditarAlertas';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/login" element={<Logeo />} />
          <Route path="/" element={<Home />} />

          {/* Rutas protegidas */}
          
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/tecnico"
            element={
              <PrivateRoute allowedRoles={['tecnico']}>
                <Tec />
              </PrivateRoute>
            }
          />
          <Route
            path="/CUsuarios"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <CrudUsuarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/EDUsuarios/:id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <EdithUsuarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/CrudDispocitivos"
            element={
              <PrivateRoute allowedRoles={['admin', 'tecnico']}>
                <CrudDispocitivos />
              </PrivateRoute>
            }
          />

          <Route
            path="/EditarDispocitivo/:id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <EditarDispocitivo />
              </PrivateRoute>
            }
          />


          <Route
            path="/CrudAlertas"
            element={
              <PrivateRoute allowedRoles={['admin', 'tecnico']}>
                <CrudAlertas />
              </PrivateRoute>
            }
          />
          <Route
          path="/EditarAlertas/:id"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <EditarAlertas />
            </PrivateRoute>
            
          }
          /> 

          <Route
            path="/CrudConfiguracion"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <CrudConfiguracion />
              </PrivateRoute>
            }
          />

          <Route
          path="/EditarConfiguracion/:id"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <EditarConfiguracion />
            </PrivateRoute>
            
          }
          /> 


          <Route
            path="/CrudHistConsu"
            element={
              <PrivateRoute allowedRoles={['admin', 'tecnico', 'usuario']}>
                <CrudHistConsu />
              </PrivateRoute>
            }
          />

          <Route
          path="/Editar_Historial/:id"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Editar_Historial />
            </PrivateRoute>
            
          }
          /> 

          <Route
            path="/CrudRegistroM"
            element={
              <PrivateRoute allowedRoles={['admin', 'tecnico']}>
                <CrudRegistroM />
              </PrivateRoute>
            }
          /> 
          
          <Route
          path="/EditarRegistroM/:id"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <EditarRegistroM />
            </PrivateRoute>
            
          }
        /> 
          
          <Route
            path="/EditarResgistro/:id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <EditarResgistro />
              </PrivateRoute>
              
            }
          /> 

          <Route
            path="/CrudRegistro"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <CrudRegistro />
              </PrivateRoute>
            }
          /> 


          <Route
            path="/CrudSensores"
            element={
              <PrivateRoute allowedRoles={['admin', 'tecnico']}>
                <CrudSensores />
              </PrivateRoute>
            }
          />
          <Route
            path="/EdithSensor/:id"
            element={
              <PrivateRoute allowedRoles={['admin', 'tecnico']}>
                <EdithSensor />
              </PrivateRoute>
            }
          />
          <Route
          path="/mi-perfil"
            element={
            <PrivateRoute allowedRoles={['admin', 'tecnico', 'usuario']}>
      <MiPerfil />
    </PrivateRoute>
  }
/>


          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


