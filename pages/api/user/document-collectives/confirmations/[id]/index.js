const { createRouter } = require("next-connect");
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

// ini untuk confirm and reject
router.use(auth()).put().delete();

export default router.handler();
