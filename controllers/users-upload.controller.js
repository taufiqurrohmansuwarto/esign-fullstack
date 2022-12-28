const documentUpload = async (req, res) => {
  try {
    const { file } = req;
    console.log(file);
    res.json({
      message: "Upload Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  documentUpload,
};
