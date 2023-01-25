import { signPdf } from "@/services/bsre/bsre.sign.service";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import prisma from "./prisma";
const FormData = require("form-data");
const { nanoid } = require("nanoid");

const { createCanvas, registerFont, loadImage } = require("canvas");

const fs = require("fs");

const path = require("path");
// info signer untuk pengecekan dokumen
const infoSigner = (data) => {
  const [information] = data?.details;
  const { info_signer } = information;

  return {
    signer_name: info_signer?.signer_name,
    jumlah_signature: data?.jumlah_signature,
    nama_dokumen: data?.nama_dokumen,
  };
};

const uploadFile = ({ minio, filename, fileBuffer }) => {
  return new Promise((resolve, reject) => {
    minio.putObject(
      "storage",
      `/esign/${filename}`,
      fileBuffer,
      fileBuffer.length,
      "application/pdf",
      (err, etag) => {
        if (err) {
          return reject(err);
        }
        return resolve(etag);
      }
    );
  });
};

// preview document with minio
const downloadFile = async ({ minio, filename }) => {
  return new Promise((resolve, reject) => {
    minio.presignedUrl(
      "GET",
      "storage",
      `esign/${filename}`,
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

const downloadWithFilename = async ({ minio, filename, newFilename }) => {
  return new Promise((resolve, reject) => {
    minio.presignedGetObject(
      "storage",
      `esign/${filename}`,
      24 * 60 * 60,
      {
        "response-content-disposition": `attachment; filename=${newFilename}`,
      },
      (err, presignedUrl) => {
        if (err) {
          return reject(err);
        }
        return resolve(presignedUrl);
      }
    );
  });
};

const createStamp = async (data) => {
  const { nip: currentNip, nama, pangkat } = data;
  const nip = `NIP ${currentNip}`;
  const assetDirectory = path.resolve(process.cwd(), "public/assets");
  const logo = fs.readFileSync(path.join(assetDirectory, "logo_pemprov.png"));
  const image = await loadImage(logo);

  // generate width and heigth
  const width = 350;
  const height = 175;

  const canvas = createCanvas(width, height);

  const context = canvas.getContext("2d");
  const pengantar = "Dintandatangani secara elektronik";

  context.fillStyle = "rgba(255,255,255,0)";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#000";

  context.imageSmoothingEnabled = true;
  context.antialias = "subpixel";
  context.imageSmoothingEnabled = true;

  context.patternQuality = "best";

  registerFont("fonts/Menlo Regular.ttf", { family: "Menlo" });
  context.font = "6pt Menlo";

  // img.src = result;
  const measureImage = context.measureText(image).width;
  const measurePengantar = context.measureText(pengantar).width;

  context.drawImage(image, width / 2 - measureImage / 2 + 5, height / 3);

  context.fillText(pengantar, width / 2 - measurePengantar / 2, 40);
  context.fillText(
    nama,
    width / 2 - context.measureText(nama).width / 2,
    height / 2 + 50
  );

  context.fillText(
    pangkat,
    width / 2 - context.measureText(pangkat).width / 2,
    height / 2 + 60
  );

  context.fillText(
    nip,
    width / 2 - context.measureText(nip).width / 2,
    height / 2 + 70
  );

  return canvas.toBuffer();
};

const downloadFileSelFSign = async ({
  initialDocument,
  filename,
  properties,
  minio,
  userInfo,
  passphrase,
}) => {
  try {
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

    const result = await createStampSelfSign(dataStamp);

    return result;
  } catch (error) {
    console.log(error);
  }
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

      const clientCoord = { x, y };

      const serverPage = pages[page - 1];
      const serverCoord = {
        x,
        y: serverPage.getHeight() - (clientCoord.y + height).toFixed(2),
      };

      const serverData = {
        x: serverCoord.x,
        y: serverCoord.y,
        width: stamp.scale(imageProperty.width).width,
        height: stamp.scale(imageProperty.height).height,
      };

      currentPosition.push({ x, y, width, height, page });
      serverPage.drawImage(stamp, serverData);
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

    // upload to esign server
  } catch (error) {
    console.log(error);
  }
};

const signDocumentWithoutStamp = async ({
  fileBuffer,
  nik,
  filename,
  passphrase,
}) => {
  try {
    const form = new FormData();

    form.append("file", fileBuffer, filename);
    form.append("nik", nik);
    form.append("passphrase", passphrase);
    form.append("tampilan", "invisible");
    form.append("image", "true");
    form.append("jenis_response", "BASE64");

    const data = await signPdf(form, {
      headers: form.getHeaders(),
    });

    const result = data?.base64_file;
    const currentBufferFile = Buffer.from(result, "base64");

    return currentBufferFile;
  } catch (error) {
    console.log(error);
  }
};

// create function to format date MMM DD, YYYY HH:mm
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

// create conditions based on sequence on recipients table. if sequence is 1, then no check. if sequence is after 1, then check previous sequence is signed or reviewed by checking signatory_status column on recipients table if its true or false. Check until sequence length is equal to sequence number.
const checkSequence = async (req, res) => {
  const { documentId } = req?.query;
  const recipients = await prisma.Recipient.findMany({
    where: {
      document_id: documentId,
    },
  });

  const sequence = recipients.map((recipient) => recipient.sequence);
  const maxSequence = Math.max(...sequence);

  const sequenceStatus = recipients.map(
    (recipient) => recipient.sequence_status
  );

  const isSequenceStatusTrue = sequenceStatus.every(
    (status) => status === true
  );

  if (maxSequence === 1) {
    return res.status(200).json({ isSequenceStatusTrue });
  }

  if (maxSequence > 1) {
    const sequenceStatus = recipients.map(
      (recipient) => recipient.sequence_status
    );
    const isSequenceStatusTrue = sequenceStatus.every(
      (status) => status === true
    );

    return res.status(200).json({ isSequenceStatusTrue });
  }

  return res.status(200).json({ isSequenceStatusTrue });
};

// create function base64 to arraybuffer
const base64ToBuffer = (base64) => {
  const imageBuffer = Buffer.from(base64, "base64");
  const imageArray = new Uint8Array(imageBuffer);
  return imageArray;
};

module.exports = {
  formatDate,
  infoSigner,
  uploadFile,
  downloadFile,
  createStamp,
  downloadFileSelFSign,
  createStampSelfSign,
  base64ToBuffer,
  downloadWithFilename,
};
