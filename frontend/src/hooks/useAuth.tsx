import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook para acceder al contexto de autenticación.
 * Lanza un error si el contexto no está disponible.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
