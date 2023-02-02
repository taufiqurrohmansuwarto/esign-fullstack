const { createRouter } = require("next-connect");
import { getAtasanController } from "@/controllers/atasan.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get(getAtasanController);

export default router.handler();
