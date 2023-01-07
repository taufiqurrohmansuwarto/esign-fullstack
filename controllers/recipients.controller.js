const index = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const recipients = await prisma.Recipient.findMany({
      where: {
        document_id: documentId,
      },
      include: {
        user: {
          select: {
            user_info: true,
          },
        },
      },
    });
    res.json(recipients);
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
  index,
  post,
};
