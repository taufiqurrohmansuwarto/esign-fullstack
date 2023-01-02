const index = async (req, res) => {
  try {
    const { documentId } = req?.query;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createRecipientsSelfSign = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createRecipientsRequestFromOthers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  index,
  createRecipientsRequestFromOthers,
  createRecipientsSelfSign,
};
