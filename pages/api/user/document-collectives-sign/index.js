const { createRouter } = require("next-connect");
import { listConfirmation } from "@/controllers/document-collectives-confirmation.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

// this should be gone after we have a better way to handle this
router.use(auth()).get(listConfirmation);

export default router.handler();
