const recipientsIndex = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
      select: {
        id: true,
        filename: true,
        status: true,
        Recipient: true,
      },
    });

    res.json(currentDocument);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const post = async (req, res) => {
  try {
    // must be array to simplified
    const { employee_number } = req?.body;
    res.status(200).json({ message: "ok", employee_number });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  recipientsIndex,
  post,
};
