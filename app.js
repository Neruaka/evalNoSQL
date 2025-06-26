const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import de la configuration database (À COMPLÉTER PAR L'ÉTUDIANT)
const {connectDB} = require('./config/database');

// Import des routes
const contactRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/contacts', contactRoutes);

// Route principale - sert le frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`��� Serveur démarré sur le port ${PORT}`);
  console.log(`��� Frontend accessible sur: http://localhost:${PORT}`);
});
