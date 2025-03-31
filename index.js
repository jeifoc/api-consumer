const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001; // Puerto diferente al servidor original

app.use(express.json());

// Configuración base de la API
const API_BASE_URL = "http://localhost:3000";
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Ruta de bienvenida del cliente
app.get("/", (req, res) => {
  res.send("Cliente API para consumir los servicios del servidor Express");
});

// Obtener todos los usuarios (proxy)
app.get("/api/users", async (req, res) => {
  try {
    const response = await api.get("/users");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Crear un nuevo usuario (proxy)
app.post("/api/users", async (req, res) => {
  try {
    const response = await api.post("/users", req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// Función adicional: Obtener un usuario por ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const response = await api.get("/users");
    const user = response.data.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuario" });
  }
});

// Iniciar el servidor del cliente
app.listen(port, () => {
  console.log(`Cliente API corriendo en http://localhost:${port}`);
});
