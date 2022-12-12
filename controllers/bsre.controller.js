const FormData = require("form-data");

module.exports.cekStatusNik = async (req, res) => {
  try {
    const { nik } = req.query;
    const result = await req.bsreFetcher.get(`/api/user/status/${nik}`);
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.checkDocument = async (req, res) => {
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
      const result = await req?.bsreFetcher.post(`/api/sign/verify`, form, {
        headers: form.getHeaders(),
      });
      res.json(result?.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
