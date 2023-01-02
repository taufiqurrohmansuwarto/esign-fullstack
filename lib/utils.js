const { createCanvas, Image, registerFont, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");
// info signer untuk pengecekan dokumen
export const infoSigner = (data) => {
  const [information] = data?.details;
  const { info_signer } = information;

  return {
    signer_name: info_signer?.signer_name,
    jumlah_signature: data?.jumlah_signature,
    nama_dokumen: data?.nama_dokumen,
  };
};

export const uploadFile = ({ minio, filename, fileBuffer }) => {
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
export const minioPreviewDocument = async ({ minio, filename }) => {
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

export const createStamp = async (data) => {
  const { nip, nama, golonganPangkat } = data;
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

  context.drawImage(image, width / 2 - measureImage / 2 + 10, height / 3);
  context.fillText(pengantar, width / 2 - measurePengantar / 2, 40);
  context.fillText(
    nama,
    width / 2 - context.measureText(nama).width / 2,
    height / 2 + 50
  );

  context.fillText(
    nip,
    width / 2 - context.measureText(nip).width / 2,
    height / 2 + 60
  );

  context.fillText(
    golonganPangkat,
    width / 2 - context.measureText(golonganPangkat).width / 2,
    height / 2 + 70
  );

  return canvas.toBuffer();
};
