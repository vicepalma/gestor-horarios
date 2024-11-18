import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  description: string;
  duration: number; // Duración en minutos
}

const ListServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    try {
      const response = await API.get("/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  const deleteService = async (id: number) => {
    try {
      await API.delete(`/services/${id}`);
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Error deleting service", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Servicios</h1>
      <Link to="/services/new" className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
        Crear Nuevo Servicio
      </Link>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Descripción</th>
            <th className="py-2 px-4 text-left">Duración</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="py-2 px-4">{service.id}</td>
              <td className="py-2 px-4">{service.name}</td>
              <td className="py-2 px-4">{service.description}</td>
              <td className="py-2 px-4">{service.duration} minutos</td>
              <td className="py-2 px-4">
                <Link to={`/services/edit/${service.id}`} className="mr-2 text-blue-500">
                  Editar
                </Link>
                <button
                  onClick={() => deleteService(service.id)}
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

export default ListServices;
