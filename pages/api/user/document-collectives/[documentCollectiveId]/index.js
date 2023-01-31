const { createRouter } = require("next-connect");
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get().patch().delete();

export default router.handler();
