const { createRouter } = require("next-connect");
import { index, create } from "@/controllers/documents-collectives-request";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get(index).post(create);

export default router.handler();
