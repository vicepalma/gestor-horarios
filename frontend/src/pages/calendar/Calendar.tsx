import React, { useState, useEffect } from "react";
import CalendarView from "./CalendarView";
import API from "../../api/axios";

interface Reservation {
  id: number;
  resource_id: number;
  service_id: number;
  start_time: string;
  end_time: string;
}

const Calendar: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReservations = async () => {
    try {
      const response = await API.get("/reservations");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Calendario de Reservas</h1>
      <CalendarView reservations={reservations} />
    </div>
  );
};

export default Calendar;
