const { default: prisma } = require("lib/prisma");

const lower = (str) => str?.toLower();

const CheckAndReturnMiddleware = async (req, res, next) => {
  try {
    const { documentId } = req?.query;
    const { user } = req;
    const userId = user?.id;

    // penting
    const { passphrase, properties } = req?.body;

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

    // valid terbukti kalau dia statusnya draft dan workflow menggunakan self sign
    const isValid =
      lower(currentDocument?.status) === "draft" &&
      currentDocument?.user_id === userId &&
      currentDocument?.workflow === "selfSign";

    if (!isValid) {
      res.status(404).json({
        code: 404,
        message:
          "document not valid (not found or not draft or not self sign or not your document))",
      });
    } else {
      // maybe check
      const initialDocument = currentDocument?.initial_document;
      const userInfo = currentUser?.user_info;
      const filename = currentDocument?.filename;

      req.document = {
        initialDocument,
        userInfo,
        filename,
        passphrase,
        properties,
      };

      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CheckAndReturnMiddleware,
};
