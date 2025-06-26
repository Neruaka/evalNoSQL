const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    adresse: { type: String, required: false } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);