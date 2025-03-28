import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/Users/")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/usuarios/${id}`)
      .then(() => setUsuarios(usuarios.filter(usuario => usuario.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección Completa</th>
            <th>Fecha Registro</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.direccion_completa}</td>
              <td>{usuario.fecha_registro}</td>
              <td>{usuario.activo ? "Sí" : "No"}</td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;
