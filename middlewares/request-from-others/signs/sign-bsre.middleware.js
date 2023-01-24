const { signPdf } = require("@/services/bsre/bsre.sign.service");
const FormData = require("form-data");

const signBsreMiddleware = async (req, res, next) => {
  try {
    const data = req?.documentStamp;

    const { fileBuffer, filename, passphrase, nik } = data;

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

    const currentResult = hasilSign?.data;

    const { base64_signed_file, ...resultBsre } = currentResult;
    const currentBufferFile = Buffer.from(base64_signed_file, "base64");

    req.documentSign = currentBufferFile;

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

module.exports = signBsreMiddleware;
