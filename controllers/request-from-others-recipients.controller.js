const { default: prisma } = require("@/lib/prisma");

const approveReview = async (req, res) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const rejectReview = async (req, res) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const approveSign = async (req, res) => {
  try {
    const documentId = req?.query?.documentId;
    const user = req?.user;

    // gambar dulu terus tanda tangan BSRE dan update ongoing_document menjadi baru

    // kemudian update status signatory status menjadi completed dan update juga reason, approval date

    // kemudian insert di table history
    await prisma.History.create({
      data: {
        document_id: documentId,
        recipient_id: user?.id,
        action: "SIGNED",
        created_at: new Date(),
        type: "DOCUMENT",
        ip_address: req?.ip,
        useragent: req?.useragent,
      },
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const rejectSign = async (req, res) => {
  try {
    // gambar dulu terus update ongoing_document menjadi baru dan menjadi sign document karena di reject

    // kemudian update status signatory status menjadi completed dan update juga reason, approval date dan jangan lupa update recipient dibawahnya menjadi rejected

    // kemudian insert di table history

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  approveReview,
  rejectReview,
  approveSign,
  rejectSign,
};
