import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

interface Reservation {
  id: number;
  resource_id: number;
  service_id: number;
  start_time: string;
  end_time: string;
}

const ListReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchReservations = async () => {
    try {
      const response = await API.get("/reservations");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations", error);
    }
  };

  const deleteReservation = async (id: number) => {
    try {
      await API.delete(`/reservations/${id}`);
      setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Reservas</h1>
      <Link to="/reservations/new" className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
        Crear Nueva Reserva
      </Link>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Recurso</th>
            <th className="py-2 px-4 text-left">Servicio</th>
            <th className="py-2 px-4 text-left">Inicio</th>
            <th className="py-2 px-4 text-left">Fin</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="py-2 px-4">{reservation.id}</td>
              <td className="py-2 px-4">{reservation.resource_id}</td>
              <td className="py-2 px-4">{reservation.service_id}</td>
              <td className="py-2 px-4">{new Date(reservation.start_time).toLocaleString()}</td>
              <td className="py-2 px-4">{new Date(reservation.end_time).toLocaleString()}</td>
              <td className="py-2 px-4">
                <Link to={`/reservations/edit/${reservation.id}`} className="mr-2 text-blue-500">
                  Editar
                </Link>
                <button
                  onClick={() => deleteReservation(reservation.id)}
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

export default ListReservations;
