// this middleware will create you automate footer for you documents
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");
const QrCode = require("qrcode");

const url = process.env.ESIGN_CHECK_URL;

// create qrcode box
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
  const asssetDirectory = path.resolve(process.cwd(), "public/assets");

  const logoBsre = fs.readFileSync(path.join(asssetDirectory, "logobsre.png"));
  const logoBKD = fs.readFileSync(path.join(asssetDirectory, "logobkd.jpg"));

  const { buffer } = file;

  const pdfDoc = await PDFDocument.load(buffer);

  // qrcode dari document id yang ditaruh do footer (pojok kanan bawah)
  const qrCode = await barcodeSignDocument(`${url}/${documentId}`);
  const qrCodeBuffer = qrCode.toBuffer();

  //   load as buffer
  const qrCodeImage = await pdfDoc.embedPng(qrCodeBuffer);
  const bsreImage = await pdfDoc.embedPng(logoBsre);
  const bkdImage = await pdfDoc.embedJpg(logoBKD);

  const qrCodeImageHeight = qrCodeImage.scale(0.4).height;
  const qrCodeImageWidth = qrCodeImage.scale(0.4).width;

  const bsreImageHeight = bsreImage.scale(0.2).height;
  const bsreImageWidth = bsreImage.scale(0.2).width;

  const bkdImageHeight = bkdImage.scale(0.06).height;
  const bkdImageWidth = bkdImage.scale(0.06).width;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const totalPage = pdfDoc.getPageCount();
  const pages = pdfDoc.getPages();

  const fontSize = 4;
  const footerText = `Riwayat dokumen ini dapat dilihat dan dibuktikan keasliannya di ${url}/${documentId}`;
  const textWidth = font.widthOfTextAtSize(footerText, fontSize);

  // new document
  const firstFooter = "- UU ITE No. 11 Tahun 2008 Pasal 5 Ayat (1)";
  const secondFooter = `"Informasi Elektronik dan/atau Dokumen Elektronik dan/atau hasil cetaknya merupakan alat bukti hukum yang sah"`;
  const thirdFoooter =
    "- Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbikt BSrE";

  times(totalPage, (n) => {
    const serverPage = pages[n];
    const MAGIC_NUMBER = 3;

    // lebar dan tinggi masing-masing halaman, karena ada halaman yang berbeda bisa landscape atau portrait
    const { width } = serverPage.getSize();
    const QRCodeImageWidth = qrCodeImageWidth + 8;
    const BSREImageWidth = QRCodeImageWidth + bsreImageWidth + 2;
    const BKDImageWidth =
      QRCodeImageWidth + BSREImageWidth + bkdImageWidth - 70;

    serverPage.drawImage(qrCodeImage, {
      y: 0 + 8 - MAGIC_NUMBER,
      x: width - QRCodeImageWidth,
      width: qrCodeImageWidth,
      height: qrCodeImageHeight,
    });

    serverPage.drawImage(bsreImage, {
      y: 0 + 12 - MAGIC_NUMBER,
      x: width - BSREImageWidth,
      width: bsreImageWidth,
      height: bsreImageHeight,
    });

    serverPage.drawImage(bkdImage, {
      y: 0 + 5 - MAGIC_NUMBER,
      x: width - BKDImageWidth,
      width: bkdImageWidth,
      height: bkdImageHeight,
    });

    // create draw text for firstFooter,secondFooter,thirdFoooter in left bottom
    serverPage.drawText(firstFooter, {
      x: 8,
      y: 15,
      size: fontSize,
      font,
      // black color
      color: rgb(0, 0, 0),
    });

    serverPage.drawText(secondFooter, {
      x: 8,
      y: 10,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    serverPage.drawText(thirdFoooter, {
      x: 8,
      y: 5,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    // serverPage.drawText(footerText, {
    //   x: width / 2 - textWidth / 2,
    //   y: 10,
    //   size: fontSize,
    //   font,
    //   color: rgb(0.75, 0.75, 0.75),
    // });
  });

  const pdf = await pdfDoc.save();
  const pdfBuffer = Buffer.from(new Uint8Array(pdf));

  return {
    totalPage: pdfDoc.getPageCount(),
    pdfBuffer,
  };
};

module.exports = footer;
