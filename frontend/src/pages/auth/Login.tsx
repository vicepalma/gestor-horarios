import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "@/hooks/useAuth";

import AuthLayout from "./AuthLayout";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reinicia el estado de error antes de un intento
    try {
      const response = await API.post("/login", { username, password });
      login(response.data); // Guarda el token u otros datos del usuario
      navigate("/"); // Redirige al Dashboard
    } catch (error) {
      console.error("Error during login:", error);
      setError("Usuario o contraseña incorrectos."); // Muestra el mensaje de error
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Ingresar
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
