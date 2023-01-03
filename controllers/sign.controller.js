const { default: prisma } = require("lib/prisma");
const { downloadFileSelFSign } = require("lib/utils");

const confirmSelfSign = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const { user, mc: minio } = req;
    const userId = user?.id;

    // ga dibuat middleware karena hanya dipakai disini, dan karena ini self sign maka ngeceknya berdasarkan uploader,id_document dan statusnya masih draft
    const currentDocument = await prisma.Document.findFirst({
      where: {
        id: documentId,
        user_id: userId,
      },
      include: {
        Recipient: true,
      },
    });

    const currentUser = await prisma.User.findUnique({
      where: {
        id: userId,
      },
    });

    const documentValid =
      currentDocument?.status === "draft" &&
      currentDocument?.user_id === userId &&
      currentDocument?.workflow === "selfSign";

    if (!documentValid) {
      return res.status(404).json({
        code: 404,
        message:
          "document not valid (not found or not draft or not self sign or not your document))",
      });
    } else {
      const { body } = req;
      const properties = body?.properties || [];

      const initialDocument = currentDocument?.initial_document;

      const hasil = await downloadFileSelFSign({
        minio,
        initialDocument,
        signCoordinates: properties,
        userInfo: currentUser?.user_info,
      });

      res.json({ hasil });

      // x,y,width, and height
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  confirmSelfSign,
};
