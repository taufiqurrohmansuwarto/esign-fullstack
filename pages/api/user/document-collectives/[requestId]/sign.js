// this will be sign all the document collectives
const { createRouter } = require("next-connect");
import auth from "@/middlewares/auth.middleware";

const router = createRouter();
router.use(auth()).post();

export default router.handler();
