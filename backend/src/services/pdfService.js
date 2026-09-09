const PDFDocument = require('pdfkit');

exports.streamReceipt = (res, { booking, payment, farmer }) => {
  const doc = new PDFDocument({ margin: 50 });
  const filename = `AgriProcure-Receipt-${booking._id}.pdf`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  doc.pipe(res);

  doc.fontSize(22).text('AgriProcure Digital Procurement Receipt');
  doc.moveDown();
  doc.fontSize(12);
  doc.text(`Farmer: ${farmer.name}`);
  doc.text(`Booking ID: ${booking._id}`);
  doc.text(`Token Number: ${booking.tokenNumber}`);
  doc.text(`Booking Date: ${booking.slotDate}`);
  doc.text(`Centre: ${booking.centreId?.name || booking.centreId}`);
  doc.text(`Weighed Quantity: ${booking.weighedQuantity} kg`);
  doc.text(`Amount: INR ${payment.amount}`);
  doc.text(`Payment Status: ${payment.status}`);
  doc.text(`Transaction Reference: ${payment.transactionRef || 'N/A'}`);
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`);
  doc.end();
};
