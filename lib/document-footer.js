// this middleware will create you automate footer for you documents
const { PDFDocument, StandardFonts, rgb, degrees } = require("pdf-lib");
const fs = require("fs");
const { times } = require("lodash");
const path = require("path");
const { createCanvas } = require("canvas");
const QrCode = require("qrcode");

const url = process.env.ESIGN_URL;

const barcodeSignDocument = (documentId) => {
  const width = 150;
  const height = 150;
  const canvas = createCanvas(width, height);

  QrCode.toCanvas(canvas, documentId);
  return canvas;
};

// create lodash times function
const times = (n, iteratee) => {
  let index = -1;
  const result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
};

const footer = async ({ file, documentId }) => {
  const logoBsre = fs.readFileSync(
    path.join(__dirname, "../public/logobsre.png")
  );

  const logoBKD = fs.readFileSync(
    path.join(__dirname, "../public/logobkd.jpg")
  );

  const { buffer } = file;

  const pdfDoc = await PDFDocument.load(buffer);

  // qrcode dari document id yang ditaruh do footer (pojok kanan bawah)
  const qrCode = await barcodeSignDocument(`${url}/${documentId}}`);
  const qrCodeBuffer = qrCode.toBuffer();

  //   load as buffer
  const qrCodeImage = await pdfDoc.embedPng(qrCodeBuffer);
  const bsreImage = await pdfDoc.embedPng(logoBsre);
  const bkdImage = await pdfDoc.embedJpg(logoBKD);

  const qrCodeImageHeight = qrCodeImage.scale(0.2).height;
  const qrCodeImageWidth = qrCodeImage.scale(0.2).width;

  const bsreImageHeight = bsreImage.scale(0.2).height;
  const bsreImageWidth = bsreImage.scale(0.2).width;

  const bkdImageHeight = bkdImage.scale(0.06).height;
  const bkdImageWidth = bkdImage.scale(0.06).width;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const totalPage = pdfDoc.getPageCount();
  const pages = pdfDoc.getPages();

  const fontSize = 4;
  const footerText = `Riwayat dokumen ini dapat dilihat dan dibuktikan keasliannya di https://bsre.id/document/${documentId}`;
  const textWidth = font.widthOfTextAtSize(footerText, fontSize);

  times(totalPage, (n) => {
    const serverPage = pages[n];

    serverPage.drawImage(qrCodeImage, {
      x: serverPage.getWidth() - qrCodeImageWidth - 10,
      y: serverPage.getHeight() - qrCodeImageHeight - 10,
      width: qrCodeImageWidth,
      height: qrCodeImageHeight,
    });

    serverPage.drawImage(bsreImage, {
      x: serverPage.getWidth() - bsreImageWidth - 10,
      y: serverPage.getHeight() - qrCodeImageHeight - 10 - bsreImageHeight,
      width: bsreImageWidth,
      height: bsreImageHeight,
    });

    serverPage.drawImage(bkdImage, {
      x: serverPage.getWidth() - bkdImageWidth - 10,
      y:
        serverPage.getHeight() -
        qrCodeImageHeight -
        10 -
        bsreImageHeight -
        10 -
        bkdImageHeight,
      width: bkdImageWidth,
      height: bkdImageHeight,
    });

    const { width } = serverPage.getSize();

    serverPage.drawText(footerText, {
      x: width / 2 - textWidth / 2,
      y: 10,
      size: fontSize,
      font,
      color: rgb(0.75, 0.75, 0.75),
    });
  });

  const pdf = await pdfDoc.save();
  const pdfBuffer = Buffer.from(new Uint8Array(pdf));

  return {
    totalPage: pdfDoc.getPageCount(),
    pdfBuffer,
  };
};

module.exports = footer;
