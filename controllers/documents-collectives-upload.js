const uploadDocumentCollective = async (req, res) => {
  try {
    const requestId = req?.query?.requestId;
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

// list dokumen kolektif bisa dirubah dihapus dan upload ulang
const listDocummentCollective = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  uploadDocumentCollective,
};
