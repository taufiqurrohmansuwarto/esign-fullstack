const { createRouter } = require("next-connect");
import { listConfirmation } from "@/controllers/document-collectives-confirmation.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get(listConfirmation);

export default router.handler();
