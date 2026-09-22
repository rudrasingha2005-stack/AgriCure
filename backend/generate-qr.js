const QRCode = require('qrcode');
const path = require('path');

// Get URL from command line argument or use default placeholder
const liveUrl = process.argv[2] || 'https://agricure.onrender.com';
const outputFile = process.argv[3] || path.join(__dirname, 'app-qr-code.png');

console.log(`\nGenerating QR Code for: ${liveUrl}...`);

QRCode.toFile(
  outputFile,
  liveUrl,
  {
    color: {
      dark: '#059669', // Theme emerald green
      light: '#FFFFFF' // White background
    },
    width: 600,
    margin: 2,
    errorCorrectionLevel: 'H'
  },
  (err) => {
    if (err) {
      console.error('❌ Error generating QR Code:', err.message);
      process.exit(1);
    }
    console.log(`\n✅ QR Code created successfully!`);
    console.log(`📍 Saved file to: ${outputFile}`);
    console.log(`📱 Scan this QR code to visit: ${liveUrl}\n`);
  }
);
