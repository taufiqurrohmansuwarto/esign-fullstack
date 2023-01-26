const { createRouter } = require("next-connect");
import { getProfileController } from "@/controllers/bsre-user.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get(getProfileController);

export default router.handler();
