// check file size and file type. file size must be at least 10 mb max and file type is .pdf
const checkingUploadMiddleware = async (req, res, next) => {
  const { file } = req;

  const fileType = file.mimetype;
  const fileSize = file.size;

  // check file size and file type. file size must be at least 10 mb max and file type is .pdf
  const checkFile = fileType === "application/pdf" && fileSize < 20000000;

  if (!checkFile) {
    res.status(400).json({
      code: 400,
      message: "File type must be .pdf and file size must be at least 10 mb",
    });
  } else {
    next();
  }
};

module.exports = {
  checkingUploadMiddleware,
};
