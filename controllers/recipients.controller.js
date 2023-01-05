const index = async (req, res) => {
  try {
    const { documentId } = req?.query;
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
