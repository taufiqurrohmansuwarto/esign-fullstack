const footer = require("lib/document-footer");
const { default: prisma } = require("lib/prisma");
const { uploadFile } = require("lib/utils");
const { nanoid } = require("nanoid");

const selfSignUploadController = async (req, res) => {
  try {
    const { user, file } = req;
    const { title, workflow } = req?.body;

    // check file format result is .pdf

    // tentukan filename
    const currentFilename = title
      ? `${nanoid()}_${title}.pdf`
      : `${nanoid()}_${file?.originalname}`;

    // siapkan data pada database
    const dataDocument = {
      original_filename: file?.originalname,
      type: file?.mimetype,
      status: "draft",
      filename: title ? `${title}.pdf` : file?.originalname,
      workflow,
      size: file?.size,
      initial_document: file?.filename,
      upload_date: new Date(),
      created_at: new Date(),
      user_id: user?.id,
      initial_document: currentFilename,
    };

    // ini di insert dulu untuk mendapatkan document id kemudian kita ubah filenamnye sesuai document id
    const result = await prisma.Document.create({
      data: dataDocument,
    });

    // print footer
    const resultFooter = await footer({
      file,
      documentId: result?.id,
    });

    const { pdfBuffer, totalPage } = resultFooter;

    // upload to s3
    await uploadFile({
      fileBuffer: pdfBuffer,
      filename: currentFilename,
      minio: req?.mc,
    });

    // dan update untuk document pages
    await prisma.Document.update({
      where: {
        id: result?.id,
      },
      data: {
        document_pages: totalPage,
      },
    });

    // now upsert to recipients
    const dataRecipient = {
      recipient_id: user?.id,
      document_id: result?.id,
      created_at: new Date(),
      sequence: 0,
      role: "signer",
      signatory_status: "pending",
      is_owner: true,
      uploader_id: user?.id,
      status: "draft",
    };

    await prisma.Recipient.create({
      data: dataRecipient,
    });

    // todo buat riwayat

    res.json({ code: 200, message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const requestFromOthersController = async (req, res) => {
  try {
    const { user, file } = req;
    const { title, worflow } = req?.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const signAndRequestController = async (req, res) => {
  try {
    const { user, file } = req;
    const { title, worflow } = req?.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const documentUpload = async (req, res) => {
  try {
    const { file } = req;
    const { title, workflow } = req?.body;

    const fileType = file.mimetype;
    const fileSize = file.size;

    // check file size and file type. file size must be at least 10 mb max and file type is .pdf
    const checkFile = fileType === "application/pdf" && fileSize < 20000000;

    if (!checkFile) {
      res.status(400).json({
        message: "File type must be .pdf and file size must be at least 10 mb",
      });
    } else {
      // workflow must be selfSign, requestFromOthers, and signAndRequest

      const uploadFilename = `${nanoid()}_${file.originalname}`;
      const minio = req.mc;

      const document = await prisma.document.create({
        data: {
          filename: title || uploadFilename,
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
  selfSignUploadController,
};
