const { createRouter } = require("next-connect");
import { getUrls } from "@/controllers/user-document.controller";
import auth from "@/middlewares/auth.middleware";
const router = createRouter();

router.use(auth()).get(getUrls);

export default router.handler();
