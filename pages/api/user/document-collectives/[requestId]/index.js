const { createRouter } = require("next-connect");
import { remove, update } from "@/controllers/documents-collectives-request";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).delete(remove).patch(update);

export default router.handler();
