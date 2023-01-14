const { signPdf } = require("@/services/bsre/bsre.sign.service");
const FormData = require("form-data");
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/utils";

const signMiddleware = async (req, res, next) => {
  try {
    const { edited_document } = req;

    const { fileBuffer, filename, passphrase, nik } = edited_document;

    const form = new FormData();

    form.append("file", fileBuffer, filename);
    form.append("nik", nik);
    form.append("passphrase", passphrase);
    form.append("tampilan", "invisible");
    form.append("image", "true");
    form.append("jenis_response", "BASE64");

    const hasilSign = await signPdf(form, {
      headers: form.getHeaders(),
    });

    const data = hasilSign?.data;

    const { base64_signed_file, ...resultBsre } = data;
    const currentBufferFile = Buffer.from(base64_signed_file, "base64");

    await uploadFile({
      minio: req.mc,
      filename,
      fileBuffer: currentBufferFile,
    });

    await prisma.Document.update({
      where: {
        id: req?.query?.documentId,
      },
      data: {
        status: "COMPLETED",
        sign_document: filename,
        document_id_bsre: resultBsre?.id_dokumen,
      },
    });

    await prisma.Recipient.updateMany({
      where: {
        document_id: req?.query?.documentId,
      },
      data: {
        signatory_status: "COMPLETED",
        status: "COMPLETED",
        sign_properties: req?.body?.properties,
        approval_date: new Date(),
      },
    });

    req.signDocument = {
      buffer: currentBufferFile,
      filename,
      ...resultBsre,
    };

    next();
  } catch (error) {
    console.log(error);
    const errorBsre = error?.response?.data;
    if (errorBsre) {
      res.status(400).json({
        code: 400,
        message: errorBsre.error,
        data: req?.body?.passphrase,
      });
    } else {
      res.status(500).json({
        code: 500,
        message: error.message,
        data: null,
      });
    }
  }
};

module.exports = {
  signMiddleware,
};
