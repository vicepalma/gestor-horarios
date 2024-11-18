import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

/**
 * Componente para proteger rutas.
 * Redirige al usuario al login si no está autenticado.
 */
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useContext(AuthContext);

  // Si el contexto es undefined, lanzar un error
  if (!auth) {
    throw new Error("ProtectedRoute must be used within an AuthProvider");
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderizar el contenido
  return children;
};

export default ProtectedRoute;
