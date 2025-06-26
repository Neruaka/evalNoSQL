const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_CLUSTER } = process.env;
    const mongoURI = process.env.MONGODB_URI || `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority` ;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connexion à MongoDB Atlas réussie');
    console.log(`Base de données: ${DB_DATABASE}`);
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
