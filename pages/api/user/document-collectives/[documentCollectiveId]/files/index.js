const { createRouter } = require("next-connect");
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get().post();

export default router.handler();
