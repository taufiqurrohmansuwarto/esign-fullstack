const { PDFDocument, StandardFonts, rgb, degrees } = require("pdf-lib");
const { nanoid } = require("nanoid");

const createStampRejectSignMiddleware = async (req, res, next) => {
  try {
    const document = req?.document;
    const { filename, fileBuffer } = document;

    const pdfDoc = await PDFDocument.load(fileBuffer);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();

    // its all pages or first pages?
    firstPage.drawText(`DOCUMENT REJECTED`, {
      x: 5,
      y: height / 2 + 300,
      size: 40,
      font: helveticaFont,
      color: rgb(1, 0, 0),
      rotate: degrees(-45),
    });

    const currentPdf = await pdfDoc.save();
    const currentPdfBuffer = Buffer.from(new Uint8Array(currentPdf));
    const lastDocument = filename;

    req.rejectedDocument = {
      rejectedDocumentTitle: `${nanoid(10)}-rejected_${lastDocument}`,
      rejectedDocumentBuffer: currentPdfBuffer,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = createStampRejectSignMiddleware;
