const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument({ margin: 40, size: 'A4' });
const outputPath = path.join(__dirname, '../frontend/public/govt-order-kms-2025-26.pdf');

const publicDir = path.dirname(outputPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Header
doc.fillColor('#064e3b').fontSize(20).font('Helvetica-Bold').text('AGRISETU OFFICIAL GOVERNMENT ORDER', { align: 'center' });
doc.fontSize(12).fillColor('#047857').text('DEPARTMENT OF FOOD & PUBLIC DISTRIBUTION (DFPD)', { align: 'center' });
doc.text('GOVERNMENT OF INDIA • KMS 2025-26 / RMS 2025-26', { align: 'center' });
doc.moveDown(1);

doc.strokeColor('#059669').lineWidth(2).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
doc.moveDown(1);

// Metadata
doc.fillColor('#111827').fontSize(11).font('Helvetica-Bold').text('Order Notification Ref: ', { continued: true })
   .font('Helvetica').text('DFPD/CCEA/KMS-2025-26/009421');
doc.font('Helvetica-Bold').text('Date of Issue: ', { continued: true })
   .font('Helvetica').text('29 May 2025');
doc.font('Helvetica-Bold').text('Subject: ', { continued: true })
   .font('Helvetica').text('Minimum Support Price (MSP) & Uniform Specifications for Paddy and Wheat Procurement');
doc.moveDown(1);

// Section 1
doc.fillColor('#065f46').fontSize(14).font('Helvetica-Bold').text('1. MINIMUM SUPPORT PRICE (MSP) NOTIFICATION');
doc.moveDown(0.5);
doc.fillColor('#374151').fontSize(10).font('Helvetica')
   .text('The Cabinet Committee on Economic Affairs (CCEA) has approved the Minimum Support Prices (MSP) for all mandated Kharif and Rabi crops for Marketing Season 2025-26.');
doc.moveDown(0.5);

doc.font('Helvetica-Bold').text('• Paddy (Common): ', { continued: true }).font('Helvetica').text('Rs 2,369 per Quintal');
doc.font('Helvetica-Bold').text('• Paddy (Grade A): ', { continued: true }).font('Helvetica').text('Rs 2,389 per Quintal');
doc.font('Helvetica-Bold').text('• Wheat (FAQ Standard): ', { continued: true }).font('Helvetica').text('Rs 2,425 per Quintal');
doc.moveDown(1);

// Section 2
doc.fillColor('#065f46').fontSize(14).font('Helvetica-Bold').text('2. UNIFORM SPECIFICATIONS & FAQ NORMS (PADDY & WHEAT)');
doc.moveDown(0.5);
doc.fillColor('#374151').fontSize(10).font('Helvetica')
   .text('All procurement centers shall strictly enforce the following FAQ parameters before issuing digital receipts:');
doc.moveDown(0.5);

doc.font('Helvetica-Bold').text('A. Paddy Moisture Content:');
doc.font('Helvetica').text('  - Up to 17.0%: Full MSP paid without deduction.');
doc.font('Helvetica').text('  - 17.01% to 22.0%: Value cut applied at 1% of MSP per 1% excess moisture.');
doc.font('Helvetica').text('  - Above 22.0%: Lot rejected outright unless active state relaxation order is in force.');
doc.moveDown(0.5);

doc.font('Helvetica-Bold').text('B. Foreign Matter & Impurities:');
doc.font('Helvetica').text('  - Inorganic foreign matter (sand, dust): Maximum 1.0%');
doc.font('Helvetica').text('  - Organic foreign matter: Maximum 1.0%');
doc.font('Helvetica').text('  - Damaged / Discoloured / Sprouted Grains: Maximum 5.0%');
doc.moveDown(1);

// Section 3
doc.fillColor('#065f46').fontSize(14).font('Helvetica-Bold').text('3. PROCUREMENT OPERATIONAL GUIDELINES FOR OFFICERS');
doc.moveDown(0.5);
doc.fillColor('#374151').fontSize(10).font('Helvetica')
   .text('1. No single officer can complete a transaction end-to-end alone. Grading, weighment, and payment approval are separated.');
doc.text('2. All weighment readings must be captured digitally via connected scales.');
doc.text('3. Digital receipts with QR codes must be issued for every completed transaction.');
doc.text('4. Direct Bank Transfer (DBT) will be credited directly to the farmer\'s Aadhaar-linked bank account within 48-72 hours.');
doc.moveDown(2);

// Sign-off
doc.fillColor('#111827').fontSize(10).font('Helvetica-Bold').text('By Order and in the Name of the President of India,', { align: 'right' });
doc.moveDown(0.5);
doc.text('Joint Secretary (Procurement)', { align: 'right' });
doc.text('Department of Food & Public Distribution', { align: 'right' });

doc.end();

writeStream.on('finish', () => {
  console.log('PDF successfully created at: ' + outputPath);
});
