-- Datos iniciales para resources
INSERT INTO resources (name, description) VALUES
('Sala de Reuniones', 'Sala equipada con proyector'),
('Equipo de Cómputo', 'Estación de trabajo con PC y monitor');

-- Datos iniciales para services
INSERT INTO services (name, description, duration) VALUES
('Reunión de Trabajo', 'Reunión con el equipo', 60),
('Consulta Técnica', 'Asesoría técnica personalizada', 45);

-- Usuario Administrador
INSERT INTO users (username, password, role)
VALUES
('admin', 'hola', 'admin'), -- Contraseña mala

-- Usuario Estándar
('user1', '$2a$12$B/randomHashedPassword', 'user'); -- Contraseña cifrada
