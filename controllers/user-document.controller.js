const { minioPreviewDocument } = require("lib/utils");

// cuman preview menggunakan req query
const previewDocumentController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// preview tapi status dokumennya
const previewDocumentWithStatusController = async (req, res) => {
  try {
    const { filename } = req?.query;

    if (!filename) {
      res.status(400).json({
        message: "Filename is required",
      });
    } else {
      const result = await minioPreviewDocument({
        filename,
      });

      //   download file
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=" + filename);

      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  previewDocumentController,
  previewDocumentWithStatusController,
};
