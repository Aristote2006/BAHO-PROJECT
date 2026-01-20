const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contacts
// @desc    Create a new contact inquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    // Save to database
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/contacts
// @desc    Get all contact inquiries
// @access  Public
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/contacts/:id
// @desc    Get a specific contact inquiry
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;