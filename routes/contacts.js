const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// GET /api/contacts - Récupérer tous les contacts
// GET /api/contacts - Récupérer tous les contacts
router.get('/', async (req, res) => {
  try {
    console.log('Tentative de récupération des contacts...');
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`${contacts.length} contacts trouvés`);
    res.json(contacts);
  } catch (error) {
    console.error('Erreur dans GET /api/contacts:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des contacts' });
  }
});

// GET /api/contacts/:id - Récupérer un contact par ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du contact' });
  }
});

// POST /api/contacts - Créer un nouveau contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Données invalides', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Erreur lors de la création du contact' });
    }
  }
});

// PUT /api/contacts/:id - Modifier un contact
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json(contact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Données invalides', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Erreur lors de la modification du contact' });
    }
  }
});

// DELETE /api/contacts/:id - Supprimer un contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json({ message: 'Contact supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du contact' });
  }
});

module.exports = router;
