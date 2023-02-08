const { createRouter } = require("next-connect");
import {
  acceptConfirmation,
  rejectConfirmation,
} from "@/controllers/document-collectives-confirmation.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

// put accept
// patch reject
router.use(auth()).put(acceptConfirmation).patch(rejectConfirmation);

export default router.handler();
