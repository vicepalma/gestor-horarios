import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const EditReservation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resource_id, setResourceId] = useState<number>(0);
  const [service_id, setServiceId] = useState<number>(0);
  const [start_time, setStartTime] = useState<string>("");
  const [end_time, setEndTime] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await API.get(`/reservations/${id}`);
        const { resource_id, service_id, start_time, end_time } = response.data;
        setResourceId(resource_id);
        setServiceId(service_id);
        setStartTime(start_time);
        setEndTime(end_time);
      } catch (error) {
        console.error("Error fetching reservation", error);
      }
    };

    fetchReservation();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/reservations/${id}`, { resource_id, service_id, start_time, end_time });
      navigate("/reservations");
    } catch (error) {
      console.error("Error updating reservation", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Reserva</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <div className="mb-4">
          <label className="block text-gray-700">ID del Recurso</label>
          <input
            type="number"
            value={resource_id}
            onChange={(e) => setResourceId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ID del Servicio</label>
          <input
            type="number"
            value={service_id}
            onChange={(e) => setServiceId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hora de Inicio</label>
          <input
            type="datetime-local"
            value={start_time}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hora de Fin</label>
          <input
            type="datetime-local"
            value={end_time}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Actualizar Reserva
        </button>
      </form>
    </div>
  );
};

export default EditReservation;
