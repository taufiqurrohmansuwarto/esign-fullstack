const FormData = require("form-data");
const { verify } = require("services/bsre/bsre.sign.service");

const verifyDocumentController = async (req, res) => {
  try {
    const file = req?.file;
    const typePdf = file?.mimetype === "application/pdf";
    if (!file || !typePdf) {
      res.status(400).json({
        code: 400,
        message: "File tidak ditemukan atau file bukan bertipe pdf",
      });
    } else {
      const buffer = Buffer.from(new Uint8Array(file?.buffer));
      const form = new FormData();
      form.append("signed_file", buffer, file?.originalname);
      const result = await verify(form);
      res.json(result?.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyDocumentController,
};
