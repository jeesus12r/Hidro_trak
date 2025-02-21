import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
  // Importa el archivo CSS

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/Users")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/Users/${id}`)
      .then(() => setUsuarios(usuarios.filter(usuario => usuario.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="usuario-list-container">
      <Link to="/admin"><button type="button" className="btn btn-success">Panel Principal</button></Link>
      <h2 className="usuario-list-heading">Lista de Usuarios</h2>
      
      <table className="usuario-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Rol</th>
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
              <td>{usuario.rol}</td>
              <td>
              <Link to={`/EDUsuarios/${usuario.id}`}><button type="button" className="btn btn-success">Editar</button></Link>


                <button type="button" className="btn btn-danger" onClick={() => handleDelete(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;
