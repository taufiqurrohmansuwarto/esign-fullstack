const userDashboard = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;

    // semua document draft
    const draft = await prisma.Recipient.count({
      where: {
        recipient_id: id,
        status: "draft",
      },
    });

    const documents = await prisma.Recipient.count({
      where: {
        recipient_id: id,
      },
    });

    const documentCompleted = await prisma.Recipient.count({
      where: {
        recipient_id: id,
        status: "completed",
      },
    });

    // semua document
    // semua document yang sudah selesai

    res.json({
      document_type: {
        document_draft: draft,
        all_documents: documents,
        document_completed: documentCompleted,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  userDashboard,
};
