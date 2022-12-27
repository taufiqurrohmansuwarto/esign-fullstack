// this middleware will create you automate footer for you documents
const { PDFDocument, StandardFonts, rgb, degrees } = require("pdf-lib");
const fs = require("fs");
const { times } = require("lodash");
const path = require("path");

// create lodash times function
// test this is thel last imes
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

  //   load as buffer
  const bsreImage = await pdfDoc.embedPng(logoBsre);
  const bkdImage = await pdfDoc.embedJpg(logoBKD);

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
    const serverPages = pages[n];
    // draw this fucking image each timeso
  });

  //   get height and width of the page
};

module.exports = footer;
