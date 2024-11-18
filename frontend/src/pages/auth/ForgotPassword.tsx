import React, { useState } from "react";
import API from "../../api/axios";
import AuthLayout from "./AuthLayout";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/forgot-password", { email });
      alert("Si este correo está registrado, recibirás un enlace para recuperar tu contraseña.");
    } catch (error) {
      console.error("Error sending reset password email:", error);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Recuperar Contraseña</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Enviar Enlace
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
