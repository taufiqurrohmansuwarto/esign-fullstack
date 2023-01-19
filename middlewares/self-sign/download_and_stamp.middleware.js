const { nanoid } = require("nanoid");
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { createStamp } from "@/lib/utils";

const downloadFile = async ({ minio, filename }) => {
  return new Promise((resolve, reject) => {
    minio.presignedGetObject(
      "storage",
      `/esign/${filename}`,
      24 * 60 * 60,
      (err, presignedUrl) => {
        if (err) {
          return reject(err);
        }
        return resolve(presignedUrl);
      }
    );
  });
};

const createStampSelfSign = async ({
  properties,
  filename,
  fileBuffer,
  stampBuffer,
  passphrase,
  nik,
}) => {
  try {
    const pdfDocNew = await PDFDocument.load(fileBuffer);
    const stamp = await pdfDocNew.embedPng(stampBuffer);
    const pages = pdfDocNew.getPages();
    const currentPosition = [];

    const originalImageHeight = stamp.scale(1).height;
    const originalImageWidth = stamp.scale(1).width;

    properties.forEach(({ xPos: x, yPos: y, height, width, page }) => {
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
    });

    const newPdf = await pdfDocNew.save();
    const newPdfBuffer = Buffer.from(new Uint8Array(newPdf));
    const currentFilename = `${nanoid()}_sign_${filename}`;

    const data = {
      fileBuffer: newPdfBuffer,
      filename: currentFilename,
      passphrase,
      nik,
    };

    return data;
  } catch (error) {
    return error;
  }
};

const downloadAndStamp = async (req, res, next) => {
  try {
    const {
      mc: minio,
      document: { initialDocument, filename, properties, userInfo, passphrase },
    } = req;

    const presignedUrl = await downloadFile({
      minio,
      filename: initialDocument,
    });

    const stampBuffer = await createStamp(userInfo);

    const { data: fileBuffer } = await axios.get(presignedUrl, {
      responseType: "arraybuffer",
    });

    const dataStamp = {
      fileBuffer,
      stampBuffer,
      filename,
      properties,
      passphrase,
      nik: userInfo.nik,
    };

    const data = await createStampSelfSign(dataStamp);
    req.edited_document = data;
    next();
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  downloadAndStamp,
};
