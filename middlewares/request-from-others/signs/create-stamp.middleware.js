import { base64ToBuffer } from "@/lib/request-from-others.utils";
import { PDFDocument } from "pdf-lib";
const { nanoid } = require("nanoid");

const createStamp = async ({
  properties,
  filename,
  fileBuffer,
  passphrase,
  nik,
}) => {
  const pdfDocNew = await PDFDocument.load(fileBuffer);
  const pages = pdfDocNew.getPages();
  const currentPosition = [];

  properties.forEach(
    async ({ xPos: x, yPos: y, height, width, page, stamp: userStamp }) => {
      const currentStamp = base64ToBuffer(userStamp);
      const stamp = await pdfDocNew.embedPng(currentStamp);

      const originalImageHeight = stamp.scale(1).height;
      const originalImageWidth = stamp.scale(1).width;

      const imageProperty = {
        height: height / originalImageHeight,
        width: width / originalImageWidth,
      };

      const stampScaleWidth = stamp.scale(imageProperty.width).width;
      const stampScaleHeight = stamp.scale(imageProperty.height).height;

      const clientCoord = { x, y };

      const currentPage = pages[page - 1];
      const currentPageHeight = currentPage.getHeight();

      const serverCoord = {
        x,
        y: currentPageHeight - (clientCoord.y + height)?.toFixed(2),
      };

      const serverData = {
        x: serverCoord.x,
        y: serverCoord.y,
        width: stampScaleWidth,
        height: stampScaleHeight,
      };

      currentPosition.push({ x, y, width, height, page });
      currentPage.drawImage(stamp, serverData);
    }
  );

  const newPdf = await pdfDocNew.save();
  const newPdfBuffer = Buffer.from(new Uint8Array(newPdf));
  const currentFilename = filename;

  const data = {
    fileBuffer: newPdfBuffer,
    filename: currentFilename,
    passphrase,
    nik,
  };

  return data;
};

const createStampMiddleware = async (req, res, next) => {
  try {
    const data = req?.document;
    const result = await createStamp(data);
    req.documentStamp = result;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = createStampMiddleware;
