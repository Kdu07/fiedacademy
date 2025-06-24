const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


const generateCertificate = async (options) => {
  const { userName, courseName, completionDate, outputPath } = options;
  
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });
      
      // Set up the PDF stream
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);
      
      // Add certificate border
      doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80)
         .lineWidth(3)
         .stroke('#0D9488'); // secondaryGreen color
      
      // Add logo if available
      const logoPath = path.join(__dirname,'../public/images/logo.png')
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, (doc.page.width - 160) / 2, 45, { width: 160 });
      }
      
      // Add certificate title
      doc.font('Helvetica-Bold')
         .fontSize(32)
         .text('Certificado de conclusão - Field Academy', { align: 'center' }, 220);
      
      // Add certificate text
      doc.font('Helvetica')
         .fontSize(16)
         .text('Esse é um certificado mostrando que', { align: 'center' }, 270);
      
      doc.font('Helvetica-Bold')
         .fontSize(24)
         .text(userName, { align: 'center' }, 300);
      
      doc.font('Helvetica')
         .fontSize(16)
         .text('completou com sucesso a trilha', { align: 'center' }, 340);
      
      doc.font('Helvetica-Bold')
         .fontSize(24)
         .text(courseName, { align: 'center' }, 370);
      
      doc.font('Helvetica')
         .fontSize(12)
         .text(`Completado no dia ${completionDate}`, { align: 'center' }, 500);
      
      
      // Finalize the PDF
      doc.end();
      
      stream.on('finish', () => {
        resolve(outputPath);
      });
      
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateCertificate };