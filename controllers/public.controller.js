// kontroler ini berfungsi sebagai pengecekan dokumen id yang nantinya bisa dilihat oleh user mengenai dokumen yang akan diverfikasi melualui bsre ataupun sistem yang ada di bkd

const { default: prisma } = require("@/lib/prisma");
import { downloadFile } from "@/lib/utils";
import { verify } from "@/services/bsre/bsre.sign.service";
const Minio = require("minio");
import axios from "axios";
const formData = require("form-data");

const port = process.env.MINIO_PORT;
const endPoint = process.env.MINIO_ENDPOINT;
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;

const mc = new Minio.Client({
  endPoint,
  useSSL: true,
  port: parseInt(port),
  accessKey,
  secretKey,
});

const publicSearch = async (req, res) => {
  try {
    const { id } = req?.query;
    const result = await prisma.Document.findFirst({
      where: {
        OR: [
          {
            id: id,
            status: "COMPLETED",
          },
          {
            id: id,
            status: "REJECTED",
          },
        ],
      },
      include: {
        Recipient: true,
        rejected_user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!result) {
      res.json(null);
    } else {
      const signDocument = result?.sign_document;
      const urlDownload = await downloadFile({
        minio: mc,
        filename: signDocument,
      });

      const resultBuffer = await axios.get(urlDownload, {
        responseType: "arraybuffer",
      });

      const bufferDocument = resultBuffer?.data;
      const currentBufferDocument = Buffer.from(new Uint8Array(bufferDocument));

      const form = new formData();
      form.append("signed_file", currentBufferDocument, signDocument);
      const resultBsre = await verify(form);

      const data = {
        bsre: resultBsre?.data,
        document: result,
        url: urlDownload,
      };

      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { publicSearch };
