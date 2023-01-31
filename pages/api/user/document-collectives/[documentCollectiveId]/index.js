const { createRouter } = require("next-connect");
import { remove, update } from "@/controllers/documents-collectives-request";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get().patch(update).delete(remove);

export default router.handler();
