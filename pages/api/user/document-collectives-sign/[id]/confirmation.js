const { createRouter } = require("next-connect");
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

// for accept and reject confirmation
router.use(auth()).put().delete();

export default router.handler();
