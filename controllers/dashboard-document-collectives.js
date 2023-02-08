const dashboardDocumentCollectives = async (req, res) => {
  try {
    // harus ada aggregasi tentang berapa dokumen kolektif yang sudah selesai, diajukan, ataupun ditolak
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  dashboardDocumentCollectives,
};
