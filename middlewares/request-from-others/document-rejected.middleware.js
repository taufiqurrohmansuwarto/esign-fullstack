const { PDFDocument, StandardFonts } = require("pdf-lib");
const { nanoid } = require("nanoid");

const documentRejected = async (req, res, next) => {
  try {
    const { user, minio, document } = req;
    const { title, buffer } = document;

    const pdfDoc = await PDFDocument.load(buffer);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();

    // its all pages or first pages?
    firstPage.drawText(`DOCUMENT REJECTED`, {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(1, 0, 0),
      rotate: degrees(-45),
    });

    const currentPdf = await pdfDoc.save();
    const currentPdfBuffer = Buffer.from(new Uint8Array(currentPdf));
    const lastDocument = `rejected_${title}_nanoid()}.pdf`;

    req.rejectedDocument = {
      rejectedDocumentTitle: lastDocument,
      rejectedDocumentBuffer: currentPdfBuffer,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: error.message,
      data: null,
    });
  }
};

module.exports = documentRejected;
