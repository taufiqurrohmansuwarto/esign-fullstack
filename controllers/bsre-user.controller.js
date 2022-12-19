import { checkNik, getProfile } from "../services/bsre/bsre.user.service";

const checkNikController = async (req, res) => {
  try {
    const { nik } = req.query;
    const result = await checkNik(nik);

    res.json(result?.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getProfileController = async (req, res) => {
  try {
    const { nik } = req?.query;
    const result = await getProfile(nik);
    res.json(result?.data);
  } catch (error) {}
};

module.exports = {
  checkNikController,
  getProfileController,
};
