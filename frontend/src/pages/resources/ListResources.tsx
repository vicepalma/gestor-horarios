import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

interface Resource {
  id: number;
  name: string;
  description: string;
}

const ListResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  const fetchResources = async () => {
    try {
      const response = await API.get("/resources");
      console.log(response.data)
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources", error);
    }
  };

  const deleteResource = async (id: number) => {
    try {
      await API.delete(`/resources/${id}`);
      setResources((prev) => prev.filter((resource) => resource.id !== id));
    } catch (error) {
      console.error("Error deleting resource", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Recursos</h1>
      <Link to="/resources/new" className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
        Crear Nuevo Recurso
      </Link>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Descripción</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td className="py-2 px-4">{resource.id}</td>
              <td className="py-2 px-4">{resource.name}</td>
              <td className="py-2 px-4">{resource.description}</td>
              <td className="py-2 px-4">
                <Link to={`/resources/edit/${resource.id}`} className="mr-2 text-blue-500">
                  Editar
                </Link>
                <button
                  onClick={() => deleteResource(resource.id)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListResources;
