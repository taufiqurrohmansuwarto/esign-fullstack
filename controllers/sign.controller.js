const { default: prisma } = require("lib/prisma");

const confirmSelfSign = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const { user } = req;
    const userId = user?.id;

    // ga dibuat middleware karena hanya dipakai disini, dan karena ini self sign maka ngeceknya berdasarkan uploader,id_document dan statusnya masih draft
    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
        userId: userId,
      },
      include: {
        Recipient: true,
      },
    });

    const documentValid =
      currentDocument?.status === "draft" &&
      currentDocument?.userId === userId &&
      currentDocument?.workflow === "self_sign";

    if (!documentValid) {
      return res.status(404).json({
        code: 404,
        message:
          "document status is not draft or document workflow is not self_sign",
      });
    } else {
      // berikan parameter dari req.body ke variable
      // cetak stempel
      // upload ke s3
      // simpan ke database
      // todo : buat history

      const { body } = req;
      const properties = body?.properties || [];
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  confirmSelfSign,
};
