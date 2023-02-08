const { default: prisma } = require("@/lib/prisma");

const upload = async (req, res) => {
  try {
    const { id } = req.params;
    const { files } = req;
    const { user } = req;
    const { id: userId } = user;
    const { id: documentCollectiveId } = await DocumentCollective.findOne({
      where: { id },
    });
    const documentCollectiveFile = await DocumentCollectiveFile.create({
      documentCollectiveId,
      userId,
    });
    const { id: documentCollectiveFileId } = documentCollectiveFile;
    const documentCollectiveFiles = [];
    for (const file of files) {
      const { originalname: name, filename: path } = file;
      const documentCollectiveFile = await DocumentCollectiveFile.create({
        documentCollectiveFileId,
        name,
        path,
      });
      documentCollectiveFiles.push(documentCollectiveFile);
    }
    res.status(201).json({ code: 201, data: documentCollectiveFiles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

const list = async (req, res) => {
  try {
    const requestId = req?.query?.requestId;
    const result = await prisma.documentCollectiveFile.findMany({
      where: {
        documentCollectiveId: requestId,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

// per id
const update = async (req, res) => {
  try {
    const fileId = req?.query?.fileId;
    const body = req?.body;

    const result = await prisma.documentCollectiveFile.update({
      where: {
        id: fileId,
      },
      data: body,
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

const detail = async (req, res) => {
  try {
    const fileId = req?.query?.fileId;
    const result = await prisma.documentCollectiveFile.findUnique({
      where: {
        id: fileId,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const fileId = req?.query?.fileId;
    const result = await prisma.documentCollectiveFile.delete({
      where: {
        id: fileId,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

// menandatangani semua dokumen berdasarkan id request dokumen kolektif
// jika ada dokumen pada daftar request yang belum ditandatangani, maka akan mencari yang belum kemudian ditandatangani, hanya perlu satu tombol saja untuk menandatangani semua dokumen
// koneksikan dengan api bsre
const sign = async (req, res) => {
  try {
    const requestId = req?.query?.requestId;

    const fileNotSigned = await prisma.documentCollectiveFile.findMany({
      where: {
        document_collective_request_id: requestId,
        is_signed: false,
      },
      // maximum?
      take: 10000,
    });

    // do something shit with api bsre

    const result = await prisma.documentCollectiveFile.updateMany({
      where: {
        document_collective_request_id: requestId,
        is_signed: false,
      },
      data: {
        is_signed: true,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  sign,
  upload,
  list,
  update,
  detail,
  remove,
};
