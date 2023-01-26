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
    const userId = req?.user?.id;
    const currentUser = await prisma.User.findUnique({
      where: {
        id: userId,
      },
    });

    let currentResult;
    const currentUserInformation = currentUser?.user_info;
    const nik = currentUserInformation?.nik;
    const result = await getProfile(nik);
    const data = result?.data;

    if (data?.status_code === 1110 || data?.status === "NOT REGISTERED") {
      currentResult = null;
    }

    if (data?.success) {
      currentResult = data;
    }

    res.json(currentResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  checkNikController,
  getProfileController,
};
