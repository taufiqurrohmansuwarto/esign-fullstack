const rejectReviewMiddleware = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = rejectReviewMiddleware;
