import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";


const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        resources: 0,
        services: 0,
        reservations: 0,
    });
    const fetchStats = async () => {
        try {
            const resources = await API.get("/resources");
            const services = await API.get("/services");
            const reservations = await API.get("/reservations");
            setStats({
                resources: resources.data.length,
                services: services.data.length,
                reservations: reservations.data.length,
            });
        } catch (error) {
            console.error("Error fetching stats", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <p className="text-gray-700 mb-6">
                Bienvenido a la aplicación de gestión. Aquí puedes acceder a los módulos de recursos,
                servicios y reservas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/resources" className="p-4 bg-white shadow rounded hover:bg-gray-100">
                    <h2 className="text-xl font-semibold">Recursos</h2>
                    <p className="text-gray-600">Gestiona los recursos disponibles.</p>
                    <p className="text-gray-600">{stats.resources} en total</p>
                </Link>
                <Link to="/services" className="p-4 bg-white shadow rounded hover:bg-gray-100">
                    <h2 className="text-xl font-semibold">Servicios</h2>
                    <p className="text-gray-600">Gestiona los servicios ofrecidos.</p>
                    <p className="text-gray-600">{stats.services} en total</p>
                </Link>
                <Link to="/reservations" className="p-4 bg-white shadow rounded hover:bg-gray-100">
                    <h2 className="text-xl font-semibold">Reservas</h2>
                    <p className="text-gray-600">Gestiona y revisa las reservas realizadas.</p>
                    <p className="text-gray-600">{stats.reservations} en total</p>
                </Link>
                <Link to="/calendar" className="p-4 bg-white shadow rounded hover:bg-gray-100">
                    <h2 className="text-xl font-semibold">Calendario</h2>
                    <p className="text-gray-600">Visualiza reservas y horarios en un calendario.</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
