const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = async (options) => {
  const { userName, courseName, completionDate, outputPath } = options;

  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });

      // Set up the PDF stream
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // Add background color
      doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f8fafc");

      // Add decorative background elements
      for (let i = 0; i < doc.page.width; i += 40) {
        doc.circle(i, 20, 1).fillAndStroke("#0D9488", "#0D9488");
        doc
          .circle(i, doc.page.height - 20, 1)
          .fillAndStroke("#0D9488", "#0D9488");
      }

      for (let i = 0; i < doc.page.height; i += 40) {
        doc.circle(20, i, 1).fillAndStroke("#0D9488", "#0D9488");
        doc
          .circle(doc.page.width - 20, i, 1)
          .fillAndStroke("#0D9488", "#0D9488");
      }

      // Add elegant border with rounded corners
      doc
        .roundedRect(40, 40, doc.page.width - 80, doc.page.height - 80, 10)
        .lineWidth(3)
        .stroke("#0D9488");

      // Add inner border
      doc
        .roundedRect(55, 55, doc.page.width - 110, doc.page.height - 110, 5)
        .lineWidth(1)
        .dash(5, { space: 5 })
        .stroke("#0D9488");
      doc.undash();

      // Add watermark
      doc.save();
      doc.rotate(45, { origin: [doc.page.width / 2, doc.page.height / 2] });
      doc.fillOpacity(0.08);
      doc.fontSize(80);
      doc.fillColor("#0D9488");
      doc.text("Field Academy", 0, 0, {
        align: "center",
        width: doc.page.width,
      });
      doc.restore();
      doc.fillOpacity(1);

      // Add logo if available
      const logoPath = path.join(
        __dirname,
        "../public/images/Logo_High_Res.png"
      );
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 60, 60, { width: 160 }); // Position logo on the left side
      }

      // Calculate center position for text alignment
      const centerX = doc.page.width / 2;

      // Add certificate title with manual centering
      const titleText = "CERTIFICADO";
      doc.font("Helvetica-Bold").fontSize(36).fillColor("#0D9488");
      const titleWidth = doc.widthOfString(titleText);
      doc.text(titleText, centerX - titleWidth / 2, 180);

      const subtitleText = "DE CONCLUSÃO";
      doc.fontSize(20).fillColor("#334155");
      const subtitleWidth = doc.widthOfString(subtitleText);
      doc.text(subtitleText, centerX - subtitleWidth / 2, 220);

      // Add decorative line
      doc
        .moveTo(centerX - 100, 240)
        .lineTo(centerX + 100, 240)
        .lineWidth(2)
        .stroke("#0D9488");

      // Add certificate text with improved styling
      const certText = "Este certificado é conferido a";
      doc.font("Helvetica").fontSize(16).fillColor("#334155");
      const certTextWidth = doc.widthOfString(certText);
      doc.text(certText, centerX - certTextWidth / 2, 270);

      // Manually center name
      doc.font("Helvetica-Bold").fontSize(28).fillColor("#0f172a");
      const nameWidth = doc.widthOfString(userName);
      doc.text(userName, centerX - nameWidth / 2, 300);

      // Add decorative line under name
      doc
        .moveTo(doc.page.width / 2 - 150, 340)
        .lineTo(doc.page.width / 2 + 150, 340)
        .lineWidth(1)
        .stroke("#94a3b8");

      // Manually center course completion text
      const completionText = "por concluir com sucesso a trilha";
      doc.font("Helvetica").fontSize(16).fillColor("#334155");
      const completionTextWidth = doc.widthOfString(completionText);
      doc.text(completionText, centerX - completionTextWidth / 2, 360);

      // Manually center course name
      doc.font("Helvetica-Bold").fontSize(24).fillColor("#0f172a");
      const courseNameWidth = doc.widthOfString(courseName);
      doc.text(courseName, centerX - courseNameWidth / 2, 390);

      // Add signature section
      doc
        .lineWidth(1)
        .moveTo(doc.page.width / 2 - 100, 470) // Adjusted position to ensure fit on page
        .lineTo(doc.page.width / 2 + 100, 470)
        .stroke("#94a3b8");

      doc
        .font("Helvetica")
        .fontSize(12)
        .fillColor("#64748b")
        .text("Gestor", doc.page.width / 2 - 100, 480, {
          // Adjusted position
          width: 200,
          align: "center",
        });

      // Manually center completion date
      const dateText = `Completado em: ${completionDate}`;
      doc.fontSize(14).fillColor("#334155");
      const dateTextWidth = doc.widthOfString(dateText);
      doc.text(dateText, centerX - dateTextWidth / 2, 500);

      // Manually center verification ID
      const certId = `FA-${Date.now().toString().substring(5)}`;
      const verificationText = `ID de Verificação: ${certId}`;
      doc.fontSize(8).fillColor("#64748b");
      const verificationTextWidth = doc.widthOfString(verificationText);
      doc.text(verificationText, centerX - verificationTextWidth / 2, 525);

      // Finalize the PDF
      doc.end();

      stream.on("finish", () => {
        resolve(outputPath);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateCertificate };
