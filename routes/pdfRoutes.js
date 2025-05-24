// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const { generatePdfFromHtml, uploadPdfToCloudinary } = require('../services/pdfService');

router.get('/generate-pdf/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const pdfBuffer = await generatePdfFromHtml(vehicle);
    const pdfUrl = await uploadPdfToCloudinary(pdfBuffer, `vehicle_${vehicle._id}`);

    vehicle.generatedPdfUrl = pdfUrl;
    await vehicle.save();

    res.json({ pdfUrl });
  } catch (error) {
    console.error('Error in /generate-pdf/:id route:', error);
    res.status(500).json({ message: 'Error generating PDF', error: error.message });
  }
});

module.exports = router;
