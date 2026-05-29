const express = require("express");
const cors = require("cors");

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000

app.use(cors());
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(taskRoutes);
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Servidor está ativo http://localhost:${port}/`);
});