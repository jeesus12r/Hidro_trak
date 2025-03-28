import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CerrarSesion from './CerrarSesion';


const MiPerfil = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/mi-perfil', {
          headers: { Authorization: token },
        });
        setData(response.data);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError("No se pudieron cargar los datos. Intenta nuevamente.");
      }
    };

    fetchData();
  }, [navigate]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!data) {
    return <div className="loading-message">Cargando datos...</div>;
  }

  const { perfil, dispositivos, sensores, registros, alertas, historial_consumo, registro_mediciones, configuraciones } = data;

  return (
    <div className="dashboard-container">
      <div className="profile-header">
        <h1>Hola, {perfil.nombre}!</h1>
        <div className="profile-info">
          <p><strong>ID:</strong> {perfil.id}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Teléfono:</strong> {perfil.telefono}</p>
          <p><strong>Dirección:</strong> {perfil.direccion_completa}</p>
          <p><strong>Fecha de Registro:</strong> {new Date(perfil.fecha_registro).toLocaleString()}</p>
          <CerrarSesion />

          
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Columna 1 */}
        <div className="dashboard-column">
          <div className="data-card">
            <h2>Dispositivos</h2>
            <div className="data-content">
              {dispositivos.length > 0 ? (
                <ul className="data-list">
                  {dispositivos.map((dispositivo) => (
                    <li key={dispositivo.id} className="data-item">
                      <p><strong>ID:</strong> {dispositivo.id}</p>
                      <p><strong>Nombre:</strong> {dispositivo.nombre}</p>
                      <p><strong>Tipo:</strong> {dispositivo.tipo}</p>
                      <p><strong>Ubicación:</strong> {dispositivo.ubicacion}</p>
                      <p><strong>Estado:</strong> {dispositivo.estado}</p>
                      <p><strong>Fecha de Instalación:</strong> {dispositivo.fecha_instalacion}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No hay dispositivos registrados.</p>
              )}
            </div>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="dashboard-column">
          <div className="data-card">
            <h2>Sensores</h2>
            <div className="data-content">
              {sensores.length > 0 ? (
                <ul className="data-list">
                  {sensores.map((sensor) => (
                    <li key={sensor.id} className="data-item">
                      <p><strong>ID:</strong> {sensor.id}</p>
                      <p><strong>Tipo:</strong> {sensor.tipo}</p>
                      <p><strong>Unidad:</strong> {sensor.unidad_medida}</p>
                      <p><strong>Rango:</strong> {sensor.rango_min} - {sensor.rango_max}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No hay sensores registrados.</p>
              )}
            </div>
          </div>

          <div className="data-card">
            <h2>Alertas</h2>
            <div className="data-content">
              {alertas.length > 0 ? (
                <ul className="data-list">
                  {alertas.map((alerta) => (
                    <li key={alerta.id} className="data-item">
                      <p><strong>ID:</strong> {alerta.id}</p>
                      <p><strong>Mensaje:</strong> {alerta.mensaje}</p>
                      <p><strong>Tipo:</strong> {alerta.tipo_alerta}</p>
                      <p><strong>Prioridad:</strong> {alerta.prioridad}</p>
                      <p><strong>Fecha:</strong> {new Date(alerta.fecha_registro).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No hay alertas registradas.</p>
              )}
            </div>
          </div>
        </div>

        {/* Columna 3 */}
        <div className="dashboard-column">
          <div className="data-card">
            <h2>Registros</h2>
            <div className="data-content">
              {registros.length > 0 ? (
                <ul className="data-list">
                  {registros.map((registro) => (
                    <li key={registro.id} className="data-item">
                      <p><strong>ID:</strong> {registro.id}</p>
                      <p><strong>Acción:</strong> {registro.accion}</p>
                      <p><strong>Detalles:</strong> {registro.detalles}</p>
                      <p><strong>Dispositivo ID:</strong> {registro.dispositivo_id}</p>
                      <p><strong>Fecha:</strong> {new Date(registro.fecha_registro).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No hay registros disponibles.</p>
              )}
            </div>
          </div>

          <div className="data-card">
            <h2>Configuraciones</h2>
            <div className="data-content">
              {configuraciones.length > 0 ? (
                <ul className="data-list">
                  {configuraciones.map((config) => (
                    <li key={config.id} className="data-item">
                      <p><strong>ID:</strong> {config.id}</p>
                      <p><strong>Clave:</strong> {config.clave}</p>
                      <p><strong>Valor:</strong> {config.valor}</p>
                      <p><strong>Descripción:</strong> {config.descripcion}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No hay configuraciones registradas.</p>
              )}
            </div>
          </div>
        </div>

        {/* Columna 4 */}
        <div className="dashboard-column">
          <div className="data-card">
            <h2>Historial de Consumo</h2>
            <div className="data-content">
              {historial_consumo.length > 0 ? (
                <ul className="data-list">
                  {historial_consumo.map((historial) => (
                    <li key={historial.id} className="data-item">
                      <p><strong>ID:</strong> {historial.id}</p>
                      <p><strong>Consumo:</strong> {historial.consumo} kwh</p>
                      <p><strong>Periodo:</strong> {historial.periodo}</p>
                      <p><strong>Fecha:</strong> {new Date(historial.fecha_registro).toLocaleString()}</p>
                      <p><strong>Comentarios:</strong> {historial.comentarios}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No hay datos de historial de consumo disponibles.</p>
              )}
            </div>
          </div>

          <div className="data-card">
            <h2>Registro de Mediciones</h2>
            <div className="data-content">
              {registro_mediciones.length > 0 ? (
                <ul className="data-list">
                  {registro_mediciones.map((medicion) => (
                    <li key={medicion.id} className="data-item">
                      <p><strong>ID:</strong> {medicion.id}</p>
                      <p><strong>Valor:</strong> {medicion.valor}</p>
                      <p><strong>Calidad del Dato:</strong> {medicion.calidad_dato}</p>
                      <p><strong>Fecha:</strong> {new Date(medicion.fecha_registro).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No hay registros de mediciones disponibles.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;