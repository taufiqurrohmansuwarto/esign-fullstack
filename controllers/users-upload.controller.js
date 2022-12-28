const footer = require("lib/document-footer");
const { default: prisma } = require("lib/prisma");
const { uploadFile } = require("lib/utils");
const { nanoid } = require("nanoid");

const documentUpload = async (req, res) => {
  try {
    const { file } = req;
    const { title } = req?.body;

    const fileType = file.mimetype;
    const fileSize = file.size;

    // check file size and file type. file size must be at least 10 mb max and file type is .pdf
    const checkFile = fileType === "application/pdf" && fileSize < 20000000;

    if (!checkFile) {
      res.status(400).json({
        message: "File type must be .pdf and file size must be at least 10 mb",
      });
    } else {
      const uploadFilename = `${nanoid()}_${file.originalname}`;
      const minio = req.mc;

      const document = await prisma.document.create({
        data: {
          filename: uploadFilename,
          original_filename: file.originalname,
          size: file.size,
          type: file.mimetype,
        },
      });

      // beri footer disetiap halaman
      const documentFooter = await footer({
        file,
        documentId: document.id,
      });

      // hasil footer berupa buffer yang nantinya akan diupload di minio/s3
      const { pdfBuffer, totalPage } = documentFooter;

      // upload file ke minio/s3
      await uploadFile({
        fileBuffer: pdfBuffer,
        filename: uploadFilename,
        minio,
      });

      res.json({
        message: "File uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  documentUpload,
};
