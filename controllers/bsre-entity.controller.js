const {
  getExpiredCert,
  getReport,
} = require("services/bsre/bsre.entity.service");

const getExpiredCertController = async (req, res) => {
  try {
    const result = await getExpiredCert();
    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getReportController = async (req, res) => {
  try {
    const result = await getReport();
    res.json(result?.data);
  } catch (error) {
    if (error?.response?.data) {
      res.status(error?.response?.data?.status_code).json({
        code: 400,
        message: error?.response?.data?.error,
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = {
  getExpiredCertController,
  getReportController,
};
