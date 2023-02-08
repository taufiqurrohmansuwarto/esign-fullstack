// ini digunakan untuk upload file ke document collective
const { useRouter } = require("next/router");
import auth from "@/middlewares/auth.middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = useRouter();

router.use(auth()).post();

export default router.handler();
