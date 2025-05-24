// services/pdfService.js
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const config = require('../config/index');
const { minify } = require('html-minifier');

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.IMAGE_API_KEY,
  api_secret: config.IMAGE_API_SECRET,
});

/**
 * Generates PDF from EJS template and vehicle data.
 * @param {Object} vehicleData
 * @returns {Buffer} PDF Buffer
 */
const generatePdfFromHtml = async (vehicleData) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. Render EJS
  const html = await ejs.renderFile(
    path.join(__dirname, '../templates/vehicleReport.ejs'),
    { vehicle: vehicleData }
  );

  // 2. Minify HTML
  const minifiedHtml = minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });

  // 3. Set minified HTML to page
  await page.setContent(minifiedHtml, { waitUntil: 'networkidle0' });

  // 4. Ensure media type for screen styling
  await page.emulateMediaType('screen');

  // 5. Generate PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
     scale: 0.9,
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
  });

  await browser.close();
  return pdfBuffer;
} 

/**
 * Uploads PDF buffer to Cloudinary and returns the URL.
 * @param {Buffer} buffer
 * @param {string} filename
 * @returns {string} Uploaded PDF URL
 */
async function uploadPdfToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        public_id: `vehicle_reports/${filename}`,
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading PDF to Cloudinary:', error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    stream.end(buffer);
  });
}

module.exports = {
  generatePdfFromHtml,
  uploadPdfToCloudinary,
};
