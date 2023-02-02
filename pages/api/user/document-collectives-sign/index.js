const { createRouter } = require("next-connect");
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get();

export default router.handler();
