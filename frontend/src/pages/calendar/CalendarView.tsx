import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parseISO, format } from "date-fns";
import moment from "moment";

interface Reservation {
  id: number;
  resource_id: number;
  service_id: number;
  start_time: string;
  end_time: string;
}

interface CalendarViewProps {
  reservations: Reservation[];
}

const localizer = momentLocalizer(moment);

const CalendarView: React.FC<CalendarViewProps> = ({ reservations }) => {
  // Transformar reservas en eventos para el calendario
  const events = reservations.map((reservation) => ({
    id: reservation.id,
    title: `Reserva ${reservation.id}`,
    start: parseISO(reservation.start_time),
    end: parseISO(reservation.end_time),
  }));

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        messages={{
          today: "Hoy",
          previous: "Anterior",
          next: "Siguiente",
          month: "Mes",
          week: "Semana",
          day: "Día",
          noEventsInRange: "No hay reservas en este rango de fechas.",
        }}
      />
    </div>
  );
};

export default CalendarView;
